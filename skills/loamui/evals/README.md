# loamui skill evals

`evals.json` is a set of prompts with graded expectations. They exist so the
skill's wording is edited against evidence, not taste.

## Running them

1. Pick an agent (Claude Code, Cursor, Codex, …) in a scratch project that
   depends on `@loamui/core`.
2. For each eval, run the prompt **twice**: once with the `loamui` skill
   installed (`npx skills add dangerfarms/loamui`), once without.
3. Grade both outputs against `expect` (all should hold) and `forbid` (none
   should appear). Record pass/fail per run.
4. The delta between the two runs is the skill's value. Anything the skill
   run fails is a wording problem in `SKILL.md`: fix the rule or gotcha that
   should have caught it, then re-run that eval.

## Writing a new eval

Add one when a real usage goes wrong. Each entry needs a realistic prompt (the
words a developer would actually type), `expect` items a grader can verify in
the output, and `forbid` strings whose presence is a definite failure. Keep the
prompt free of hints that give the answer away — the point is to test the
skill, not the prompt.
