import type { ComponentContent, ComponentDoc } from "./types";
import { COMPONENTS } from "@/site/nav";

// Inputs
import field from "@/content/components/field";
import fieldset from "@/content/components/fieldset";
import button from "@/content/components/button";
import input from "@/content/components/input";
import textarea from "@/content/components/textarea";
import select from "@/content/components/select";
import separator from "@/content/components/separator";
import checkbox from "@/content/components/checkbox";
import dateinput from "@/content/components/date-input";
import errorsummary from "@/content/components/error-summary";
import radio from "@/content/components/radio";
import switchDoc from "@/content/components/switch";
import range from "@/content/components/range";
import search from "@/content/components/search";
import quantityInput from "@/content/components/quantity-input";
import rating from "@/content/components/rating";
import fileInput from "@/content/components/file-input";
import copyButton from "@/content/components/copy-button";
import schemeToggle from "@/content/components/scheme-toggle";

// Data display
import badge from "@/content/components/badge";
import price from "@/content/components/price";
import time from "@/content/components/time";
import card from "@/content/components/card";
import avatar from "@/content/components/avatar";
import table from "@/content/components/table";

// Feedback
import alert from "@/content/components/alert";
import progress from "@/content/components/progress";
import meter from "@/content/components/meter";
import skeleton from "@/content/components/skeleton";
import loader from "@/content/components/loader";
import toast from "@/content/components/toast";

// Disclosures
import tooltip from "@/content/components/tooltip";
import modal from "@/content/components/modal";
import drawer from "@/content/components/drawer";
import popover from "@/content/components/popover";
import menu from "@/content/components/menu";

// Navigation
import tabs from "@/content/components/tabs";
import details from "@/content/components/details";
import signpostLink from "@/content/components/signpost-link";
import skipLink from "@/content/components/skip-link";
import breadcrumbs from "@/content/components/breadcrumbs";
import pagination from "@/content/components/pagination";

// Layout is not a component: compose native CSS layout modules with the space
// tokens. See the Layout guide (/docs/layout).

const content: ComponentContent[] = [
  field,
  fieldset,
  button,
  input,
  textarea,
  select,
  separator,
  checkbox,
  dateinput,
  errorsummary,
  radio,
  switchDoc,
  range,
  search,
  quantityInput,
  rating,
  fileInput,
  copyButton,
  schemeToggle,
  badge,
  price,
  time,
  card,
  avatar,
  table,
  alert,
  progress,
  meter,
  skeleton,
  loader,
  toast,
  tooltip,
  modal,
  drawer,
  popover,
  menu,
  tabs,
  details,
  signpostLink,
  skipLink,
  breadcrumbs,
  pagination,
];

// Identity lives in the manifest (site/nav.ts), substance in the content
// files; the join makes drift loud in both directions at build time.
export const components: ComponentDoc[] = COMPONENTS.map((meta) => {
  const doc = content.find((c) => c.slug === meta.slug);
  if (!doc) {
    throw new Error(`"${meta.slug}" is in site/nav.ts but has no content file registered here.`);
  }
  return { ...doc, ...meta };
});

const unlisted = content.filter((c) => !COMPONENTS.some((m) => m.slug === c.slug));
if (unlisted.length > 0) {
  throw new Error(
    `Content files missing from site/nav.ts: ${unlisted.map((c) => c.slug).join(", ")}.`,
  );
}

export function getComponent(slug: string): ComponentDoc | undefined {
  return components.find((c) => c.slug === slug);
}
