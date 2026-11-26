import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../../App';
import { HABITAT_PRESETS } from '../presets';
import { useCadStore } from '../../store/useCadStore';
import { AgencyStandard, HullGeometryType } from '../../types/habitat';

function assertCleanMarkup(label: string) {
  const html = renderToStaticMarkup(<App />);
  expect(html.length, `${label}: empty HTML`).toBeGreaterThan(500);
  expect(html.includes('NaN'), `${label}: found NaN in rendered DOM`).toBe(false);
  expect(html.includes('Infinity'), `${label}: found Infinity in rendered DOM`).toBe(false);
  expect(html.includes('undefined'), `${label}: found literal undefined in rendered DOM`).toBe(
    false
  );
  return html;
}

describe('Phase 4 — Full React UI Render, Responsive Modes & Hardening Suite', () => {
  it('renders all 4 presets, 4 agency standards, 4 hull types, overlays, 2.5D wireframe, Auto-Optimize, Solar Flare, and Compare Drawer with 0 errors and 0 NaN', () => {
    const s = useCadStore.getState();
    s.resetWorkspace();

    // 1. Verify initial render (Broken Novice Layout)
    const initialHtml = assertCleanMarkup('Initial Broken Novice');
    expect(initialHtml).toContain('HABITAT // SW-4');
    expect(initialHtml).toContain('AUTO-OPTIMIZE LAYOUT');

    // 2. Load each of the 4 presets and verify score updates + clean render
    const presetScores: Record<string, number> = {};
    for (const preset of HABITAT_PRESETS) {
      useCadStore.getState().loadPreset(preset.id);
      assertCleanMarkup(`Preset ${preset.id}`);
      presetScores[preset.id] = useCadStore.getState().evaluation.scores.overall;
    }

    expect(presetScores['broken-novice']).toBeLessThan(60);
    expect(presetScores['isro-bas-3crew']).toBeGreaterThanOrEqual(85);
    expect(presetScores['nasa-lunar-4crew']).toBeGreaterThanOrEqual(85);
    expect(presetScores['spacex-mars-6crew']).toBeGreaterThanOrEqual(85);

    // 3. Switch between all 4 Agency Standards on Broken Novice and verify dynamic recalculation
    useCadStore.getState().loadPreset('broken-novice');
    const stdScores = new Set<string>();
    for (const std of ['NASA', 'ISRO', 'SPACEX', 'UNIFIED'] as AgencyStandard[]) {
      useCadStore.getState().setStandard(std);
      assertCleanMarkup(`Standard ${std}`);
      const ev = useCadStore.getState().evaluation;
      stdScores.add(`${std}:${ev.scores.overall}:${ev.issues.length}`);
    }
    expect(stdScores.size).toBe(4);

    // 4. Move, nudge, resize, rotate, NaN guard, overlays, 2.5D Iso & Light/Dark theme
    const firstId = useCadStore.getState().modules[0].id;
    useCadStore.getState().selectModule(firstId);
    useCadStore.getState().nudgeSelected(0.5, 0.5);
    useCadStore.getState().moveModule(firstId, Number.NaN, Number.POSITIVE_INFINITY, false);
    useCadStore.getState().resizeModule(firstId, Number.NaN, -10, false);
    useCadStore.getState().rotateModule(firstId);
    useCadStore.getState().resizeModule(firstId, 3.0, 2.0, true);
    useCadStore.getState().toggleOverlay('acoustics');
    assertCleanMarkup('2D with Acoustics + Egress + Radiation overlays');

    useCadStore.getState().setViewMode('iso');
    const isoHtml = assertCleanMarkup('2.5D Isometric Wireframe View');
    expect(isoHtml).toContain('AXONOMETRIC WIREFRAME');

    useCadStore.getState().setViewMode('2d');
    useCadStore.getState().toggleTheme();
    assertCleanMarkup('Swiss Off-White Light Blueprint Theme');

    // 5. Run Auto-Optimize on Broken Novice and verify score strictly jumps
    const beforeOpt = useCadStore.getState().evaluation.scores.overall;
    useCadStore.getState().runAutoOptimize();
    const afterOpt = useCadStore.getState().evaluation.scores.overall;
    expect(afterOpt).toBeGreaterThan(beforeOpt);
    const solvedHtml = assertCleanMarkup('Post Auto-Optimize');
    expect(solvedHtml).toContain('SOLVED:');

    // 6. Trigger Simulate Solar Flare & verify diagnostics update cleanly
    useCadStore.getState().toggleSolarFlare();
    expect(useCadStore.getState().mission.solarFlareSim).toBe(true);
    const flareHtml = assertCleanMarkup('Solar Flare Active');
    expect(flareHtml).toContain('SOLAR FLARE: ACTIVE');

    // 7. Save snapshots (including Unicode, Emoji, RTL & Persian ZWNJ + >100 char overflow) & Compare Drawer
    const unicodeName = `ایستگاه\u200Cفضایی 🚀 宇宙ステーション ${'A'.repeat(110)}`;
    useCadStore.getState().saveSnapshot(unicodeName);
    const saved = useCadStore.getState().snapshots.at(-1)!;
    expect(saved.name.length).toBeLessThanOrEqual(80);
    expect(saved.name.includes('\u200C')).toBe(true);

    useCadStore.getState().addModule('storage');
    useCadStore.getState().saveSnapshot('StarForge Candidate Beta');
    useCadStore.getState().setCompareOpen(true);
    const compareHtml = assertCleanMarkup('Save & Compare Drawer Open');
    expect(compareHtml).toContain('SIDE-BY-SIDE METRIC DELTA MATRIX');
    useCadStore.getState().setCompareOpen(false);

    // 8. Responsive Phone Tabs (canvas -> build -> audit -> issue tap jumps back to canvas) & iPad Drawer
    useCadStore.getState().setTabletDrawerOpen(true);
    const drawerHtml = assertCleanMarkup('iPad Slide-Over Drawer Open');
    expect(drawerHtml).toContain('Mission &amp; Zone Palette');
    useCadStore.getState().setTabletDrawerOpen(false);

    useCadStore.getState().setMobilePanel('build');
    assertCleanMarkup('Phone Build Panel');
    useCadStore.getState().setMobilePanel('audit');
    assertCleanMarkup('Phone Audit Panel');
    useCadStore.getState().highlightModules([firstId]);
    expect(useCadStore.getState().mobilePanel).toBe('canvas');

    // 9. Spam-adding 40 modules enforces MAX_MODULES_PER_DECK cap cleanly + Empty State recovery
    for (let i = 0; i < 40; i++) {
      useCadStore.getState().addModule('hygiene');
    }
    expect(useCadStore.getState().modules.length).toBeLessThanOrEqual(32);
    assertCleanMarkup('Max Deck Saturation Cap');

    useCadStore.getState().clearAllModules();
    const emptyHtml = assertCleanMarkup('Empty Floorplan CTA');
    expect(emptyHtml).toContain('Empty Habitat Floorplan');

    // 10. Test all 4 Hull Geometry switches + Undo/Redo
    useCadStore.getState().loadPreset('spacex-mars-6crew');
    for (const ht of ['cylinder', 'inflatable', 'dome', 'multideck'] as HullGeometryType[]) {
      useCadStore.getState().setHullType(ht);
      assertCleanMarkup(`Hull ${ht}`);
    }
    useCadStore.getState().undo();
    useCadStore.getState().redo();
    assertCleanMarkup('After Undo/Redo');
  });
});
