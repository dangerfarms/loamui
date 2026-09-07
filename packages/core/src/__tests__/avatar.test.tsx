import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Avatar } from "../components/Avatar/index";

afterEach(cleanup);

const axeOptions = { rules: { "color-contrast": { enabled: false } } };

describe("Avatar initials", () => {
  it("takes the first grapheme of the first and last words", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent(/^AL$/);
  });

  it("takes two graphemes of a single word", () => {
    render(<Avatar name="Ada" />);
    expect(screen.getByRole("img", { name: "Ada" })).toHaveTextContent(/^AD$/);
  });

  it("keeps a grapheme whole where a code unit would split it", () => {
    render(<Avatar name="👩‍🚀 Ríos" />);
    expect(screen.getByRole("img", { name: "👩‍🚀 Ríos" })).toHaveTextContent(/^👩‍🚀R$/);
  });
});

describe("Avatar.Group", () => {
  it("is a list of the avatars given, plus the overflow count", () => {
    render(
      <Avatar.Group more={5}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
      </Avatar.Group>,
    );
    const list = screen.getByRole("list");
    expect(list).toHaveClass("loam-Avatar-group");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByRole("img", { name: "5 more" })).toHaveTextContent("+5");
  });

  it("names the overflow through labels.more", () => {
    render(
      <Avatar.Group more={2} labels={{ more: (n) => `${n} more people` }}>
        <Avatar name="Ada Lovelace" />
      </Avatar.Group>,
    );
    expect(screen.getByRole("img", { name: "2 more people" })).toBeInTheDocument();
  });

  it("renders no overflow item for zero", () => {
    render(
      <Avatar.Group more={0}>
        <Avatar name="Ada Lovelace" />
      </Avatar.Group>,
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Avatar.Group more={3}>
        <Avatar name="Ada Lovelace" />
        <Avatar name="Grace Hopper" />
      </Avatar.Group>,
    );
    expect(await axe(container, axeOptions)).toHaveNoViolations();
  });
});
