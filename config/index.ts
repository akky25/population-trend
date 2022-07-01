export const env = {
  api: {
    key: process.env.RESAS_API_KEY ?? "",
    url: {
      prefectures: process.env.URL_GET_PREFECTURES ?? "",
    },
  },
};
