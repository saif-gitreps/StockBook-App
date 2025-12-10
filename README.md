# StockBook - Portfolio Management Platform

A modern, full-stack stock portfolio management platform where investors can track their investments, analyze stocks, and connect with a community of fellow traders. Users can build personalized portfolios, engage in stock discussions, and make informed investment decisions all in one powerful platform.

## Features

### 🎨 Clean UI and Modern UX

-  🔧 Built from scratch with cutting-edge technology using React and ShadCn components.
-  🛠 Features a sleek, dark-themed design with gradient accents using Tailwind CSS.

### 🧑🏻‍💻 User Capabilities

-  Browse through stocks and check market data.
-  Sign up to create a personal account and unlock full portfolio features.
-  Intuitively search, filter, and sort through available stocks with pagination support.
-  Authenticated users can:
   -  Build and manage their personal stock portfolio.
   -  Add stocks to their watchlist for tracking.
   -  Create, edit, and delete comments on stock discussion threads.
   -  View detailed stock information including market cap, dividends, and purchase prices.
   -  Track portfolio performance with comprehensive analytics.
   -  Engage with the investor community through stock-specific discussions.

### 🔐 Authentication and Security

-  Secure stateless JWT authentication using .NET Identity framework.
-  Protected API endpoints with role-based authorization.
-  Secure password hashing and validation.
-  HTTP-only cookies for enhanced security against XSS attacks.

### 💻 Tech Stack and Features

#### Frontend

-  🖥 Fully written in React with Vite for lightning-fast development and build times.
-  📜 Utilizes React Hook Form for strict form input validation and error handling.
-  🤝 End-to-end type safety using TypeScript for scalability and maintainability.
-  📁 Seamless integration of data-fetching and mutation API services using Axios.
-  🌄 Paginated displays of stocks on the search results page with customizable page sizes.
-  🎭 Beautiful UI components powered by ShadCn/UI.
-  🎨 Responsive design using Tailwind CSS utility classes.
-  🎯 Modern routing with React Router for seamless navigation.
-  ⚡️ Optimized performance with lazy loading and code splitting.
-  🎪 Smooth animations and transitions using CSS transforms and Lucide React icons.
-  🎨 Modern landing page with hero section, feature highlights, testimonials, and call-to-action sections.
-  📊 Statistics dashboard showing platform metrics and user engagement.

#### Backend

-  🏗️ RESTful API built with ASP.NET Core Web API following best practices.
-  🗄️ Entity Framework Core for robust ORM capabilities and database management.
-  🔒 ASP.NET Core Identity for comprehensive user authentication and authorization.
-  🛡️ Data validation using Data Annotations and custom validation attributes.
-  📊 Support for complex queries with filtering, sorting, and pagination.
-  🔄 Full CRUD operations for stocks, comments, and portfolio management.
-  📝 Comprehensive API documentation with OpenAPI specification.
-  🎯 Clean architecture with separation of concerns (Controllers, Services, Repositories).
-  🗃️ PostgreSQL database for data storage.
-  🛠 DTO (Data Transfer Objects) pattern for secure data handling.

### 🎁 Additional Features

-  🔄 Highly customizable and extendable, with a modular codebase for future enhancements.
-  🚀 Bulk stock import capability for adding multiple stocks simultaneously.
-  💬 Community-driven stock discussions with sorting and filtering options.
-  📈 Comprehensive stock metrics including symbol, company name, purchase price, last dividend, industry, and market capitalization.

## API Endpoints

### Account Management

-  `POST /api/Account/register` - Register a new user account
-  `POST /api/Account/login` - Authenticate and login
-  `GET /api/Account/me` - Get current user information
-  `POST /api/Account/logout` - Logout user session
-  `PUT /api/Account` - Update user credentials

### Stock Management

-  `GET /api/Stock` - Get all stocks with filtering, sorting, and pagination
-  `GET /api/Stock/{id}` - Get a specific stock by ID
-  `POST /api/Stock` - Add a new stock
-  `PUT /api/Stock/{id}` - Update a stock (full update)
-  `PATCH /api/Stock/{id}` - Partially update a stock
-  `DELETE /api/Stock/{id}` - Delete a stock
-  `POST /api/Stock/multiple` - Add multiple stocks in bulk

### Portfolio Management

-  `GET /api/Portfolio` - Get user's portfolio
-  `POST /api/Portfolio?symbol={symbol}` - Add a stock to portfolio
-  `DELETE /api/Portfolio?symbol={symbol}` - Remove a stock from portfolio

### Comment Management

-  `GET /api/Comment` - Get all comments with optional filtering by symbol
-  `GET /api/Comment/{id}` - Get a specific comment
-  `POST /api/Comment` - Create a new comment
-  `PUT /api/Comment/{id}` - Update a comment
-  `DELETE /api/Comment/{id}` - Delete a comment
