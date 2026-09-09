---
title: Language picker
description: A menu of languages as a radio group, each named in itself with a two-letter code beside it, the chosen one shown on the button that opens it.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Language picker

A menu of languages as a radio group, each named in itself with a two-letter code beside it, the chosen one shown on the button that opens it.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Menu`
- Tags: language, locale, menu, radio, i18n, picker
- Live: https://loamui.com/examples/forms/language-picker

## Built to the pillars

- **Native CSS.** Each name carries its language's lang attribute, so a screen reader switches voice to say Cymraeg as Welsh and Deutsch as German; the codes are ISO 639-1 text, not flags, since a flag names a country and a language crosses several.
- **Modern CSS.** The code glyph's scope is rooted at the glyph itself, once for the trigger and every item, cut in currentcolor so it follows the Button's channel and the item's highlight; forced colours give it an edge in place of the tint.
- **Composition.** Menu.Root, Trigger, Popup, RadioGroup, GroupLabel and RadioItem as core ships them: the chosen language is the group's value, and closeOnClick on each item closes the menu on a choice because a language is one setting, not one of several adjusted in a visit.
- **Accessible & gatekept.** The trigger is named Language: English by hidden words before the visible name, so its purpose is said before its value; the items are menuitemradios with aria-checked, the arrows move between them and a typed letter jumps to a language. A site whose languages live at their own addresses lists them as links with hreflang instead.

## Example.tsx

```tsx
"use client";

import { useState } from "react";
import { Menu } from "@loamui/core";
import "./example.css";

const LANGUAGES = [
  { code: "en", short: "EN", name: "English" },
  { code: "cy", short: "CY", name: "Cymraeg" },
  { code: "fr", short: "FR", name: "Français" },
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "nl", short: "NL", name: "Nederlands" },
];

export default function Example() {
  const [value, setValue] = useState("en");
  const current = LANGUAGES.find((language) => language.code === value) ?? LANGUAGES[0]!;

  return (
    <Menu.Root className="language-picker">
      <Menu.Trigger>
        <span className="loam-VisuallyHidden">Language: </span>
        <span className="code" aria-hidden="true">
          {current.short}
        </span>
        <span lang={current.code}>{current.name}</span>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </Menu.Trigger>
      <Menu.Popup>
        <Menu.RadioGroup value={value} onValueChange={setValue}>
          <Menu.GroupLabel>Language</Menu.GroupLabel>
          {LANGUAGES.map((language) => (
            <Menu.RadioItem key={language.code} value={language.code} closeOnClick>
              <span className="code" aria-hidden="true">
                {language.short}
              </span>
              <span lang={language.code}>{language.name}</span>
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Popup>
    </Menu.Root>
  );
}
```

## example.css

```css
/* The Menu, its trigger Button and its popup are core's. The code glyph
   is the example's own span, once in the trigger and once in every item,
   so the scope is rooted at the glyph itself rather than at the picker:
   one rule reaches both places, past the Button's and the popup's own
   classes. Cut in currentcolor, it follows the trigger's text colour in
   every context and the item's highlight colour when focused. */
@scope (.language-picker .code) to ([class*="loam-"]) {
  :scope {
    background: color-mix(in oklab, currentcolor 12%, transparent);
    border-radius: var(--loam-radius-sm);
    font-family: var(--loam-font-mono);
    font-size: var(--loam-text-xs);
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1;
    padding-block: 0.25em;
    padding-inline: 0.4em;

    /* The tint is dropped with every background; an edge keeps the glyph
       a glyph. */
    @media (forced-colors: active) {
      border: 1px solid;
    }
  }
}
```

