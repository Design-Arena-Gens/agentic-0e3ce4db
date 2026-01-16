"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

const snippet = `<div data-leadflow></div>
<script async src="https://agentic-0e3ce4db.vercel.app/api/embed"></script>`;

export function EmbedSnippet() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Website embed
          </h2>
          <p className="text-xs text-slate-500">
            Copy & paste into any page to capture leads instantly.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleCopy}
          variant="outline"
          className="border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check size={16} className="mr-2" /> Copied
            </>
          ) : (
            <>
              <Copy size={16} className="mr-2" /> Copy
            </>
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto px-6 py-5 text-sm leading-relaxed">
        {snippet}
      </pre>
    </div>
  );
}
