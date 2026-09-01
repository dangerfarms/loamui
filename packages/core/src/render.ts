import { cloneElement, isValidElement } from "react";
import type { CSSProperties, ReactElement, ReactNode, Ref } from "react";
import { cx } from "./utils";

/**
 * Composition plumbing shared by compound components — the single merge
 * contract for attaching wiring props to a consumer-provided element:
 *
 * - event handlers: BOTH run — the element's own handler first, wiring second,
 *   so consumers can't accidentally disable wiring and wiring can't eat
 *   consumer events;
 * - `className`: concatenated;
 * - `style`: shallow-merged, wiring wins on conflicts (wiring styles such as
 *   `anchorName` are load-bearing);
 * - `aria-describedby` / `aria-labelledby`: token-list concatenated;
 * - `ref`: composed — both receive the node;
 * - anything else: the element's own prop wins.
 */

/** A render target: an element to merge props onto, or a function of them. */
export type RenderProp<P> = ReactElement<Record<string, unknown>> | ((props: P) => ReactNode);

type AnyProps = Record<string, unknown>;

function isEventHandlerKey(key: string): boolean {
  return /^on[A-Z]/.test(key);
}

/** Compose two refs so both receive the node. */
export function composeRefs<T>(a: Ref<T> | undefined, b: Ref<T> | undefined): Ref<T> | undefined {
  if (!a) return b;
  if (!b) return a;
  return (node: T | null) => {
    for (const ref of [a, b]) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as { current: T | null }).current = node;
    }
  };
}

const ARIA_LIST_KEYS = new Set(["aria-describedby", "aria-labelledby"]);

/** Merge wiring props with an element's own props (see contract above). */
export function mergeProps<W extends object, O extends object>(wiring: W, own: O): W & O {
  const wiringProps = wiring as AnyProps;
  const ownProps = own as AnyProps;
  const merged: AnyProps = { ...wiringProps, ...ownProps };

  for (const key of Object.keys(wiringProps)) {
    const w = wiringProps[key];
    const o = ownProps[key];
    if (o === undefined || w === undefined) continue;

    if (isEventHandlerKey(key) && typeof w === "function" && typeof o === "function") {
      merged[key] = (...args: unknown[]) => {
        (o as (...a: unknown[]) => void)(...args);
        (w as (...a: unknown[]) => void)(...args);
      };
    } else if (key === "className") {
      merged[key] = cx(w as string, o as string);
    } else if (key === "style") {
      merged[key] = { ...(o as CSSProperties), ...(w as CSSProperties) };
    } else if (ARIA_LIST_KEYS.has(key)) {
      merged[key] = cx(o as string, w as string);
    } else if (key === "ref") {
      merged[key] = composeRefs(w as Ref<unknown>, o as Ref<unknown>);
    }
    // else: own already wins via the spread order.
  }

  return merged as W & O;
}

/** Render a RenderProp with wiring props applied per the merge contract. */
export function renderWithProps<P extends object>(render: RenderProp<P>, props: P): ReactNode {
  if (typeof render === "function") {
    if (process.env.NODE_ENV !== "production" && /^[A-Z]/.test(render.name)) {
      console.error(
        `LoamUI: \`render\` received a component reference (\`render={${render.name}}\`). ` +
          `Pass an element instead — \`render={<${render.name} />}\` — or a function of the wiring props.`,
      );
    }
    return render(props);
  }
  if (isValidElement<AnyProps>(render)) {
    // React 19: the element's ref is an ordinary prop and merges like one.
    return cloneElement(render, mergeProps(props as AnyProps, render.props as AnyProps));
  }
  return null;
}
