"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function BlogEditor({ value, onChange }: Props) {
  return (
    <div data-color-mode="dark" className="rounded-lg overflow-hidden border border-white/10">
      <MDEditor value={value} onChange={(v) => onChange(v ?? "")} height={420} preview="live" />
    </div>
  );
}
