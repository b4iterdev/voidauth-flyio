# VoidAuth Deployment Guide (Fly.io + Unmanaged PostgreSQL)

> Replace `voidauth` with your own app name (for example: `b4iterdev-voidauth`) in commands where needed.

## 1) Create unmanaged Postgres on Fly

Create a Postgres cluster:

```bash
fly postgres create --name voidauth-pg --region iad
```

Save these values from the output (you will use them in Step 4):
- Postgres host
- Postgres password
- Postgres user/database (usually `postgres`)

---

## 2) Create VoidAuth app + persistent config volume

```bash
fly apps create voidauth
fly volumes create voidauth_config --app voidauth --region iad --size 1
```

---

## 3) Copy `fly.toml` in this repository and change `app` and `primary_region` field

Use the `fly.toml` in this repo, then update:

```toml
app = "voidauth"          # change to your Fly app name
primary_region = "sin"    # change to your preferred region
```

---

## 4) Set required secrets

```bash
fly secrets set -a voidauth \
  APP_URL="https://auth.yourdomain.com" \
  STORAGE_KEY="$(openssl rand -hex 32)" \
  DB_HOST="<flycast-postgres-host>" \
  DB_PASSWORD="<postgres-password>"
```

---

## 5) Deploy

```bash
fly deploy -a voidauth --ha=false
```

---

## 6) First login

Get startup logs:

```bash
fly logs -a voidauth --no-tail
```

On first startup, VoidAuth prints initial admin credentials in logs. Use those credentials to sign in, then create/update your permanent admin user immediately.
