// api.js (this is your entry point)
import app from "./app.js";

export default function handler(req, res) {
  return app(req, res);
}
