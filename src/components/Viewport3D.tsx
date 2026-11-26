import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Eye, Layers, Video } from 'lucide-react';
import { EvaluationReport, MissionConfig, ZoneNode } from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import { getHullBounds } from '../engine/hullMath';
import { useHabitatStore } from '../store/habitatStore';

interface Viewport3DProps {
  missionOverride?: MissionConfig;
  zonesOverride?: ZoneNode[];
  reportOverride?: EvaluationReport;
  readonly?: boolean;
}

type CameraPreset = 'perspective' | 'top' | 'cutaway';

export const Viewport3D: React.FC<Viewport3DProps> = ({
  missionOverride,
  zonesOverride,
  reportOverride,
  readonly = false,
}) => {
  const store = useHabitatStore();
  const mission = missionOverride ?? store.mission;
  const zones = zonesOverride ?? store.zones;
  const report = reportOverride ?? store.report;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');
  const [webglError, setWebglError] = useState<string | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const egressLinesRef = useRef<THREE.Line[]>([]);
  const pickableMeshesRef = useRef<THREE.Mesh[]>([]);

  // Initialize Three.js renderer once & guarantee zero WebGL context leaks on unmount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
      });
    } catch (err) {
      setWebglError(err instanceof Error ? err.message : 'WebGL unavailable');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth || 400, container.clientHeight || 300);
    renderer.setClearColor(0x090d16, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      44,
      (container.clientWidth || 400) / Math.max(1, container.clientHeight || 300),
      0.1,
      200
    );
    camera.position.set(11, 10, 13);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 42;
    controls.minDistance = 4;
    controlsRef.current = controls;

    // Lighting
    const ambient = new THREE.AmbientLight(0xcbd5e1, 0.75);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xe0f2fe, 1.15);
    dirLight.position.set(14, 22, 12);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    rimLight.position.set(-14, 6, -12);
    scene.add(rimLight);

    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    // Click raycasting to select zone
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (readonly) return;
      const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moved > 5) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableMeshesRef.current, false);
      if (hits.length > 0) {
        const zoneId = hits[0].object.userData.zoneId as string | undefined;
        if (zoneId) store.selectZone(zoneId);
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();
      // Subtle animated dash/pulse on egress lines
      const t = performance.now() * 0.0025;
      for (const line of egressLinesRef.current) {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.65 + 0.35 * Math.sin(t * 2.2);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      controls.dispose();

      // Dispose all geometries & materials
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) {
          (obj as THREE.Mesh).geometry.dispose();
        }
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });

      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply camera presets smoothly
  useEffect(() => {
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;
    const { width, depth, deckHeight } = getHullBounds(mission.hull);
    const totalH = mission.hull.decks * deckHeight;
    const span = Math.max(width, depth);

    ctrl.target.set(0, totalH * 0.4, 0);
    if (cameraPreset === 'top') {
      cam.position.set(0, span * 1.45, 0.01);
    } else if (cameraPreset === 'cutaway') {
      cam.position.set(0, span * 0.65, span * 0.92);
    } else {
      cam.position.set(span * 0.72, span * 0.68, span * 0.85);
    }
    ctrl.update();
  }, [cameraPreset, mission.hull.diameter, mission.hull.length, mission.hull.decks, mission.hull.type]);

  // Rebuild dynamic 3D habitat geometry when mission, zones, report, selection, or cutaway changes
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

    // Clear previous meshes cleanly
    while (group.children.length > 0) {
      const child = group.children[0];
      group.remove(child);
      child.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
    }
    egressLinesRef.current = [];
    pickableMeshesRef.current = [];

    const { hull } = mission;
    const { width: hullW, depth: hullD, deckHeight } = getHullBounds(hull);
    const cx = hullW / 2;
    const cz = hullD / 2;
    const totalHeight = hull.decks * deckHeight;

    // 1. Outer Translucent Pressure Hull Shell (hidden top half in Cutaway)
    const hullOpacity = cameraPreset === 'cutaway' ? 0.07 : 0.16;
    const hullColor = hull.type === 'inflatable' ? 0xa855f7 : 0x38bdf8;

    if (hull.type === 'surface_dome') {
      const domeGeo = new THREE.SphereGeometry(
        hull.diameter / 2,
        36,
        20,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2
      );
      const domeMat = new THREE.MeshPhysicalMaterial({
        color: hullColor,
        transparent: true,
        opacity: hullOpacity,
        roughness: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const domeMesh = new THREE.Mesh(domeGeo, domeMat);
      domeMesh.position.set(0, 0.3, 0);
      group.add(domeMesh);

      const wireGeo = new THREE.WireframeGeometry(domeGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: hullColor,
        transparent: true,
        opacity: 0.22,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      wire.position.set(0, 0.3, 0);
      group.add(wire);
    } else {
      const radius = Math.max(hull.diameter / 2, totalHeight / 2 + 0.3);
      const cylGeo = new THREE.CylinderGeometry(
        radius,
        radius,
        hull.length,
        32,
        1,
        cameraPreset === 'cutaway'
      );
      cylGeo.rotateZ(Math.PI / 2);
      const cylMat = new THREE.MeshPhysicalMaterial({
        color: hullColor,
        transparent: true,
        opacity: hullOpacity,
        roughness: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const cylMesh = new THREE.Mesh(cylGeo, cylMat);
      cylMesh.position.set(0, totalHeight / 2, 0);
      group.add(cylMesh);

      // Structural hull ribs along X
      const ribCount = Math.max(4, Math.floor(hull.length / 2.2));
      for (let i = 0; i <= ribCount; i++) {
        const rx = -hull.length / 2 + (i / ribCount) * hull.length;
        const ringGeo = new THREE.TorusGeometry(radius, 0.035, 8, 40);
        ringGeo.rotateY(Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
          color: hullColor,
          transparent: true,
          opacity: 0.32,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(rx, totalHeight / 2, 0);
        group.add(ring);
      }
    }

    // 2. Interior Deck Floor Plates
    for (let d = 0; d < hull.decks; d++) {
      const yDeck = d * deckHeight;
      const floorGeo =
        hull.type === 'surface_dome'
          ? new THREE.CylinderGeometry(hull.diameter / 2 - hull.wallThickness, hull.diameter / 2 - hull.wallThickness, 0.08, 36)
          : new THREE.BoxGeometry(hullW - hull.wallThickness * 2, 0.08, hullD - hull.wallThickness * 2);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.85,
        metalness: 0.2,
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, yDeck - 0.04, 0);
      group.add(floor);

      const gridHelper = new THREE.GridHelper(
        Math.max(hullW, hullD),
        Math.max(hullW, hullD),
        0x1e293b,
        0x1e293b
      );
      gridHelper.position.set(0, yDeck + 0.005, 0);
      (gridHelper.material as THREE.Material).transparent = true;
      (gridHelper.material as THREE.Material).opacity = 0.35;
      group.add(gridHelper);
    }

    // Build severity map for glowing red/amber hazard outlines
    const sevMap = new Map<string, 'CRITICAL' | 'WARNING'>();
    for (const v of report.violations) {
      if (v.severity === 'PASS') continue;
      for (const id of v.affectedZoneIds) {
        if (!sevMap.has(id) || v.severity === 'CRITICAL') sevMap.set(id, v.severity);
      }
    }

    // 3. Extruded Habitat Zone Volumes + Crew Scale Figures
    for (const z of zones) {
      const cat = ZONE_CATALOG[z.type];
      const yBase = z.deck * deckHeight;
      const boxH = Math.min(z.zHeight, deckHeight - 0.15);
      const isSelected = !readonly && store.selectedZoneId === z.id;
      const isHighlighted = !readonly && store.highlightedZoneIds.includes(z.id);
      const sev = sevMap.get(z.id);

      const geo = new THREE.BoxGeometry(z.width, boxH, z.height);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(cat.color),
        transparent: true,
        opacity: isSelected ? 0.65 : z.type === 'storm_shelter' ? 0.48 : 0.38,
        roughness: 0.3,
        metalness: 0.1,
        emissive: isSelected
          ? new THREE.Color(0x22d3ee)
          : isHighlighted
            ? new THREE.Color(0xfacc15)
            : sev === 'CRITICAL'
              ? new THREE.Color(0xf43f5e)
              : new THREE.Color(0x000000),
        emissiveIntensity: isSelected || isHighlighted ? 0.35 : sev === 'CRITICAL' ? 0.22 : 0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(z.x + z.width / 2 - cx, yBase + boxH / 2, z.y + z.height / 2 - cz);
      mesh.userData.zoneId = z.id;
      group.add(mesh);
      pickableMeshesRef.current.push(mesh);

      // Crisp wireframe outline
      const edges = new THREE.EdgesGeometry(geo);
      const edgeColor = isSelected
        ? 0x22d3ee
        : sev === 'CRITICAL'
          ? 0xf43f5e
          : sev === 'WARNING'
            ? 0xf59e0b
            : new THREE.Color(cat.accentColor).getHex();
      const edgeMat = new THREE.LineBasicMaterial({
        color: edgeColor,
        transparent: true,
        opacity: isSelected ? 1 : 0.8,
      });
      const edgeLines = new THREE.LineSegments(edges, edgeMat);
      edgeLines.position.copy(mesh.position);
      group.add(edgeLines);

      // Storm shelter water-wall shielding aura
      if (z.type === 'storm_shelter') {
        const auraGeo = new THREE.BoxGeometry(z.width + 0.16, boxH + 0.12, z.height + 0.16);
        const auraMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.16,
          wireframe: true,
        });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        aura.position.copy(mesh.position);
        group.add(aura);
      }

      // Crew-height (1.75m) human scale reference inside Crew Quarters & Galley
      if (z.type === 'crew_quarters' || z.type === 'galley') {
        const bodyGeo = new THREE.CapsuleGeometry(0.16, 1.1, 4, 8);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.4,
        });
        const crewMesh = new THREE.Mesh(bodyGeo, bodyMat);
        crewMesh.position.set(z.x + z.width / 2 - cx, yBase + 0.85, z.y + z.height / 2 - cz);
        group.add(crewMesh);
      }
    }

    // 4. Animated 3D A* Egress Path Ribbons
    if (store.showEgressOverlay || readonly) {
      const addPathRibbon = (
        points: Array<{ x: number; y: number }>,
        deck: number,
        colorHex: number,
        yOffset: number
      ) => {
        if (points.length < 2) return;
        const yPos = deck * deckHeight + yOffset;
        const vecs = points.map((pt) => new THREE.Vector3(pt.x - cx, yPos, pt.y - cz));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(vecs);
        const lineMat = new THREE.LineBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: 0.9,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        egressLinesRef.current.push(line);
      };

      for (const p of report.egress.airlockPaths) {
        if (p.reachable) addPathRibbon(p.points, p.deck, 0x10b981, 0.18);
      }
      for (const p of report.egress.shelterPaths) {
        if (p.reachable) addPathRibbon(p.points, p.deck, 0x38bdf8, 0.11);
      }
    }
  }, [
    mission,
    zones,
    report,
    cameraPreset,
    readonly,
    store.selectedZoneId,
    store.highlightedZoneIds,
    store.showEgressOverlay,
  ]);

  if (webglError) {
    return (
      <div className="w-full h-full bg-[#090D16] flex flex-col items-center justify-center p-6 text-center">
        <Video className="w-8 h-8 text-slate-500 mb-2" />
        <div className="text-xs font-semibold text-slate-300">3D WebGL Viewport Unavailable</div>
        <div className="text-[11px] text-slate-500 mt-1">{webglError}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#090D16] overflow-hidden select-none">
      {/* Floating Camera Controls */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
        <span className="px-2 py-1 rounded bg-[#111827]/90 border border-slate-700/80 text-[10px] font-mono-telemetry uppercase tracking-wider text-sky-300 shadow">
          3D WEBGL • {mission.hull.decks} DECK{mission.hull.decks > 1 ? 'S' : ''} • ORBIT / CLICK
        </span>

        <div className="flex items-center bg-[#111827]/90 border border-slate-700/80 rounded p-0.5 gap-0.5 pointer-events-auto shadow">
          {(
            [
              { id: 'perspective', label: 'Perspective', icon: <Video className="w-3 h-3" /> },
              { id: 'top', label: 'Top-Down', icon: <Layers className="w-3 h-3" /> },
              { id: 'cutaway', label: 'Cutaway', icon: <Eye className="w-3 h-3" /> },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              onClick={() => setCameraPreset(btn.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                cameraPreset === btn.id
                  ? 'bg-sky-500/25 text-sky-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Three.js Mount Target */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};
