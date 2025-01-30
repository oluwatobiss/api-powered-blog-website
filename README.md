# fansInSync

A website that lets fans stay updated on the company's internal communications and product development.

## Pages

- **Home:** Displays a list of all published posts as clickable items that link to each post's page.
- **Post:**
  - Shows a published article for users to read.
  - Allow the company's staff to comment on the publication.
  - Allow users to view comments the company's staff have posted.

## Users and privileges

- **Fan:** Unauthenticated user (Read-only privileges)
- **Staff:** Employed member (Read, compose, and personal content management privileges)
- **Admin:** An administrator (All privileges except updating staff comments)

| Privilege                | Fan | Staff | Admin |
| ------------------------ | --- | ----- | ----- |
| Read published posts     | Yes | Yes   | Yes   |
| Create comments          | No  | Yes   | Yes   |
| Read comments            | Yes | Yes   | Yes   |
| Update personal comments | No  | Yes   | Yes   |
| Update any comment       | No  | No    | No    |
| Delete personal comments | No  | Yes   | Yes   |
| Delete any comment       | No  | No    | Yes   |

## Technologies used

- Astro
- React

## Related Repos

- [Staff-only website](https://github.com/oluwatobiss/api-powered-blog-editor)
- [Backend](https://github.com/oluwatobiss/api-powered-blog-backend)
