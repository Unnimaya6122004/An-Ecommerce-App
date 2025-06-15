

````markdown
# 🛒 MERN Stack E-commerce App

An end-to-end E-commerce web application built with the **MERN stack** (MongoDB, Express, React, Node.js). It supports user authentication, product management, category-based filtering, cart and checkout functionality integrated with Braintree payment gateway.

## 🚀 Features

- User Authentication (Register / Login)
- Admin Dashboard
- Product & Category Management
- Add to Cart and Checkout
- Secure Payments using Braintree
- Responsive UI built with React

---

## 🧑‍💻 Run Locally

### 🔧 Prerequisites
- Node.js (v14+)
- MongoDB URI
- Braintree credentials (for test payments)

### 📁 Clone this repository

```bash
git clone https://github.com/Unnimaya6122004/An-Ecommerce-App.git
cd An-Ecommerce-App
````

### ⚙️ Set up Environment Variables

#### For Backend (`.env`)

Create a `.env` file in the root directory:

```env
PORT=8080
DEV_MODE=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_braintree_merchant_id
BRAINTREE_PUBLIC_KEY=your_braintree_public_key
BRAINTREE_PRIVATE_KEY=your_braintree_private_key
```

#### For Frontend (`client/.env`)

Create a `.env` file inside the `client/` directory:

```env
REACT_APP_API=http://localhost:8080
```

---

### ▶️ Run the App

```bash
npm install            # Installs server dependencies
cd client && npm install  # Installs frontend dependencies
cd ..                  # Back to root directory
npm run dev            # Runs both frontend and backend
```

Your app will now be available at:

```
Frontend  → http://localhost:3000  
Backend   → http://localhost:8080  
```

---


![Home](https://github.com/user-attachments/assets/b706394e-4299-453e-87ff-381817dd2396)


### 🛍️ Product Listing

![Products](https://github.com/user-attachments/assets/ae7ae1c9-9c61-49da-9473-3e20bf06970a)
![image](https://github.com/user-attachments/assets/a75cfd62-c509-4efa-8770-d9d76a236506)


### 🔒 Login Page

![Login](https://github.com/user-attachments/assets/ff3de5ab-7d36-416e-abb6-6a5f879b362f)

---

## 📦 Tech Stack

* **Frontend**: React, React Router, Axios, Bootstrap
* **Backend**: Node.js, Express, MongoDB, Braintree
* **Authentication**: JWT (JSON Web Tokens)
* **Deployment**: Render (Backend), Vercel (Frontend)

---

## 🤝 Contributing

Feel free to fork this repo and contribute via pull requests!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

```

---

### 📌 Notes:
- Place your screenshots inside a folder named `screenshots/` at the root.
- Replace `"your_mongodb_connection_string"` and `"your_braintree_*"` with real keys when running locally, but **never commit them** to GitHub.

Would you like me to generate placeholder screenshots or visuals for the README too?
```
