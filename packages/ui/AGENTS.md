# Writing against @loamui/ui

`@loamui/ui` is a set of compositions built from `@loamui/core`. Read the
core package's `AGENTS.md` first; everything there applies. What is specific
here:

- **Install both stylesheets, core first:** `@loamui/core/styles.css` then
  `@loamui/ui/styles.css`. The ui layer (`loamui.ui`) sits above the core
  layers; your own unlayered CSS still wins.
- **Every composition is a compound component.** `Hero.Root`, `Hero.Title`,
  `Stat.Value`, `Testimonial.Quote`. Arrange the parts in your markup; put
  core components (`Button`, `Badge`, `SignpostLink`, `Avatar`) inside them.
- **No size, variant or colour props.** Mark a highlighted tile or a
  featured item by declaring `--loam-context: primary` (or a status) on
  that part's root, in your stylesheet or a style attribute; the parts inside
  answer it.
- **The unit stands alone.** A `Stat.Root` works on its own, in a Card or a
  grid you wrote yourself; `Stat.Group` arranges several for the common case
  and is optional. To repeat an item across a page, write the grid yourself.
- **Width comes from the container.** Each root declares
  `container-type: inline-size`; put a composition in a narrow column and its
  type and layout follow.
- **Do not restyle a composition's internals.** If it needs structural
  overrides to fit, copy the code from the gallery into your codebase and
  change it there; that is what the gallery is for.
- **Parts forward rest props and `ref` to their root element**, the one that
  carries the part's class, so wire `className`, `style` and `aria-*` on the
  part, not on a wrapper. A part that wraps a core part says where they land:
  `AddressFields.Root` puts `className` and `style` on its grid and the rest
  on the Fieldset; `Byline.Date` puts `className` on its span and everything
  else, `ref` included, on the Time. The part's props type is the contract.
- **Every default string is a prop.** A part's built-in words (an
  `aria-label`, a "Copied" status, a caption) are overridable through a prop
  or children; nothing user-facing is hard-coded, so a page in another
  language passes its own.

Gallery and code: <https://loamui.com/ui/>.
