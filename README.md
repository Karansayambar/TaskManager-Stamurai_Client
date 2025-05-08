This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# TaskManager-Stamurai_Client

Features added in this project
Multiple users Support
✅ User Authentication:
Secure user registration and login functionalities.
Use industry-standard practices for password storage and session management.
Task Management:
Create tasks with attributes: title, description, due date, priority, and status.
Implement full CRUD (Create, Read, Update, Delete) operations for tasks.
✅ Team Collaboration:
Allow users to assign tasks to other registered users.
Implement a notification system to alert users when a task is assigned.
✅ Dashboard:
Tasks assigned to them
Tasks they created
Overdue tasks
✅ Search and Filter:
Implement search by task title or description.
Filtering based on status, priority, and due date.

Role-Based Access Control (RBAC): Implement Admin, Manager, and Regular User roles with different permissions.
Analytics Dashboard: Track metrics like number of completed tasks per user, overdue trends, task completion rates.

There are multiple users
3 created
user1@gmail.com
user2@gmail.com
user3@gmail.com

password : 123456789

1 admin
admin@gmail.com
password : 123456789

Implemented Features
User Roles

Admin: Can assign tasks to all registered users.
Regular Users: Can assign tasks to themselves and other users (but not admins).

Task Assignment
Users can assign tasks to others (except admins).
Admins can assign tasks to any registered user.
Task Sorting & Filtering

Sort by:
Importance/Priority (e.g., high/medium/low).
Due Date (upcoming, overdue).
Status (today, completed, "assigned to me").
Basic Task Management

Tasks have:
Assignees (single or multiple users).
Due dates.
Completion status (done/pending).
