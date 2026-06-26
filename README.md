# RequestFlow Tracker

Enterprise-style internal request management system built with **React, Express, Prisma, and PostgreSQL**.

Inspired by a real enterprise workflow discussed during my internship at **RBC Capital Markets**, this project simulates how internal access requests move through an approval process from submission to completion.

This project demonstrates how enterprise request workflows can be designed and implemented using modern full-stack technologies.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma)

<img src="assets/dashboard1.png" width="950">

---

# Project Motivation

During my internship at **RBC Capital Markets**, I had the opportunity to observe how internal request workflows support employees behind the scenes.

New hires often require access to repositories, VPNs, databases, software, and many other internal resources before they can begin their work.

While discussing potential side projects with my manager, we explored the idea of building an onboarding tool that could automatically organize and generate these access requests for new employees.

However, implementing such a system would require integration with internal enterprise infrastructure and privileged systems, which was not feasible because of security and access restrictions.

That conversation sparked my interest in enterprise workflow systems.

To better understand how these systems are designed, I decided to build **RequestFlow Tracker** as an independent full-stack project.

Rather than integrating with proprietary company platforms, this project focuses on recreating the core workflow commonly found in enterprise software.

The objective of this project was **not** to replicate any proprietary banking platform, but to gain hands-on experience designing and implementing enterprise approval workflows from scratch.

---

# Features

## Request Management

- Create new internal requests
- Support multiple request types
- Track request status throughout its lifecycle
- Search requests by title
- Filter requests by status
- Dashboard metrics for request statistics

---

## Enterprise Workflow

The application models a typical enterprise request lifecycle.

- Employee submits a request
- Manager reviews and approves or rejects the request
- Administrators process approved requests
- Every state transition is automatically recorded in the audit log

---

## Email Notification

Whenever a new request is submitted, the system automatically sends a styled HTML email to the manager.

The email includes:

- Request title
- Request type
- Request description
- Requested employee
- One-click **Approve** button
- One-click **Reject** button

Managers can approve or reject requests directly from the email without opening the dashboard.

---

## Audit Logging

Every important workflow action is automatically recorded.

Supported audit events include:

- APPROVED
- REJECTED
- APPROVED_FROM_LINK
- REJECTED_FROM_LINK
- IN_PROGRESS
- COMPLETED

Each log records:

- Request ID
- Action performed
- User who performed the action
- Timestamp

---

## Dashboard

The dashboard provides:

- Live request metrics
- Request status summary
- Search functionality
- Status filtering
- Request management
- Workflow actions
- Audit log history

---

# Architecture

The following diagram illustrates how requests flow through the application, from the React frontend to the Express API, business logic, PostgreSQL database, audit logging, and email notification service.

<img src="assets/architecture.png" width="950">

---

# Screenshots

## Request Management

<img src="assets/dashboard2.png" width="950">

Managers can approve or reject pending requests, while administrators continue processing approved requests.

---

## Audit Logs

<img src="assets/dashboard3.png" width="950">

Every workflow action is recorded to provide complete traceability.

---

## Approval Email

<img src="assets/approval-email.png" width="850">

Managers receive an HTML email immediately after a new request is submitted.

---

## Approval Confirmation

<img src="assets/approval-page.png" width="700">

After clicking the approval or rejection button, managers receive an immediate confirmation page.

---

# Tech Stack

## Frontend

- React
- Vite
- CSS3

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL
- Prisma ORM

## Email Service

- Nodemailer
- Gmail SMTP

---

# Running Locally

## Backend

```bash
cd requestflow-tracker
npm install
npm run dev
```

Runs on:

```text
http://localhost:3000
```

---

## Frontend

```bash
cd requestflow-dashboard
npm install
npm run dev
```

Runs on:

```text
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file in the backend project.

```env
DATABASE_URL=your_database_url

EMAIL_USER=your_email

EMAIL_PASS=your_gmail_app_password
```

---

# Future Improvements

## Authentication & Authorization

- JWT authentication
- Login system
- Protected API routes
- Role-based permissions for Employees, Managers, and Administrators

---

## Enterprise Workflow

- Multiple approval levels
- Department-based approvals
- Configurable approval workflows
- Approval delegation
- Approval expiration

---

## Request Management

- Request comments
- File attachments
- Request editing
- Request cancellation
- Request history page

---

## Notifications

- Reminder emails for pending approvals
- Email notifications for status updates
- Slack or Microsoft Teams integration

---

## Dashboard

- Pagination
- Sorting
- Advanced filtering
- Analytics dashboard
- Export to CSV

---

## Performance

- Database indexing
- Request caching
- API response optimization

---

## Deployment

- Docker support
- CI/CD pipeline
- Cloud deployment
- Production email service
- Environment-based configuration

---

## Testing

- Unit testing
- Integration testing
- API testing
- End-to-end testing

---

# What I Learned

Through this project I gained practical experience with:

- Designing enterprise approval workflows
- Building RESTful APIs with Express
- Structuring a full-stack application
- Database modeling using Prisma ORM
- PostgreSQL integration
- Sending transactional HTML emails with Nodemailer
- Building email-driven approval workflows
- Managing request lifecycle using status transitions
- Recording audit logs for traceability
- Implementing search and filtering features in React
- Separating business logic using a controller-service architecture
- Translating a real enterprise software idea into an independent full-stack project
