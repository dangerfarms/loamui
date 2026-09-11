import type { ExampleMeta } from "@/examples/types";

export const meta: ExampleMeta = {
  title: "Sign in with errors",
  description:
    "A sign-in form that helps people correct missing or mistyped details, with a focused error summary and matching field messages.",
  whenToUse:
    "Use for email-and-password sign-in when validation needs a summary as well as errors beside each field. Errors appear after submission, so people can finish entering their details before being asked to correct them.",
  integration:
    "Submit the empty form or a mistyped email to try the error flow. Pass an action URL to use your own POST endpoint; the sample defaults to /sign-in. Valid input navigates to that endpoint without storing credentials in React state. Implement authentication and server validation there, including validation when JavaScript is unavailable. Native required and email checks remain active before hydration. Return authentication failures without revealing whether an account exists, and prefix the response page title with Error:. Preserve the email and persistent-session choice after server rejection, but never echo the password into response HTML. Provide the recovery and registration routes and implement the optional persistent session. This recipe does not authenticate anyone or store credentials.",
  category: "forms",
  uses: ["Button", "Card", "Checkbox", "ErrorSummary", "Field", "Input", "PasswordInput"],
  notes: {
    native:
      "A native POST form retains username and current-password autocomplete. Native validation blocks invalid submissions before and after hydration. React handles invalid events to replace browser popups with the error summary, reading built-in validity states without an email regex or additional password rules.",
    modern:
      "Recipe styles sit in loamui.components inside donut scopes. The outer container lets Card and the form resolve fluid tokens locally; element styles supply the heading typography, while grid gap owns form spacing.",
    composition:
      "Card supplies the surface without structural overrides. ErrorSummary, Field.Error, Input and PasswordInput retain their own styling and behavior. Each error string is shared between its summary link and field message.",
    context:
      "The action region declares --loam-context: primary. Rendering Field.Error makes the field invalid through the primitive's detection; the recipe neither sets aria-invalid manually nor repaints an input border.",
    accessible:
      "The form stays enabled while people enter details; errors are reported after a validation attempt, without validating each keystroke. A failed submit mounts a focused ErrorSummary; each further failed attempt focuses it again. Its links focus the corresponding controls through core's wiring. useId keeps the targets unique, values remain entered, and the persistent-session checkbox starts unchecked.",
  },
  tags: ["validation", "error summary", "login", "account"],
  order: 1,
};
