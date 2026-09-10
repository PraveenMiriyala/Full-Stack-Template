import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

export interface HeroBlockProps {
  badge?: string;
  heading: string;
  subheading?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function HeroComponent({
  badge,
  heading,
  subheading,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroBlockProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">
      <div className="container flex flex-col items-center text-center">
        {badge && (
          <Badge variant="secondary" className="mb-4 gap-1 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {badge}
          </Badge>
        )}

        <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {heading}
        </h1>

        {subheading && (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {subheading}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {primaryButtonText && primaryButtonLink && (
            <Button size="lg" asChild>
              <Link href={primaryButtonLink} className="gap-2">
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {secondaryButtonText && secondaryButtonLink && (
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
