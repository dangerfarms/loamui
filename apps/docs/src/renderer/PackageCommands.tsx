"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Tabs } from "@loamui/core";
import { CodeBlock } from "./CodeBlock";
import {
  PACKAGE_COMMANDS,
  PACKAGE_MANAGERS,
  type PackageCommandName,
  type PackageManager,
} from "./package-commands";
import "./PackageCommands.css";

const ManagerContext = createContext<{
  manager: PackageManager;
  select: (manager: PackageManager) => void;
} | null>(null);

export function PackageManagerProvider({ children }: { children: ReactNode }) {
  const [manager, select] = useState<PackageManager>("pnpm");
  const value = useMemo(() => ({ manager, select }), [manager]);
  return <ManagerContext value={value}>{children}</ManagerContext>;
}

export function PackageCommands({ name }: { name: PackageCommandName }) {
  const shared = useContext(ManagerContext);
  const [local, selectLocal] = useState<PackageManager>("pnpm");
  const manager = shared?.manager ?? local;
  const select = shared?.select ?? selectLocal;
  return (
    <div className="site-PackageCommands">
      <Tabs.Root
        value={manager}
        onChange={(value) => {
          const selected = PACKAGE_MANAGERS.find((item) => item === value);
          if (selected) select(selected);
        }}
      >
        <Tabs.List aria-label="Package manager">
          {PACKAGE_MANAGERS.map((item) => (
            <Tabs.Tab key={item} value={item}>
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {PACKAGE_MANAGERS.map((item) => (
          <Tabs.Panel key={item} value={item}>
            <CodeBlock code={PACKAGE_COMMANDS[name][item]} language="bash" />
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  );
}
