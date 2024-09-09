import express from "express";
import path from "path";
import { envs } from "../config/envs";

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();

  private readonly port: number;
  private readonly public_path: string;
  constructor(options: Options) {
    const { port, public_path = "public" } = options;
    this.port = port;
    this.public_path = public_path;
  }

  static async start() {
    const serverApp = new Server({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
    });

    // Middlewares

    // Public Folder
    serverApp.app.use(express.static(serverApp.public_path));

    serverApp.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${serverApp.public_path}/index.html`
      );
      res.sendFile(indexPath);
    });

    serverApp.app.listen(serverApp.port, () => {
      console.log(`server running on por ${serverApp.port}`);
    });
  }
}
