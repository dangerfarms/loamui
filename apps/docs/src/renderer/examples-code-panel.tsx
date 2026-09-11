"use client";

import { Details } from "@loamui/core";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExampleLoadBoundary } from "./examples-load-boundary";
import type { ExampleSource } from "@/examples/types";
import classes from "./examples-code-panel.module.css";

const ExampleCode = lazy(() => import("./examples-code").then((m) => ({ default: m.ExampleCode })));

/**
 * The code, collapsed under a native disclosure, so a category page reads
 * as a showcase first and a source listing second.
 */
export function ExampleCodePanel({ source, href }: { source: ExampleSource; href: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const [requested, setRequested] = useState(false);

  // Native details can open before hydration has attached the toggle handler.
  useEffect(() => {
    if (ref.current?.open) setRequested(true);
  }, []);

  const sourceLink = (
    <p className={classes.message}>
      <Link href={`${href}#code`} prefetch={false}>
        View code on the example page
      </Link>
    </p>
  );

  return (
    <Details.Root
      ref={ref}
      className={classes.details}
      onToggle={(event) => {
        if (event.currentTarget.open) setRequested(true);
      }}
    >
      <Details.Summary>Code</Details.Summary>
      <Details.Content className={classes.content}>
        {requested ? (
          <ExampleLoadBoundary fallback={sourceLink}>
            <Suspense
              fallback={
                <p className={classes.message} role="status">
                  Loading code…
                </p>
              }
            >
              <ExampleCode source={source} />
            </Suspense>
          </ExampleLoadBoundary>
        ) : (
          sourceLink
        )}
      </Details.Content>
    </Details.Root>
  );
}
