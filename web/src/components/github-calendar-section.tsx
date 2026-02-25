"use client";

import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github } from "lucide-react";
import { useEffect, useState, cloneElement } from "react";
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
    // Cache data for all years: Record<year, Contribution[]>
    const [cache, setCache] = useState<Record<number, Contribution[]>>({});
    const [loadingYears, setLoadingYears] = useState<Set<number>>(new Set(YEARS));

    const themeStr: "light" | "dark" = mounted && resolvedTheme === "dark" ? "dark" : "light";

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

    const isLoading = loadingYears.has(selectedYear);
    const data = cache[selectedYear] ?? generateLoadingData(selectedYear);

    return (
        <section className="mt-8 mb-4">
            <Card className="border shadow-none bg-background hover:shadow-md transition-shadow duration-300 w-full overflow-hidden">
                <CardHeader className="pb-0 mb-0 space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <Github className="w-5 h-5 text-muted-foreground" />
                            <h2>@{USERNAME} on github</h2>
                        </div>
                        <div className="flex items-center gap-1">
                            {YEARS.map((y) => (
                                <button
                                    key={y}
                                    onClick={() => setSelectedYear(y)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${selectedYear === y
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-muted-foreground"
                                        }`}
                                >
                                    {y}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-4 flex justify-center w-full pb-6">
                    <div className="w-full max-w-full overflow-x-auto flex justify-center pb-2">
                        {mounted && (
                            <>
                                <ActivityCalendar
                                    data={data}
                                    loading={isLoading}
                                    colorScheme={themeStr}
                                    theme={{
                                        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                                        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                                    }}
                                    blockSize={12}
                                    blockMargin={4}
                                    fontSize={14}
                                    labels={{
                                        totalCount: `{{count}} contributions in ${selectedYear}`,
                                    }}
                                    renderBlock={(block, activity) =>
                                        cloneElement(block, {
                                            "data-tooltip-id": "github-tooltip",
                                            "data-tooltip-content": `${activity.count} contributions on ${activity.date}`,
                                        })
                                    }
                                />
                                <Tooltip id="github-tooltip" />
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
