# Space Habitat Studio — HABITAT // SW-4

**Multi-Agency Deep-Space & Orbital Habitat Layout CAD, Human-Factors Validator, and Simulated Annealing Optimizer**  
Built for **BMSIT StarForge 2026 (Problem Statement SW-4)** — responsive across **Phones, iPads/Tablets, and Desktops**.

## Live Web App
**[https://vineeth1938-dot.github.io/space-habitat-studio/](https://vineeth1938-dot.github.io/space-habitat-studio/)**

---

## Core Engineering Capabilities

### 1. Multi-Agency Compliance Engine (`NASA` · `ISRO` · `SpaceX` · `Unified`)
- **NASA-STD-3001 Vol. 2 Rev E & HRP**:
  - `22%` structural/avionics/ducting deduction from gross hull volume; enforces `25.0 m³/crew` Net Habitable Volume (`≥ 180` days) and Celentano duration scaling (`3–179` days) with small-crew non-linear floors.
  - Private Sleep Quarters check (`≥ 5.4 m³/crew` for missions `> 30` days).
  - 2D Acoustic Propagation (`0.5m` grid) with inverse-square decay, bulkhead transmission loss, and intervening module baffling (`NC-40 / 48 dBA` sleep limit; `NC-50 / 58 dBA` habitable limit).
  - Hygiene olfactory/microbial isolation from Galley & Sleep + dual separated hygiene bays (`Crew ≥ 4`, `≥ 30d`) + Medical triage proximity bonus.
  - `0.5m` Grid A* Emergency Egress pathfinding (`≥ 0.8m` anthropometric corridor clearance).
- **ISRO Gaganyaan & Bharatiya Antariksh Station (BAS)**:
  - Dedicated `Work / ECLSS` bay with `≥ 1.0m` unobstructed maintenance access aisle that never chokes primary crew translation.
  - Rapid Crew Escape / Docking Adapter access (`≤ 12.0m` or `≤ 18.0s` transit from Sleep & Work bays).
  - Microgravity Countermeasure Envelope (`≥ 3.5 m²` Exercise floor footprint).
- **SpaceX Starship HLS / Deep-Space Architecture**:
  - Passive Solar Particle Event (SPE) Storm-Shelter Mass Buffering (`≥ 50%` of Sleep perimeter shielded within `1.0m` by `Storage / Water` bays) + live **Simulate Solar Flare (X-Class)** stress mode.
  - Dual-Egress Redundancy (`Crew ≥ 6` or Multi-Deck hulls require `≥ 2` Airlocks or `2` interior-vertex-disjoint A* escape routes).
  - Volumetric floor packing efficiency & flood-fill trapped dead-pocket detection.

### 2. Ultra-Minimalist Swiss Aerospace CAD Across All Devices
- **2D Snap-to-Grid Blueprint (`0.5m`) & 2.5D Axonometric Wireframe**: Toggle live Acoustic Heatmaps, A* Egress Routes, SPE Water-Shielding Buffers, and multi-deck exploded wireframe inspection.
- **Adaptive Cross-Device UX**:
  - **Phones (`< 768px`)**: Edge-to-edge `100dvh` safe-area layout, thumb-reachable bottom navigation (`Blueprint`, `Build`, `Audit`, `Compare`), two-finger pinch-to-zoom, single-finger module drag, and touch `W± / H± / 90°` controls.
  - **iPads & Tablets (`768px – 1151px`)**: Full interactive canvas paired with persistent Compliance Telemetry and a slide-over Mission & Zone Palette drawer.
  - **Laptops & Desktops (`≥ 1152px`)**: Zero-scroll 3-column CAD cockpit with drag-and-drop placement and keyboard shortcuts (`Arrows` nudge `0.5m`, `R` rotate `90°`, `Del` remove, `Ctrl+Z` / `Ctrl+Y` undo/redo).
- **Bounded Simulated Annealing Auto-Optimizer**: Deterministic `≤ 220ms` solver (`max 1,500` iterations) with smooth animated module rearrangement.
- **Snapshot Archive & Side-by-Side Trade-Study Matrix**: Unlimited `localStorage`-persisted layout snapshots with directional green/red engineering metric deltas.

---

## Local Development

```bash
npm install
npm run dev        # Launch local dev server (http://localhost:5173)
npx vitest run     # Execute unit & full React DOM smoke test suites
npm run build      # Strict TypeScript check + production Vite bundle
```
