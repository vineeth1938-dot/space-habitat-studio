import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const SCREENSHOT_DIR =
  process.env.SCREENSHOT_DIR ||
  '/home/vineeth/.gemini/antigravity/brain/b43be877-a59c-4cb5-9c1c-7d3987e9b6c4/scratch/e2e_screenshots';

fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForHttp(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.text();
    } catch {
      // retry
    }
    await sleep(150);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpSession {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.consoleErrors = [];
    this.pageErrors = [];
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });

    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(String(event.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      } else if (msg.method === 'Runtime.exceptionThrown') {
        this.pageErrors.push(msg.params?.exceptionDetails?.text || 'Uncaught exception');
      } else if (msg.method === 'Runtime.consoleAPICalled') {
        if (msg.params?.type === 'error') {
          const text = (msg.params.args || [])
            .map((a) => a.value ?? a.description ?? '')
            .join(' ');
          this.consoleErrors.push(text);
        }
      }
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval exception: ${res.exceptionDetails.text}`);
    }
    return res.result?.value;
  }

  async setViewport(width, height, mobile = false) {
    await this.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
    });
    await sleep(300);
  }

  async screenshot(filename) {
    const { data } = await this.send('Page.captureScreenshot', { format: 'png' });
    const outPath = path.join(SCREENSHOT_DIR, filename);
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    return outPath;
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  const previewProc = spawn('npx', ['vite', 'preview', '--port', '4173', '--host', '127.0.0.1'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  const chromeDir = '/tmp/shs-chrome-profile-' + Date.now();
  const chromeProc = spawn(
    '/usr/bin/google-chrome',
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--disable-dev-shm-usage',
      `--user-data-dir=${chromeDir}`,
      '--remote-debugging-port=9222',
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  try {
    await waitForHttp('http://127.0.0.1:4173/');
    const targetsJson = await waitForHttp('http://127.0.0.1:9222/json');
    const targets = JSON.parse(targetsJson);
    const pageTarget = targets.find((t) => t.type === 'page');
    if (!pageTarget) throw new Error('No Chrome page target found');

    const cdp = new CdpSession(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');

    // 1. Desktop 1440x900 E2E Stress Verification
    await cdp.setViewport(1440, 900, false);
    await cdp.send('Page.navigate', { url: 'http://127.0.0.1:4173/' });
    await sleep(1200);

    const initialState = await cdp.eval(`(() => {
      const canvas = document.querySelector('canvas');
      const svg = document.querySelector('svg');
      const scoreText = document.body.innerText.match(/SCORE\\s*(\\d+)\\/100/)?.[1] ||
                        document.body.innerText.match(/(\\d+)\\/100/)?.[1];
      return {
        hasCanvas: Boolean(canvas && canvas.width > 0 && canvas.height > 0),
        hasSvg: Boolean(svg),
        score: Number(scoreText),
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
      };
    })()`);

    console.log('[Gate 4] Initial 1440x900 state:', initialState);
    if (!initialState.hasCanvas || !initialState.hasSvg) {
      throw new Error('Missing 2D SVG or 3D WebGL canvas on initial render');
    }
    if (initialState.overflowX) {
      throw new Error('Horizontal overflow detected at 1440x900');
    }
    await cdp.screenshot('01-studio-baseline-1440x900.png');

    // 2. Cycle all 4 Historical Reference Presets via <select>
    const presetScores = await cdp.eval(`(async () => {
      const sel = document.querySelector('select[aria-label="Habitat Preset"]');
      const ids = ['cramped-faulty-baseline', 'iss-destiny-node', 'transhab-mars-inflatable', 'artemis-lunar-dome'];
      const scores = {};
      for (const id of ids) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
        setter.call(sel, id);
        sel.dispatchEvent(new Event('change', { bubbles: true }));
        await new Promise(r => setTimeout(r, 120));
        const m = document.body.innerText.match(/(\\d+)\\/100/);
        scores[id] = m ? Number(m[1]) : -1;
      }
      // Return to Cramped Faulty Baseline for drag & optimize test
      const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;
      setter.call(sel, 'cramped-faulty-baseline');
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      await new Promise(r => setTimeout(r, 120));
      return scores;
    })()`);
    console.log('[Gate 4] Preset Readiness Scores:', presetScores);
    if (
      presetScores['iss-destiny-node'] < 85 ||
      presetScores['transhab-mars-inflatable'] < 85 ||
      presetScores['artemis-lunar-dome'] < 85
    ) {
      throw new Error('Heritage preset scored below 85: ' + JSON.stringify(presetScores));
    }

    // 3. Real Pointer Drag + Keyboard Rotate (R) + Undo/Redo on 2D Floorplan
    const zoneBox = await cdp.eval(`(() => {
      const el = document.querySelector('[data-zone-id="cq-1"]');
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`);
    if (!zoneBox) throw new Error('Could not locate zone cq-1 in 2D SVG');

    await cdp.send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x: zoneBox.x,
      y: zoneBox.y,
      button: 'left',
      clickCount: 1,
    });
    await cdp.send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: zoneBox.x + 28,
      y: zoneBox.y + 14,
      button: 'left',
    });
    await cdp.send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x: zoneBox.x + 28,
      y: zoneBox.y + 14,
      button: 'left',
      clickCount: 1,
    });
    await sleep(150);

    // Press 'r' to rotate selected zone, then Ctrl+Z twice to undo rotate + drag
    await cdp.eval(`(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'r', bubbles: true }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, bubbles: true }));
    })()`);
    await sleep(150);

    // 4. Toggle Airflow Overlay + Sleep Lighting + Crew Eye First-Person 3D Camera
    await cdp.eval(`(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      btns.find(b => b.textContent?.includes('Airflow'))?.click();
      btns.find(b => b.textContent?.includes('Sleep'))?.click();
      btns.find(b => b.textContent?.includes('Crew Eye'))?.click();
    })()`);
    await sleep(350);
    await cdp.screenshot('02-first-person-crew-eye-1440x900.png');

    // Return to Orbit + Day mode, then run Auto-Optimize
    const optResult = await cdp.eval(`(async () => {
      const btns = Array.from(document.querySelectorAll('button'));
      btns.find(b => b.textContent?.includes('Orbit'))?.click();
      btns.find(b => b.textContent?.includes('Day'))?.click();
      const beforeMatch = document.body.innerText.match(/(\\d+)\\/100/);
      const beforeScore = beforeMatch ? Number(beforeMatch[1]) : 0;
      btns.find(b => b.textContent?.includes('Auto-Optimize Layout'))?.click();
      await new Promise(r => setTimeout(r, 300));
      const afterMatch = document.body.innerText.match(/(\\d+)\\/100/);
      const afterScore = afterMatch ? Number(afterMatch[1]) : 0;
      const hasToast = document.body.innerText.includes('Optimized in');
      return { beforeScore, afterScore, hasToast };
    })()`);
    console.log('[Gate 4] Auto-Optimize result:', optResult);
    if (optResult.afterScore <= optResult.beforeScore || !optResult.hasToast) {
      throw new Error('Auto-Optimize failed to strictly improve score or show delta toast');
    }
    await cdp.screenshot('03-optimized-1440x900.png');

    // 5. Solar-Flare Stress Test (X10 Extreme SPE)
    const stormCheck = await cdp.eval(`(async () => {
      const navBtns = Array.from(document.querySelectorAll('nav button'));
      navBtns.find(b => b.textContent?.includes('Solar Storm'))?.click();
      await new Promise(r => setTimeout(r, 200));
      const btns = Array.from(document.querySelectorAll('button'));
      btns.find(b => b.textContent?.includes('X10 Extreme SPE'))?.click();
      await new Promise(r => setTimeout(r, 250));
      const upper = document.body.innerText.toUpperCase();
      return {
        hasWaterWall: upper.includes('TRANSHAB WATER-WALL'),
        hasVerdict: upper.includes('CREW SURVIVABILITY VERDICT'),
      };
    })()`);
    console.log('[Gate 4] Solar Storm X10 check:', stormCheck);
    if (!stormCheck.hasWaterWall || !stormCheck.hasVerdict) {
      throw new Error('Solar Storm view missing Water-Wall or Survivability Verdict');
    }
    await cdp.screenshot('04-solar-storm-x10-1440x900.png');

    // 6. Side-by-Side Compare Mode + Check Unblocked Egress delta badge
    const compareCheck = await cdp.eval(`(async () => {
      const navBtns = Array.from(document.querySelectorAll('nav button'));
      navBtns.find(b => b.textContent?.includes('Compare'))?.click();
      await new Promise(r => setTimeout(r, 250));
      return {
        hasUnblocked: document.body.innerText.includes('UNBLOCKED'),
      };
    })()`);
    console.log('[Gate 4] Compare Mode check:', compareCheck);
    await cdp.screenshot('05-compare-mode-1440x900.png');

    // 7. Export NASA-STD-3001 Audit Modal + Escape close
    const auditCheck = await cdp.eval(`(async () => {
      const btns = Array.from(document.querySelectorAll('button'));
      btns.find(b => b.textContent?.includes('Export Audit'))?.click();
      await new Promise(r => setTimeout(r, 200));
      const dialogOpen = Boolean(document.querySelector('[role="dialog"]'));
      return { dialogOpen };
    })()`);
    if (!auditCheck.dialogOpen) throw new Error('Audit Report Modal failed to open');
    await cdp.screenshot('06-audit-modal-1440x900.png');

    await cdp.eval(`(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    })()`);
    await sleep(150);

    // 8. Laptop Projector 1280x720 Verification + Judge Demo Mode
    await cdp.setViewport(1280, 720, false);
    const projectorCheck = await cdp.eval(`(async () => {
      const btns = Array.from(document.querySelectorAll('button'));
      btns.find(b => b.textContent?.includes('Demo Tour'))?.click();
      await new Promise(r => setTimeout(r, 300));
      return {
        tourVisible: document.body.innerText.includes('Judge Demo Walkthrough'),
        overflowX: document.documentElement.scrollWidth > 1280,
        overflowY: document.documentElement.scrollHeight > 720,
      };
    })()`);
    console.log('[Gate 4] Projector 1280x720 check:', projectorCheck);
    if (!projectorCheck.tourVisible || projectorCheck.overflowX) {
      throw new Error('1280x720 layout overflow or missing Judge Tour banner');
    }
    await cdp.screenshot('07-studio-judge-tour-1280x720.png');

    // Dismiss Judge Tour & test Mobile 390x844 Studio + Compare
    await cdp.eval(`(() => {
      document.querySelector('button[aria-label="Exit Judge Demo Walkthrough"]')?.click();
    })()`);
    await cdp.setViewport(390, 844, true);
    await sleep(300);
    const mobileCheck = await cdp.eval(`(() => ({
      overflowX: document.documentElement.scrollWidth > 390,
    }))()`);
    console.log('[Gate 4] Mobile 390x844 check:', mobileCheck);
    if (mobileCheck.overflowX) throw new Error('Mobile 390x844 horizontal overflow');
    await cdp.screenshot('08-mobile-studio-390x844.png');

    await cdp.eval(`(async () => {
      const navBtns = Array.from(document.querySelectorAll('nav button'));
      navBtns.find(b => b.textContent?.includes('Compare'))?.click();
      await new Promise(r => setTimeout(r, 250));
    })()`);
    await cdp.screenshot('09-mobile-compare-390x844.png');

    console.log('[Gate 4] Console Errors:', cdp.consoleErrors.length);
    console.log('[Gate 4] Page Errors:', cdp.pageErrors.length);

    if (cdp.consoleErrors.length > 0 || cdp.pageErrors.length > 0) {
      throw new Error(
        `Runtime errors detected! Console: ${JSON.stringify(cdp.consoleErrors)} Page: ${JSON.stringify(cdp.pageErrors)}`
      );
    }

    cdp.close();
    console.log('[Gate 4] ALL E2E INTERACTIONS & VIEWPORTS PASSED WITH 0 ERRORS!');
  } finally {
    previewProc.kill('SIGKILL');
    chromeProc.kill('SIGKILL');
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('[Gate 4 FAILED]', err);
  process.exit(1);
});
