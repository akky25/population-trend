import { env } from "config";

const config = {
  method: "GET",
  headers: { "X-API-KEY": env.api.key },
};

export const getPrefectures = async () => {
  return await fetch(env.api.url.prefectures, config).then((response) =>
    response.json()
  );
};
