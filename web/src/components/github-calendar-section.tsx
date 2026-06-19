"use client";

import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github } from "lucide-react";
import { useEffect, useState, cloneElement, useRef, useCallback } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ActivityCalendar } from "react-activity-calendar";

interface Contribution {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

const YEARS = [2025, 2026];
const USERNAME = "flklr-dev";
const WEEKS_IN_YEAR = 53;
const BLOCK_MARGIN = 5;
const WEEKDAY_LABEL_WIDTH = 36;
const HORIZONTAL_BUFFER = 40;

function getBlockSize(containerWidth: number) {
    const available = containerWidth - WEEKDAY_LABEL_WIDTH - HORIZONTAL_BUFFER;
    const size = Math.floor((available - WEEKS_IN_YEAR * BLOCK_MARGIN) / WEEKS_IN_YEAR);
    return Math.min(Math.max(size, 13), 20);
}

// Generate a loading placeholder for the skeleton state
function generateLoadingData(year: number): Contribution[] {
    const data: Contribution[] = [];
    const start = new Date(`${year}-01-01`);
    const end = year === new Date().getFullYear()
        ? new Date()
        : new Date(`${year}-12-31`);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        data.push({
            date: d.toISOString().split("T")[0],
            count: 0,
            level: 0,
        });
    }
    return data;
}

export function GithubCalendarSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [selectedYear, setSelectedYear] = useState<number>(2025);
    const [blockSize, setBlockSize] = useState(16);
    const containerRef = useRef<HTMLDivElement>(null);
    // Cache data for all years: Record<year, Contribution[]>
    const [cache, setCache] = useState<Record<number, Contribution[]>>({});
    const [loadingYears, setLoadingYears] = useState<Set<number>>(new Set(YEARS));

    const themeStr: "light" | "dark" = mounted && resolvedTheme === "dark" ? "dark" : "light";

    const updateBlockSize = useCallback(() => {
        if (!containerRef.current) return;
        setBlockSize(getBlockSize(containerRef.current.clientWidth));
    }, []);

    useEffect(() => {
        setMounted(true);

        // Prefetch all years simultaneously on mount
        const fetchAll = YEARS.map((year) =>
            fetch(`/api/github-contributions?year=${year}`)
                .then((r) => r.json())
                .then((data) => {
                    setCache((prev) => ({ ...prev, [year]: data.contributions }));
                    setLoadingYears((prev) => {
                        const next = new Set(prev);
                        next.delete(year);
                        return next;
                    });
                })
                .catch(() => {
                    setLoadingYears((prev) => {
                        const next = new Set(prev);
                        next.delete(year);
                        return next;
                    });
                })
        );

        Promise.all(fetchAll);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        updateBlockSize();

        const observer = new ResizeObserver(updateBlockSize);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [mounted, updateBlockSize]);

    const isLoading = loadingYears.has(selectedYear);
    const data = cache[selectedYear] ?? generateLoadingData(selectedYear);

    return (
        <section className="mt-8 mb-4">
            <Card className="border-4 border-border shadow-neo-lg bg-card w-full overflow-hidden">
                <CardHeader className="pb-0 mb-0 space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter">
                            <Github className="w-6 h-6 text-primary" />
                            <h2>@{USERNAME} on github</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            {YEARS.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`px-6 py-2 text-sm font-black uppercase border-4 border-border transition-all ${selectedYear === y
                                        ? "bg-primary text-primary-foreground shadow-neo-sm translate-x-[-3px] translate-y-[-3px]"
                                        : "bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground"
                                        }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 w-full pb-6">
                    <div
                        ref={containerRef}
                        className="w-full overflow-x-auto flex justify-center"
                    >
                        {mounted && (
                            <div className="inline-block">
                                <ActivityCalendar
                                    data={data}
                                    loading={isLoading}
                                    colorScheme={themeStr}
                                    theme={{
                                        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                                        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                                    }}
                                    blockSize={blockSize}
                                    blockMargin={BLOCK_MARGIN}
                                    fontSize={Math.max(15, blockSize + 1)}
                                    labels={{
                                        totalCount: `{{count}} contributions in ${selectedYear}`,
                                    }}
                                    className="mx-auto"
                                    renderBlock={(block, activity) =>
                                        cloneElement(block, {
                                            "data-tooltip-id": "github-tooltip",
                                            "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                                        })
                                    }
                                />
                                <Tooltip id="github-tooltip" />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
