import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { Fieldset, Radio, Select, Switch } from "@loamui/core";
import { SettingRow } from "../components/SettingRow/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("SettingRow", () => {
  it("labels and describes the switch, and the label toggles it", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Fieldset.Root>
        <Fieldset.Legend>Notifications</Fieldset.Legend>
        <SettingRow.Root>
          <SettingRow.Text>
            <SettingRow.Label>Email digest</SettingRow.Label>
            <SettingRow.Description>A summary every Monday morning.</SettingRow.Description>
          </SettingRow.Text>
          <SettingRow.Control>
            <Switch.Control name="digest" />
          </SettingRow.Control>
        </SettingRow.Root>
        <SettingRow.Root>
          <SettingRow.Text>
            <SettingRow.Label>Mentions</SettingRow.Label>
            <SettingRow.Description>When someone names you in a comment.</SettingRow.Description>
          </SettingRow.Text>
          <SettingRow.Control>
            <Switch.Control name="mentions" defaultChecked />
          </SettingRow.Control>
        </SettingRow.Root>
      </Fieldset.Root>,
    );
    expect(screen.getByRole("group", { name: "Notifications" })).toBeInTheDocument();

    const digest = screen.getByRole("switch", { name: "Email digest" });
    expect(digest).toHaveAccessibleDescription("A summary every Monday morning.");
    expect(digest).not.toBeChecked();

    // The Field's parts keep their own classes, placed in the row's Text
    // slot; the composition adds nothing to them.
    const label = screen.getByText("Email digest");
    expect(label).toHaveClass("loam-Field-label");
    expect(label.parentElement).toHaveClass("text");
    expect(label.parentElement!.parentElement).toHaveClass("loam-SettingRow");
    expect(screen.getByText("A summary every Monday morning.")).toHaveClass(
      "loam-Field-description",
    );

    await user.click(label);
    expect(digest).toBeChecked();

    const mentions = screen.getByRole("switch", { name: "Mentions" });
    expect(mentions).toHaveAccessibleDescription("When someone names you in a comment.");
    expect(mentions).toBeChecked();

    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("stands alone, and labels a Select in the control slot", async () => {
    const { container } = render(
      <SettingRow.Root>
        <SettingRow.Text>
          <SettingRow.Label>Theme</SettingRow.Label>
          <SettingRow.Description>Follow the system, or pick one.</SettingRow.Description>
        </SettingRow.Text>
        <SettingRow.Control>
          <Select name="theme" defaultValue="system">
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </SettingRow.Control>
      </SettingRow.Root>,
    );
    const theme = screen.getByRole("combobox", { name: "Theme" });
    expect(theme).toHaveAccessibleDescription("Follow the system, or pick one.");
    expect(theme).toHaveValue("system");
    expect(container.querySelector(".loam-SettingRow > div.control")).toContainElement(theme);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("marks the control invalid from an Error under the words, and renders no slot without one", async () => {
    const { container, rerender } = render(
      <SettingRow.Root>
        <SettingRow.Text>
          <SettingRow.Label>Two-step sign-in</SettingRow.Label>
        </SettingRow.Text>
        <SettingRow.Control>
          <Switch.Control name="two-step" defaultChecked />
        </SettingRow.Control>
        <SettingRow.Error>Add a phone number before turning this on</SettingRow.Error>
      </SettingRow.Root>,
    );
    const control = screen.getByRole("switch", { name: "Two-step sign-in" });
    expect(control).toHaveAttribute("aria-invalid", "true");
    expect(control).toHaveAccessibleDescription("Error: Add a phone number before turning this on");
    const error = screen.getByRole("alert");
    expect(error).toHaveClass("loam-Field-error");
    expect(error.parentElement).toHaveClass("error");
    expect(error.parentElement!.parentElement).toHaveClass("loam-SettingRow");
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    rerender(
      <SettingRow.Root>
        <SettingRow.Text>
          <SettingRow.Label>Two-step sign-in</SettingRow.Label>
        </SettingRow.Text>
        <SettingRow.Control>
          <Switch.Control name="two-step" defaultChecked />
        </SettingRow.Control>
        <SettingRow.Error>{null}</SettingRow.Error>
      </SettingRow.Root>,
    );
    expect(container.querySelector(".loam-SettingRow > div.error")).not.toBeInTheDocument();
    expect(screen.getByRole("switch")).not.toHaveAttribute("aria-invalid");
  });

  it("names a fieldset in the control slot by a Label rendered as a span", async () => {
    const { container } = render(
      <SettingRow.Root id="theme">
        <SettingRow.Text>
          <SettingRow.Label render={<span />}>Theme</SettingRow.Label>
          <SettingRow.Description>Follow the system, or pick one.</SettingRow.Description>
        </SettingRow.Text>
        <SettingRow.Control>
          <Fieldset.Root
            role="radiogroup"
            aria-labelledby="theme-label"
            aria-describedby="theme-description"
          >
            <Radio id="theme-system" name="theme" value="system" label="System" defaultChecked />
            <Radio id="theme-light" name="theme" value="light" label="Light" />
            <Radio id="theme-dark" name="theme" value="dark" label="Dark" />
          </Fieldset.Root>
        </SettingRow.Control>
      </SettingRow.Root>,
    );
    const group = screen.getByRole("radiogroup", { name: "Theme" });
    expect(group).toHaveAccessibleDescription("Follow the system, or pick one.");
    expect(screen.getByRole("radio", { name: "System" })).toBeChecked();
    // Each radio keeps the id it was given; the row's Field would otherwise
    // hand all three the control's id.
    expect(screen.getByRole("radio", { name: "Light" })).toHaveAttribute("id", "theme-light");
    expect(container.querySelectorAll("#theme")).toHaveLength(0);

    // The words are a span with the Label's id, not a label pointing at
    // nothing: a label cannot name a fieldset.
    const words = screen.getByText("Theme");
    expect(words.tagName).toBe("SPAN");
    expect(words).toHaveAttribute("id", "theme-label");
    expect(words).toHaveClass("label");
    expect(words).not.toHaveAttribute("for");
    expect(container.querySelector("label[for='theme']")).not.toBeInTheDocument();
    expect(words.parentElement).toHaveClass("text");
    expect(await axe(container, axeOptions)).toHaveNoViolations();

    // The default Label carries the same id, so the two cases are one contract.
    cleanup();
    render(
      <SettingRow.Root id="digest">
        <SettingRow.Text>
          <SettingRow.Label>Email digest</SettingRow.Label>
        </SettingRow.Text>
        <SettingRow.Control>
          <Switch.Control name="digest" />
        </SettingRow.Control>
      </SettingRow.Root>,
    );
    const label = screen.getByText("Email digest");
    expect(label.tagName).toBe("LABEL");
    expect(label).toHaveAttribute("id", "digest-label");
    expect(label).toHaveAttribute("for", "digest");
    expect(screen.getByRole("switch", { name: "Email digest" })).toHaveAttribute("id", "digest");
  });
});
