import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlockProps {
  title?: string;
  questions?: FAQItem[];
}

export function FAQComponent({
  title = "Frequently Asked Questions",
  questions = [],
}: FAQBlockProps) {
  if (!questions.length) return null;

  return (
    <section className="container max-w-4xl py-12">
      <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div className="space-y-4">
        {questions.map((faq, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {faq.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
