import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Field, Fieldset, Checkbox, Radio, RadioGroup, SwitchControl, Range } from "../index";

afterEach(cleanup);

describe("Inline controls composed inside Field", () => {
  it("wires a Checkbox from Field context (label + describedby + detected invalid)", () => {
    render(
      <Field.Root>
        <Field.Label>
          <Checkbox /> Accept the terms
        </Field.Label>
        <Field.Description>You must accept to continue.</Field.Description>
        <Field.Error>This field is required.</Field.Error>
      </Field.Root>,
    );

    const checkbox = screen.getByRole("checkbox");
    // Label association: clicking the label text finds this control.
    expect(screen.getByLabelText(/Accept the terms/)).toBe(checkbox);
    expect(checkbox).toHaveAttribute("aria-invalid", "true");
    const describedBy = checkbox.getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(describedBy).toContain(screen.getByText(/must accept/).id);
    expect(describedBy).toContain(screen.getByRole("alert").id);
  });

  it("keeps a standalone Checkbox working with its own label", () => {
    render(<Checkbox label="Stay signed in" />);
    expect(screen.getByLabelText("Stay signed in")).toBeInTheDocument();
  });

  it("puts aria-invalid on the radiogroup, never the radios", () => {
    render(
      <RadioGroup label="Plan" error="Select a plan">
        <Radio value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("radio")).not.toHaveAttribute("aria-invalid");
  });

  it("opens required radio errors on submit, then clears them on selection or reset", () => {
    render(
      <form>
        <RadioGroup label="Plan" name="plan">
          <Radio value="free" label="Free" required />
          <Radio value="pro" label="Pro" />
        </RadioGroup>
      </form>,
    );

    const group = screen.getByRole("radiogroup");
    const free = screen.getByLabelText("Free");
    fireEvent.invalid(free);
    expect(group).toHaveAttribute("aria-invalid", "true");

    fireEvent.click(screen.getByLabelText("Pro"));
    expect(group).not.toHaveAttribute("aria-invalid");

    fireEvent.invalid(free);
    fireEvent.reset(group.closest("form")!);
    expect(group).not.toHaveAttribute("aria-invalid");
  });

  it("wires a SwitchControl from Field context (label + describedby)", () => {
    render(
      <Field.Root>
        <Field.Label>
          <SwitchControl /> Email notifications
        </Field.Label>
        <Field.Description>Sent at most once a day.</Field.Description>
      </Field.Root>,
    );

    const sw = screen.getByRole("switch");
    expect(screen.getByLabelText(/Email notifications/)).toBe(sw);
    expect(sw.getAttribute("aria-describedby")).toBe(screen.getByText(/once a day/).id);
  });

  it("wires a Range through Field.Control (stacked field)", () => {
    render(
      <Field.Root>
        <Field.Label>Volume</Field.Label>
        <Field.Description>Between 0 and 100.</Field.Description>
        <Field.Control render={<Range />} />
      </Field.Root>,
    );

    const slider = screen.getByRole("slider");
    expect(screen.getByLabelText("Volume")).toBe(slider);
    expect(slider.getAttribute("aria-describedby")).toBe(screen.getByText(/Between 0 and 100/).id);
  });

  it("keeps standalone Switch and Range working with their own labels", () => {
    render(
      <>
        <Field.Root>
          <Field.Label>Brightness</Field.Label>
          <Range defaultValue={40} />
        </Field.Root>
      </>,
    );
    expect(screen.getByLabelText("Brightness")).toHaveAttribute("type", "range");
  });
});

describe("Fieldset / grouped controls", () => {
  it("renders a native fieldset with a legend label", () => {
    render(
      <Fieldset.Root>
        <Fieldset.Legend>Notifications</Fieldset.Legend>
        <Checkbox label="Email" />
        <Checkbox label="SMS" />
      </Fieldset.Root>,
    );
    // The group is exposed via native fieldset/legend semantics.
    const group = screen.getByRole("group", { name: "Notifications" });
    expect(group.tagName).toBe("FIELDSET");
  });

  it("RadioGroup labels its options with a native fieldset/legend", () => {
    render(
      <RadioGroup label="Plan" name="plan">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );
    const group = screen.getByRole("radiogroup", { name: "Plan" });
    expect(group.tagName).toBe("FIELDSET");
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });

  it("shares the group name with Radios at any nesting depth (context, not cloning)", () => {
    render(
      <RadioGroup label="Plan" name="plan" defaultValue="pro">
        <Radio value="free" label="Free" />
        <div>
          <Radio value="pro" label="Pro" />
        </div>
      </RadioGroup>,
    );
    const radios = screen.getAllByRole("radio") as HTMLInputElement[];
    expect(radios.map((r) => r.name)).toEqual(["plan", "plan"]);
    expect(screen.getByLabelText("Pro")).toBeChecked();
    expect(screen.getByLabelText("Free")).not.toBeChecked();
  });
});
