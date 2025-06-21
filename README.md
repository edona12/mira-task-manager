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
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_NAME=mira_task_manager
DB_PORT=5432
JWT_SECRET=sekret_i_fortesuar

MONGO_URI=mongodb+srv://edona:Edona123!@cluster0.liigf3k.mongodb.net/miraDB?retryWrites=true&w=majority&appName=Cluster0

