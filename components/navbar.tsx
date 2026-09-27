"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, ArrowUpRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Playground", href: "#playground" },
  { label: "Resource", href: "#resource" },
];

export function Navbar() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const scrolledDown = currentY > lastY;
        const pastThreshold = currentY > 80;

        setHidden(scrolledDown && pastThreshold);

        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 py-4 transition-transform duration-300 ease-in-out sm:px-6 ${
        hidden ? "-translate-y-[calc(100%+1rem)]" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border border-border bg-card p-2 shadow-sm">
        {/* Logo */}
        <a
          href="/"
          aria-label="Home"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
        >
          <span className="text-lg font-bold italic">A</span>
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-foreground md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + contact pill */}
        <div className="flex shrink-0 items-center gap-2">
          <ModeToggle />
          <a
            href="mailto:AlsanaAlgo@gmail.com"
            className="group flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            AlsanaAlgo@gmail.com
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Navbar;