import type { GetStaticProps } from "next";
import Head from "next/head";
import styles from "styles/Home.module.css";
import { Checklists } from "componets/checklists/checklists";
import { getPrefectures } from "libs/get-prefectures";
import { PrefecturesResponse } from "model/prefectures";
import { ArtificialTransitiveGraph } from "componets/artificial-transitive-graph/artificial-transitive-graph";
import { AppStateProvider } from "libs/state/AppState";
import { convertResponseToState, getAllPrefCode } from "libs/convert";
import { ApiKeyFormModal } from "componets/modal/ApiKeyFormModal";
import { ApiKeyStateProvider } from "libs/state/ApiKeyState";

const Home = ({ data }: { data: PrefecturesResponse }) => {
  return (
    <AppStateProvider initialState={convertResponseToState(data)}>
      <ApiKeyStateProvider>
        <div className={styles.container}>
          <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {/* <main className={styles.main}> */}
          <main>
            <Checklists />
            <ArtificialTransitiveGraph allPrefCode={getAllPrefCode(data)} />
          </main>
        </div>
        <ApiKeyFormModal />
      </ApiKeyStateProvider>
    </AppStateProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPrefectures();
  return {
    props: {
      data: data as PrefecturesResponse,
    },
  };
};

export default Home;
