# Writing against @loamui/ui

`@loamui/ui` is a set of compositions built from `@loamui/core`. Read the
core package's `AGENTS.md` first; everything there applies. What is specific
here:

- **Install both stylesheets, core first:** `@loamui/core/styles.css` then
  `@loamui/ui/styles.css`. The ui layer (`loamui.ui`) sits above the core
  layers; your own unlayered CSS still wins.
- **Every composition is a compound component.** `Hero.Root`, `Hero.Title`,
  `Stats.Item`, `Testimonials.Track`. Arrange the parts in your markup; put
  core components (`Button`, `Badge`, `SignpostLink`, `Avatar`) inside them.
- **No size, variant or colour props.** Mark a highlighted tile or a
  featured item by declaring `--loam-context: primary` (or a status) on
  that part's root, in your stylesheet or a style attribute; the parts inside
  answer it.
- **The unit stands alone.** A `Stats.Item` works on its own, in a Card or a
  grid you wrote yourself; `Stats.Root` arranges several for the common case
  and is optional. To repeat an item across a page, write the grid yourself.
- **Width comes from the container.** Each root declares
  `container-type: inline-size`; put a composition in a narrow column and its
  type and layout follow.
- **Do not restyle a composition's internals.** If it needs structural
  overrides to fit, copy the code from the gallery into your codebase and
  change it there; that is what the gallery is for.
- **Every part forwards native props** (`className`, `style`, `aria-*`,
  `ref`), so wire your own attributes on the part, not on a wrapper.

Gallery and code: <https://loamui.com/ui/>.
