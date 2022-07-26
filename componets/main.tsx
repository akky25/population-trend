import { useApiKeyState } from "libs/state/ApiKeyState";
import { ArtificialTransitiveGraph } from "./artificial-transitive-graph/artificial-transitive-graph";
import { Checklists } from "./checklists/checklists";

export const Main = () => {
  const apiKey = useApiKeyState();
  return apiKey.apiKey ? (
    <main>
      <Checklists />
      <ArtificialTransitiveGraph />
    </main>
  ) : (
    <></>
  );
};
