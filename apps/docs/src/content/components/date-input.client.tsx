"use client";

import { DateInput, ErrorSummary } from "@loamui/core";

export function DateInputDemo() {
  return (
    <DateInput.Root name="date-of-birth" autoComplete="bday">
      <DateInput.Legend>Date of birth</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2007</DateInput.Description>
      <DateInput.Fields>
        <DateInput.Day />
        <DateInput.Month />
        <DateInput.Year />
      </DateInput.Fields>
    </DateInput.Root>
  );
}

export function DateInputWholeErrorDemo() {
  return (
    <DateInput.Root>
      <DateInput.Legend>Date of birth</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2007</DateInput.Description>
      <DateInput.Error>Enter your date of birth</DateInput.Error>
      <DateInput.Fields>
        <DateInput.Day />
        <DateInput.Month />
        <DateInput.Year />
      </DateInput.Fields>
    </DateInput.Root>
  );
}

export function DateInputPartErrorDemo() {
  return (
    <DateInput.Root name="membership-start">
      <DateInput.Legend>When did your membership start?</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2019</DateInput.Description>
      <DateInput.Error parts={["year"]}>Membership start date must include a year</DateInput.Error>
      <DateInput.Fields>
        <DateInput.Day defaultValue="27" />
        <DateInput.Month defaultValue="3" />
        <DateInput.Year />
      </DateInput.Fields>
    </DateInput.Root>
  );
}

export function DateInputMonthYearDemo() {
  return (
    <DateInput.Root name="card-expiry">
      <DateInput.Legend>Expiry date</DateInput.Legend>
      <DateInput.Description>For example, 3 2031</DateInput.Description>
      <DateInput.Fields>
        <DateInput.Month />
        <DateInput.Year />
      </DateInput.Fields>
    </DateInput.Root>
  );
}

export function DateInputSummaryDemo() {
  return (
    <div style={{ display: "grid", gap: "var(--loam-space-md)", inlineSize: "100%" }}>
      <ErrorSummary.Root autoFocus={false}>
        <ErrorSummary.Title />
        <ErrorSummary.List>
          <ErrorSummary.Item href="#membership-start-year">
            Membership start date must include a year
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary.Root>
      <DateInput.Root id="membership-start" name="membership-start">
        <DateInput.Legend>When did your membership start?</DateInput.Legend>
        <DateInput.Description>For example, 27 3 2019</DateInput.Description>
        <DateInput.Error parts={["year"]}>
          Membership start date must include a year
        </DateInput.Error>
        <DateInput.Fields>
          <DateInput.Day defaultValue="27" />
          <DateInput.Month defaultValue="3" />
          <DateInput.Year />
        </DateInput.Fields>
      </DateInput.Root>
    </div>
  );
}
