"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

type ViewTransitionDocument = Document & {
    startViewTransition: (callback: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const pointerRef = React.useRef<{ x: number; y: number } | null>(null);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handlePointerDown = (event: React.PointerEvent) => {
        pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleCheckedChange = (checked: boolean) => {
        const nextTheme = checked ? "dark" : "light";

        let x: number;
        let y: number;

        if (pointerRef.current) {
            ({ x, y } = pointerRef.current);
        } else if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        } else {
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
        }

        pointerRef.current = null;

        const doc = document as ViewTransitionDocument;
        const canAnimate =
            typeof doc.startViewTransition === "function" &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!canAnimate) {
            setTheme(nextTheme);
            return;
        }

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = doc.startViewTransition(() => {
            flushSync(() => {
                setTheme(nextTheme);
            });
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 650,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    if (!mounted) {
        return <Switch disabled className="cursor-pointer" />;
    }

    return (
        <div ref={containerRef} className="flex items-center space-x-2">
            <Switch
                checked={theme === "dark"}
                onCheckedChange={handleCheckedChange}
                onPointerDown={handlePointerDown}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input cursor-pointer"
                id="theme-toggle"
            />
            {theme === "dark" ? (
                <Moon className="h-4 w-4 text-muted-foreground" />
            ) : (
                <Sun className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
        </div>
    );
}
