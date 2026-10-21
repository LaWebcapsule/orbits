---
'@orbi-ts/fuel': patch
---

Replace the deprecated `@gitbeaker/node` with `@gitbeaker/rest`, which clears
the `decode-uri-component` advisory (GHSA-vcc3-ghjq-m6fr).

`AddGitWebHookAction` now actually applies its `events` on GitLab — the array
was being dropped, so every hook was created with push events only. Event names
must be GitLab's (`merge_requests_events`), not GitHub's.
