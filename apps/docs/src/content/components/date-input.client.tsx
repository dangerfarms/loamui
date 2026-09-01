"use client";

import { DateInput } from "@loamui/core";

export function DateInputDemo() {
  return (
    <DateInput.Root name="date-of-birth" autoComplete="bday">
      <DateInput.Legend>Date of birth</DateInput.Legend>
      <DateInput.Description>For example, 27 3 2007</DateInput.Description>
      <DateInput.Fields>
        <DateInput.Field part="day" />
        <DateInput.Field part="month" />
        <DateInput.Field part="year" />
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
        <DateInput.Field part="day" />
        <DateInput.Field part="month" />
        <DateInput.Field part="year" />
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
        <DateInput.Field part="day" defaultValue="27" />
        <DateInput.Field part="month" defaultValue="3" />
        <DateInput.Field part="year" />
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
        <DateInput.Field part="month" />
        <DateInput.Field part="year" />
      </DateInput.Fields>
    </DateInput.Root>
  );
}
