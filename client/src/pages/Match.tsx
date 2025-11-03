import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Match() {
  return (
    <div className="space-y-8 max-w-7xl">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 gradient-primary opacity-10 rounded-full blur-3xl" />
        <h1 className="text-5xl font-bold gradient-text mb-6 relative">Match</h1>
      </div>

      <Card className="rounded-3xl border-white/20 dark:border-white/10 backdrop-blur-xl bg-white/70 dark:bg-white/5 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl gradient-text">Match</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Match content will be available soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}