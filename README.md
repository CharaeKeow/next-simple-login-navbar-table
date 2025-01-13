# Next Simple Bank App

A simple Next.js bank app with the following features:

- Responsive navbar for both desktop and mobile view
- Login flow with secure word
- A protected page to view transactions history

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/CharaeKeow/next-simple-login-navbar-table.git
cd next-simple-login-navbar-table
```

2. Install project dependency. Note that [`pnpm`](https://pnpm.io/) is used as the package manager for this project.

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development & Design Decision Logs

This is the log for any development and design thought (such as which library I used, data structure, etc.) through out the development process

### Project Folder Structure

#### General Structure

The project follows a feature-based structure with two main directories:

- `app/`: Contains Next.js-specific files (pages, layouts, API routes)
- `src/`: Houses all other application code (components, utils, types, etc.)

The `src/features/` directory contains feature-specific code, where each feature (like `auth` or `transaction-history`) can have its own components, hooks, and utilities. This approach improves code organization and makes features more self-contained.

### Component Folder Structure

Each component lives in its own directory following this pattern:

```
components/
└── button/
└── button.tsx
```

We use descriptive filenames instead of `index.tsx` to improve file lookup (e.g. VSCode `Command/Control + P`). While this results in slightly longer import paths (e.g., `@/src/components/button/button.tsx`) but in real world we're most likely relying on IDE autocompletion.

This structure also accommodates future additions like tests and Storybook files within the same component directory (of course the counter argument is that we can also do the same if everything is dumped in `components` folder, but I do think it looks more organized this way, since we can expect a component folder to have a set of related file)

### File naming convention

For file naming convention, despite React docs is using `camelCase` for component file name, I chose to use `kebab-case` instead, due to:

- It is consistent with Next default files such as `page.tsx` and `layout.tsx`
- Git is case [insensitive by default](https://gitirc.eu/git-config.html), which might cause [issue](https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git) if we're not careful or aware (speaking from experience)

### Authentication

For authentication, my initial idea when working on the auth flow was just doing a full client side auth using a provider, which stores the auth state. While this idea sounds great (and simple to implement) for me initially, I realized that it becomes a bit tricky to navigate due to the fullstack nature of Next.js

A challenge I faced was when doing the `transaction-history` page, which is a protected page. If I use a full client-side auth with provider, means I can only "protect" the page on the client side. And IMO this is not idea - since it is slower and this type of auth guard should happens on the server side.

Besides, on page refresh, the auth provider state is loss, so I need to re-login again to test. As a result, I decided to implement a simple (and really not safe for real world app) instead - by setting a HTTP cookie on login successful.

And next time user can into the app, we can check if the cookie exists, and if yes, we pass the `isAuthenticated` flag to our provider so it can be used on client-side.

P.S. My initial was also using [Auth.js](https://authjs.dev/), which is a library that I am familiar with. But since the scope of the app looks simple, I opted against it, for the sake of learning. Although if I have to do this again, I would just use Auth.js.

### React Query

I used [React Query](https://tanstack.com/query/v5/docs/framework/react/overview) for client side transaction history page data fetching. This is due to when I first worked on the page, I was still using full client-side only auth (via provider). As such, it's pointless to fetch data on the server side, since this page should be a private page, and at that point of time there's no server side auth yet.

However, after I implemented server side auth (via simple cookie), we can move the data fetching to the server side instead (provided if user is logged in), then pass the data to client. Due to time constraint, I chose to stick with this instead.

### UI/UX Decisions

While the requirements suggested clearing the navbar after login, I made a conscious decision to keep the navbar and replace the "Login" button with a "Logout" button instead. This decision was based on several UX considerations:

- Users need persistent navigation to access different parts of the application
- Having a visible logout option is a standard web application pattern that users expect
- A cleared navbar would provide poor user experience and make navigation difficult
- The logout button provides clear feedback about the user's current authentication state
