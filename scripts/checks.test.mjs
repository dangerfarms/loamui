import { test } from "node:test";
import assert from "node:assert/strict";
import { bypassesScale, checkedFiles, spacingFindings } from "./check-spacing.mjs";
import { nakedScopes, proseBoundaryFindings } from "./check-scope.mjs";
import { extractSiteProse } from "./check-site-prose.mjs";

test("spacing catches nested CSS, column gaps and var fallbacks", () => {
  assert.equal(
    spacingFindings(
      "@scope (.card) { @layer ui { :scope { column-gap: var(--gap, 12px); } }}",
      "example.css",
    ).length,
    1,
  );
  assert.equal(bypassesScale("min(1rem, 4cqi)"), true);
  assert.equal(bypassesScale("var(--loam-space-s)"), false);
  assert.equal(bypassesScale("clamp(1rem, 2cqi, 2rem)"), false);
  assert.equal(bypassesScale("calc(1rem + 2cqi) 8px"), true);
  assert.equal(bypassesScale("-1px"), false);
});

test("spacing inspects React objects, not copied code strings", () => {
  assert.equal(
    spacingFindings(
      'const style = { columnGap: 12 }; const view = <div style={{ marginBlock: "1rem" }}/>;',
      "demo.tsx",
    ).length,
    2,
  );
  assert.equal(spacingFindings('const code = `gap: "1rem"`;', "demo.tsx").length, 0);
  assert.ok(checkedFiles().some((file) => file.endsWith("/heroes/hero-with-image/example.css")));
  assert.ok(!checkedFiles().some((file) => file.endsWith("/forms/sign-up/example.css")));
});

test("scope inspection finds nested type rules independently of indentation", () => {
  assert.equal(
    nakedScopes("@scope (.host) { @layer ui { :scope { h2 {color: red} } } }").length,
    1,
  );
  assert.equal(
    nakedScopes('@scope (.host) to (.preview, [class*="loam-"]) { h2 {color: red} }').length,
    0,
  );
  assert.equal(nakedScopes("@scope (.host) { @keyframes fade { from {opacity:0} } }").length, 0);
});

test("site prose includes rendered copy and joins inline markup, excluding code", () => {
  const prose = extractSiteProse(
    'const title = "A useful page title"; const code = "This is a code example"; const page = <p>Build with <strong>the native platform</strong>.</p>;',
  );
  assert.match(prose, /A useful page title/);
  assert.match(prose, /Build with the native platform\./);
  assert.doesNotMatch(
    extractSiteProse('const demo = { code: "This is a code example" };'),
    /code example/,
  );
});

test("article styles protect embedded recipes as well as core roots", () => {
  assert.equal(proseBoundaryFindings("@scope (.site-prose) { ul {display:flex} }").length, 2);
  assert.equal(
    proseBoundaryFindings(
      '@layer loamui.ui { @scope (.site-prose) to (.block, [class*="loam-"]) { ul {display:flex} } }',
    ).length,
    0,
  );
});
