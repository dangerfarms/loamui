import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateInput } from "../../index";

const meta = {
  title: "Inputs/DateInput",
  component: DateInput.Root,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composable parts for asking for a memorable date — one already " +
          "known, like a date of birth — which is typed, not picked. Each " +
          "part is a separate labelled field inside a `<fieldset>`, so " +
          "render only the parts you need and the wiring adapts.",
      },
    },
  },
} satisfies Meta<typeof DateInput.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A memorable date is typed, not picked. The example date uses a day above
 * 12 and a month of 9 or less, so the field order is unambiguous and it is
 * clear leading zeros are not required.
 */
export const Default: Story = {
  render: () => (
    <DateInput.Root name="date-of-birth" autoComplete="bday">
      <DateInput.Legend>Date of birth</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2007</DateInput.Description>
      <DateInput.Fields>
        <DateInput.Field part="day" />
        <DateInput.Field part="month" />
        <DateInput.Field part="year" />
      </DateInput.Fields>
    </DateInput.Root>
  ),
};

/**
 * When the error names a specific part, `parts` on the Error narrows the
 * invalid styling to just that field; the other parts keep their values and
 * their normal borders.
 */
export const ErrorOnOnePart: Story = {
  render: () => (
    <DateInput.Root name="membership-start">
      <DateInput.Legend>When did your membership start?</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2019</DateInput.Description>
      <DateInput.Error parts={["year"]}>Membership start date must include a year</DateInput.Error>
      <DateInput.Fields>
        <DateInput.Field part="day" defaultValue="27" />
        <DateInput.Field part="month" defaultValue="3" />
        <DateInput.Field part="year" />
      </DateInput.Fields>
    </DateInput.Root>
  ),
};
