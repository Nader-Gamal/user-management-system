# Angular User Management Application

## Overview

This Angular application demonstrates a comprehensive user management system with features like user registration, login, role-based access control, and CRUD operations. The app integrates with a JSON server to simulate a backend API.

## Features

1. **User Registration and Login**:
   - New users can register.
   - Registered users can log in.
   - Upon registration, users are directed to the login page, but their accounts need to be activated by an admin.

2. **Admin Dashboard**:
   - Admin can log in with initial credentials (`user: admin`, `password: Admin@123`).
   - Admin can view a dashboard listing all users.
   - Admin can add new users, update existing users, and delete users.
   - Admin can activate user accounts.

3. **User Dashboard**:
   - Activated users can log in and access their data.
   - Users can update their personal information.

4. **Role-Based Access Control**:
   - Separate views and permissions for admin and regular users.

5. **Responsive Design**:
   - Utilizes Angular Material for a responsive and visually appealing UI.

6. **Real-Time Notifications**:
   - Uses Toastr for success, error, and info notifications.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- Angular CLI installed globally (`npm install -g @angular/cli`).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/angular-user-management.git
   cd angular-user-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the JSON Server**:
   ```bash
   json-server --watch user.json
   ```
   This will start the JSON server and serve the API from `user.json` at `http://localhost:3000`.

4. **Run the Angular application**:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser to see the application in action.

## Usage

### User Registration and Login

1. **Registration**:
   - Open the application and navigate to the registration page.
   - Fill in the required details and submit the form.
   - You will be redirected to the login page.

2. **Login**:
   - Use your credentials to log in.
   - If your account is not activated, you will need to wait for admin approval.

### Admin Operations

1. **Admin Login**:
   - Log in with initial admin credentials (`user: admin`, `password: Admin@123`).
   - You will be directed to the admin dashboard.

2. **User Management**:
   - **View Users**: See a list of all registered users.
   - **Add User**: Add new users.
   - **Update User**: Update user details.
   - **Delete User**: Remove users from the system.
   - **Activate User**: Activate user accounts so they can log in.

### User Operations

1. **View Profile**:
   - After activation and login, users can view their profile information.

2. **Update Profile**:
   - Users can update their personal details.

## Project Structure

```plaintext
angular-user-management/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── admin.component.html
│   │   │   │   ├── admin.component.ts
│   │   │   │   ├── admin.component.css
│   │   │   ├── user/
│   │   │   │   ├── user.component.html
│   │   │   │   ├── user.component.ts
│   │   │   │   ├── user.component.css
│   │   │   ├── login/
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.css
│   │   │   ├── register/
│   │   │   │   ├── register.component.html
│   │   │   │   ├── register.component.ts
│   │   │   │   ├── register.component.css
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── loader.service.ts
│   │   ├── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── styles.css
├── user.json
├── package.json
├── angular.json
└── README.md
```
