# 🛡️ Warden

Warden is a high-performance, production-ready moderation and logging bot for the Stoat platform. Built with a modern TypeScript stack, it is designed for extreme reliability, lightning-fast response times, and seamless self-hosting via Docker.

## ✨ Features
*(Note: This is a work in progress, and the feature list will be updated as development progresses.)*

## 🛠️ Tech Stack
Warden leverages a bleeding-edge, fully type-safe infrastructure:
* **Runtime:** [Node.js 26](https://nodejs.org/) (Native ESM & Subpath Imports)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) managed via [Drizzle ORM](https://orm.drizzle.team/)
* **Caching:** [Redis](https://redis.io/)
* **Package Manager:** [pnpm 11](https://pnpm.io/)
* **Deployment:** [Docker](https://www.docker.com/) & Docker Compose

---

## 🚀 Quick Start (Docker Deployment)

The easiest way to run Warden is using the provided Docker Compose stack, which automatically provisions the database, cache, and bot environments.

### 1. Prerequisites
* [Docker](https://docs.docker.com/get-docker/) and Docker Compose installed on your host machine.
* A Stoat Bot Token.

### 2. Clone the Repository
```bash
git clone [https://github.com/yourusername/warden.git](https://github.com/yourusername/warden.git)
cd warden
```

### 3. Configure Environment Variables
Copy the example environment file and fill in your secure credentials:
```bash
cp .env.example .env
```
Edit `.env` and set the following variables:
```env
# Bot Configuration
STOAT_TOKEN=your_secure_bot_token_here
NODE_ENV=production
LOG_LEVEL=info

# Database Credentials
POSTGRES_USER=warden_admin
POSTGRES_PASSWORD=your_secure_db_password
POSTGRES_DB=warden

# Internal Networking (Do not change if using standard Docker Compose)
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}
REDIS_URL=redis://redis:6379
```

### 4. Start the Services
Spin up the entire stack in detached mode. The database migrations will automatically run before the bot boots up.
```bash
docker-compose up -d --build
```
To view logs:
```bash
docker-compose logs -f warden
```

## 💻 Local Development
If you want to contribute to Warden or run it locally without Docker orchestration:

### 1. Install dependencies:
Enable corepack and install the required packages:
```bash
npm install -g pnpm@11
pnpm install
```

### 2. Spin up local infrastructure (PostgreSQL & Redis):
You can use the compose file just to host the required databases locally:
```bash
docker compose up -d database redis
```
(Ensure your local `.env` points to `localhost` for development instead of the Docker service names!)

### 3. Database Management
Warden uses Drizzle ORM. Whenever you change the schema (src/database/schema.ts), generate a new migration:
```bash
pnpm run db:generate
```
To push those changes to your local database:
```bash
pnpm run db:push
```

### 4. Start the Bot
```bash
pnpm run dev
```

## 📂 Project Structure
```
warden/
├── locales/         # i18n translation files
├── src/
│   ├── commands/    # Command definitions and handlers
│   ├── events/      # Events that the bot listens to (e.g., messageCreate, guildMemberAdd)
│   ├── database/    # Drizzle schema, queries, and migration scripts
│   ├── lib/         # Core utilities (logger, API wrappers)
│   └── index.ts     # Bot entry point
├── drizzle/         # Generated SQL migration history
├── Dockerfile       # Multi-stage, optimized Node 26 image
├── compose.yml      # Orchestration for Warden, Postgres, and Redis
└── package.json
```

## 📜 License
Warden is open-source software licensed under the [GNU General Public License v3.0](LICENSE).