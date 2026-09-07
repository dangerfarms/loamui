import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { PasswordField, lengthStrength } from "../components/PasswordField/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function createPassword() {
  return (
    <PasswordField.Root>
      <PasswordField.Label>Password</PasswordField.Label>
      <PasswordField.Description>At least 12 characters.</PasswordField.Description>
      <PasswordField.Input name="password" />
      <PasswordField.Strength />
      <PasswordField.Rules>
        <PasswordField.Rule test={(value) => value.length >= 12}>
          At least 12 characters
        </PasswordField.Rule>
        <PasswordField.Rule test={(value) => /\d/.test(value)}>A number</PasswordField.Rule>
      </PasswordField.Rules>
    </PasswordField.Root>
  );
}

describe("PasswordField", () => {
  it("labels and describes the input through the Field, and asks for a new password", async () => {
    const { container } = render(createPassword());
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("autocomplete", "new-password");
    expect(input).toHaveAccessibleDescription("At least 12 characters.");
    expect(
      container.querySelector(".loam-PasswordField > div.input > div.control"),
    ).toContainElement(input);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("scores the typing on the Meter and names the band beside it", async () => {
    const user = userEvent.setup();
    render(createPassword());
    const input = screen.getByLabelText("Password");
    const meter = screen.getByRole("meter", { name: "Password strength" });
    expect(meter).toHaveAttribute("value", "0");
    expect(meter).toHaveAttribute("aria-valuetext", "Weak");
    // Core's Meter, untouched, in the composition's own slot.
    expect(meter.className).toBe("loam-Meter");
    expect(meter.parentElement).toHaveClass("strength");
    expect(screen.getByText("Weak")).toHaveAttribute("aria-live", "polite");

    await user.type(input, "correcthor");
    expect(meter).toHaveAttribute("value", "2");
    expect(meter).toHaveAttribute("aria-valuetext", "Fair");
    expect(screen.getByText("Fair")).toBeInTheDocument();

    await user.type(input, "sebatterystaple");
    expect(meter).toHaveAttribute("value", "4");
    expect(screen.getByText("Strong")).toBeInTheDocument();
  });

  it("takes the consumer's own scoring", async () => {
    const user = userEvent.setup();
    render(
      <PasswordField.Root>
        <PasswordField.Label>Password</PasswordField.Label>
        <PasswordField.Input name="password" />
        <PasswordField.Strength strength={(value) => (value.includes("!") ? 4 : 0)} />
      </PasswordField.Root>,
    );
    const meter = screen.getByRole("meter", { name: "Password strength" });
    await user.type(screen.getByLabelText("Password"), "a!");
    expect(meter).toHaveAttribute("value", "4");
    expect(screen.getByText("Strong")).toBeInTheDocument();
  });

  it("shows and hides the password from a pressed toggle whose name never changes", async () => {
    const user = userEvent.setup();
    render(createPassword());
    const input = screen.getByLabelText("Password");
    const toggle = screen.getByRole("button", { name: "Show password" });
    expect(toggle).toHaveAttribute("type", "button");
    expect(toggle).toHaveAttribute("aria-pressed", "false");

    await user.type(input, "hunter22");
    await user.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveValue("hunter22");
    // Pressed is the one signal: the name stays, so it is not said twice.
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(toggle).toHaveAccessibleName("Show password");
    expect(toggle).toHaveTextContent("Show password");

    await user.click(toggle);
    expect(input).toHaveAttribute("type", "password");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
  });

  it("says every one of its words in the language the labels give it", async () => {
    const user = userEvent.setup();
    render(
      <PasswordField.Root
        labels={{
          show: "Mot de passe visible",
          meter: "Solidité du mot de passe",
          strength: (level) => ["Vide", "Faible", "Faible", "Moyen", "Fort"][level]!,
          met: "respectée",
          notMet: "non respectée",
        }}
      >
        <PasswordField.Label>Mot de passe</PasswordField.Label>
        <PasswordField.Input name="password" />
        <PasswordField.Strength />
        <PasswordField.Rules>
          <PasswordField.Rule test={(value) => value.length >= 12}>
            Au moins 12 caractères
          </PasswordField.Rule>
        </PasswordField.Rules>
      </PasswordField.Root>,
    );
    expect(screen.getByRole("button", { name: "Mot de passe visible" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    const meter = screen.getByRole("meter", { name: "Solidité du mot de passe" });
    expect(meter).toHaveAttribute("aria-valuetext", "Vide");
    const rule = screen.getByRole("listitem");
    expect(rule).toHaveTextContent(/^Au moins 12 caractères, non respectée$/);

    await user.type(screen.getByLabelText("Mot de passe"), "douze caractères");
    expect(meter).toHaveAttribute("aria-valuetext", "Fort");
    expect(screen.getByText("Fort")).toHaveAttribute("aria-live", "polite");
    expect(rule).toHaveTextContent(/^Au moins 12 caractères, respectée$/);
  });

  it("ticks a rule once the typing meets it, in hidden words as well as data-met", async () => {
    const user = userEvent.setup();
    const { container } = render(createPassword());
    const rules = screen.getByRole("list");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    const [length, number] = items as [HTMLElement, HTMLElement];
    expect(rules).toHaveClass("rules");
    expect(length).not.toHaveAttribute("data-met");
    expect(length).toHaveTextContent(/^At least 12 characters, not met$/);
    expect(length.querySelector("svg")).toHaveAttribute("aria-hidden", "true");

    await user.type(screen.getByLabelText("Password"), "1");
    expect(number).toHaveAttribute("data-met");
    expect(number).toHaveTextContent(/^A number, met$/);
    expect(length).not.toHaveAttribute("data-met");

    await user.type(screen.getByLabelText("Password"), "twelve chars");
    expect(length).toHaveAttribute("data-met");
    expect(length).toHaveTextContent(/^At least 12 characters, met$/);
    // The state is on the item for styling, and in words hidden by core's
    // shared class, not a recipe of this composition's own.
    expect(number.querySelector(".loam-VisuallyHidden")).toHaveTextContent("met");
    expect(number.querySelector(".visually-hidden")).not.toBeInTheDocument();
    expect(rules.tagName).toBe("UL");
    expect(rules).not.toHaveAttribute("role");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("reads a value the browser filled before anyone typed", () => {
    render(
      <PasswordField.Root>
        <PasswordField.Label>Password</PasswordField.Label>
        <PasswordField.Input name="password" defaultValue="restored password" />
        <PasswordField.Strength />
      </PasswordField.Root>,
    );
    expect(screen.getByRole("meter", { name: "Password strength" })).toHaveAttribute("value", "4");
  });

  it("marks the input invalid from an Error and describes it with the message", async () => {
    const { container } = render(
      <PasswordField.Root>
        <PasswordField.Label>Password</PasswordField.Label>
        <PasswordField.Input name="password" defaultValue="short" />
        <PasswordField.Error>Enter a password of at least 12 characters</PasswordField.Error>
      </PasswordField.Root>,
    );
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/Enter a password of at least 12 characters/);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Error: Enter a password of at least 12 characters",
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("scores length alone by default", () => {
    expect(lengthStrength("")).toBe(0);
    expect(lengthStrength("short")).toBe(1);
    expect(lengthStrength("ninechars")).toBe(2);
    expect(lengthStrength("twelve chars")).toBe(3);
    expect(lengthStrength("sixteen characte")).toBe(4);
  });
});
