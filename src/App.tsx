import "./App.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pokedex from "./Pokedex.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Pokedex />
  </QueryClientProvider>
);

export default App;
