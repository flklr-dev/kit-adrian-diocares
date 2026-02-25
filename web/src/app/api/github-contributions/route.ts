import { NextResponse } from "next/server";

// Cache the response for 60 seconds on the server side
export const revalidate = 60;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    if (!year) {
        return NextResponse.json({ error: "Missing year parameter" }, { status: 400 });
    }

    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/flklr-dev?y=${year}`,
            { cache: "no-store" } // Force fresh fetch
        );

        if (!res.ok) {
            throw new Error(`Upstream API error: ${res.status}`);
        }

        const data = await res.json();

        return NextResponse.json(data, {
            headers: {
                // Prevent aggressive browser caching during debugging
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch contributions" },
            { status: 500 }
        );
    }
}
