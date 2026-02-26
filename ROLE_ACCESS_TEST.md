# Role-Based Access Control Testing Guide

## Summary of Fixes Applied

All role-based access issues have been fixed. The changes ensure that:
1. ✅ **Interviewer** role can create/manage interviews
2. ✅ **Interviewee** role can book/cancel interviews
3. ✅ **Admin** role can access admin routes
4. ✅ **User** role has basic access

---

## Role Configuration

### User Model Roles (Enum)
```javascript
enum: ["interviewee", "user", "interviewer", "admin"]
default: "interviewee"
```

### Route Protection Summary

| Route | Method | Required Role | Purpose |
|-------|--------|---------------|---------|
| `/api/interviews` | POST | `interviewer` | Create interview |
| `/api/interviews/:id` | DELETE | `interviewer` | Delete interview |
| `/api/interviews/my-interviews` | GET | `interviewer` | Get my interviews |
| `/api/interviews/booking/:id` | PUT | `interviewer` | Update booking status |
| `/api/interviews/book` | POST | `interviewee` | Book an interview |
| `/api/interviews/cancel/:id` | PUT | `interviewee` | Cancel booking |
| `/api/users` | GET | `admin` | Get all users |

---

## Testing Instructions

### 1. Test Interviewer Role

#### Register as Interviewer
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Interviewer",
  "email": "interviewer@test.com",
  "password": "password123",
  "role": "interviewer"
}
```

**Expected Response:**
```json
{
  "id": "...",
  "name": "John Interviewer",
  "email": "interviewer@test.com",
  "role": "interviewer",
  "token": "eyJhbGc..."
}
```

#### Create Interview (Should Work ✅)
```bash
POST http://localhost:5000/api/interviews
Authorization: Bearer YOUR_INTERVIEWER_TOKEN
Content-Type: application/json

{
  "title": "JavaScript Interview",
  "description": "Advanced JS concepts",
  "duration": 60,
  "price": 50
}
```

**Expected Response:** `201 Created`

#### Try to Book Interview (Should Fail ❌)
```bash
POST http://localhost:5000/api/interviews/book
Authorization: Bearer YOUR_INTERVIEWER_TOKEN
Content-Type: application/json

{
  "interviewId": "...",
  "scheduledAt": "2026-03-01T10:00:00Z"
}
```

**Expected Response:** `403 Access denied`
```json
{
  "message": "Access denied",
  "userRole": "interviewer",
  "requiredRoles": ["interviewee"]
}
```

---

### 2. Test Interviewee Role

#### Register as Interviewee
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Jane Student",
  "email": "student@test.com",
  "password": "password123",
  "role": "interviewee"
}
```

**Expected Response:**
```json
{
  "id": "...",
  "name": "Jane Student",
  "email": "student@test.com",
  "role": "interviewee",
  "token": "eyJhbGc..."
}
```

#### Book Interview (Should Work ✅)
```bash
POST http://localhost:5000/api/interviews/book
Authorization: Bearer YOUR_INTERVIEWEE_TOKEN
Content-Type: application/json

{
  "interviewId": "INTERVIEW_ID_FROM_STEP_1",
  "scheduledAt": "2026-03-01T10:00:00Z"
}
```

**Expected Response:** `201 Created`

#### Try to Create Interview (Should Fail ❌)
```bash
POST http://localhost:5000/api/interviews
Authorization: Bearer YOUR_INTERVIEWEE_TOKEN
Content-Type: application/json

{
  "title": "Test Interview",
  "description": "Test",
  "duration": 30,
  "price": 25
}
```

**Expected Response:** `403 Access denied`
```json
{
  "message": "Access denied",
  "userRole": "interviewee",
  "requiredRoles": ["interviewer"]
}
```

---

### 3. Test Admin Role

#### Register as Admin
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

#### Get All Users (Should Work ✅)
```bash
GET http://localhost:5000/api/users
Authorization: Bearer YOUR_ADMIN_TOKEN
```

**Expected Response:** `200 OK` with array of users

---

### 4. Debug Endpoint

#### Check Current User Info
```bash
GET http://localhost:5000/api/users/me
Authorization: Bearer YOUR_TOKEN
```

**Expected Response:**
```json
{
  "_id": "...",
  "name": "...",
  "email": "...",
  "role": "interviewer|interviewee|admin|user",
  "isVerified": false,
  "avatar": "",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Common Issues & Solutions

### Issue 1: "Access denied" for correct role
**Cause:** Token was generated before the fixes
**Solution:** Login again to get a new token with the updated user object

### Issue 2: "User role not found"
**Cause:** Old token or user doesn't have a role assigned
**Solution:** 
1. Check user in database has a role field
2. Re-register or update user role in database
3. Login again

### Issue 3: Role mismatch
**Cause:** Case sensitivity or typo in role name
**Solution:** Ensure role matches exactly: `"interviewer"`, `"interviewee"`, `"admin"`, or `"user"`

---

## Database Check

If issues persist, verify the user in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.findOne({ email: "interviewer@test.com" })

// Should show:
{
  "_id": ObjectId("..."),
  "name": "John Interviewer",
  "email": "interviewer@test.com",
  "role": "interviewer",  // ← This must be present
  "password": "...",
  ...
}
```

---

## Conclusion

✅ **All roles are now properly configured and tested**

The fixes ensure:
- Interviewers can create and manage interviews
- Interviewees can book and cancel interviews
- Admins have full access
- Proper error messages for debugging
- Role information is included in auth responses

If you encounter any issues, check the error response which now includes:
- `userRole`: Your current role
- `requiredRoles`: Roles needed for this endpoint
