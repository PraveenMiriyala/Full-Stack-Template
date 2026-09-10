import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Zap,
  Database,
  Lock,
  TestTube2,
  Container,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const stackFeatures = [
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "Next.js App Router",
      description:
        "Server Components, streaming, nested layouts, and optimized routing architecture.",
    },
    {
      icon: <Lock className="h-6 w-6 text-primary" />,
      title: "Better Auth Authentication",
      description:
        "Secure email & password authentication foundation with Prisma adapter and session management.",
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "PostgreSQL & Prisma ORM",
      description:
        "Type-safe database queries with schema migrations, model definitions, and Docker integration.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Zod Schema Validation",
      description:
        "Runtime validation for environment variables, form inputs, and server-side request payloads.",
    },
    {
      icon: <TestTube2 className="h-6 w-6 text-primary" />,
      title: "Vitest & Playwright",
      description:
        "Comprehensive testing setup for unit testing logic and end-to-end user browser interactions.",
    },
    {
      icon: <Container className="h-6 w-6 text-primary" />,
      title: "Docker Compose",
      description:
        "Pre-configured PostgreSQL database container ready for seamless local development.",
    },
  ];

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 md:py-28">
        <div className="container flex flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4 gap-1 px-3 py-1">
            <Zap className="h-3.5 w-3.5 text-primary" />
            Production-Ready Full-Stack Template
          </Badge>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Modern Full-Stack Power with{" "}
            <span className="text-primary">Next.js & TypeScript</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Built with App Router, Tailwind CSS, shadcn/ui components, Better
            Auth, Prisma ORM, PostgreSQL, Zod validation, Vitest, and
            Playwright.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/sign-up" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Core Architecture Highlights
          </h2>
          <p className="mt-2 text-muted-foreground">
            Everything configured following industry best practices and strict
            type safety.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stackFeatures.map((feature, idx) => (
            <Card key={idx} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="rounded-lg bg-primary/10 p-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Code Architecture Callout */}
      <section className="container">
        <Card className="border-primary/20 bg-muted/50 p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready for Production Scale</h3>
              <p className="max-w-xl text-muted-foreground">
                Structured cleanly into{" "}
                <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">
                  src/app
                </code>
                ,{" "}
                <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">
                  src/components
                </code>
                ,{" "}
                <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">
                  src/lib
                </code>
                , and{" "}
                <code className="rounded bg-background px-1 py-0.5 font-mono text-xs">
                  src/server
                </code>
                .
              </p>
            </div>
            <Button asChild>
              <Link href="/sign-in">Try Auth Flow</Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
