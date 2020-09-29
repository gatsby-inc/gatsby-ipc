import * as path from "path";
import * as execa from "execa";
import * as sade from "sade";

const prog = sade(`gatsby-ipc`);

prog.version(require("../package.json").version);

function registerSigInt(proc) {
  process.on("SIGINT", () => {
    proc.kill();
  });
}

function createCommand(cmd) {
  const proc = execa.node(
    path.join(process.cwd(), "./node_modules/gatsby-cli/lib/index.js"),
    [cmd],
    {
      cwd: process.cwd(),
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      env: {
        ENABLE_GATSBY_EXTERNAL_JOBS: "true",
      },
    }
  );

  proc.stderr.on(`data`, (buf) => {
    let log = buf.toString();

    console.log(`ERROR`, log);
  });

  proc.stdout.on(`data`, (buf) => {
    let log = buf.toString();

    console.log(`LOG`, log);
  });

  proc.on("error", (err) => {
    console.log(err);
  });

  proc.on("message", (data) => {
    console.log(`STRUCTURED DATA`, data);
  });

  return proc;
}

prog
  .command("build")
  .describe(`Gatsby Build`)
  .action(async () => {
    const proc = createCommand(`build`);

    await proc;
  })
  .command("develop")
  .describe(`Gatsby Develop`)
  .action(async () => {
    const proc = createCommand(`develop`);

    proc.on("exit", () => {
      console.log("exit");
    });

    registerSigInt(proc);
  });

export const cli = prog;
