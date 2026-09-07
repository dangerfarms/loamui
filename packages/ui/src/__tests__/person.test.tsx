import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar } from "@loamui/core";
import { Person } from "../components/Person/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Person", () => {
  it("stands alone as an avatar over a name and a role, with no axe violations", async () => {
    const { container } = render(
      <Person.Root>
        <Avatar name="Imogen Hartley" aria-hidden />
        <Person.Name>Imogen Hartley</Person.Name>
        <Person.Role>Founder</Person.Role>
      </Person.Root>,
    );
    expect(container.firstElementChild).toHaveClass("loam-Person");
    expect(screen.getByRole("heading", { level: 3, name: "Imogen Hartley" })).toBeInTheDocument();
    expect(screen.getByText("Founder")).toHaveClass("role");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("renders as list items inside a list the consumer wrote", async () => {
    const { container } = render(
      <ul aria-label="The team">
        <Person.Root render={<li />}>
          <Avatar name="Rafael Okonkwo" aria-hidden />
          <Person.Name>Rafael Okonkwo</Person.Name>
          <Person.Role>Engineering lead</Person.Role>
        </Person.Root>
        <Person.Root render={<li />}>
          <Avatar name="Sunniva Berg" aria-hidden />
          <Person.Name render={<p />}>Sunniva Berg</Person.Name>
          <Person.Role>Design</Person.Role>
        </Person.Root>
      </ul>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("loam-Person");
    expect(screen.getByText("Sunniva Berg").tagName).toBe("P");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
