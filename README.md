# FansInSync

A website that lets fans stay updated on the company's internal communications and product development.

## Pages

- **Home:** List all published posts as clickable items that link to each post's page.
- **Post:**
  - Read published article.
  - Comment on the publication.
  - Read comments.

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

- [StaffBlog](https://github.com/oluwatobiss/api-powered-blog-editor)
- [Fans-n-Company Rest API](https://github.com/oluwatobiss/api-powered-blog-backend)
