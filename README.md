# Space Habitat Studio

Interactive NASA-STD-3001 Space Habitat Interior Layout CAD, A* Egress Pathfinder, Constraint-Guided Auto-Optimizer, and Live NOAA GOES Solar-Flare Stress Test Studio.

## Live Demo
**[https://vineeth1938-dot.github.io/space-habitat-studio/](https://vineeth1938-dot.github.io/space-habitat-studio/)**

## Key Features
- **Synchronized 2D SVG CAD & 3D WebGL Viewports**: `0.25m` grid snap, drag-and-drop placement, resizing, rotation, multi-deck floors, and camera presets (`Perspective`, `Top-Down`, `Cutaway`).
- **Real-Time NASA-STD-3001 & HRP Rule Engine**: Evaluates Net Habitable Volume (NHV) per crew member, acoustic attenuation (`dBA`), hygiene-to-galley contamination zones (`≥ 3.0m`), and overall Readiness Score.
- **0.25m Grid A* Egress & Corridor Clearances**: Live obstacle routing from every occupied module to the airlock and storm shelter with `< 1.0m` pinch-point detection.
- **Constraint-Guided Auto-Optimize**: Simulated Annealing + corridor-aware heuristic placement solver with instant Revert comparison.
- **Trade-Study Compare Mode**: Split-screen snapshot comparison with delta metrics.
- **NOAA GOES Solar-Flare Stress Test**: Live and simulated (`B-Class`, `M5`, `X10`) X-ray and `≥10 MeV` proton flux telemetry with storm-shelter survivability verdicts.

## Local Development
```bash
npm install
npm run dev        # Start local dev server
npx vitest run     # Run unit & workflow tests
npm run build      # Typecheck & production bundle
```
