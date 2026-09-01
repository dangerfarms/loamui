"use client";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";

type ValidatableControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

/**
 * Mirrors native constraint validation onto `aria-invalid` after a submit
 * attempt. The `invalid` event opens the error state; subsequent input may
 * clear it but never opens it, so fields do not complain on blur or while the
 * user is typing for the first time. A form reset clears the submitted state.
 * An explicitly supplied `aria-invalid` always wins at the call site.
 */
export function useUserInvalid<T extends ValidatableControl>() {
  const [nativeInvalid, setNativeInvalid] = useState(false);
  const [control, setControl] = useState<T | null>(null);
  const validationRef = useCallback((node: T | null) => setControl(node), []);

  useEffect(() => {
    const form = control?.form;
    if (!form) return;
    const clear = () => setNativeInvalid(false);
    form.addEventListener("reset", clear);
    return () => form.removeEventListener("reset", clear);
  }, [control]);

  const checkOnInvalid = useCallback((event: FormEvent<T>) => {
    const invalid = !event.currentTarget.validity.valid;
    setNativeInvalid(invalid);
  }, []);

  const checkOnInput = useCallback((event: FormEvent<T>) => {
    const invalid = !event.currentTarget.validity.valid;
    setNativeInvalid((submittedInvalid) => (submittedInvalid ? invalid : false));
  }, []);

  return { nativeInvalid, validationRef, checkOnInput, checkOnInvalid };
}
