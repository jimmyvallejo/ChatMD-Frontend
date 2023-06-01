import { useContext } from "react";

import { SearchContext } from "../context/search.context";

import SearchProviders from "../components/SearchProviders";
import ProviderResults from "../components/ProviderResults";

const Providers = () => {
  const { activeSearch } = useContext(SearchContext);

  return (
    <div
      className={` ${
        activeSearch.length === 0 ? "providerSmall" : "provider"
      } flex flex-col  items-center justify-center bg-white`}
    >
      <h1 className="text-3xl font-semibold mb-5 ml-3">
        <span className="text-blue-500">Search</span>{" "}
        <span className="text-slate-500">For</span>{" "}
        <span className="text-red-400">Providers</span>
      </h1>
      <SearchProviders />
      <ProviderResults />
    </div>
  );
};

export default Providers;
