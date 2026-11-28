import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Compass, Eye, Footprints, Layers, Moon, Play, Siren, Sun, Video } from 'lucide-react';
import { EvaluationReport, LightingMode, MissionConfig, ZoneNode } from '../types/habitat';
import { ZONE_CATALOG } from '../data/zoneCatalog';
import { clampFinite, getHullBounds } from '../engine/hullMath';
import { useHabitatStore } from '../store/habitatStore';

interface Viewport3DProps {
  missionOverride?: MissionConfig;
  zonesOverride?: ZoneNode[];
  reportOverride?: EvaluationReport;
  readonly?: boolean;
}

export type CameraPreset = 'perspective' | 'top' | 'cutaway' | 'first_person';

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
  const lightingMode: LightingMode = readonly ? 'day' : store.lightingMode;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('perspective');
  const [webglError, setWebglError] = useState<string | null>(null);
  const [contextLost, setContextLost] = useState(false);
  const [walkingEgress, setWalkingEgress] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const dynamicGroupRef = useRef<THREE.Group | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const alertLightRef = useRef<THREE.PointLight | null>(null);

  const egressLinesRef = useRef<THREE.Line[]>([]);
  const pickableMeshesRef = useRef<THREE.Mesh[]>([]);
  const floorMeshesRef = useRef<THREE.Mesh[]>([]);
  const lightingModeRef = useRef<LightingMode>(lightingMode);
  const cameraPresetRef = useRef<CameraPreset>(cameraPreset);
  const walkProgressRef = useRef<{ active: boolean; pts: THREE.Vector3[]; t: number }>({
    active: false,
    pts: [],
    t: 0,
  });
  const pressedKeysRef = useRef<Set<string>>(new Set());

  lightingModeRef.current = lightingMode;
  cameraPresetRef.current = cameraPreset;

  const getCrewEyeY = () => {
    const { deckHeight } = getHullBounds(mission.hull);
    const activeDeck = readonly ? 0 : store.activeDeck;
    const base = activeDeck * deckHeight;
    const localEye = mission.gravity === '0g' ? 1.18 : 1.7;
    return base + Math.min(localEye, deckHeight - 0.25);
  };

  // Initialize Three.js renderer once & guarantee zero WebGL/event leaks on unmount
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
      setWebglError(err instanceof Error ? err.message : 'WebGL context unavailable');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth || 400, container.clientHeight || 300);
    renderer.setClearColor(0x080c14, 1);
    renderer.domElement.style.touchAction = readonly ? 'pan-y' : 'none';
    container.appendChild(renderer.domElement);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => {
      setContextLost(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      46,
      (container.clientWidth || 400) / Math.max(1, container.clientHeight || 300),
      0.08,
      200
    );
    camera.position.set(11, 10, 13);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 42;
    controls.minDistance = 0.25;
    controlsRef.current = controls;

    // Scene Lighting Rig
    const ambient = new THREE.AmbientLight(0xcbd5e1, 0.78);
    scene.add(ambient);
    ambientLightRef.current = ambient;

    const dirLight = new THREE.DirectionalLight(0xe0f2fe, 1.18);
    dirLight.position.set(14, 22, 12);
    scene.add(dirLight);
    keyLightRef.current = dirLight;

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    rimLight.position.set(-14, 6, -12);
    scene.add(rimLight);
    rimLightRef.current = rimLight;

    const alertLight = new THREE.PointLight(0xf43f5e, 0, 26);
    alertLight.position.set(0, 2.2, 0);
    scene.add(alertLight);
    alertLightRef.current = alertLight;

    const dynamicGroup = new THREE.Group();
    scene.add(dynamicGroup);
    dynamicGroupRef.current = dynamicGroup;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDownPos = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e: PointerEvent) => {
      if (readonly) return;
      const moved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moved > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      if (cameraPresetRef.current === 'first_person') {
        const floorHits = raycaster.intersectObjects(floorMeshesRef.current, false);
        if (floorHits.length > 0) {
          const hitPt = floorHits[0].point;
          const forward = new THREE.Vector3()
            .subVectors(controls.target, camera.position)
            .setY(0)
            .normalize();
          if (forward.lengthSq() < 0.01) forward.set(1, 0, 0);
          const eyeY = camera.position.y;
          camera.position.set(hitPt.x, eyeY, hitPt.z);
          controls.target.set(hitPt.x + forward.x * 0.8, eyeY, hitPt.z + forward.z * 0.8);
          controls.update();
          return;
        }
      }

      const hits = raycaster.intersectObjects(pickableMeshesRef.current, false);
      if (hits.length > 0) {
        const zoneId = hits[0].object.userData.zoneId as string | undefined;
        if (zoneId) useHabitatStore.getState().selectZone(zoneId);
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    const onKeyDown = (e: KeyboardEvent) => {
      if (cameraPresetRef.current !== 'first_person' || readonly) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        pressedKeysRef.current.add(k);
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      pressedKeysRef.current.delete(e.key.toLowerCase());
    };
    const onWindowBlur = () => {
      pressedKeysRef.current.clear();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onWindowBlur);

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

    let lastFrameTime = performance.now();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
      lastFrameTime = now;

      if (cameraPresetRef.current === 'first_person' && pressedKeysRef.current.size > 0) {
        const state = useHabitatStore.getState();
        const { width, depth, wall } = getHullBounds(state.mission.hull);
        const halfW = Math.max(0.5, width / 2 - wall - 0.25);
        const halfD = Math.max(0.5, depth / 2 - wall - 0.25);
        const speed = 3.2 * dt;

        const forward = new THREE.Vector3()
          .subVectors(controls.target, camera.position)
          .setY(0)
          .normalize();
        if (forward.lengthSq() < 0.01) forward.set(1, 0, 0);
        const right = new THREE.Vector3(-forward.z, 0, forward.x);

        const delta = new THREE.Vector3();
        const keys = pressedKeysRef.current;
        if (keys.has('w') || keys.has('arrowup')) delta.addScaledVector(forward, speed);
        if (keys.has('s') || keys.has('arrowdown')) delta.addScaledVector(forward, -speed);
        if (keys.has('d') || keys.has('arrowright')) delta.addScaledVector(right, speed);
        if (keys.has('a') || keys.has('arrowleft')) delta.addScaledVector(right, -speed);

        if (delta.lengthSq() > 0) {
          const nx = clampFinite(camera.position.x + delta.x, -halfW, halfW);
          const nz = clampFinite(camera.position.z + delta.z, -halfD, halfD);
          camera.position.x = nx;
          camera.position.z = nz;
          controls.target.set(nx + forward.x * 0.8, camera.position.y, nz + forward.z * 0.8);
        }
      }

      const walk = walkProgressRef.current;
      if (walk.active && walk.pts.length >= 2) {
        walk.t += dt * 0.35;
        if (walk.t >= 1) {
          walk.active = false;
          setWalkingEgress(false);
        } else {
          const scaled = walk.t * (walk.pts.length - 1);
          const idx = Math.min(walk.pts.length - 2, Math.floor(scaled));
          const frac = scaled - idx;
          const curPt = new THREE.Vector3().lerpVectors(walk.pts[idx], walk.pts[idx + 1], frac);
          const lookIdx = Math.min(walk.pts.length - 1, idx + 2);
          const lookPt = walk.pts[lookIdx];
          camera.position.copy(curPt);
          controls.target.lerp(lookPt, 0.25);
        }
      }

      controls.update();

      const t = now * 0.0025;
      for (const line of egressLinesRef.current) {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.65 + 0.35 * Math.sin(t * 2.2);
      }

      if (alertLightRef.current) {
        alertLightRef.current.intensity =
          lightingModeRef.current === 'emergency' ? 1.6 + 1.1 * Math.sin(t * 3.8) : 0;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onWindowBlur);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      controls.dispose();

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

  // Update lighting rig for Circadian / Emergency lighting modes
  useEffect(() => {
    const ambient = ambientLightRef.current;
    const key = keyLightRef.current;
    const rim = rimLightRef.current;
    const scene = sceneRef.current;
    if (!ambient || !key || !rim || !scene) return;

    if (lightingMode === 'sleep') {
      ambient.color.setHex(0x334155);
      ambient.intensity = 0.42;
      key.color.setHex(0xfbbf24);
      key.intensity = 0.55;
      rim.color.setHex(0x1d4ed8);
      rim.intensity = 0.25;
      scene.fog = new THREE.FogExp2(0x070a12, 0.018);
    } else if (lightingMode === 'emergency') {
      ambient.color.setHex(0x7f1d1d);
      ambient.intensity = 0.58;
      key.color.setHex(0xfda4af);
      key.intensity = 0.65;
      rim.color.setHex(0xf43f5e);
      rim.intensity = 0.85;
      scene.fog = new THREE.FogExp2(0x16070b, 0.02);
    } else {
      ambient.color.setHex(0xcbd5e1);
      ambient.intensity = 0.78;
      key.color.setHex(0xe0f2fe);
      key.intensity = 1.18;
      rim.color.setHex(0x38bdf8);
      rim.intensity = 0.45;
      scene.fog = null;
    }
  }, [lightingMode]);

  // Apply camera presets & clear stuck movement keys on exit
  useEffect(() => {
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;
    walkProgressRef.current.active = false;
    setWalkingEgress(false);
    if (cameraPreset !== 'first_person') {
      pressedKeysRef.current.clear();
    }

    const { width, depth, wall, deckHeight } = getHullBounds(mission.hull);
    const totalH = mission.hull.decks * deckHeight;
    const span = Math.max(width, depth);

    if (cameraPreset === 'first_person') {
      cam.fov = 64;
      cam.updateProjectionMatrix();
      const eyeY = getCrewEyeY();
      const startX = -width / 2 + wall + 0.9;
      cam.position.set(startX, eyeY, 0);
      ctrl.target.set(startX + 1.2, eyeY, 0);
      ctrl.maxDistance = 6;
    } else {
      cam.fov = 45;
      cam.updateProjectionMatrix();
      ctrl.maxDistance = 42;
      ctrl.target.set(0, totalH * 0.4, 0);
      if (cameraPreset === 'top') {
        cam.position.set(0, span * 1.45, 0.01);
      } else if (cameraPreset === 'cutaway') {
        cam.position.set(0, span * 0.65, span * 0.92);
      } else {
        cam.position.set(span * 0.72, span * 0.68, span * 0.85);
      }
    }
    ctrl.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cameraPreset,
    mission.hull.diameter,
    mission.hull.length,
    mission.hull.decks,
    mission.hull.type,
    mission.gravity,
    store.activeDeck,
  ]);

  // Focus camera target on highlighted module when Inspector diagnostic is clicked
  useEffect(() => {
    if (readonly || store.focusPulseTick === 0 || store.highlightedZoneIds.length === 0) return;
    const ctrl = controlsRef.current;
    if (!ctrl || cameraPreset === 'first_person') return;
    const z = zones.find((item) => item.id === store.highlightedZoneIds[0]);
    if (!z) return;
    const { width: hullW, depth: hullD, deckHeight } = getHullBounds(mission.hull);
    ctrl.target.set(
      z.x + z.width / 2 - hullW / 2,
      z.deck * deckHeight + z.zHeight * 0.5,
      z.y + z.height / 2 - hullD / 2
    );
    ctrl.update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.focusPulseTick]);

  const startEgressWalkthrough = () => {
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;
    setCameraPreset('first_person');
    const { width: hullW, depth: hullD } = getHullBounds(mission.hull);
    const cx = hullW / 2;
    const cz = hullD / 2;
    const eyeY = getCrewEyeY();

    const activeDeck = store.activeDeck;
    const candidate =
      report.egress.airlockPaths.find(
        (p) => p.deck === activeDeck && p.reachable && p.points.length >= 3
      ) ?? report.egress.airlockPaths.find((p) => p.reachable && p.points.length >= 3);

    if (candidate && candidate.points.length >= 2) {
      const vecs = candidate.points.map((pt) => new THREE.Vector3(pt.x - cx, eyeY, pt.y - cz));
      walkProgressRef.current = { active: true, pts: vecs, t: 0 };
      setWalkingEgress(true);
    } else {
      const vecs = [
        new THREE.Vector3(-cx + 1.0, eyeY, 0),
        new THREE.Vector3(0, eyeY, 0),
        new THREE.Vector3(cx - 1.2, eyeY, 0),
      ];
      walkProgressRef.current = { active: true, pts: vecs, t: 0 };
      setWalkingEgress(true);
    }
  };

  // Rebuild dynamic 3D habitat geometry
  useEffect(() => {
    const group = dynamicGroupRef.current;
    if (!group) return;

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
    floorMeshesRef.current = [];

    const { hull } = mission;
    const { width: hullW, depth: hullD, deckHeight } = getHullBounds(hull);
    const cx = hullW / 2;
    const cz = hullD / 2;
    const totalHeight = hull.decks * deckHeight;

    const isCut = cameraPreset === 'cutaway' || cameraPreset === 'first_person';
    const hullOpacity =
      cameraPreset === 'cutaway' ? 0.07 : cameraPreset === 'first_person' ? 0.12 : 0.16;
    const hullColor =
      lightingMode === 'emergency'
        ? 0xf43f5e
        : hull.type === 'inflatable'
          ? 0xa855f7
          : 0x38bdf8;

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
        opacity: 0.2,
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      wire.position.set(0, 0.3, 0);
      group.add(wire);
    } else {
      const radius = Math.max(hull.diameter / 2, totalHeight / 2 + 0.3);
      const cylGeo = new THREE.CylinderGeometry(radius, radius, hull.length, 32, 1, isCut);
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

      const ribCount = Math.max(4, Math.floor(hull.length / 2.2));
      for (let i = 0; i <= ribCount; i++) {
        const rx = -hull.length / 2 + (i / ribCount) * hull.length;
        const ringGeo = new THREE.TorusGeometry(radius, 0.032, 8, 40);
        ringGeo.rotateY(Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({
          color: hullColor,
          transparent: true,
          opacity: 0.3,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(rx, totalHeight / 2, 0);
        group.add(ring);
      }
    }

    const showOrientation = readonly ? true : store.showOrientationCues;
    for (let d = 0; d < hull.decks; d++) {
      const yDeck = d * deckHeight;
      const floorSpanX = hullW - hull.wallThickness * 2;
      const floorSpanZ = hullD - hull.wallThickness * 2;
      const floorGeo =
        hull.type === 'surface_dome'
          ? new THREE.CylinderGeometry(
              hull.diameter / 2 - hull.wallThickness,
              hull.diameter / 2 - hull.wallThickness,
              0.08,
              36
            )
          : new THREE.BoxGeometry(floorSpanX, 0.08, floorSpanZ);
      const floorMat = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.85,
        metalness: 0.2,
      });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.position.set(0, yDeck - 0.04, 0);
      group.add(floor);
      floorMeshesRef.current.push(floor);

      const gridHelper = new THREE.GridHelper(
        Math.max(hullW, hullD),
        Math.max(hullW, hullD),
        0x1e293b,
        0x1e293b
      );
      gridHelper.position.set(0, yDeck + 0.005, 0);
      (gridHelper.material as THREE.Material).transparent = true;
      (gridHelper.material as THREE.Material).opacity = 0.32;
      group.add(gridHelper);

      if (showOrientation) {
        const nadirGeo = new THREE.BoxGeometry(floorSpanX * 0.92, 0.015, 0.28);
        const nadirMat = new THREE.MeshBasicMaterial({
          color: lightingMode === 'emergency' ? 0xf43f5e : 0x0284c7,
          transparent: true,
          opacity: 0.55,
        });
        const nadirStripe = new THREE.Mesh(nadirGeo, nadirMat);
        nadirStripe.position.set(0, yDeck + 0.012, 0);
        group.add(nadirStripe);

        const zenithColor =
          lightingMode === 'sleep'
            ? 0xf59e0b
            : lightingMode === 'emergency'
              ? 0xf43f5e
              : 0xe0f2fe;
        const zenithGeo = new THREE.BoxGeometry(floorSpanX * 0.88, 0.03, 0.12);
        const zenithMat = new THREE.MeshBasicMaterial({
          color: zenithColor,
          transparent: true,
          opacity: 0.75,
        });
        const zenithRail = new THREE.Mesh(zenithGeo, zenithMat);
        zenithRail.position.set(0, yDeck + deckHeight - 0.08, 0);
        group.add(zenithRail);
      }
    }

    const sevMap = new Map<string, 'CRITICAL' | 'WARNING'>();
    for (const v of report.violations) {
      if (v.severity === 'PASS') continue;
      for (const id of v.affectedZoneIds) {
        if (!sevMap.has(id) || v.severity === 'CRITICAL') sevMap.set(id, v.severity);
      }
    }
    const waterSet = new Set(report.waterWall?.contributingZoneIds ?? []);

    for (const z of zones) {
      const cat = ZONE_CATALOG[z.type] ?? ZONE_CATALOG.stowage;
      const yBase = z.deck * deckHeight;
      const boxH = Math.min(z.zHeight, deckHeight - 0.16);
      const isSelected = !readonly && store.selectedZoneId === z.id;
      const isHighlighted = !readonly && store.highlightedZoneIds.includes(z.id);
      const sev = sevMap.get(z.id);

      const geo = new THREE.BoxGeometry(z.width, boxH, z.height);
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(cat.color),
        transparent: true,
        opacity:
          cameraPreset === 'first_person'
            ? 0.52
            : isSelected
              ? 0.66
              : z.type === 'storm_shelter'
                ? 0.48
                : 0.38,
        roughness: 0.3,
        metalness: 0.1,
        emissive: isSelected
          ? new THREE.Color(0x22d3ee)
          : isHighlighted
            ? new THREE.Color(0xfacc15)
            : sev === 'CRITICAL'
              ? new THREE.Color(0xf43f5e)
              : new THREE.Color(0x000000),
        emissiveIntensity: isSelected || isHighlighted ? 0.36 : sev === 'CRITICAL' ? 0.22 : 0,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(z.x + z.width / 2 - cx, yBase + boxH / 2, z.y + z.height / 2 - cz);
      mesh.userData.zoneId = z.id;
      group.add(mesh);
      pickableMeshesRef.current.push(mesh);

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
        opacity: isSelected ? 1 : 0.82,
      });
      const edgeLines = new THREE.LineSegments(edges, edgeMat);
      edgeLines.position.copy(mesh.position);
      group.add(edgeLines);

      if (showOrientation) {
        const isMisaligned0g = mission.gravity === '0g' && z.rotation !== 0;
        const bandW = z.rotation === 90 || z.rotation === 270 ? 0.12 : z.width * 0.82;
        const bandD = z.rotation === 90 || z.rotation === 270 ? z.height * 0.82 : 0.12;
        const bandGeo = new THREE.BoxGeometry(bandW, 0.06, bandD);
        const bandMat = new THREE.MeshBasicMaterial({
          color: isMisaligned0g ? 0xf59e0b : 0x38bdf8,
          transparent: true,
          opacity: 0.85,
        });
        const band = new THREE.Mesh(bandGeo, bandMat);
        const offsetX =
          z.rotation === 90 ? z.width / 2 - 0.1 : z.rotation === 270 ? -z.width / 2 + 0.1 : 0;
        const offsetZ =
          z.rotation === 0 ? -z.height / 2 + 0.1 : z.rotation === 180 ? z.height / 2 - 0.1 : 0;
        band.position.set(
          mesh.position.x + offsetX,
          yBase + boxH + 0.02,
          mesh.position.z + offsetZ
        );
        group.add(band);
      }

      if (z.type === 'storm_shelter' || waterSet.has(z.id)) {
        const auraGeo = new THREE.BoxGeometry(z.width + 0.14, boxH + 0.1, z.height + 0.14);
        const auraMat = new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: z.type === 'storm_shelter' ? 0.18 : 0.1,
          wireframe: true,
        });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        aura.position.copy(mesh.position);
        group.add(aura);
      }

      if (z.type === 'crew_quarters' || z.type === 'galley') {
        const bodyGeo = new THREE.CapsuleGeometry(0.15, 1.08, 4, 8);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.4,
        });
        const crewMesh = new THREE.Mesh(bodyGeo, bodyMat);
        crewMesh.position.set(z.x + z.width / 2 - cx, yBase + 0.85, z.y + z.height / 2 - cz);
        group.add(crewMesh);
      }
    }

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

    if (!readonly && store.showAirflowOverlay) {
      for (const af of report.airflowLinks ?? []) {
        if (af.points.length < 2) continue;
        const yPos = af.deck * deckHeight + deckHeight - 0.22;
        const vecs = af.points.map((pt) => new THREE.Vector3(pt.x - cx, yPos, pt.y - cz));
        const lineGeo = new THREE.BufferGeometry().setFromPoints(vecs);
        const lineMat = new THREE.LineBasicMaterial({
          color: af.stagnantRisk ? 0xf43f5e : 0x22d3ee,
          transparent: true,
          opacity: 0.75,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
        egressLinesRef.current.push(line);
      }
    }
  }, [
    mission,
    zones,
    report,
    cameraPreset,
    lightingMode,
    readonly,
    store.selectedZoneId,
    store.highlightedZoneIds,
    store.showEgressOverlay,
    store.showAirflowOverlay,
    store.showOrientationCues,
  ]);

  if (webglError) {
    return (
      <div className="w-full h-full bg-[var(--surface-canvas)] flex flex-col items-center justify-center p-6 text-center">
        <Video className="w-7 h-7 text-[var(--text-muted)] mb-2" />
        <div className="text-xs font-semibold text-[var(--text-primary)]">
          3D WebGL Viewport Unavailable
        </div>
        <div className="text-[11px] text-[var(--text-muted)] mt-1">{webglError}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[var(--surface-canvas)] flex flex-col overflow-hidden select-none">
      {/* Docked 3D Camera & Circadian Lighting Strip (Never obscures hull) */}
      <div className="min-h-8 shrink-0 bg-[var(--surface-panel)] border-b border-[var(--border-subtle)] px-2.5 py-1 flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono-telemetry uppercase tracking-wider text-sky-300 font-semibold">
            3D WebGL • {mission.hull.decks}D
          </span>

          {!readonly && (
            <>
              <div
                role="group"
                aria-label="3D Lighting Mode"
                className="flex items-center bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded p-0.5 gap-0.5"
              >
                {(
                  [
                    { id: 'day', label: 'Day', icon: <Sun className="w-3 h-3" /> },
                    { id: 'sleep', label: 'Sleep', icon: <Moon className="w-3 h-3" /> },
                    { id: 'emergency', label: 'Alert', icon: <Siren className="w-3 h-3" /> },
                  ] as const
                ).map((lm) => (
                  <button
                    key={lm.id}
                    type="button"
                    aria-pressed={lightingMode === lm.id}
                    onClick={() => store.setLightingMode(lm.id)}
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                      lightingMode === lm.id
                        ? lm.id === 'emergency'
                          ? 'bg-rose-500/25 text-rose-200'
                          : lm.id === 'sleep'
                            ? 'bg-amber-500/25 text-amber-200'
                            : 'bg-cyan-500/20 text-cyan-200'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    title={`Lighting Mode: ${lm.label}`}
                  >
                    {lm.icon}
                    <span>{lm.label}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-pressed={store.showOrientationCues}
                onClick={store.toggleOrientationCues}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  store.showOrientationCues
                    ? 'bg-sky-500/15 text-sky-200 border-sky-500/40'
                    : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]'
                }`}
                title="Toggle ISS/Skylab Nadir/Zenith Orientation Cues"
              >
                <Compass className="w-3 h-3" />
                <span className="hidden sm:inline">0g Ref</span>
              </button>
            </>
          )}
        </div>

        <div
          role="group"
          aria-label="3D Camera Preset"
          className="flex items-center bg-[var(--surface-canvas)] border border-[var(--border-subtle)] rounded p-0.5 gap-0.5"
        >
          {(
            [
              { id: 'perspective', label: 'Orbit', icon: <Video className="w-3 h-3" /> },
              { id: 'top', label: 'Top', icon: <Layers className="w-3 h-3" /> },
              { id: 'cutaway', label: 'Cutaway', icon: <Eye className="w-3 h-3" /> },
              { id: 'first_person', label: 'Crew Eye', icon: <Footprints className="w-3 h-3" /> },
            ] as const
          ).map((btn) => (
            <button
              key={btn.id}
              type="button"
              aria-pressed={cameraPreset === btn.id}
              onClick={() => setCameraPreset(btn.id)}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                cameraPreset === btn.id
                  ? 'bg-sky-500/25 text-sky-200'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div className="relative flex-1 min-h-0 w-full">
        <div ref={containerRef} className="w-full h-full" />

        {contextLost && (
          <div className="absolute inset-0 z-20 bg-[var(--surface-canvas)]/90 flex items-center justify-center text-xs text-amber-300 font-mono-telemetry">
            WebGL Context Paused — Restoring GPU Surface…
          </div>
        )}
      </div>

      {/* First-Person Astronaut HUD Dock */}
      {cameraPreset === 'first_person' && !readonly && (
        <div className="shrink-0 bg-[var(--surface-panel)] border-t border-sky-500/40 px-3 py-1 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[var(--text-secondary)]">
          <span className="font-mono-telemetry">
            ASTRONAUT EYE ({mission.gravity === '0g' ? '1.18m 0g Float' : '1.70m Standing'}) • WASD
            or Click Floor to Translate
          </span>
          <button
            type="button"
            onClick={startEgressWalkthrough}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 font-medium cursor-pointer"
          >
            <Play className="w-2.5 h-2.5" />
            {walkingEgress ? 'Walking A* Path…' : 'Walk A* Egress'}
          </button>
        </div>
      )}
    </div>
  );
};
