import { PILLARS, type ExampleMeta } from "@/examples/types";
import classes from "./examples-pillars.module.css";

/** What each pillar means when an example has nothing specific to say. */
const PILLAR_LINES: Record<(typeof PILLARS)[number]["key"], string> = {
  native: "Real elements carry the semantics; plain, static CSS carries the styling.",
  modern: "@scope for encapsulation, tokens for every value, container queries for adaptation.",
  composition: "Core parts are dropped in as they come; the example's rule stops at their roots.",
  context: "Status and size come from the region the parts sit in, never from a prop.",
  accessible: "Semantic HTML, managed focus and keyboard support, checked by axe in the test.",
};

/**
 * The five pillars as five rows: the example's own note where it has one,
 * the pillar's own line where it has not, so every example is read
 * against the whole standard.
 */
export function ExamplePillars({ notes }: { notes: ExampleMeta["notes"] }) {
  return (
    <dl className={classes.list}>
      {PILLARS.map((pillar) => {
        const note = notes[pillar.key];
        return (
          <div key={pillar.key} className={classes.row}>
            <dt className={classes.name}>{pillar.name}</dt>
            <dd className={classes.note} data-generic={note ? undefined : ""}>
              {note ?? PILLAR_LINES[pillar.key]}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
