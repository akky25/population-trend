import { env } from "config";

export const config = {
  method: "GET",
  headers: { "X-API-KEY": env.api.key },
};
