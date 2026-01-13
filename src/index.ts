import express from "express";
import { exec } from "child_process";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors({
  origin : "http://localhost:8080",
  credentials : true
}))

const PORT = 5000;

/* ---------------- VALIDATION ---------------- */

const allowedFlags = new Set([
  "-sV",
  "-Pn",
  "-T4",
  "--open"
]);

function isValidTarget(target: string): boolean {
  const ip =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/;
  const domain =
    /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;

  return ip.test(target) || domain.test(target);
}

/* ---------------- SCAN PRESETS ---------------- */

function buildScanCommand(
  target: string,
  scanType: "quick" | "deep" | "os",
  flags: string[]
): string {
  let baseCommand = "";

  switch (scanType) {
    case "quick":
      baseCommand = "nmap -sT -Pn --top-ports 100";
      break;
    case "deep":
      baseCommand = "nmap -sT -sV -Pn -p-";
      break;
    case "os":
      baseCommand = "nmap -sT -O -Pn";
      break;
  }

  const safeFlags = flags.filter((f) => allowedFlags.has(f));

  return `${baseCommand} ${safeFlags.join(" ")} ${target}`;
}

/* ---------------- PARSING ---------------- */

function parsePorts(output: string) {
  const ports: {
    port: number;
    state: string;
    service: string;
    version?: string;
  }[] = [];

  const lines = output.split("\n");
  let inPortSection = false;

  for (const line of lines) {
    if (line.startsWith("PORT")) {
      inPortSection = true;
      continue;
    }
    if (inPortSection && line.trim() === "") break;

    if (inPortSection) {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 3) {
        const [portProto, state, service, ...versionParts] = parts;
        const port = parseInt(portProto.split("/")[0]);

        ports.push({
          port,
          state,
          service,
          version: versionParts.join(" ") || undefined,
        });
      }
    }
  }

  return ports;
}

function parseOS(output: string): string | undefined {
  const osLine = output
    .split("\n")
    .find((l) => l.includes("OS details") || l.includes("Running:"));

  return osLine?.trim();
}

/* ---------------- API ---------------- */

/**
 * POST /nmap/scan
 */
app.post("/api/scans/nmap", (req, res) => {
  const { target, flags = [], scanType } = req.body;

  if (!target || !scanType) {
    return res.status(400).json({ error: "Missing target or scanType" });
  }

  if (!isValidTarget(target)) {
    return res.status(400).json({ error: "Invalid target" });
  }

  const command = buildScanCommand(target, scanType, flags);

  exec(command, { timeout: 120_000 }, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).json({
        error: "Scan failed",
        details: stderr || err.message,
      });
    }

    const response = {
      output: stdout,
      ports: parsePorts(stdout),
      osInfo: scanType === "os" ? parseOS(stdout) : undefined,
    };

    res.json(response);
  });
});

app.listen(PORT, () => {
  console.log(`Nmap API running on http://localhost:${PORT}`);
});
