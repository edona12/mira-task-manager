    # MIRA Task Manager

Aplikacion web për menaxhimin e detyrave dhe stafit, me ndarje të roleve: **admin** dhe **staff**.

---

## ⚙️ Teknologjitë e përdorura

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (për user & tasks), MongoDB (për njoftime)
- **Autentifikimi:** JWT (JSON Web Token)

---

## 👥 Roli i përdoruesve

- **Admin**
  - Krijon dhe menaxhon detyra
  - Krijon përdorues (staf)
  - Sheh `Dashboard`, `Tasks`, `Staff`
- **Staff**
  - Sheh vetëm `My Tasks` që i janë caktuar

---


## 🛠️ Si ta nisësh projektin lokalisht

```bash
# Backend
cd backend
npm install
node server.js

# Frontend
cd client
npm install
npm start

backend/.env.example
PORT=8000
DATABASE_URL=postgres://user:password@localhost:5432/mira_db
MONGO_URI=mongodb://localhost:27017/mira_notifications
JWT_SECRET=put-a-secure-secret
