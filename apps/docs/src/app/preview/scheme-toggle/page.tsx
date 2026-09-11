import type { Metadata } from "next";
import Example from "@/examples/forms/scheme-toggle/Example";
import "./preview.css";

export const metadata: Metadata = {
  title: "Colour scheme preview",
  robots: { index: false, follow: false },
};

export default function SchemePreviewPage() {
  return (
    <div className="example-document">
      <p>Choose a colour scheme for this embedded page.</p>
      <Example />
    </div>
  );
}
