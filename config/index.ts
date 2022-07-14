export const env = {
  api: {
    key: process.env.NEXT_PUBLIC_RESAS_API_KEY ?? "",
    url: {
      prefectures: process.env.URL_GET_PREFECTURES ?? "",
      populationCompositionPeryear:
        process.env.NEXT_PUBLIC_URL_GET_POPULATION_COMPOSITION_PERYEAR ?? "",
    },
  },
};
