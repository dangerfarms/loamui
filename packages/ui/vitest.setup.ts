// Extends vitest's `expect` with jest-dom + axe matchers (runtime).
import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(axeMatchers);

// jsdom 25 doesn't implement <dialog> show/showModal/close (added in jsdom
// 26). Minimal shim: toggles `open` and fires the `close` event — enough for
// the Modal state-sync tests. Delete when jsdom is upgraded.
if (
  typeof HTMLDialogElement !== "undefined" &&
  typeof HTMLDialogElement.prototype.showModal !== "function"
) {
  HTMLDialogElement.prototype.show = function show() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function close(returnValue?: string) {
    if (!this.hasAttribute("open")) return;
    if (returnValue !== undefined) this.returnValue = returnValue;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}
