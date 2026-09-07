"use client";

import { Breadcrumbs } from "@loamui/core";
import Link from "next/link";
import type { CSSProperties } from "react";

export function BreadcrumbsBasicDemo() {
  return (
    <Breadcrumbs.Root>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  );
}

export function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs.Root style={{ "--loam-breadcrumbs-separator": '"→"' } as CSSProperties}>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Website Redesign</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  );
}

export function BreadcrumbsRenderDemo() {
  return (
    <Breadcrumbs.Root>
      <Breadcrumbs.Item render={<Link href="/" />}>Home</Breadcrumbs.Item>
      <Breadcrumbs.Item render={<Link href="/docs/components" />}>Components</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Breadcrumbs</Breadcrumbs.Item>
    </Breadcrumbs.Root>
  );
}
