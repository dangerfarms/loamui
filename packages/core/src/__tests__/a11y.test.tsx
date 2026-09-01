import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import type { CSSProperties, ReactElement } from "react";

import {
  Button,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  DateInput,
  ErrorSummary,
  Radio,
  RadioGroup,
  Switch,
  Range,
  Badge,
  Card,
  Avatar,
  Table,
  Alert,
  Progress,
  Separator,
  SignpostLink,
  SkipLink,
  Skeleton,
  Loader,
  Tooltip,
  Menu,
  Modal,
  Drawer,
  Popover,
  Toast,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Details,
  Breadcrumbs,
  Pagination,
} from "../index";

afterEach(cleanup);

// Accessible, representative render of every component. axe (in jsdom) checks
// roles/names/ARIA structure — colour-contrast is covered live by Storybook's
// a11y addon in a real browser.
const cases: Array<[string, ReactElement]> = [
  ["Button", <Button>Save changes</Button>],
  [
    "Input",
    <Field.Root>
      <Field.Label>Email</Field.Label>
      <Input type="email" autoComplete="email" />
    </Field.Root>,
  ],
  [
    "Textarea",
    <Field.Root>
      <Field.Label>Bio</Field.Label>
      <Textarea />
    </Field.Root>,
  ],
  [
    "Select",
    <Field.Root>
      <Field.Label>Country</Field.Label>
      <Select>
        <option>United States</option>
        <option>Canada</option>
      </Select>
    </Field.Root>,
  ],
  ["Checkbox", <Checkbox label="Accept the terms" />],
  [
    "DateInput",
    <DateInput.Root name="date-of-birth" autoComplete="bday">
      <DateInput.Legend>Date of birth</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2007</DateInput.Description>
      <DateInput.Fields>
        <DateInput.Field part="day" />
        <DateInput.Field part="month" />
        <DateInput.Field part="year" />
      </DateInput.Fields>
    </DateInput.Root>,
  ],
  [
    "DateInput (error)",
    <DateInput.Root>
      <DateInput.Legend>When did your membership start?</DateInput.Legend>
      <DateInput.Error parts={["year"]}>Membership start date must include a year</DateInput.Error>
      <DateInput.Fields>
        <DateInput.Field part="day" />
        <DateInput.Field part="month" />
        <DateInput.Field part="year" />
      </DateInput.Fields>
    </DateInput.Root>,
  ],
  [
    "RadioGroup",
    <RadioGroup label="Plan" defaultValue="pro">
      <Radio value="free" label="free" />
      <Radio value="pro" label="pro" />
    </RadioGroup>,
  ],
  ["Switch", <Switch label="Email notifications" />],
  [
    "Range",
    <Field.Root>
      <Field.Label>Volume</Field.Label>
      <Range defaultValue={50} />
    </Field.Root>,
  ],
  ["Badge", <Badge>New</Badge>],
  ["Card", <Card>Card content</Card>],
  ["Avatar", <Avatar name="Ada Lovelace" />],
  [
    "Table",
    <Table>
      <caption>Users</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ada</td>
          <td>Admin</td>
        </tr>
      </tbody>
    </Table>,
  ],
  [
    "Alert",
    <div style={{ "--loam-context": "info" } as CSSProperties}>
      <Alert title="Heads up">A new version is available.</Alert>
    </div>,
  ],
  [
    "Alert (composed)",
    <div style={{ "--loam-context": "warning" } as CSSProperties}>
      <Alert.Root>
        <Alert.Body>
          <Alert.Title>Storage almost full</Alert.Title>
          <Alert.Message>Free up space to keep syncing.</Alert.Message>
        </Alert.Body>
      </Alert.Root>
    </div>,
  ],
  ["Progress", <Progress value={40} aria-label="Upload progress" />],
  ["Separator", <Separator />],
  ["SignpostLink", <SignpostLink href="#apply">Start your application</SignpostLink>],
  ["SkipLink", <SkipLink href="#content" />],
  [
    "ErrorSummary",
    <ErrorSummary.Root autoFocus={false}>
      <ErrorSummary.Title />
      <ErrorSummary.List>
        <ErrorSummary.Item href="#email">Enter your email address</ErrorSummary.Item>
      </ErrorSummary.List>
    </ErrorSummary.Root>,
  ],
  [
    "Separator (vertical, in a row)",
    <div style={{ display: "flex", gap: 8 }}>
      <span>Cut</span>
      <Separator orientation="vertical" />
      <span>Copy</span>
    </div>,
  ],
  [
    "Menu (open)",
    <Menu.Root defaultOpen>
      <Menu.Trigger>Options</Menu.Trigger>
      <Menu.Popup>
        <Menu.Item>Rename</Menu.Item>
        <Menu.Item href="/export">Export</Menu.Item>
        <Menu.Separator />
        <Menu.Group>
          <Menu.GroupLabel>Danger zone</Menu.GroupLabel>
          <Menu.Item>Delete</Menu.Item>
        </Menu.Group>
      </Menu.Popup>
    </Menu.Root>,
  ],
  [
    "Toast (viewport with toast)",
    <Toast.Provider>
      <Toast.Viewport>
        <Toast.Root toast={{ id: "t1" }}>
          <Toast.Title>Saved</Toast.Title>
          <Toast.Description>Your changes are live.</Toast.Description>
          <Toast.Close toastId="t1" />
        </Toast.Root>
      </Toast.Viewport>
    </Toast.Provider>,
  ],
  ["Skeleton", <Skeleton width={200} height={16} />],
  ["Loader", <Loader />],
  [
    "Tooltip",
    <Tooltip.Root defaultOpen>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Popup>
        More info <Tooltip.Arrow />
      </Tooltip.Popup>
    </Tooltip.Root>,
  ],
  [
    "Popover",
    <Popover.Root defaultOpen>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Popup>
        <Popover.Title>Panel</Popover.Title>
        <Popover.Description>Popover content</Popover.Description>
        <Popover.Close>Close</Popover.Close>
      </Popover.Popup>
    </Popover.Root>,
  ],
  [
    "Tabs",
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTab value="a">Account</TabsTab>
        <TabsTab value="b">Security</TabsTab>
      </TabsList>
      <TabsPanel value="a">Account panel</TabsPanel>
      <TabsPanel value="b">Security panel</TabsPanel>
    </Tabs>,
  ],
  [
    "Details",
    <Details.Root>
      <Details.Summary>What is LoamUI?</Details.Summary>
      <Details.Content>A component library.</Details.Content>
    </Details.Root>,
  ],
  [
    "Breadcrumbs",
    <Breadcrumbs.Root>
      <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
      <Breadcrumbs.Item current>Billing</Breadcrumbs.Item>
    </Breadcrumbs.Root>,
  ],
  ["Pagination", <Pagination total={5} value={1} getHref={(page) => `?page=${page}`} />],
];

// Colour-contrast needs a real browser to compute styles (jsdom can't), so we
// disable just that rule here — it's checked live by Storybook's a11y addon.
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("accessibility (axe)", () => {
  it.each(cases)("%s has no axe violations", async (_name, ui) => {
    const { container } = render(ui);
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("Modal (open dialog) has no axe violations", async () => {
    render(
      <Modal.Root defaultOpen>
        <Modal.Trigger>Order</Modal.Trigger>
        <Modal.Popup>
          <Modal.Title>Order confirmed</Modal.Title>
          <Modal.Description>Your order is on its way.</Modal.Description>
          <Modal.Close>Close</Modal.Close>
        </Modal.Popup>
      </Modal.Root>,
    );
    expect(await axe(document.body, axeOptions)).toHaveNoViolations();
  });

  it("Drawer (open dialog) has no axe violations", async () => {
    render(
      <Drawer.Root defaultOpen>
        <Drawer.Trigger>Menu</Drawer.Trigger>
        <Drawer.Panel side="start">
          <Drawer.Title>Navigation</Drawer.Title>
          <Drawer.Description>Jump to a section.</Drawer.Description>
          <Drawer.Close>Close</Drawer.Close>
        </Drawer.Panel>
      </Drawer.Root>,
    );
    expect(await axe(document.body, axeOptions)).toHaveNoViolations();
  });
});

describe("Avatar naming", () => {
  it("is decorative when it has no name from any source", () => {
    const { container } = render(<Avatar />);
    const root = container.querySelector(".loam-Avatar");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root).not.toHaveAttribute("role");
  });

  it("is a named image when a name is given", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toBeInTheDocument();
  });

  it("honours a consumer-supplied aria-label", () => {
    render(<Avatar aria-label="Team member" />);
    expect(screen.getByRole("img", { name: "Team member" })).toBeInTheDocument();
  });
});

describe("DateInput wiring", () => {
  const threeFields = (
    <DateInput.Fields>
      <DateInput.Field part="day" />
      <DateInput.Field part="month" />
      <DateInput.Field part="year" />
    </DateInput.Fields>
  );

  it("renders three labelled numeric fields named and autofillable per part", () => {
    render(
      <DateInput.Root name="date-of-birth" autoComplete="bday">
        <DateInput.Legend>Date of birth</DateInput.Legend>
        <DateInput.Description>For example, 27 3 2007</DateInput.Description>
        {threeFields}
      </DateInput.Root>,
    );
    const group = screen.getByRole("group", { name: "Date of birth" });
    expect(group).toHaveAccessibleDescription("For example, 27 3 2007");
    for (const part of ["day", "month", "year"] as const) {
      const field = screen.getByLabelText(part.charAt(0).toUpperCase() + part.slice(1));
      if (part === "month") {
        // The month accepts names ("jan") as well as digits, so it keeps
        // the full keyboard.
        expect(field).not.toHaveAttribute("inputmode");
      } else {
        expect(field).toHaveAttribute("inputmode", "numeric");
      }
      expect(field).toHaveAttribute("name", `date-of-birth-${part}`);
      expect(field).toHaveAttribute("autocomplete", `bday-${part}`);
    }
  });

  it("narrows the invalid state to the parts the error names", () => {
    render(
      <DateInput.Root>
        <DateInput.Legend>When did your membership start?</DateInput.Legend>
        <DateInput.Error parts={["year"]}>
          Membership start date must include a year
        </DateInput.Error>
        {threeFields}
      </DateInput.Root>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Membership start date must include a year",
    );
    expect(screen.getByLabelText("Year")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText("Day")).not.toHaveAttribute("aria-invalid");
    expect(screen.getByLabelText("Month")).not.toHaveAttribute("aria-invalid");
  });

  it("marks all parts invalid when the error names none", () => {
    render(
      <DateInput.Root>
        <DateInput.Legend>Date of birth</DateInput.Legend>
        <DateInput.Error>Enter your date of birth</DateInput.Error>
        {threeFields}
      </DateInput.Root>,
    );
    for (const label of ["Day", "Month", "Year"]) {
      expect(screen.getByLabelText(label)).toHaveAttribute("aria-invalid", "true");
    }
  });

  it("forwards per-field props and custom labels through Field", () => {
    render(
      <DateInput.Root name="dob">
        <DateInput.Legend>Date de naissance</DateInput.Legend>
        <DateInput.Fields>
          <DateInput.Field part="day">Jour</DateInput.Field>
          <DateInput.Field part="month">Mois</DateInput.Field>
          <DateInput.Field part="year" maxLength={4} name="year-of-birth">
            Année
          </DateInput.Field>
        </DateInput.Fields>
      </DateInput.Root>,
    );
    expect(screen.getByLabelText("Jour")).toHaveAttribute("name", "dob-day");
    const year = screen.getByLabelText("Année");
    expect(year).toHaveAttribute("maxlength", "4");
    expect(year).toHaveAttribute("name", "year-of-birth");
  });
});
