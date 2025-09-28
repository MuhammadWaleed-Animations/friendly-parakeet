# Attack Me 🛒 - Vulnerable E-Commerce Site

A deliberately vulnerable Next.js e-commerce application designed for educational purposes and security testing. This site appears as a legitimate online store but contains numerous intentional security vulnerabilities.

## ⚠️ WARNING

**This application contains intentional security vulnerabilities and should NEVER be used in production environments!**

## 🎯 Purpose

Attack Me is designed to help developers and security professionals:
- Learn about common web application vulnerabilities in e-commerce contexts
- Practice ethical hacking techniques on realistic scenarios
- Understand security best practices for online stores
- Test security tools and scanners against modern web applications

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛒 Features

- **Product Catalog**: Browse and search products
- **User Authentication**: Registration and login system
- **Shopping Cart**: Add/remove items from cart
- **User Profiles**: Manage account information
- **Order Management**: View order history
- **Admin Panel**: User management (vulnerable)
- **Responsive Design**: Modern UI with Ant Design and Material UI

## 🔍 Documented Vulnerabilities

### 1. SQL Injection (Critical)
**Location**: Multiple API endpoints
**Files**: `lib/database.ts`, API routes
**Description**: Direct string concatenation in SQL queries
**Exploitation**:
```sql
-- Login bypass
email: admin@attackme.com' OR '1'='1' --
password: anything

-- Data extraction
search: ' UNION SELECT email, password, name FROM users --
```

### 2. Authentication Bypass (Critical)
**Location**: Client-side auth checks
**Files**: `src/app/page.tsx`, `src/app/profile/page.tsx`
**Description**: Client-side authentication validation
**Exploitation**: 
- Modify browser cookies
- Disable JavaScript
- Use browser dev tools to bypass checks

### 3. Insecure Direct Object References (High)
**Location**: Admin panel access
**Files**: `src/app/api/admin/users/route.ts`
**Description**: No authorization checks for admin endpoints
**Exploitation**:
```bash
curl -H "Cookie: auth-token=any_token" http://localhost:3000/api/admin/users
```

### 4. Cross-Site Scripting (XSS) (High)
**Location**: Search functionality, user input
**Files**: Product search, user profiles
**Description**: Unescaped user input in responses
**Exploitation**:
```javascript
// Search field
<script>alert('XSS')</script>

// Profile fields
<img src="x" onerror="alert('XSS')">
```

### 5. Insecure Data Storage (High)
**Location**: Database schema
**Files**: `lib/database.ts`
**Description**: Credit card numbers stored in plain text
**Exploitation**: Access admin panel to view all user data

### 6. Weak Session Management (Medium)
**Location**: Authentication system
**Files**: `lib/auth.ts`
**Description**: No token expiration, weak secrets
**Exploitation**: 
- Tokens never expire
- Predictable JWT secrets
- Insecure cookie settings

### 7. Missing Input Validation (Medium)
**Location**: All forms and API endpoints
**Description**: No server-side validation
**Exploitation**:
- Submit malicious payloads
- Buffer overflow attempts
- Large payload attacks

### 8. Information Disclosure (Medium)
**Location**: Error messages, admin panel
**Description**: Detailed error messages reveal system information
**Exploitation**: Trigger errors to gather system information

### 9. Insecure File Upload (Medium)
**Location**: Product images
**Description**: No file type validation
**Exploitation**: Upload malicious files

### 10. CSRF (Cross-Site Request Forgery) (Medium)
**Location**: All state-changing operations
**Description**: No CSRF tokens
**Exploitation**: Create malicious forms that submit to the application

## 🧪 Testing Scenarios

### Basic User Flow
1. Register a new account
2. Browse products
3. Add items to cart
4. Complete checkout
5. View order history

### Security Testing
1. **SQL Injection**: Try malicious inputs in search and login
2. **XSS**: Submit script tags in forms
3. **Authentication**: Try accessing admin panel
4. **Data Exposure**: Check admin endpoints
5. **Session Management**: Examine cookies and tokens

## 🛡️ Responsible Use

- Use only for educational purposes
- Do not deploy to production
- Report additional vulnerabilities responsibly
- Respect ethical hacking principles
- Do not use for malicious purposes

## 📚 Learning Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Application Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [E-Commerce Security Best Practices](https://owasp.org/www-project-ecommerce-security/)

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── api/           # API routes (vulnerable)
│   ├── components/    # Reusable components
│   ├── login/         # Authentication pages
│   ├── products/      # Product catalog
│   ├── cart/          # Shopping cart
│   ├── profile/       # User profile
│   └── admin/         # Admin panel
├── lib/
│   ├── database.ts    # Database operations (vulnerable)
│   └── auth.ts        # Authentication logic (vulnerable)
```

### Database Schema
- **users**: User accounts with sensitive data
- **products**: Product catalog
- **cart**: Shopping cart items
- **orders**: Order history
- **order_items**: Order line items

## 🤝 Contributing

Contributions are welcome! Please ensure any new vulnerabilities are:
- Educational and well-documented
- Realistic and exploitable
- Properly commented in code
- Include exploitation examples

## 📄 License

This project is for educational purposes only. Use responsibly and ethically.
