import "./App.css";
import Table from "./components/table";
import Deck from "./components/deck";
import Ranking from "./components/ranking";

const App = () => {
  return (
    <div className="max-w-4xl min-h-screen mx-auto flex">
      <div className="w-4/5 min-w-2xl h-full flex flex-col">
        <div className="h-1/2 m-4">
          <Table />
        </div>
        <div className="h-1/2 m-4">
          <Ranking />
        </div>
      </div>
      <div className="w-1/5 min-w-48 m-4 my-15 ">
        <Deck />
      </div>
    </div>
  );
};

export default App;
