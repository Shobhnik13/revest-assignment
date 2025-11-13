# Revest Solutions – Microservices Assignment  
This project implements a **complete microservices-based system** using:

- **NestJS** (Backend – Product Service + Order Service)
- **MongoDB + Mongoose** (Database)
- **Next.js + TypeScript** (Frontend)
- **Material UI + Tailwind CSS** (UI + layouts)
- **React Hook Form** (Validation)
- **REST API communication between microservices**

This README explains the system architecture, setup guide, and how to run and test each service.

---

# Project Overview

This assignment consists of **3 independently running applications**:

### 1. Product Service (NestJS)
- Manages products  
- Provides CRUD operations  
- Stores product data in MongoDB  
- Runs on **port 4444**
- use command npm run start:dev in the product-service folder 

### 2. Order Service (NestJS)
- Manages orders  
- Calls Product Service to fetch product details  
- Validates stock & calculates order total  
- Stores product snapshot inside the order  
- Runs on **port 5555**
-  use command npm run start:dev in the order-service folder 


### 3. Frontend (Next.js + TS)
- Renders a **dynamic form based on JSON**  
- Supports TEXT, LIST, RADIO input types  
- Uses Material UI components  
- Uses Tailwind for layout  
- Uses localStorage for persistence  
- Runs on **port 3000**
-  use command npm run dev in the frontend folder 
