---
title: Autocomplete with async data
description: A variety picker whose suggestions arrive after a delay: a spinner in the box while the seed list is searched, then the matches, with the outcome written under the box.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# Autocomplete with async data

A variety picker whose suggestions arrive after a delay: a spinner in the box while the seed list is searched, then the matches, with the outcome written under the box.

An example in **Forms**: a component and a stylesheet built from `@loamui/core`, to copy into a project and change. Both files are below, exactly as the live preview renders them.

- Uses: `Combobox`, `Field`, `Loader`
- Tags: autocomplete, combobox, async, search, loading, typeahead
- Live: https://loamui.com/examples/forms/autocomplete-async

## Using this example

Copy both files side by side into a React 19 project. Install `@loamui/core` and load `@loamui/core/styles.css` once at the application root, following the framework-specific installation guide.

The seed search uses a local list with a simulated delay. Replace searchSeedList with your API request and pass its AbortSignal; add a visible error and retry state for network failures.

## Design decisions

These notes explain the design. The included tests cover structure and selected interactions; check contrast, keyboard behavior and assistive technology support in your application.

- **Native CSS.** The box is a native input wearing the APG editable combobox, and the chosen variety is submitted under name="variety" as a hidden input, so the form posts a value whether or not the list ever opened.
- **Modern CSS.** The Loader's size is the one inherited hook the example sets, on the Field, so the spinner in the end section is the size of an icon there and the box keeps the derived control height; the status line reserves a line so the field does not jump when it fills.
- **Composition.** Combobox.Root, Input, List, Option and Empty as core ships them, with the example's own search in the same file: which options render is the consumer's decision, and here it is whatever the last answered search returned, the search before it abandoned through an AbortController.
- **Accessible & gatekept.** The Combobox's status region is the one voice: while a search is under way it says so, and when the answer lands it says how many match, so nothing announces 0 results while the list is still coming. The spinner is aria-hidden for the same reason, and the visible status line under the box is plain text, not a second live region saying the same words.

## Example.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { Combobox, Field, Loader } from "@loamui/core";
import "./example.css";

const SEED_LIST = [
  "Beetroot 'Boltardy'",
  "Broad bean 'Aquadulce Claudia'",
  "Carrot 'Autumn King'",
  "Climbing bean 'Cherokee Trail of Tears'",
  "Courgette 'Nero di Milano'",
  "Kale 'Nero di Toscana'",
  "Leek 'Musselburgh'",
  "Lettuce 'Little Gem'",
  "Pea 'Kelvedon Wonder'",
  "Radish 'French Breakfast'",
  "Squash 'Crown Prince'",
  "Tomato 'Gardener's Delight'",
];

/** Stands in for the request a real seed list answers; the delay is the point. */
function searchSeedList(text: string, signal: AbortSignal): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const needle = text.toLowerCase();
      resolve(SEED_LIST.filter((name) => name.toLowerCase().includes(needle)));
    }, 600);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(signal.reason);
    });
  });
}

export default function Example() {
  const [query, setQuery] = useState("");
  const [chosen, setChosen] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[] | null>(null);
  const [searching, setSearching] = useState(false);

  // Every change of text starts a search and abandons the one before it, so
  // a slow answer never lands on top of a newer question; choosing an option
  // writes its name into the box, which is not a new question.
  useEffect(() => {
    const text = query.trim();
    if (text === "") {
      setMatches(null);
      setSearching(false);
      return;
    }
    if (text === chosen) {
      setSearching(false);
      return;
    }
    const controller = new AbortController();
    setSearching(true);
    searchSeedList(text, controller.signal).then(
      (found) => {
        setMatches(found);
        setSearching(false);
      },
      () => {},
    );
    return () => controller.abort();
  }, [query, chosen]);

  const status = searching
    ? "Searching the seed list…"
    : query.trim() === chosen
      ? `${chosen} selected.`
      : matches === null
        ? ""
        : matches.length === 0
          ? "Nothing in the seed list matches."
          : matches.length === 1
            ? "1 variety matches."
            : `${matches.length} varieties match.`;

  return (
    <Field.Root className="autocomplete-async">
      <Field.Label>Variety</Field.Label>
      <Field.Description>Start typing a crop or a variety name.</Field.Description>
      <Combobox.Root
        name="variety"
        inputValue={query}
        onInputValueChange={setQuery}
        onValueChange={setChosen}
        labels={{
          // Read from the answer, not the list's own count, which registers
          // a render after the options mount.
          status: () => status,
          empty: "No varieties match",
        }}
      >
        <Combobox.Input
          autoCapitalize="none"
          spellCheck={false}
          endSection={searching ? <Loader aria-hidden="true" /> : undefined}
        />
        <Combobox.List>
          {matches?.map((name) => (
            <Combobox.Option key={name} value={name}>
              {name}
            </Combobox.Option>
          ))}
          <Combobox.Empty>
            {searching
              ? "Searching…"
              : matches === null
                ? "Type to search the seed list"
                : undefined}
          </Combobox.Empty>
        </Combobox.List>
      </Combobox.Root>
      <p className="status">{status}</p>
    </Field.Root>
  );
}
```

## example.css

```css
@scope (.autocomplete-async) to ([class*="loam-"]) {
  :scope {
    --loam-loader-size: calc(1.125 * var(--loam-text-sm));

    max-inline-size: 28rem;
  }

  /* Plain text: the Combobox's own status region is the live one. */
  p.status {
    color: var(--loam-color-fg-muted);
    font-size: var(--loam-text-sm);
    margin: 0;
    min-block-size: 1lh;
  }
}
```

