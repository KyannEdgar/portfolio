import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center select-none">
      <div className="inline-flex items-center gap-2 rounded border border-border bg-card/60 px-3 py-1 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur-md mb-6">
        <Terminal className="h-3.5 w-3.5 text-foreground" />
        <span>ERROR // 404_PAGE_NOT_FOUND</span>
      </div>

      <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase text-foreground leading-none mb-4">
        404
      </h1>

      <p className="max-w-md font-mono text-xs sm:text-sm text-muted-foreground uppercase tracking-wider mb-8">
        The requested routing node or architectural resource could not be resolved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-foreground transition-colors duration-200 hover:bg-foreground/10 hover:border-foreground/40"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Headquarters</span>
      </Link>
    </div>
  );
}
