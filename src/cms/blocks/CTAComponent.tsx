import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface CTABlockProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
}

export function CTAComponent({
  title,
  description,
  buttonText,
  buttonLink,
}: CTABlockProps) {
  return (
    <section className="container py-12">
      <Card className="flex flex-col items-center border-primary/20 bg-muted/50 p-8 text-center md:p-12">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mb-6 max-w-xl text-muted-foreground">{description}</p>
        )}
        <Button size="lg" asChild>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </Card>
    </section>
  );
}
