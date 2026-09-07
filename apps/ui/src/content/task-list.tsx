"use client";

import type { CSSProperties } from "react";
import { Badge } from "@loamui/core";
import { TaskList } from "@loamui/ui";
import type { Composition } from "./types";

const success = { "--loam-context": "success" } as CSSProperties;
const info = { "--loam-context": "info" } as CSSProperties;

const taskList: Composition = {
  slug: "task-list",
  name: "Task list",
  category: "Data display",
  description:
    "The things a person must complete across a multi-step process, each with its status: a title that is a link when the task can be started, a description of what it needs and a Badge for where it stands.",
  lead: "A task's title is a link when it can be started and plain text when it cannot; the whole row is never a link, so the status stays readable text and the pointer lands on the title. The status is a Badge you place in a --loam-context region of your choosing, and the composition joins the description and the status to the title as its description, so a screen reader hears “Your details, link, Completed” on the link instead of hunting for the status across the row. There is no visible number, since a task list is read by status, not by position; the list keeps its semantics through an explicit role.",
  importLine: `import { TaskList } from "@loamui/ui";\nimport { Badge } from "@loamui/core";`,
  parts: [
    {
      name: "TaskList.Root",
      description:
        "A ul with role list, since the markers are removed; declares its own container so the rows restack below a narrow width.",
    },
    {
      name: "TaskList.Item",
      description:
        "One task, an li: the title and description beside the status. It mints the ids that tie the description and the status to the title, each only while that part is mounted.",
    },
    {
      name: "TaskList.Title",
      description:
        "The task's title. Pass href and it is an a; leave it off and it is plain text, for a task that cannot be started yet; pass render for a router's link. Described by the Description and the Status while they are present.",
    },
    {
      name: "TaskList.Description",
      description:
        "Optional. One muted line under the title on what the task needs; it carries the id the title is described by.",
    },
    {
      name: "TaskList.Status",
      description:
        "Hosts the Badge and carries the id the title is described by. Set --loam-context on its style, or wrap it in a region; either colours the Badge.",
    },
  ],
  demos: [
    {
      title: "An application",
      description:
        "Five tasks under the page's own h2. Completed and in-progress tasks link to their section; the last cannot start yet, so its title is plain text and the description says when it can. The context sits on the Status part in the first row and on a wrapping region in the third, and both colour the Badge.",
      code: `<h2>Your application</h2>
<TaskList.Root>
  <TaskList.Item>
    <TaskList.Title href="/apply/details">Your details</TaskList.Title>
    <TaskList.Status style={{ "--loam-context": "success" }}>
      <Badge>Completed</Badge>
    </TaskList.Status>
  </TaskList.Item>
  <TaskList.Item>
    <TaskList.Title href="/apply/contact">Contact preferences</TaskList.Title>
    <TaskList.Status style={{ "--loam-context": "success" }}>
      <Badge>Completed</Badge>
    </TaskList.Status>
  </TaskList.Item>
  <TaskList.Item>
    <TaskList.Title href="/apply/documents">Supporting documents</TaskList.Title>
    <TaskList.Description>Upload a proof of address and one form of identification.</TaskList.Description>
    <div style={{ "--loam-context": "info" }}>
      <TaskList.Status>
        <Badge>In progress</Badge>
      </TaskList.Status>
    </div>
  </TaskList.Item>
  <TaskList.Item>
    <TaskList.Title href="/apply/declaration">Declaration</TaskList.Title>
    <TaskList.Status>
      <Badge>Not yet started</Badge>
    </TaskList.Status>
  </TaskList.Item>
  <TaskList.Item>
    <TaskList.Title>Payment</TaskList.Title>
    <TaskList.Description>Available once every section above is complete.</TaskList.Description>
    <TaskList.Status>
      <Badge>Cannot start yet</Badge>
    </TaskList.Status>
  </TaskList.Item>
</TaskList.Root>`,
      render: () => (
        <>
          <h2>Your application</h2>
          <TaskList.Root>
            <TaskList.Item>
              <TaskList.Title href="/apply/details">Your details</TaskList.Title>
              <TaskList.Status style={success}>
                <Badge>Completed</Badge>
              </TaskList.Status>
            </TaskList.Item>
            <TaskList.Item>
              <TaskList.Title href="/apply/contact">Contact preferences</TaskList.Title>
              <TaskList.Status style={success}>
                <Badge>Completed</Badge>
              </TaskList.Status>
            </TaskList.Item>
            <TaskList.Item>
              <TaskList.Title href="/apply/documents">Supporting documents</TaskList.Title>
              <TaskList.Description>
                Upload a proof of address and one form of identification.
              </TaskList.Description>
              <div style={info}>
                <TaskList.Status>
                  <Badge>In progress</Badge>
                </TaskList.Status>
              </div>
            </TaskList.Item>
            <TaskList.Item>
              <TaskList.Title href="/apply/declaration">Declaration</TaskList.Title>
              <TaskList.Status>
                <Badge>Not yet started</Badge>
              </TaskList.Status>
            </TaskList.Item>
            <TaskList.Item>
              <TaskList.Title>Payment</TaskList.Title>
              <TaskList.Description>
                Available once every section above is complete.
              </TaskList.Description>
              <TaskList.Status>
                <Badge>Cannot start yet</Badge>
              </TaskList.Status>
            </TaskList.Item>
          </TaskList.Root>
        </>
      ),
    },
    {
      title: "One task",
      description:
        "The unit stands alone: a list of one, a title that links and a description and status that describe it. Nothing about the row assumes a neighbour.",
      code: `<TaskList.Root>
  <TaskList.Item>
    <TaskList.Title href="/onboarding/profile">Complete your profile</TaskList.Title>
    <TaskList.Description>A photo and a line about what you do.</TaskList.Description>
    <TaskList.Status style={{ "--loam-context": "info" }}>
      <Badge>In progress</Badge>
    </TaskList.Status>
  </TaskList.Item>
</TaskList.Root>`,
      render: () => (
        <TaskList.Root>
          <TaskList.Item>
            <TaskList.Title href="/onboarding/profile">Complete your profile</TaskList.Title>
            <TaskList.Description>A photo and a line about what you do.</TaskList.Description>
            <TaskList.Status style={info}>
              <Badge>In progress</Badge>
            </TaskList.Status>
          </TaskList.Item>
        </TaskList.Root>
      ),
    },
  ],
  whenToUse: [
    "A process the person completes in sections and in any order, returning between sessions: an application, an onboarding, the checks before a submission. The list is where they see what is done and what is left.",
    "Sections that depend on one another: a task that cannot start until others are complete is plain text with a description saying so, and the person is never sent into a page that turns them away.",
  ],
  whenNotToUse: [
    "A linear wizard with no skipping; that is Steps above a form, one section at a time, with no status to report because the current step is the only one open.",
    "A to-do list the person writes and ticks themselves; that is its own thing, with a checkbox per item and no link into a section of a process.",
  ],
};

export default taskList;
