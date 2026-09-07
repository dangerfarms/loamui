"use client";

import { createContext, useContext, useId, useMemo } from "react";
import type { FormHTMLAttributes, LabelHTMLAttributes, Ref } from "react";
import { cx } from "../../utils";
import { useFieldControlProps } from "../Field/Field";
import { Button } from "../Button/Button";
import type { ButtonProps } from "../Button/Button";
import { Input } from "../Input/Input";
import type { InputProps } from "../Input/Input";

/**
 * The site's or page's search, composed from parts.
 *
 * The Root renders a native `<search>` element — the search landmark
 * itself — around a native `<form>`, so submitting is the browser's: Enter in the box, the button, a GET to `action` with the
 * query under `name`. The Input is the library's Input with
 * `type="search"`, which keeps the platform's own clear affordance; the
 * Button is the library's Button as a submit.
 *
 * Every search needs a name. Search.Label gives the box one that is read
 * but not seen (style it to show it); a Field around the Input names it
 * visibly instead, and the Input wires itself to that Field. The landmark
 * is named "Search" by default — give a second search on the page its own
 * `aria-label` ("Site search", "Search this table") so the two are told
 * apart in a landmark list.
 *
 * ```tsx
 * <Search.Root action="/search">
 *   <Search.Label>Search this site</Search.Label>
 *   <Search.Input />
 *   <Search.Button />
 * </Search.Root>
 * ```
 */

interface SearchContextValue {
  /** The Input's id, for the Label's `htmlFor` when no Field names it. */
  inputId: string;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function useSearchContext(part: string): SearchContextValue {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error(`${part} must be rendered inside <Search.Root>.`);
  }
  return ctx;
}

export interface SearchRootProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * The landmark's accessible name. Two searches on one page must differ
   * ("Site search", "Search this table"). @default "Search"
   */
  "aria-label"?: string;
  /** The form element (the landmark wraps it). */
  ref?: Ref<HTMLFormElement>;
}

function SearchRoot({
  "aria-label": ariaLabel = "Search",
  className,
  style,
  method = "get",
  children,
  ref,
  ...rest
}: SearchRootProps) {
  const inputId = useId();
  const value = useMemo<SearchContextValue>(() => ({ inputId }), [inputId]);
  return (
    <SearchContext value={value}>
      {/* className and style dress the landmark; the form gets the rest,
          so action, method, onSubmit and the ref reach the element that
          submits. No role: <search> is the search landmark by itself. */}
      <search className={cx("loam-Search", className)} style={style} aria-label={ariaLabel}>
        <form ref={ref} method={method} {...rest}>
          {children}
        </form>
      </search>
    </SearchContext>
  );
}

export interface SearchLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * The box's name, read but not seen. Not needed when a Field around the
 * Input names it visibly.
 */
function SearchLabel({ className, children, ...rest }: SearchLabelProps) {
  const ctx = useSearchContext("Search.Label");
  return (
    <label className={cx("loam-VisuallyHidden", className)} htmlFor={ctx.inputId} {...rest}>
      {children}
    </label>
  );
}

export interface SearchInputProps extends Omit<InputProps, "type"> {
  /** The query's key in the submitted URL. @default "q" */
  name?: string;
}

/** The library's Input as a search box, named by Search.Label or a Field. */
function SearchInput({ name = "q", id, ...rest }: SearchInputProps) {
  const ctx = useSearchContext("Search.Input");
  const field = useFieldControlProps();
  return (
    <div className="control">
      <Input
        type="search"
        name={name}
        // A Field around the box names it and owns its id; otherwise the
        // Root's id is what Search.Label points at.
        id={id ?? field.id ?? ctx.inputId}
        inputMode="search"
        enterKeyHint="search"
        {...rest}
      />
    </div>
  );
}

export interface SearchButtonProps extends ButtonProps {}

/**
 * The submit. Children default to "Search"; an icon with an `aria-label`
 * makes it icon-only (Button detects that from the name).
 */
function SearchButton({ children, ...rest }: SearchButtonProps) {
  useSearchContext("Search.Button");
  return (
    <Button type="submit" {...rest}>
      {children ?? "Search"}
    </Button>
  );
}

export const Search = {
  Root: SearchRoot,
  Label: SearchLabel,
  Input: SearchInput,
  Button: SearchButton,
};
