"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Switch disabled />;
    }

    return (
        <div className="flex items-center space-x-2">
            <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
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
