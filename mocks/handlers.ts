import { rest } from "msw";
import prefectures from "./response/prefectures.json";
import populationComposition from "./response/populationComposition.json";

export const handlers = [
  rest.get(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(prefectures));
    }
  ),
  rest.get(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear",
    (req, res, ctx) => {
      const prefCode = Number(req.url.searchParams.get("prefCode"));
      return res(
        ctx.status(200),
        ctx.json(populationComposition[prefCode - 1])
      );
    }
  ),
];
