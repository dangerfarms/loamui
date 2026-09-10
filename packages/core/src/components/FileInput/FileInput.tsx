"use client";

import { createContext, use, useCallback, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../utils";
import type { PartProps } from "../../utils";
import { useRequiredContext } from "../../context";
import { composeRefs } from "../../render";
import { useFieldControlProps } from "../Field/Field";
import { useFormReset } from "../../use-form-reset";
import { useUserInvalid } from "../../use-user-invalid";

/**
 * A file picker built on the native `<input type="file">`, composed from
 * parts. The input is the control; the Prompt is its label, so clicking the
 * box opens the picker and keyboard users tab to the input inside it. Drag
 * and drop is an enhancement on the Root: a dropped file lands in the same
 * input, so the form submits it like any other. The Files list is a polite
 * live region, so the choice is announced as well as shown.
 *
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Passport scan</Field.Label>
 *   <Field.Description>PDF or PNG, up to 5 MB</Field.Description>
 *   <FileInput.Root>
 *     <FileInput.Control accept=".pdf,.png" />
 *     <FileInput.Prompt>Choose a file or drop it here</FileInput.Prompt>
 *     <FileInput.Files />
 *   </FileInput.Root>
 * </Field.Root>
 * ```
 */

interface FileInputContextValue {
  /** The control's id, shared so the Prompt can label it. */
  id: string;
  files: File[];
  setFiles: (files: File[]) => void;
}

const FileInputContext = createContext<FileInputContextValue | null>(null);

function useFileInputContext(part: string): FileInputContextValue {
  return useRequiredContext(FileInputContext, part, "FileInput.Root");
}

/**
 * Only a drag carrying files lights the target; text dragged from the page
 * is left to the browser. Outside a browser the transfer may be absent, in
 * which case the drag is taken to be files.
 */
function carriesFiles(transfer: DataTransfer | undefined): boolean {
  return !transfer?.types || Array.from(transfer.types).includes("Files");
}

/** A one-file list: the picker allows a single-file control one file, so a drop does the same. */
function firstOf(files: FileList): FileList {
  const list = new DataTransfer();
  const first = files[0];
  if (first) list.items.add(first);
  return list.files;
}

export interface FileInputRootProps extends PartProps<"div"> {
  children?: ReactNode;
}

/**
 * The drop target and the box. Holds the selected files for the Files
 * part; carries `data-dragging` while a file is held over it.
 */
function FileInputRoot({
  className,
  children,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  ref,
  ...rest
}: FileInputRootProps) {
  const field = useFieldControlProps();
  const autoId = useId();
  const id = field.id ?? autoId;
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  // dragenter/dragleave fire for every descendant the pointer crosses; a
  // depth count keeps the state on until the pointer leaves the box itself.
  const depth = useRef(0);
  const value = useMemo<FileInputContextValue>(() => ({ id, files, setFiles }), [id, files]);

  return (
    <FileInputContext value={value}>
      <div
        ref={ref}
        className={cx("loam-FileInput", className)}
        data-dragging={dragging || undefined}
        {...rest}
        onDragEnter={(event) => {
          onDragEnter?.(event);
          if (!carriesFiles(event.dataTransfer)) return;
          event.preventDefault();
          depth.current += 1;
          setDragging(true);
        }}
        onDragOver={(event) => {
          onDragOver?.(event);
          const transfer = event.dataTransfer;
          if (!carriesFiles(transfer)) return;
          // Without this the browser refuses the drop.
          event.preventDefault();
          if (transfer) transfer.dropEffect = "copy";
        }}
        onDragLeave={(event) => {
          onDragLeave?.(event);
          if (depth.current === 0) return;
          depth.current -= 1;
          if (depth.current === 0) setDragging(false);
        }}
        onDrop={(event) => {
          onDrop?.(event);
          depth.current = 0;
          setDragging(false);
          const transfer = event.dataTransfer;
          if (!carriesFiles(transfer)) return;
          event.preventDefault();
          const input = event.currentTarget.querySelector<HTMLInputElement>('input[type="file"]');
          const dropped = transfer?.files;
          if (!input || input.disabled || !dropped?.length) return;
          // The dropped files become the input's own, so the form submits
          // them and every change listener (the Files list included) runs.
          input.files = input.multiple || dropped.length === 1 ? dropped : firstOf(dropped);
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }}
      >
        {children}
      </div>
    </FileInputContext>
  );
}

export interface FileInputControlProps extends Omit<
  PartProps<"input">,
  "size" | "type" | "value" | "defaultValue"
> {}

/**
 * The native `<input type="file">`. Inside a `Field` it reads its id,
 * description and error wiring from context, like `Input`; inside a
 * `FileInput.Root` it reports its selection to the Files list and is
 * visually hidden, the Prompt being its label and its box. On its own it
 * is the plain native control, in view.
 */
function FileInputControl({
  id,
  className,
  disabled,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
  onChange,
  onInput,
  onInvalid,
  ref,
  ...rest
}: FileInputControlProps) {
  const field = useFieldControlProps(ariaDescribedby);
  const ctx = use(FileInputContext);
  const setFiles = ctx?.setFiles;
  const { nativeInvalid, validationRef, checkOnInput, checkOnInvalid } =
    useUserInvalid<HTMLInputElement>();
  // A form reset empties the control natively; the list follows it.
  const clearFiles = useCallback(() => setFiles?.([]), [setFiles]);
  const resetRef = useFormReset<HTMLInputElement>(clearFiles);
  const inputRef = useMemo(
    () => composeRefs(composeRefs(ref, resetRef), validationRef),
    [ref, resetRef, validationRef],
  );

  return (
    <input
      ref={inputRef}
      id={id ?? ctx?.id ?? field.id}
      type="file"
      className={cx(ctx ? "loam-VisuallyHidden" : undefined, className)}
      disabled={disabled}
      {...rest}
      aria-invalid={ariaInvalid ?? field["aria-invalid"] ?? (nativeInvalid || undefined)}
      aria-describedby={field["aria-describedby"]}
      onChange={(e) => {
        onChange?.(e);
        setFiles?.(Array.from(e.currentTarget.files ?? []));
      }}
      onInput={(e) => {
        onInput?.(e);
        checkOnInput(e);
      }}
      onInvalid={(e) => {
        onInvalid?.(e);
        checkOnInvalid(e);
      }}
    />
  );
}

export interface FileInputPromptProps extends PartProps<"label"> {
  children?: ReactNode;
}

/**
 * The visible invitation ("Choose a file or drop it here"): a `<label>` for
 * the control, so clicking it opens the picker and its text joins the
 * control's accessible name.
 */
function FileInputPrompt({ htmlFor, className, children, ref, ...rest }: FileInputPromptProps) {
  const ctx = useFileInputContext("FileInput.Prompt");
  return (
    <label ref={ref} className={className} htmlFor={htmlFor ?? ctx.id} {...rest}>
      {children}
    </label>
  );
}

const UNITS = [
  ["gigabyte", 1e9],
  ["megabyte", 1e6],
  ["kilobyte", 1e3],
] as const;

/** "512 bytes", "12.3 kB", "4.3 MB": the largest unit the size fills. */
function formatSize(bytes: number, locale: string): string {
  const [unit, factor] = UNITS.find(([, per]) => bytes >= per) ?? ["byte", 1];
  return new Intl.NumberFormat(locale, {
    style: "unit",
    unit,
    unitDisplay: unit === "byte" ? "long" : "short",
    maximumFractionDigits: 1,
  }).format(bytes / factor);
}

export interface FileInputFilesProps extends Omit<PartProps<"ul">, "children"> {
  /**
   * The BCP 47 locale the sizes are written in. Set it to the page's
   * language.
   * @default "en"
   */
  locale?: string;
}

/**
 * The selected files, by name and size, in a polite live region: the list
 * is in the page before any choice is made, so filling it is announced.
 */
function FileInputFiles({ locale = "en", className, ref, ...rest }: FileInputFilesProps) {
  const { files } = useFileInputContext("FileInput.Files");
  return (
    <ul ref={ref} aria-live="polite" className={className} {...rest}>
      {files.map((file) => (
        <li key={`${file.name}:${file.size}:${file.lastModified}`}>
          {file.name} <span className="size">{formatSize(file.size, locale)}</span>
        </li>
      ))}
    </ul>
  );
}

export const FileInput = {
  Root: FileInputRoot,
  Control: FileInputControl,
  Prompt: FileInputPrompt,
  Files: FileInputFiles,
};
