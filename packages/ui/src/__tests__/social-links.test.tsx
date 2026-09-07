import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { axe } from "vitest-axe";
import { SocialLinks } from "../index";

afterEach(cleanup);
const axeOptions = { rules: { "color-contrast": { enabled: false } } };

function Icon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

describe("SocialLinks", () => {
  it("is a named nav around a list of links named by their hidden text", async () => {
    const { container } = render(
      <SocialLinks.Root>
        <SocialLinks.Item>
          <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
            <Icon />
          </SocialLinks.Link>
        </SocialLinks.Item>
        <SocialLinks.Item>
          <SocialLinks.Link href="https://bsky.app/profile/loamui.com" label="Bluesky">
            <Icon />
          </SocialLinks.Link>
        </SocialLinks.Item>
      </SocialLinks.Root>,
    );
    const nav = screen.getByRole("navigation", { name: "Social" });
    expect(nav).toHaveClass("loam-SocialLinks");
    expect(nav.querySelector(":scope > ul")).not.toBeNull();
    expect(screen.getByRole("list")).toBe(nav.querySelector("ul"));
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    for (const label of ["GitHub", "Bluesky"]) {
      const link = screen.getByRole("link", { name: label });
      expect(link.getAttribute("rel")?.split(" ")).toContain("me");
      expect(link).not.toHaveAttribute("aria-label");
      expect(link.querySelector("span.loam-VisuallyHidden")).toHaveTextContent(label);
      expect(link.querySelector("svg")!.closest('[aria-hidden="true"]')).not.toBeNull();
    }
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });

  it("takes another landmark name and another rel", () => {
    render(
      <SocialLinks.Root aria-label="Follow Priya">
        <SocialLinks.Item>
          <SocialLinks.Link href="https://mastodon.social/@priya" label="Mastodon" rel="external">
            <Icon />
          </SocialLinks.Link>
        </SocialLinks.Item>
      </SocialLinks.Root>,
    );
    expect(screen.getByRole("navigation", { name: "Follow Priya" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mastodon" })).toHaveAttribute("rel", "external");
  });

  it("yields its default name to a consumer's aria-labelledby", () => {
    render(
      <>
        <h2 id="follow">Follow us</h2>
        <SocialLinks.Root aria-labelledby="follow">
          <SocialLinks.Item>
            <SocialLinks.Link href="https://github.com/loamui" label="GitHub">
              <Icon />
            </SocialLinks.Link>
          </SocialLinks.Item>
        </SocialLinks.Root>
      </>,
    );
    const nav = screen.getByRole("navigation", { name: "Follow us" });
    expect(nav).not.toHaveAttribute("aria-label");
    expect(nav).toHaveAttribute("aria-labelledby", "follow");
  });
});
