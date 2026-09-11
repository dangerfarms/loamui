import { PILLARS, type ExampleMeta } from "@/examples/types";
import classes from "./examples-pillars.module.css";

/** Only report the example's own rationale, never fill gaps with a claim of verification. */
export function ExamplePillars({ notes }: { notes: ExampleMeta["notes"] }) {
  return (
    <dl className={classes.list}>
      {PILLARS.filter((pillar) => notes[pillar.key]).map((pillar) => {
        const note = notes[pillar.key];
        return (
          <div key={pillar.key} className={classes.row}>
            <dt className={classes.name}>{pillar.name}</dt>
            <dd className={classes.note}>{note}</dd>
          </div>
        );
      })}
    </dl>
  );
}
