# Prime Video Clone Backend

A production-grade Express.js + TypeScript backend for an Amazon Prime Video-style platform.  
Features full REST APIs, admin views (EJS), and Prisma ORM with SQLite (easy to switch to Postgres/MySQL).

---

## 🚀 Features

- User Signup & Login (JWT Auth Ready)
- Category & Video CRUD (with many-to-many join)
- Admin panel (EJS) to add categories/videos with animations
- Home API: returns all categories, each with a max of 10 videos (slider-ready)
- Production TypeScript setup
- Tailwind CSS for admin panel styling
- Prisma ORM for type-safe DB access

---

## 🛠️ Getting Started

1. **Clone the Repo**

    ```bash
    git clone https://github.com/yourusername/prime-video-backend.git
    cd prime-video-backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Copy `.env.example` to `.env` and fill in secrets as needed.

    ```bash
    cp .env.example .env
    ```
    Default SQLite DB is ready to go!  
    You can switch to Postgres/MySQL by editing `prisma/schema.prisma` and your `.env`.

4. **Set Up and Migrate Database with Prisma**

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
    - This will create your SQLite DB (`dev.db`) and generate the Prisma client.

5. **Run the Server**

    ```bash
    npm run dev
    ```
    - The server starts on [http://localhost:3000](http://localhost:3000)

6. **(Optional) View & Edit Data with Prisma Studio**

    ```bash
    npx prisma studio
    ```
    - Open [http://localhost:5555](http://localhost:5555) in your browser.
    - Browse, add, and edit your Categories, Videos, Users, etc.

---

## 🧑‍💻 Usage

### API Endpoints

- **POST `/api/category`** - Add a category
- **GET `/api/category`** - List categories
- **POST `/api/video`** - Add a video (provide valid `categoryIds` and `uploaderId`)
- **GET `/api/video`** - List videos
- **GET `/api/home`** - Get homepage sliders (categories with up to 10 videos each)

### Admin Panel

- **Add Category Form:** [http://localhost:3000/admin/category/add](http://localhost:3000/admin/category/add)
- **Add Video Form:** [http://localhost:3000/admin/video/add](http://localhost:3000/admin/video/add)

### See/Add/Edit Data in DB

- Use [Prisma Studio](http://localhost:5555) for easy admin tasks.

---

## ⚙️ Customization & Production

- **Switch to Postgres/MySQL:**  
  Edit `prisma/schema.prisma` datasource and update `.env`, then run migrations.

- **Build for production:**  
    ```bash
    npm run build
    npm start
    ```

- **Configure Admin UI with custom CSS or Tailwind as you like.**

---

## 🧩 Folder Structure

```text
prime-video-backend/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── api/
│   │   └── admin/
│   ├── middlewares/
│   ├── routes/
│   │   ├── api/
│   │   └── admin/
│   ├── services/
│   ├── types/
│   ├── utils/
│   └── views/
│       ├── category/
│       └── video/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/          # for built CSS, images, etc (optional)
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md

---

## 🙋 FAQ

- **How do I add test users or categories?**  
  Use Prisma Studio or the admin forms.

- **How to use another database?**  
  Edit `prisma/schema.prisma` and `.env`, run `npx prisma migrate dev`.

- **How to reset the database?**  
  Delete `dev.db`, then re-run migrations.

---

## 📢 Credits

Built with [Express.js](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/), [EJS](https://ejs.co/), [TailwindCSS](https://tailwindcss.com/).

---

## 📝 License

MIT
