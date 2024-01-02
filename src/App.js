import { useState } from "react";
import Homepage from "./pages/Homepage";
import Loader from "./components/loader/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      {isLoading ? <Loader /> :<Homepage />}
    </div>
  );
}

export default App;
