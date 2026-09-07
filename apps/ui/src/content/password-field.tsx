"use client";

import { PasswordField } from "@loamui/ui";
import type { Composition } from "./types";

const passwordField: Composition = {
  slug: "password-field",
  name: "Password field",
  category: "Forms",
  description:
    "A field for making up a password: the input, a strength meter and the rules in plain words, ticked as they are met.",
  lead: "A core Field around core's PasswordInput, the box with its Show password toggle, a core Meter that reads the strength in a word, and a list of rules written as sentences that tick as the typing meets them, joined to the box so a screen reader hears them on landing in it. Nothing blocks the submit: the rules are guidance while typing, the strength is a reading, and the server decides.",
  importLine: `import { PasswordField } from "@loamui/ui";`,
  parts: [
    {
      name: "PasswordField.Root",
      description:
        'A core Field.Root around one column. It wires the label, description and error to the input the way any core Field does, and holds what is typed so the Strength and Rules can read it. The value stays in the component; it is scored and tested, and goes nowhere. Every word the composition says on its own is in labels, each with an English default: show ("Show password"), meter ("Password strength"), strength (a level 0–4 to nothing, "Weak", "Fair" or "Strong"), empty ("Nothing typed yet", the Meter\'s words while there is no strength word), met and notMet.',
    },
    {
      name: "PasswordField.Label",
      description: "The input's real label: core Field.Label.",
    },
    {
      name: "PasswordField.Description",
      description:
        "The rules in one sentence before the box, joined to the input with aria-describedby so a screen reader hears them before typing: core Field.Description.",
    },
    {
      name: "PasswordField.Input",
      description:
        "Core PasswordInput, untouched: the box and its Show password toggle, with autoComplete=\"new-password\" so a password manager offers to make one up. The toggle's words come from the Root's labels.show, and the part adds the Rules list to the box's aria-describedby while one is rendered. className, style, ref and every other prop land on the input itself; wrapperProps reach the row.",
    },
    {
      name: "PasswordField.Strength",
      description:
        "A core Meter, untouched, in the composition's own slot, with the level beside it in a word: Weak, Fair or Strong, and nothing while nothing is typed, because an empty box is not a weak password. The word is also the meter's aria-valuetext (labels.empty while there is no word), so a screen reader hears the word rather than a percentage, and it is a polite live region, announced when the word changes and never per keystroke. Pass strength, a function from the value to 0–4; the default counts length only and says so.",
    },
    {
      name: "PasswordField.Rules",
      description:
        "The list of rules: a plain ul, no roles, joined to the input with aria-describedby while it is rendered, so a screen reader hears the rules on landing in the box. Not a live region: a list that re-announced on every keystroke would drown the typing.",
    },
    {
      name: "PasswordField.Rule",
      description:
        'One rule as a sentence with a test from the value to true or false. Met, the item carries data-met, which the CSS answers with a tick in the success colour and darker text; the state is also in the words "met" and "not met" after the sentence, visually hidden, so it is never colour alone.',
    },
    {
      name: "PasswordField.Error",
      description:
        "The message after a failed submit, in the words of the rule that was broken: core Field.Error. It sets aria-invalid on the input and is announced.",
    },
  ],
  demos: [
    {
      title: "Create a password",
      description:
        'Type into the box and the meter and the rules answer. The Description states the rules in one sentence before the box, so a screen reader hears them before typing and nobody meets a rule for the first time in an error; the list below is the same rules as a checklist. The Strength here uses the default scoring, which counts length and nothing else: it is a placeholder for an estimator of your own, passed as strength, and the page says so rather than dressing it up. The rules ask for length and variety (at least 12 characters, more than one word, not the email address) rather than a capital, a number and a symbol: a rule about what a password is made of is one the visitor has to remember along with the password. The toggle after the box says "Show password"; a long password is checked by reading it, not by typing it twice.',
      code: `<PasswordField.Root>
  <PasswordField.Label>Password</PasswordField.Label>
  <PasswordField.Description>
    At least 12 characters. A few unrelated words are easier to remember than one word with numbers in it.
  </PasswordField.Description>
  <PasswordField.Input name="password" />
  <PasswordField.Strength />
  <PasswordField.Rules>
    <PasswordField.Rule test={(value) => value.length >= 12}>
      At least 12 characters
    </PasswordField.Rule>
    <PasswordField.Rule test={(value) => /\\s/.test(value) || value.length >= 20}>
      More than one word, or 20 characters
    </PasswordField.Rule>
    <PasswordField.Rule test={(value) => !value.includes("@")}>
      Not your email address
    </PasswordField.Rule>
  </PasswordField.Rules>
</PasswordField.Root>`,
      render: () => (
        <PasswordField.Root>
          <PasswordField.Label>Password</PasswordField.Label>
          <PasswordField.Description>
            At least 12 characters. A few unrelated words are easier to remember than one word with
            numbers in it.
          </PasswordField.Description>
          <PasswordField.Input name="password" />
          <PasswordField.Strength />
          <PasswordField.Rules>
            <PasswordField.Rule test={(value) => value.length >= 12}>
              At least 12 characters
            </PasswordField.Rule>
            <PasswordField.Rule test={(value) => /\s/.test(value) || value.length >= 20}>
              More than one word, or 20 characters
            </PasswordField.Rule>
            <PasswordField.Rule test={(value) => !value.includes("@")}>
              Not your email address
            </PasswordField.Rule>
          </PasswordField.Rules>
        </PasswordField.Root>
      ),
    },
    {
      title: "With an error",
      description:
        'The state after a failed submit, as the consumer renders it: a Field.Error in the words of the rule that was broken, "Enter a password of at least 12 characters", never "invalid" or "required". The Error sets aria-invalid on the input, joins the message to it with aria-describedby and announces it; nothing typed is cleared, and the meter and the rules go on answering the value that is there, so the visitor can see which rule the error is about.',
      code: `<PasswordField.Root>
  <PasswordField.Label>Password</PasswordField.Label>
  <PasswordField.Description>
    At least 12 characters. A few unrelated words are easier to remember than one word with numbers in it.
  </PasswordField.Description>
  <PasswordField.Error>Enter a password of at least 12 characters</PasswordField.Error>
  <PasswordField.Input name="password" defaultValue="correct" />
  <PasswordField.Strength />
  <PasswordField.Rules>
    <PasswordField.Rule test={(value) => value.length >= 12}>
      At least 12 characters
    </PasswordField.Rule>
    <PasswordField.Rule test={(value) => /\\s/.test(value) || value.length >= 20}>
      More than one word, or 20 characters
    </PasswordField.Rule>
    <PasswordField.Rule test={(value) => !value.includes("@")}>
      Not your email address
    </PasswordField.Rule>
  </PasswordField.Rules>
</PasswordField.Root>`,
      render: () => (
        <PasswordField.Root>
          <PasswordField.Label>Password</PasswordField.Label>
          <PasswordField.Description>
            At least 12 characters. A few unrelated words are easier to remember than one word with
            numbers in it.
          </PasswordField.Description>
          <PasswordField.Error>Enter a password of at least 12 characters</PasswordField.Error>
          <PasswordField.Input name="password" defaultValue="correct" />
          <PasswordField.Strength />
          <PasswordField.Rules>
            <PasswordField.Rule test={(value) => value.length >= 12}>
              At least 12 characters
            </PasswordField.Rule>
            <PasswordField.Rule test={(value) => /\s/.test(value) || value.length >= 20}>
              More than one word, or 20 characters
            </PasswordField.Rule>
            <PasswordField.Rule test={(value) => !value.includes("@")}>
              Not your email address
            </PasswordField.Rule>
          </PasswordField.Rules>
        </PasswordField.Root>
      ),
    },
  ],
  whenToUse: [
    "Anywhere a visitor makes up a password: creating an account, setting one from an invitation or a reset link, changing one in settings. The field is the unit; it drops into an AccountForm or any form of your own.",
    "When the rules are worth showing as they are met. A rule the visitor can watch turn into a tick is one they never meet for the first time in an error, and a meter says in a word whether a longer password is worth the trouble.",
  ],
  whenNotToUse: [
    'Signing in. That box asks for a password that already exists, so there are no rules to meet and no strength to read; a meter there would score the visitor\'s existing password and tell them nothing they can act on. Use a plain core Field with an Input, type password, autoComplete="current-password", as the AccountForm sign-in recipe does.',
    "As a confirm-password pair. Typing the password twice catches fewer mistakes than seeing it once, which is what the Show password toggle is for, and a password manager fills both boxes with the same string anyway, so the second box checks nothing. One field, shown on request, is the whole pattern.",
  ],
};

export default passwordField;
