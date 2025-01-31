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

## Usage

> **Note:**
>
> [The backend](https://github.com/oluwatobiss/api-powered-blog-backend) must be running for this website to function appropriately.

1. Clone the project

```bash
git clone https://github.com/oluwatobiss/api-powered-blog-website.git
```

2. Navigate into the project repo

```bash
cd api-powered-blog-website
```

3. Install dependencies

```bash
npm install
```

4. Create an environment variable file

```bash
touch .env
```

5. Define the project's environment variables

```
PUBLIC_BACKEND_URI="http://localhost:3000"
PUBLIC_STAFFEND_URI="http://localhost:4322"
```

6. Start the server

```bash
npm run dev
```

## Related Repos

- [StaffBlog](https://github.com/oluwatobiss/api-powered-blog-editor)
- [Fans-n-Company Rest API](https://github.com/oluwatobiss/api-powered-blog-backend)
