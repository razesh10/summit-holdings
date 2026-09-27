import { Mountain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Summit Holdings — hero section
 *
 * Design notes:
 * - Palette, radii and shadows come straight from the project's globals.css
 *   tokens (bg-background, text-foreground, bg-primary, border-border, etc.),
 *   so it inherits your light/dark themes automatically.
 * - The visual is a deliberate alternative to a stock market chart: a jagged
 *   Himalayan skyline dissolving into a node network, converging on a single
 *   glowing "Summit" point. The six nodes are the sectors named in the brief.
 * - The only motion is one page-load reveal (staggered fade-up on the copy,
 *   a single draw-in on the connector lines, a slow pulse on the Summit
 *   node) — everything respects prefers-reduced-motion.
 */
export function Hero() {
  const sectors = [
    { label: "Kathmandu", x: 92, y: 268 },
    { label: "Energy", x: 196, y: 146 },
    { label: "Hospitality", x: 320, y: 104 },
    { label: "Technology", x: 444, y: 146 },
    { label: "Agriculture", x: 548, y: 268 },
    { label: "Infrastructure", x: 588, y: 392 },
  ];
  const center = { x: 320, y: 460 };

  return (
    <section className="relative overflow-hidden bg-background">
      <style>{`
        @keyframes summit-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes summit-draw {
          from { stroke-dashoffset: 480; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes summit-pulse {
          0%, 100% { opacity: 0.55; filter: drop-shadow(0 0 4px var(--primary)); }
          50% { opacity: 1; filter: drop-shadow(0 0 18px var(--primary)); }
        }
        .summit-reveal { animation: summit-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .summit-connector {
          stroke-dasharray: 480;
          animation: summit-draw 1.1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .summit-node-core { animation: summit-pulse 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .summit-reveal, .summit-connector, .summit-node-core {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-12 lg:py-32">
        {/* Left: copy */}
        <div className="max-w-xl">
          <div
            className="summit-reveal inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground"
            style={{ animationDelay: "0ms" }}
          >
            <Mountain className="h-3.5 w-3.5 text-primary" strokeWidth={2.25} />
            Summit Holdings Pvt. Ltd.
          </div>

          <h1
            className="summit-reveal mt-7 font-serif text-4xl leading-[1.12] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: "90ms" }}
          >
            We invest in what Nepal can become.
          </h1>

          <div
            className="summit-reveal mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-[1.05rem]"
            style={{ animationDelay: "180ms" }}
          >
            <p>
              Summit Holdings is a Nepal-based investment company focused on
              identifying promising businesses, backing ambitious people, and
              building long-term value across sectors that matter.
            </p>
            <p>
              We bring together capital, strategic thinking and active
              ownership to turn opportunities into enduring businesses.
            </p>
          </div>

          <div
            className="summit-reveal mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "270ms" }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Explore Our Approach
            </Button>
            <a
              href="#partner"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Partner With Summit
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Right: map / network visual */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-6 shadow-lg sm:p-10"
            style={{
              background:
                "radial-gradient(120% 100% at 50% 0%, oklch(0.32 0.03 265) 0%, oklch(0.19 0.025 264) 60%, oklch(0.14 0.02 264) 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[62%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
              style={{ background: "var(--primary)" }}
            />

            <svg
              viewBox="0 0 640 560"
              className="relative w-full"
              role="img"
              aria-label="Illustrative map showing Summit Holdings connected across Kathmandu, energy, hospitality, technology, agriculture and infrastructure"
            >
              {/* faint Himalayan skyline */}
              <polyline
                points="0,150 60,120 110,160 170,90 230,140 290,70 350,130 410,80 470,150 540,110 600,155 640,130"
                fill="none"
                stroke="oklch(0.55 0.02 260)"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity="0.4"
              />

              {/* connectors */}
              {sectors.map((s, i) => (
                <line
                  key={s.label}
                  x1={s.x}
                  y1={s.y}
                  x2={center.x}
                  y2={center.y}
                  stroke="oklch(0.72 0.09 40)"
                  strokeWidth="1.25"
                  opacity="0.55"
                  className="summit-connector"
                  style={{ animationDelay: `${300 + i * 110}ms` }}
                />
              ))}

              {/* sector nodes */}
              {sectors.map((s, i) => (
                <g key={s.label}>
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r="6"
                    fill="oklch(0.19 0.025 264)"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  />
                  <text
                    x={s.x}
                    y={s.y - 16}
                    textAnchor="middle"
                    fontSize="13"
                    fill="oklch(0.86 0.01 260)"
                  >
                    {s.label}
                  </text>
                </g>
              ))}

              {/* Summit node */}
              <circle
                cx={center.x}
                cy={center.y}
                r="26"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1"
                opacity="0.35"
              />
              <circle
                cx={center.x}
                cy={center.y}
                r="13"
                fill="var(--primary)"
                className="summit-node-core"
              />
              <text
                x={center.x}
                y={center.y + 46}
                textAnchor="middle"
                fontSize="20"
                fontWeight="600"
                letterSpacing="0.08em"
                fill="oklch(0.97 0 0)"
              >
                SUMMIT
              </text>
              <text
                x={center.x}
                y={center.y + 68}
                textAnchor="middle"
                fontSize="12"
                fill="oklch(0.66 0.01 260)"
              >
                Capital • People • Possibility
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;