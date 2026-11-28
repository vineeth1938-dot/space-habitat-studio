# Space Habitat Studio — Design System (`Operate` Mode)

## Surface Intent
**Space Habitat Studio** is a task-driven CAD and NASA-STD-3001 human-factors engineering workspace (`Operate` mode). Clarity, scanability, spatial precision, and familiar CAD affordances lead; the visual system stays restrained so the 2D floorplan, 3D habitat viewport, and violation diagnostics carry visual weight.

## Color & Surface Tokens (OKLCH)
| Role | Token | Value | Purpose |
|---|---|---|---|
| Ground Canvas | `--surface-canvas` | `oklch(0.145 0.022 255)` | Root workspace backdrop behind SVG & WebGL viewports |
| Structural Panel | `--surface-panel` | `oklch(0.175 0.024 255)` | Top bar, rails, docked CAD toolbars |
| Elevated Control | `--surface-elevated` | `oklch(0.21 0.026 255)` | Inputs, filter pills, diagnostic items |
| Control Hover | `--surface-hover` | `oklch(0.25 0.028 255)` | Interactive hover fill |
| Hairline Border | `--border-subtle` | `oklch(0.275 0.024 255)` | Structural panel dividers & matrix cells |
| Active Border | `--border-strong` | `oklch(0.36 0.032 255)` | Hover/focused borders |
| Primary Ink | `--text-primary` | `oklch(0.96 0.008 250)` | Headings, values, active controls (>13:1 on panel) |
| Secondary Ink | `--text-secondary` | `oklch(0.81 0.018 252)` | Body copy, descriptions (>8:1 on panel) |
| Muted Ink | `--text-muted` | `oklch(0.69 0.02 252)` | Metadata, rule citations, axis units (≥5.4:1 on panel) |
| Telemetry Accent | `--accent-primary` | `oklch(0.76 0.14 212)` | Primary CTA, focus rings, selection, IMV airflow |
| Semantic Status | `--status-pass / warn / crit` | Emerald / Amber / Rose | Strict semantic PASS, WARNING, CRITICAL indicators only |

## Typography & Hierarchy
- **UI Sans (`Inter`, system sans)**: Tight fixed scale (`11px`, `12px`, `14px`, `22px` readout) with `text-wrap: balance` on headings and `text-wrap: pretty` on diagnostic copy.
- **Tabular Telemetry (`.font-mono-telemetry`)**: Strictly reserved for coordinates `(x, y)`, dimensions (`m`, `m³`), acoustics (`dBA`), lux (`lx`), radiation (`mSv`, `g/cm²`), latencies (`ms`), and NASA-STD-3001 codes with `font-variant-numeric: tabular-nums`.

## Structural Signature Move
- **6-Subsystem Compliance Matrix** in the Engineering Inspector (`Volume`, `Acoustics`, `Bio-Sep`, `Egress`, `Airflow`, `Shielding`): A hairline `2×3` interactive subsystem status strip pairing live engineering telemetry with one-click diagnostic category filtering.
- **Architectural Hairlines over Nested Cards**: Sidebars and telemetry headers use single hairline `border-b` and `divide-x` divisions rather than stacked rounded card boxes.
- **Unobstructed Docked Viewport Toolbars**: Both 2D CAD and 3D WebGL viewports keep controls docked cleanly above their canvases so dimension rulers and orbital geometry are never occluded.
