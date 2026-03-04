FROM voidauth/voidauth:latest

# Keep a copy of default customizable assets inside the image.
COPY customization /app/customization-seed

# Startup helpers:
# - seed-config.mjs copies defaults into /app/config (Fly volume mount)
# - start-with-config.mjs runs seeding, then starts VoidAuth
COPY docker/seed-config.mjs /app/seed-config.mjs
COPY docker/start-with-config.mjs /app/start-with-config.mjs

ENTRYPOINT ["node", "/app/start-with-config.mjs"]
