# loamui skill evals

`evals.json` is a set of prompts with graded expectations. They exist so the
skill's wording is edited against evidence, not taste.

## Running them

1. Pick an agent (Claude Code, Cursor, Codex, …) in a scratch project that
   depends on `@loamui/core`.
2. For each eval, run the prompt **twice**: once with the `loamui` skill
   installed (`npx skills add dangerfarms/loamui`), once without.
3. Repeat each condition and record the agent/model, package and skill versions,
   prompt, transcript, generated files and checks performed. Verify whether the
   skill activated and which references the agent read.
4. Grade the generated artifacts against every `expect` item. Treat `forbid`
   strings as review signals in executable code, not failures in quoted
   explanations. Run types and interaction checks and inspect browser output.
5. Record first-attempt success separately from success after a bounded repair.
   Classify failures as activation, retrieval, conflicting guidance, implementation
   or grading errors before changing instructions. Fix the demonstrated cause
   and rerun the affected cases. A skill pass rate is evidence for those trials,
   not a guarantee for all prompts.

## Writing a new eval

Add one when a real usage goes wrong. Each entry needs a realistic prompt (the
words a developer would actually type), `expect` items a grader can verify in
the output, and `forbid` strings whose presence is a definite failure. Keep the
prompt free of hints that give the answer away — the point is to test the
skill, not the prompt.

These are manual evaluation definitions. `check:skill` verifies documentation
drift and reference integrity; it does not run an agent or establish generation
quality. Browser checks and human visual review remain separate from type checks.
