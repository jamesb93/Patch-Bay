# Patch Bay

[Max](https://cycling74.com/products/max) users share patches by creating a _compressed_ version, sending the raw text and decompressing on the other side. This application facilitates that workflow by allowing people to upload, store and share their patches in a minimalist interface. It is by default anonymous, but allows users to optionally register accounts to maintaing a record of patches they've shared. As a bonus, the site could be used to share any raw text or code.

The site can be visited at https://shareapatchwith.me

## Under the hood

The website is built on [SvelteKit](https://kit.svelte.dev/) for the frontend and uses [Firebase](https://firebase.google.com/) as the backend to store patches and manage user authentication.

To build a production node application:

```bash
pnpm run build
```

To run the website in development mode:

```bash
pnpm run dev
```

## Plans

- [ ] CLI
- [ ] API