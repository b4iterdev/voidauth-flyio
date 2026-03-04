import "./seed-config.mjs";
import { spawn } from "node:child_process";

const child = spawn(process.execPath, ["/app/dist/index.mjs"], {
  cwd: "/app",
  env: process.env,
  stdio: "inherit",
});

for (const signal of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error("Failed to start VoidAuth:", error);
  process.exit(1);
});
