# LeadFlow CRM

LeadFlow is a lightweight CRM designed for small teams that need a fast way to capture and manage inbound leads. It ships with a plug-and-play embed script, a clean pipeline view, and an API-first design so you can automate follow-ups with tools like Zapier or Make.

## Features

- Website embed that drops into any HTML page and posts to your hosted CRM
- Lead inbox with table view, pipeline columns, and status badges
- Manual lead capture flow for phone or event conversations
- REST API for creating, updating, and deleting leads
- Built with Next.js 14 App Router, Tailwind CSS, and TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the dashboard.

## Embed On Your Site

Paste the snippet anywhere inside your existing website. It will render an inline form and send submissions to your hosted CRM instance.

```html
<div data-leadflow></div>
<script async src="https://agentic-0e3ce4db.vercel.app/api/embed"></script>
```

Every submission includes `name`, `email`, `company`, and `message`. Extend the form by forking `app/api/embed/route.ts`.

## REST API

### Create Lead

```http
POST https://agentic-0e3ce4db.vercel.app/api/leads
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+1 555 123 4567",
  "company": "Acme Inc.",
  "status": "new",
  "tags": ["website"]
}
```
