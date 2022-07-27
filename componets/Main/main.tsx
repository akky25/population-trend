import { ArtificialTransitiveGraph } from "../artificial-transitive-graph/artificial-transitive-graph";
import { Checklists } from "../checklists/checklists";
import { useMainDataFetch } from "./UseMainDataFetch";

export const Main = () => {
  const { isNoDrawing, isLoading, error } = useMainDataFetch();
  if (isNoDrawing) return <></>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>fetch error</div>;
  return (
    <main>
      <Checklists />
      <ArtificialTransitiveGraph />
    </main>
  );
};
