import type { ComponentContent } from "@/renderer/types";
import {
  DateInputDemo,
  DateInputWholeErrorDemo,
  DateInputPartErrorDemo,
  DateInputMonthYearDemo,
} from "./date-input.client";

const doc: ComponentContent = {
  slug: "date-input",
  lead: "Composable labelled fields for a date the user already knows.",
  importLine: `import { DateInput } from "@farmui/core";`,
  demos: [
    {
      title: "Basic usage",
      description:
        "A memorable date is typed, not picked: day, month and year are separate fields in a fieldset named by the legend. Day and year raise a numeric keypad on touch devices; the month keeps the full keyboard so names like Mar are accepted too.",
      code: `<DateInput.Root name="date-of-birth" autoComplete="bday">
  <DateInput.Legend>Date of birth</DateInput.Legend>
  <DateInput.Description>For example, 27 3 2007</DateInput.Description>
  <DateInput.Fields>
    <DateInput.Field part="day" />
    <DateInput.Field part="month" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>`,
      render: () => <DateInputDemo />,
    },
    {
      title: "Error on the whole date",
      description:
        "An Error without parts puts all the fields in the invalid state, the right default when you cannot tell which part is wrong.",
      code: `<DateInput.Root>
  <DateInput.Legend>Date of birth</DateInput.Legend>
  <DateInput.Description>For example, 27 3 2007</DateInput.Description>
  <DateInput.Error>Enter your date of birth</DateInput.Error>
  <DateInput.Fields>
    <DateInput.Field part="day" />
    <DateInput.Field part="month" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>`,
      render: () => <DateInputWholeErrorDemo />,
    },
    {
      title: "Error on one part",
      description:
        "When the message names a specific part, parts on the Error narrows the invalid styling to that field. The user's correct answers keep their values and their normal borders.",
      code: `<DateInput.Root name="membership-start">
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
</DateInput.Root>`,
      render: () => <DateInputPartErrorDemo />,
    },
    {
      title: "Month and year only",
      description:
        "Render only the fields the question needs: the naming, autofill and error wiring adapt to whichever parts are present.",
      code: `<DateInput.Root name="card-expiry">
  <DateInput.Legend>Expiry date</DateInput.Legend>
  <DateInput.Description>For example, 3 2031</DateInput.Description>
  <DateInput.Fields>
    <DateInput.Field part="month" />
    <DateInput.Field part="year" />
  </DateInput.Fields>
</DateInput.Root>`,
      render: () => <DateInputMonthYearDemo />,
    },
  ],
  whenToUse: [
    "For dates the user knows or can look up: a date of birth, the issue or expiry date on a document.",
    "When the answer must be an exact date submitted with a form: day, month and year, or just the parts the question needs.",
  ],
  whenNotToUse: [
    "For choosing a date from availability (booking an appointment, picking a delivery slot), where a calendar shows which dates are possible.",
    'For a single free-text answer where an approximate date is fine ("summer 2019"): use Input.',
  ],
  howItWorks: [
    {
      title: "Typed, not picked",
      body: "Nobody finds their birthday by paging a calendar back four decades. A date the user already knows is three short answers, and separate fields make each answer unambiguous. Reserve calendar widgets for dates that are genuinely chosen from a selection, and even then keep a text fallback.",
    },
    {
      title: "Example dates that teach the format",
      body: 'Give an example in the Description, and choose it so it can only be read one way: a day above 12 (so it cannot be a month) and a month of 9 or less without a leading zero (so it is clear none is needed). "27 3 2007" answers both questions users actually have; "01 02 2003" answers neither.',
    },
    {
      title: "Highlight only the wrong part",
      body: 'If one field is empty or impossible, say so ("[Date] must include a year") and pass parts to the Error to mark just that field invalid. If you cannot tell which part is wrong, or the parts are individually fine but the date is not real, leave parts unset so the whole date is highlighted. Either way the user\'s correct entries are never cleared.',
    },
    {
      title: "Autofill for dates of birth",
      body: "When the date is the user's own date of birth, pass autoComplete=\"bday\" to the Root: each Field gets the matching bday-day / bday-month / bday-year value, so browsers can fill it and assistive technology knows the field's purpose. This is WCAG 1.3.5 (Identify Input Purpose). Leave it off for any other date: a wrong autofilled birthday in a membership-start field is worse than typing.",
    },
    {
      title: "Linking from an ErrorSummary",
      body: "Pass an id to the Root and the fields become {id}-day, {id}-month and {id}-year. Point the summary item at the first field in error (the year in the example below) so activating it lands the user exactly where the correction starts.",
      code: `<ErrorSummary.Item href="#membership-start-year">
  Membership start date must include a year
</ErrorSummary.Item>

<DateInput.Root id="membership-start">
  <DateInput.Legend>When did your membership start?</DateInput.Legend>
  <DateInput.Error parts={["year"]}>
    Membership start date must include a year
  </DateInput.Error>
  …
</DateInput.Root>`,
    },
    {
      title: "Accept how people write dates",
      body: 'Users copy dates from documents that disagree about format. The month field accepts names as well as digits ("jan", "january"), which measurably reduces errors, so only day and year raise the numeric keypad. Accept a leading zero and its absence, and validate on submit rather than while typing: a field that complains about "3" before the user has finished "31" teaches them to distrust the form.',
    },
  ],
  errors: [
    {
      situation: "Nothing is entered",
      message: "Enter [whatever the date is]",
    },
    {
      situation: "The date is incomplete",
      message: "[Whatever the date is] must include a [day/month/year]",
    },
    {
      situation: "The date is not a real date",
      message: "[Whatever the date is] must be a real date",
    },
    {
      situation: "The date must be in the past",
      message: "[Whatever the date is] must be in the past",
    },
    {
      situation: "The date must be in the future",
      message: "[Whatever the date is] must be in the future",
    },
  ],
  accessibility: [
    "The group is a native <fieldset> named by its <legend>, so screen readers announce the question with each of the fields.",
    "Each Field has its own visible <label>: Day, Month, Year by default; pass children to swap them for other languages.",
    'The Description and Error are linked to the fieldset via aria-describedby, and the Error uses role="alert" so it is announced as it appears; invalid fields also set aria-invalid.',
    'Day and year use inputMode="numeric" (a number pad without the hazards of type="number"); the month field keeps the full keyboard so names like "jan" can be typed.',
    "The fields are sized to their answers (two digits, four for the year); width is information about the expected length.",
  ],
  parts: [
    {
      name: "DateInput.Root",
      description: "The fieldset and the wiring; native <fieldset> props are forwarded.",
      props: [
        {
          name: "name",
          type: "string",
          description:
            "Prefix for each field's submitted name: {name}-day, {name}-month, {name}-year.",
        },
        {
          name: "autoComplete",
          type: `"bday"`,
          description: "Wires browser date-of-birth autofill (WCAG 1.3.5).",
        },
      ],
    },
    {
      name: "DateInput.Legend",
      description:
        "Names the group (this is Fieldset.Legend); native <legend> props are forwarded.",
      props: [
        {
          name: "optional",
          type: "boolean",
          default: "false",
          description: "Marks the whole question optional in text.",
        },
      ],
    },
    {
      name: "DateInput.Description",
      description:
        "Helper text linked to the group: give an example date. Native <p> props are forwarded.",
    },
    {
      name: "DateInput.Error",
      description: 'Error message announced via role="alert"; native <p> props are forwarded.',
      props: [
        {
          name: "parts",
          type: `("day" | "month" | "year")[]`,
          description:
            "Narrows the invalid state to the fields the error names; default is all of them.",
        },
      ],
    },
    {
      name: "DateInput.Fields",
      description: "Lays out the row of fields; native <div> props are forwarded.",
    },
    {
      name: "DateInput.Field",
      description:
        "One labelled date field. All native <input> props are forwarded: value, onChange, maxLength, refs.",
      props: [
        {
          name: "part",
          type: `"day" | "month" | "year"`,
          description: "Which date part this field asks for (required).",
        },
        {
          name: "children",
          type: "ReactNode",
          default: `"Day" / "Month" / "Year"`,
          description: "The visible field label.",
        },
      ],
    },
  ],
};

export default doc;
