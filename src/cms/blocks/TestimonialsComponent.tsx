import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
}

export interface TestimonialsBlockProps {
  heading?: string;
  items?: TestimonialItem[];
}

export function TestimonialsComponent({
  heading = "What People Say",
  items = [],
}: TestimonialsBlockProps) {
  if (!items.length) return null;

  return (
    <section className="container py-12">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
        {heading}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <Card key={idx} className="flex flex-col justify-between p-6">
            <Quote className="mb-3 h-8 w-8 text-primary/40" />
            <p className="mb-4 text-sm italic text-muted-foreground">
              &quot;{item.quote}&quot;
            </p>
            <div>
              <p className="text-sm font-bold">{item.author}</p>
              {item.role && (
                <p className="text-xs text-muted-foreground">{item.role}</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
