import {
  EvaluationReport,
  LayoutSnapshot,
  MissionConfig,
  SpaceWeatherTelemetry,
  StormStressResult,
  ZoneNode,
} from '../types/habitat';

export interface AuditExportPayload {
  schemaVersion: 'NASA-STD-3001-SHS-CARBON4-1.0';
  generatedAtUtc: string;
  mission: MissionConfig;
  readinessSummary: {
    score: number;
    criticalViolations: number;
    warnings: number;
    passedChecks: number;
    nhvPerCrewM3: number;
    requiredNhvPerCrewM3: number;
    grossVolumeM3: number;
    estimatedMassKg: number;
    estimatedLaunchCostUsdM: number;
    worstEgressDistanceM: number;
    worstEgressTransitSec: number;
    waterWallBonusGcm2: number;
    minCorridorIlluminanceLux: number;
  };
  solarStormVerification: {
    telemetrySource: string;
    eventLabel: string;
    xrayClass: string;
    protonFluxPfu: number;
    verdict: StormStressResult['verdict'];
    shieldingArealDensityGcm2: number;
    waterWallBonusGcm2: number;
    unshieldedDoseMsv: number;
    shieldedDoseMsv: number;
    doseReductionFromWaterWallMsv: number;
    acuteLimitMsv: number;
  };
  zones: ZoneNode[];
  diagnostics: EvaluationReport['violations'];
  snapshotsIncluded: Array<{
    name: string;
    score: number;
    nhvPerCrewM3: number;
    estimatedMassKg: number;
  }>;
}

export function buildAuditJsonPayload(
  mission: MissionConfig,
  zones: ZoneNode[],
  report: EvaluationReport,
  weather: SpaceWeatherTelemetry,
  stormStress: StormStressResult,
  snapshots: LayoutSnapshot[]
): AuditExportPayload {
  return {
    schemaVersion: 'NASA-STD-3001-SHS-CARBON4-1.0',
    generatedAtUtc: new Date().toISOString(),
    mission,
    readinessSummary: {
      score: report.score,
      criticalViolations: report.criticalCount,
      warnings: report.warningCount,
      passedChecks: report.passCount,
      nhvPerCrewM3: report.nhvPerCrewM3,
      requiredNhvPerCrewM3: report.requiredNhvPerCrewM3,
      grossVolumeM3: report.grossVolumeM3,
      estimatedMassKg: report.estimatedMassKg,
      estimatedLaunchCostUsdM: report.estimatedLaunchCostM,
      worstEgressDistanceM: report.egress.worstCaseDistanceM,
      worstEgressTransitSec: report.egress.worstCaseTimeSec,
      waterWallBonusGcm2: report.waterWall.shieldingBonusGcm2,
      minCorridorIlluminanceLux: report.illuminance.minCorridorLux,
    },
    solarStormVerification: {
      telemetrySource: weather.source,
      eventLabel: weather.label,
      xrayClass: weather.xrayClass,
      protonFluxPfu: weather.protonFluxPfu,
      verdict: stormStress.verdict,
      shieldingArealDensityGcm2: stormStress.shieldingArealDensityGcm2,
      waterWallBonusGcm2: stormStress.waterWallBonusGcm2,
      unshieldedDoseMsv: stormStress.unshieldedDoseMsv,
      shieldedDoseMsv: stormStress.shieldedDoseMsv,
      doseReductionFromWaterWallMsv: stormStress.doseReductionFromWaterWallMsv,
      acuteLimitMsv: stormStress.acuteLimitMsv,
    },
    zones,
    diagnostics: report.violations,
    snapshotsIncluded: snapshots.map((s) => ({
      name: s.name,
      score: s.report.score,
      nhvPerCrewM3: s.report.nhvPerCrewM3,
      estimatedMassKg: s.report.estimatedMassKg,
    })),
  };
}

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildPrintableAuditHtml(payload: AuditExportPayload): string {
  const { mission, readinessSummary: rs, solarStormVerification: sp, zones, diagnostics } = payload;

  const diagRows = diagnostics
    .map(
      (d) => `
      <tr>
        <td><span class="sev sev-${d.severity.toLowerCase()}">${escapeHtml(d.severity)}</span></td>
        <td class="mono">${escapeHtml(d.ruleCode)}</td>
        <td><strong>${escapeHtml(d.title)}</strong><div class="sub">${escapeHtml(d.detail)}</div></td>
        <td class="mono">${escapeHtml(d.metric)}</td>
      </tr>`
    )
    .join('');

  const zoneRows = zones
    .map(
      (z) => `
      <tr>
        <td>${escapeHtml(z.label)}</td>
        <td class="mono">Deck ${z.deck + 1}</td>
        <td class="mono">(${z.x.toFixed(2)}, ${z.y.toFixed(2)}) m</td>
        <td class="mono">${z.width.toFixed(2)} × ${z.height.toFixed(2)} × ${z.zHeight.toFixed(1)} m</td>
        <td class="mono">${z.rotation}°</td>
        <td class="mono">${(z.width * z.height * z.zHeight).toFixed(1)} m³</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>NASA-STD-3001 Habitat Verification Report — ${escapeHtml(mission.name)}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 28px; line-height: 1.45; }
    h1 { font-size: 20px; margin: 0 0 4px; letter-spacing: 0.02em; }
    h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 2px solid #0f172a; padding-bottom: 4px; margin-top: 22px; }
    .meta { font-size: 12px; color: #475569; font-family: ui-monospace, monospace; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
    .card { border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 12px; background: #f8fafc; }
    .card .k { font-size: 10px; text-transform: uppercase; color: #64748b; }
    .card .v { font-size: 17px; font-weight: 700; font-family: ui-monospace, monospace; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 7px 9px; text-align: left; vertical-align: top; }
    th { background: #f1f5f9; font-size: 11px; text-transform: uppercase; color: #334155; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums; }
    .sub { color: #475569; font-size: 11px; margin-top: 2px; }
    .sev { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; font-family: ui-monospace, monospace; }
    .sev-critical { background: #fee2e2; color: #991b1b; }
    .sev-warning { background: #fef3c7; color: #92400e; }
    .sev-pass { background: #dcfce7; color: #166534; }
    @media print { body { margin: 12mm; } }
  </style>
</head>
<body>
  <h1>SPACE HABITAT STUDIO — NASA-STD-3001 ENGINEERING VERIFICATION REPORT</h1>
  <div class="meta">
    Mission: ${escapeHtml(mission.name)} | Crew: ${mission.crewSize} | Duration: ${mission.durationDays}d | Gravity: ${escapeHtml(mission.gravity)} | Hull: ${escapeHtml(mission.hull.type)} (${mission.hull.diameter}m × ${mission.hull.length}m, ${mission.hull.decks}D) | Generated: ${escapeHtml(payload.generatedAtUtc)}
  </div>

  <div class="grid">
    <div class="card"><div class="k">Readiness Score</div><div class="v">${rs.score} / 100</div></div>
    <div class="card"><div class="k">NHV / Crewmember</div><div class="v">${rs.nhvPerCrewM3} / ${rs.requiredNhvPerCrewM3} m³</div></div>
    <div class="card"><div class="k">Pressurized Mass &amp; Cost</div><div class="v">${(rs.estimatedMassKg / 1000).toFixed(1)} t ($${rs.estimatedLaunchCostUsdM}M)</div></div>
    <div class="card"><div class="k">SPE Storm Verdict</div><div class="v">${escapeHtml(sp.verdict)} (${sp.shieldedDoseMsv} mSv)</div></div>
  </div>

  <h2>1. Solar Particle Event &amp; Water-Wall Shielding Summary</h2>
  <table>
    <thead>
      <tr>
        <th>Telemetry Profile</th>
        <th>X-Ray / Proton Flux</th>
        <th>Total Areal Shielding</th>
        <th>Water-Wall Bonus</th>
        <th>Shielded vs Limit Dose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${escapeHtml(sp.eventLabel)}</td>
        <td class="mono">${escapeHtml(sp.xrayClass)} / ${sp.protonFluxPfu.toLocaleString()} pfu</td>
        <td class="mono">${sp.shieldingArealDensityGcm2} g/cm²</td>
        <td class="mono">+${sp.waterWallBonusGcm2} g/cm² (−${sp.doseReductionFromWaterWallMsv} mSv)</td>
        <td class="mono">${sp.shieldedDoseMsv} mSv / ${sp.acuteLimitMsv} mSv</td>
      </tr>
    </tbody>
  </table>

  <h2>2. NASA-STD-3001 Rule Diagnostics (${rs.criticalViolations} Critical, ${rs.warnings} Warning, ${rs.passedChecks} Pass)</h2>
  <table>
    <thead>
      <tr><th>Status</th><th>Standard Ref</th><th>Engineering Finding</th><th>Measured Metric</th></tr>
    </thead>
    <tbody>${diagRows}</tbody>
  </table>

  <h2>3. Pressurized Module Manifest (${zones.length} Placed Modules)</h2>
  <table>
    <thead>
      <tr><th>Module</th><th>Deck</th><th>Origin (X, Y)</th><th>Envelope (W×D×H)</th><th>Orient</th><th>Volume</th></tr>
    </thead>
    <tbody>${zoneRows || '<tr><td colspan="6">No modules placed.</td></tr>'}</tbody>
  </table>
</body>
</html>`;
}

function triggerBlobDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadAuditJson(payload: AuditExportPayload) {
  const slug = payload.mission.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  triggerBlobDownload(
    `${slug}-nasa-std-3001-audit.json`,
    JSON.stringify(payload, null, 2),
    'application/json'
  );
}

export function downloadAuditHtml(payload: AuditExportPayload) {
  const slug = payload.mission.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  triggerBlobDownload(
    `${slug}-nasa-std-3001-audit.html`,
    buildPrintableAuditHtml(payload),
    'text/html;charset=utf-8'
  );
}

export function printAuditSheet(payload: AuditExportPayload) {
  const html = buildPrintableAuditHtml(payload);
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow?.document;
  if (doc) {
    doc.open();
    doc.write(html);
    doc.close();
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1500);
    }, 150);
  }
}
