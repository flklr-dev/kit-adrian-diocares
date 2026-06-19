"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import { cn } from "@/lib/utils";

const REVIEWS = [
  {
    src: "/reviews/review-1.png",
    alt: "Fiverr review from james_kenna2, Australia — 5 stars",
  },
  {
    src: "/reviews/review-2.png",
    alt: "Fiverr client review — 5 stars",
  },
  {
    src: "/reviews/review-3.png",
    alt: "Fiverr client review — 5 stars",
  },
  {
    src: "/reviews/review-4.png",
    alt: "Fiverr client review — 5 stars",
  },
];

const AUTO_PLAY_MS = 4000;

export function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + REVIEWS.length) % REVIEWS.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(goNext, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, isPaused]);

  return (
    <section className="mt-6">
      <Card
        className="border-4 border-border shadow-neo-lg bg-card gap-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <CardHeader className="pb-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-2xl font-black uppercase tracking-tighter">
              <MessageSquareQuote className="w-6 h-6 text-primary" />
              <h2>Client Reviews</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={goPrev}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                onClick={goNext}
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2 pb-4">
          <div className="overflow-hidden border-4 border-border bg-background shadow-neo-sm">
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {REVIEWS.map((review) => (
                <div key={review.src} className="w-full shrink-0 p-3 sm:p-4">
                  <Image
                    src={review.src}
                    alt={review.alt}
                    width={1200}
                    height={420}
                    className="w-full h-auto"
                    priority={review.src === REVIEWS[0].src}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            {REVIEWS.map((review, index) => (
              <button
                key={review.src}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === activeIndex}
                className={cn(
                  "h-3 w-3 border-2 border-border transition-all",
                  index === activeIndex
                    ? "bg-primary shadow-neo-sm translate-x-[-1px] translate-y-[-1px]"
                    : "bg-muted hover:bg-secondary"
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
