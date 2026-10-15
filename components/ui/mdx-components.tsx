import React from "react";

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mt-10 mb-4 uppercase"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mt-12 mb-4 border-b border-border pb-2 uppercase"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-muted-foreground leading-relaxed text-base my-4"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-6 my-4 space-y-2 text-muted-foreground" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-6 my-4 space-y-2 text-muted-foreground" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg border border-border bg-card/90 p-5 font-mono text-sm shadow-md"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-muted/60 px-1.5 py-0.5 font-mono text-sm font-medium text-foreground"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-foreground/30 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
};
