import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar } from "@loamui/core";
import { Team } from "../components/Team/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Team", () => {
  it("renders a section with a list of members and no axe violations", async () => {
    const { container } = render(
      <Team.Root aria-labelledby="t">
        <h2 id="t">The team</h2>
        <Team.Grid>
          <Team.Member>
            <Avatar name="Imogen Hartley" aria-hidden />
            <Team.Name>Imogen Hartley</Team.Name>
            <Team.Role>Founder</Team.Role>
          </Team.Member>
          <Team.Member>
            <Avatar name="Rafael Okonkwo" aria-hidden />
            <Team.Name>Rafael Okonkwo</Team.Name>
            <Team.Role>Engineering lead</Team.Role>
          </Team.Member>
          <Team.Member>
            <Avatar name="Sunniva Berg" aria-hidden />
            <Team.Name>Sunniva Berg</Team.Name>
            <Team.Role>Design</Team.Role>
          </Team.Member>
          <Team.Member>
            <Avatar name="Tomasz Wieczorek" aria-hidden />
            <Team.Name>Tomasz Wieczorek</Team.Name>
            <Team.Role>Accessibility</Team.Role>
          </Team.Member>
        </Team.Grid>
      </Team.Root>,
    );
    const region = screen.getByRole("region", { name: "The team" });
    expect(region).toHaveClass("loam-Team");
    expect(screen.getByRole("list")).toHaveClass("grid");
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(screen.getByRole("heading", { level: 3, name: "Sunniva Berg" })).toBeInTheDocument();
    expect(screen.getByText("Engineering lead")).toHaveClass("role");
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
