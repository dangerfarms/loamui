import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Sign in with errors",
  description:
    "A sign-in form that helps people correct missing or mistyped details, with a focused error summary and matching field messages.",
  whenToUse:
    "Use for email-and-password sign-in when validation needs a summary as well as errors beside each field. Errors appear after submission, so people can finish entering their details before being asked to correct them.",
  integration:
    "Submit the empty form or a mistyped email to try local validation. Pass action for your native POST endpoint; the default is /sign-in. On rejection, render a fresh Example with initialResponse: { values: { email, remember }, errors: { form: 'Email address and password do not match' } }. Use errors.email or errors.password for server field-validation messages. General authentication or service errors belong in errors.form; never reveal whether an account exists. The response restores email and the session choice, focuses the summary after hydration and never accepts or echoes a password. initialResponse initializes a new POST response, not an asynchronous update to a mounted form. Implement authentication and server validation at the endpoint; after success, establish the session and redirect to the signed-in destination. Set an Error: page-title prefix on rejection. Implement the recovery, registration and persistent-session routes. The recipe does not simulate authentication; test the real endpoint with password managers and mobile keyboards.",
  category: "forms",
  uses: ["Button", "Card", "Checkbox", "ErrorSummary", "Field", "Input", "PasswordInput"],
  notes: {
    native:
      "A native POST form retains username and current-password autocomplete. Native validation blocks invalid submissions before and after hydration. React handles invalid events to replace browser popups with the error summary, reading built-in validity states without an email regex or additional password rules.",
    modern:
      "Recipe styles sit in loamui.components inside donut scopes. The outer container lets Card and the form resolve fluid tokens locally; element styles supply the heading typography, while grid gap owns form spacing.",
    composition:
      "Card supplies the surface without structural overrides. ErrorSummary, Field.Error, Input and PasswordInput retain their own styling and behavior. Each field error is shared between its summary link and field message. A general server failure is summary text, not a fabricated field error.",
    context:
      "The action region declares --loam-context: primary. Rendering Field.Error makes the field invalid through the primitive's detection; the recipe neither sets aria-invalid manually nor repaints an input border.",
    accessible:
      "The form stays enabled while people enter details; errors are reported after a validation attempt, without validating each keystroke. A failed submit mounts a focused ErrorSummary; each further failed attempt focuses it again. Its links focus the corresponding controls through core's wiring. useId keeps the targets unique, values remain entered, and the persistent-session checkbox starts unchecked.",
  },
  tags: ["validation", "error summary", "login", "account"],
  order: 1,
};
