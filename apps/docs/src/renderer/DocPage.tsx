import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ComponentDoc } from "./types";
import { Preview } from "./Preview";
import { CodeBlock } from "./CodeBlock";
import { PropsTable } from "./PropsTable";
import classes from "./DocPage.module.css";
import tableClasses from "./PropsTable.module.css";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Read a component's real, complete stylesheet from disk at build time.
 * This is the actual CSS that ships — showing it is the whole point.
 */
function readComponentCss(name: string, pkg: "core"): string | undefined {
  try {
    const file = join(
      process.cwd(),
      "..",
      "..",
      "packages",
      pkg,
      "src",
      "components",
      name,
      `${name}.css`,
    );
    const raw = readFileSync(file, "utf8").trim();
    return `/* The complete stylesheet for <${name} />: plain, static CSS.\n   Nothing runs in the browser: no CSS-in-JS, no runtime. */\n\n${raw}`;
  } catch {
    return undefined;
  }
}

export function DocPage({ doc }: { doc: ComponentDoc }) {
  const css = readComponentCss(doc.name, doc.pkg ?? "core");

  return (
    <article className={classes.page}>
      <header className={classes.header}>
        <p className={classes.category}>{doc.category}</p>
        <h1 className={classes.title}>{doc.name}</h1>
        <p className={classes.lead}>{doc.lead ?? doc.description}</p>
      </header>

      <section className={classes.section}>
        <h2 id="import" className={classes.h2}>
          Import
        </h2>
        <CodeBlock code={doc.importLine} />
      </section>

      <section className={classes.section}>
        <h2 id="usage" className={classes.h2}>
          Usage
        </h2>
        <p className={classes.usageNote}>
          Every example has a <strong>CSS</strong> tab. That&rsquo;s the real, complete stylesheet
          for the component: plain, static CSS, with nothing running in the browser.
        </p>
        <div className={classes.demos}>
          {doc.demos.map((demo) => (
            <div key={demo.title} id={slugify(demo.title)} className={classes.demo}>
              <h3 className={classes.h3}>{demo.title}</h3>
              {demo.description && <p className={classes.demoDesc}>{demo.description}</p>}
              <Preview code={demo.code} css={css}>
                {demo.render()}
              </Preview>
            </div>
          ))}
        </div>
      </section>

      {(doc.whenToUse || doc.whenNotToUse || doc.accessibility) && (
        <section className={classes.section}>
          <h2 id="guidance" className={classes.h2}>
            Guidance
          </h2>
          <div className={classes.guidance}>
            {(doc.whenToUse || doc.whenNotToUse) && (
              <div className={`${classes.guidance} ${classes.guidanceCols}`}>
                {doc.whenToUse && (
                  <div className={classes.guidanceCard}>
                    <p className={`${classes.guidanceHeading} ${classes.guidanceYes}`}>
                      When to use it
                    </p>
                    <ul className={classes.guidanceList}>
                      {doc.whenToUse.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {doc.whenNotToUse && (
                  <div className={classes.guidanceCard}>
                    <p className={`${classes.guidanceHeading} ${classes.guidanceNo}`}>
                      When not to
                    </p>
                    <ul className={classes.guidanceList}>
                      {doc.whenNotToUse.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {doc.accessibility && (
              <div className={classes.guidanceCard}>
                <p className={classes.guidanceHeading}>Accessibility</p>
                <ul className={classes.a11yList}>
                  {doc.accessibility.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {doc.howItWorks && (
        <section className={classes.section}>
          <h2 id="how-it-works" className={classes.h2}>
            How it works
          </h2>
          <div className={classes.demos}>
            {doc.howItWorks.map((entry) => (
              <div key={entry.title} id={slugify(entry.title)} className={classes.demo}>
                <h3 className={classes.h3}>{entry.title}</h3>
                <p className={classes.demoDesc}>{entry.body}</p>
                {entry.code && entry.render && (
                  <Preview code={entry.code} css={css}>
                    {entry.render()}
                  </Preview>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {doc.errors && (
        <section className={classes.section}>
          <h2 id="error-messages" className={classes.h2}>
            Error messages
          </h2>
          <p className={classes.usageNote}>
            Say what happened and how to fix it, in the words of the question itself. See the
            writing guidance{" "}
            {doc.slug === "field" ? (
              <>above.</>
            ) : (
              <>
                on the <a href="/docs/components/field#writing-error-messages">Field page</a>.
              </>
            )}
          </p>
          <div className={tableClasses.scroll}>
            <table className={tableClasses.table}>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {doc.errors.map((e) => (
                  <tr key={e.situation}>
                    <td>{e.situation}</td>
                    <td>
                      <code className={tableClasses.name}>{e.message}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {doc.props && doc.props.length > 0 && (
        <section className={classes.section}>
          <h2 id="props" className={classes.h2}>
            Props
          </h2>
          {doc.contextual && (
            <p className={classes.demoDesc}>
              Status is not a prop: it comes from the surrounding <code>--loam-context</code>{" "}
              region. See the <a href="/docs/contextualism">Contextualism guide</a>.
            </p>
          )}
          <PropsTable rows={doc.props} />
        </section>
      )}

      {doc.parts && doc.parts.length > 0 && (
        <section className={classes.section}>
          <h2 id="parts" className={classes.h2}>
            Parts
          </h2>
          <div className={classes.demos}>
            {doc.parts.map((part) => (
              <div key={part.name} id={slugify(part.name)} className={classes.demo}>
                <h3 className={classes.h3}>
                  <code className={tableClasses.name}>{part.name}</code>
                </h3>
                <p className={classes.demoDesc}>{part.description}</p>
                {part.props && part.props.length > 0 && <PropsTable rows={part.props} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {doc.cssProps && doc.cssProps.length > 0 && (
        <section className={classes.section}>
          <h2 id="custom-properties" className={classes.h2}>
            Custom properties
          </h2>
          <PropsTable
            nameLabel="Property"
            typeLabel="Syntax"
            rows={doc.cssProps.map((p) => ({
              name: p.name,
              type: p.syntax,
              default: p.default,
              description: p.description,
            }))}
          />
        </section>
      )}

      {doc.hooks && doc.hooks.length > 0 && (
        <section className={classes.section}>
          <h2 id="hooks" className={classes.h2}>
            Hooks
          </h2>
          <div className={classes.demos}>
            {doc.hooks.map((hook) => (
              <div key={hook.name} id={slugify(hook.name)} className={classes.demo}>
                <h3 className={classes.h3}>
                  <code className={tableClasses.name}>{hook.name}</code>
                </h3>
                <p className={classes.demoDesc}>{hook.description}</p>
                <CodeBlock code={hook.signature} />
                {hook.options && (
                  <>
                    <p className={classes.demoDesc}>{hook.options.title}</p>
                    <PropsTable nameLabel="Option" rows={hook.options.rows} />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
