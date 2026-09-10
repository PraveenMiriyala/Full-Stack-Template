import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface ColumnItem {
  title: string;
  content: string;
}

export interface ColumnsBlockProps {
  heading?: string;
  columns?: ColumnItem[];
}

export function ColumnsComponent({ heading, columns = [] }: ColumnsBlockProps) {
  if (!columns.length) return null;

  return (
    <section className="container py-12">
      {heading && (
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((col, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-xl">{col.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{col.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
