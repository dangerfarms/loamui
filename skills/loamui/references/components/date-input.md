---
title: DateInput
description: Labelled fields for a memorable date.
---

> LoamUI documentation, generated from the same source as the live page —
> treat it as authoritative for `@loamui/core`.

# DateInput

Composable labelled fields for a date the user already knows.

## Import

```tsx
import { DateInput } from "@loamui/core";
```

## Usage

### Basic usage

A memorable date is typed, not picked: day, month and year are separate fields in a fieldset named by the legend. Day and year raise a numeric keypad on touch devices; the month keeps the full keyboard so names like Mar are accepted too.

```tsx
<DateInput.Root name="date-of-birth" autoComplete="bday">
  <DateInput.Legend>Date of birth</DateInput.Legend>
  <DateInput.Description>For example, 27 3 2007</DateInput.Description>
  <DateInput.Fields>
    <DateInput.Field part="day" />
    <DateInput.Field part="month" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>
```

### Error on the whole date

An Error without parts puts all the fields in the invalid state, the right default when you cannot tell which part is wrong.

```tsx
<DateInput.Root>
  <DateInput.Legend>Date of birth</DateInput.Legend>
  <DateInput.Description>For example, 27 3 2007</DateInput.Description>
  <DateInput.Error>Enter your date of birth</DateInput.Error>
  <DateInput.Fields>
    <DateInput.Field part="day" />
    <DateInput.Field part="month" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>
```

### Error on one part

When the message names a specific part, parts on the Error narrows the invalid styling to that field. The user's correct answers keep their values and their normal borders.

```tsx
<DateInput.Root name="membership-start">
  <DateInput.Legend>When did your membership start?</DateInput.Legend>
  <DateInput.Description>For example, 27 3 2019</DateInput.Description>
  <DateInput.Error parts={["year"]}>
    Membership start date must include a year
  </DateInput.Error>
  <DateInput.Fields>
    <DateInput.Field part="day" defaultValue="27" />
    <DateInput.Field part="month" defaultValue="3" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>
```

### Month and year only

Render only the fields the question needs: the naming, autofill and error wiring adapt to whichever parts are present.

```tsx
<DateInput.Root name="card-expiry">
  <DateInput.Legend>Expiry date</DateInput.Legend>
  <DateInput.Description>For example, 3 2031</DateInput.Description>
  <DateInput.Fields>
    <DateInput.Field part="month" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>
```

## When to use it

- For dates the user knows or can look up: a date of birth, the issue or expiry date on a document.
- When the answer must be an exact date submitted with a form: day, month and year, or just the parts the question needs.

## When not to

- For choosing a date from availability (booking an appointment, picking a delivery slot), where a calendar shows which dates are possible.
- For a single free-text answer where an approximate date is fine ("summer 2019"): use Input.

## How it works

### Typed, not picked

Nobody finds their birthday by paging a calendar back four decades. A date the user already knows is three short answers, and separate fields make each answer unambiguous. Reserve calendar widgets for dates that are genuinely chosen from a selection, and even then keep a text fallback.

### Example dates that teach the format

Give an example in the Description, and choose it so it can only be read one way: a day above 12 (so it cannot be a month) and a month of 9 or less without a leading zero (so it is clear none is needed). "27 3 2007" answers both questions users actually have; "01 02 2003" answers neither.

### Highlight only the wrong part

If one field is empty or impossible, say so ("[Date] must include a year") and pass parts to the Error to mark just that field invalid. If you cannot tell which part is wrong, or the parts are individually fine but the date is not real, leave parts unset so the whole date is highlighted. Either way the user's correct entries are never cleared.

### Autofill for dates of birth

When the date is the user's own date of birth, pass autoComplete="bday" to the Root: each Field gets the matching bday-day / bday-month / bday-year value, so browsers can fill it and assistive technology knows the field's purpose. This is WCAG 1.3.5 (Identify Input Purpose). Leave it off for any other date: a wrong autofilled birthday in a membership-start field is worse than typing.

### Linking from an ErrorSummary

Pass an id to the Root and the fields become {id}-day, {id}-month and {id}-year. Point the summary item at the first field in error (the year in the example below) so activating it lands the user exactly where the correction starts.

```tsx
<ErrorSummary.Item href="#membership-start-year">
  Membership start date must include a year
</ErrorSummary.Item>

<DateInput.Root id="membership-start">
  <DateInput.Legend>When did your membership start?</DateInput.Legend>
  <DateInput.Error parts={["year"]}>
    Membership start date must include a year
  </DateInput.Error>
  …
</DateInput.Root>
```

### Accept how people write dates

Users copy dates from documents that disagree about format. The month field accepts names as well as digits ("jan", "january"), which measurably reduces errors, so only day and year raise the numeric keypad. Accept a leading zero and its absence, and validate on submit rather than while typing: a field that complains about "3" before the user has finished "31" teaches them to distrust the form.

## Accessibility

- The group is a native <fieldset> named by its <legend>, so screen readers announce the question with each of the fields.
- Each Field has its own visible <label>: Day, Month, Year by default; pass children to swap them for other languages.
- The Description and Error are linked to the fieldset via aria-describedby, and the Error uses role="alert" so it is announced as it appears; invalid fields also set aria-invalid.
- Day and year use inputMode="numeric" (a number pad without the hazards of type="number"); the month field keeps the full keyboard so names like "jan" can be typed.
- The fields are sized to their answers (two digits, four for the year); width is information about the expected length.

## Error messages

| Situation | Message |
| --- | --- |
| Nothing is entered | `Enter [whatever the date is]` |
| The date is incomplete | `[Whatever the date is] must include a [day/month/year]` |
| The date is not a real date | `[Whatever the date is] must be a real date` |
| The date must be in the past | `[Whatever the date is] must be in the past` |
| The date must be in the future | `[Whatever the date is] must be in the future` |

## Parts

### DateInput.Root

The fieldset and the wiring; native <fieldset> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Prefix for each field's submitted name: {name}-day, {name}-month, {name}-year. |
| `autoComplete` | `"bday"` | — | Wires browser date-of-birth autofill (WCAG 1.3.5). |

### DateInput.Legend

Names the group (this is Fieldset.Legend); native <legend> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `optional` | `boolean` | `false` | Marks the whole question optional in text. |

### DateInput.Description

Helper text linked to the group: give an example date. Native <p> props are forwarded.

### DateInput.Error

Error message announced via role="alert"; native <p> props are forwarded.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `parts` | `("day" \| "month" \| "year")[]` | — | Narrows the invalid state to the fields the error names; default is all of them. |

### DateInput.Fields

Lays out the row of fields; native <div> props are forwarded.

### DateInput.Field

One labelled date field. All native <input> props are forwarded: value, onChange, maxLength, refs.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `part` | `"day" \| "month" \| "year"` | — | Which date part this field asks for (required). |
| `children` | `ReactNode` | `"Day" / "Month" / "Year"` | The visible field label. |

