import * as path from "path";
import { spawn } from "child_process";

export function run() {
  const proc = spawn(path.join(`runner-command`), [], {
    // settings for streams are as follows: [stdin, stdout, stderr(, ipc)]
    stdio: [`pipe`, `pipe`, `pipe`, `ipc`],
    detached: true,
    cwd: process.cwd(),

    env: {
      ...process.env,
    },
  });

  proc.stderr.on(`data`, (buf) => {
    let log = buf.toString();

    console.log(`ERROR`, log);
  });
  proc.stdout.on(`data`, (buf) => {
    let log = buf.toString();

    console.log(`LOG`, log);
  });

  proc.on("message", (data) => {
    console.log(`STRUCTURED DATA`, data);
  });

  proc.on(`exit`, (data) => {
    console.log(data);
    proc.kill();
  });
}
