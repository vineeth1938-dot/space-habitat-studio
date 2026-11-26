import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from '../../App';
import { HABITAT_PRESETS } from '../presets';
import { LIVE_SNAPSHOT_ID, useCadStore } from '../../store/useCadStore';
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
  it('renders all presets, standards, hulls, touch controls, Live-vs-Saved Compare, and zero-overlap repacking with 0 errors and 0 NaN', () => {
    const s = useCadStore.getState();
    s.resetWorkspace();

    // 1. Verify initial render
    const initialHtml = assertCleanMarkup('Initial Broken Novice');
    expect(initialHtml).toContain('HABITAT // SW-4');
    expect(initialHtml).toContain('AUTO-OPTIMIZE LAYOUT');

    // 2. Verify Compare Drawer defaults to Baseline A vs Live Workspace (not identical duplicate snapshots)
    useCadStore.getState().setCompareOpen(true);
    expect(useCadStore.getState().comparePair[1]).toBe(LIVE_SNAPSHOT_ID);
    const defaultCompareHtml = assertCleanMarkup('Default Compare Live vs Baseline');
    expect(defaultCompareHtml).toContain('Compare Habitat Layouts');
    expect(defaultCompareHtml).toContain('SIDE-BY-SIDE METRIC DELTA MATRIX');
    useCadStore.getState().setCompareOpen(false);

    // 3. Load each of the 4 presets and verify score updates + clean render
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

    // 4. Regression test: Switching 2-Deck SpaceX Starship -> 1-Deck Inflatable repacks with 0 overlaps!
    useCadStore.getState().loadPreset('spacex-mars-6crew');
    useCadStore.getState().setHullType('inflatable');
    expect(useCadStore.getState().evaluation.adjacency.overlappingPairs.length).toBe(0);
    expect(useCadStore.getState().evaluation.adjacency.outOfBoundsIds.length).toBe(0);

    // 5. Switch between all 4 Agency Standards on Broken Novice and verify dynamic recalculation
    useCadStore.getState().loadPreset('broken-novice');
    const stdScores = new Set<string>();
    for (const std of ['NASA', 'ISRO', 'SPACEX', 'UNIFIED'] as AgencyStandard[]) {
      useCadStore.getState().setStandard(std);
      assertCleanMarkup(`Standard ${std}`);
      const ev = useCadStore.getState().evaluation;
      stdScores.add(`${std}:${ev.scores.overall}:${ev.issues.length}`);
    }
    expect(stdScores.size).toBe(4);

    // 6. Move, nudge, resize, rotate, NaN guard, overlays, 3D Wireframe & Light/Dark theme
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
    assertCleanMarkup('Cleanroom Light Theme');

    // 7. Run Auto-Optimize on Broken Novice and verify score strictly jumps + 0 overlaps
    const beforeOpt = useCadStore.getState().evaluation.scores.overall;
    useCadStore.getState().runAutoOptimize();
    const afterOpt = useCadStore.getState().evaluation.scores.overall;
    expect(afterOpt).toBeGreaterThan(beforeOpt);
    expect(useCadStore.getState().evaluation.adjacency.overlappingPairs.length).toBe(0);
    const solvedHtml = assertCleanMarkup('Post Auto-Optimize');
    expect(solvedHtml).toContain('SOLVED:');

    // 8. Trigger Simulate Solar Flare & verify diagnostics update cleanly
    useCadStore.getState().toggleSolarFlare();
    expect(useCadStore.getState().mission.solarFlareSim).toBe(true);
    const flareHtml = assertCleanMarkup('Solar Flare Active');
    expect(flareHtml).toContain('SOLAR FLARE: ACTIVE');

    // 9. Save checkpoints (including Unicode, Emoji, RTL & Persian ZWNJ + >100 char overflow) & Load Checkpoint
    const unicodeName = `ایستگاه\u200Cفضایی 🚀 宇宙ステーション ${'A'.repeat(110)}`;
    useCadStore.getState().saveSnapshot(unicodeName);
    const saved = useCadStore.getState().snapshots.at(-1)!;
    expect(saved.name.length).toBeLessThanOrEqual(80);
    expect(saved.name.includes('\u200C')).toBe(true);

    useCadStore.getState().loadSnapshotIntoEditor(saved.id);
    assertCleanMarkup('After Restoring Checkpoint into Editor');

    // 10. Spam-adding 35 modules onto SpaceX 2-Deck NEVER stacks overlapping modules + Auto-Optimize stays 0 overlaps!
    useCadStore.getState().loadPreset('spacex-mars-6crew');
    for (let i = 0; i < 35; i++) {
      useCadStore.getState().addModule('hygiene');
    }
    expect(useCadStore.getState().evaluation.adjacency.overlappingPairs.length).toBe(0);
    useCadStore.getState().runAutoOptimize();
    expect(useCadStore.getState().evaluation.adjacency.overlappingPairs.length).toBe(0);
    assertCleanMarkup('Crowded Hull Zero-Overlap Packing');

    // 11. Responsive Phone Tabs & Empty State CTA
    useCadStore.getState().setTabletDrawerOpen(true);
    assertCleanMarkup('iPad Slide-Over Drawer Open');
    useCadStore.getState().setTabletDrawerOpen(false);

    useCadStore.getState().setMobilePanel('build');
    assertCleanMarkup('Phone Build Panel');
    useCadStore.getState().setMobilePanel('audit');
    assertCleanMarkup('Phone Audit Panel');

    useCadStore.getState().clearAllModules();
    const emptyHtml = assertCleanMarkup('Empty Floorplan CTA');
    expect(emptyHtml).toContain('Empty Habitat Floorplan');

    // 12. Test all 4 Hull Geometry switches + Undo/Redo
    for (const ht of ['cylinder', 'inflatable', 'dome', 'multideck'] as HullGeometryType[]) {
      useCadStore.getState().setHullType(ht);
      assertCleanMarkup(`Hull ${ht}`);
    }
    useCadStore.getState().undo();
    useCadStore.getState().redo();
    assertCleanMarkup('After Undo/Redo');
  });
});
