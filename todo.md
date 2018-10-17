- [x] FE: Style systems CRUD like the mock
- [x] BE: Basic Campaign CRUD
- [x] FE: Basic Campaign CRUD like the mock
- [x] FE: Load campaigns/systems after adding one
- [x] FE & BE: Basic world entity CRUD
- [x] FE: Rewrite in React/Redux, with basic system/campaign/session CRUD working
- [x] FE & BE: Naive noun extraction
- [x] FE: Breadcrumbs in the header
- [x] FE: Support editing things
- [x] FE: Crude icons for nouns
- [x] FE & BE: Show related nouns on noun pages
- [x] FE & BE: Show related sessions on noun pages
- [x] BE: Fix tests to better mock data
- [x] FE & BE: Build a Cmd-K shortcut for going to any noun or session
- [x] FE: Expando sidebar nav
- [x] FE & BE: Switch notes to a summary + notes setup, w/ markdown support
- [x] FE & BE: Add super basic auth
- [x] BE: Host it somewhere
- [x] BE & FE: Add super rough read-only member mode
- [ ] FE: Make editing notes easier
- [ ] FE: Show validation error for required fields when creating systems/campaigns
- [ ] FE & BE: Support images for nouns

# Orcas Island Goals
- [x] Get the latest deployed
- [x] Sign up Al
- [x] Fix campaign creation
- [x] Allow removing members
->[ ] Add private notes
- [ ] Show the signed in user
- [ ] Add logout link
- [ ] Switch away from Redux?
- [ ] Fix warnings on the FE
- [ ] Make markdown render nicely
- [ ] Make existing features easy to use

# Auth plan

- Add registration view
- Add login view
- Add ability to check for auth-ness on the client
- If no auth, redirect to login
- Add registration API endpoint
- Rewire all endpoints/tables to use users
