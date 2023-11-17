import Edit from "./Component/Actions/Edit";
import View from "./Component/Actions/View";
import Welcome from "./Component/Landing_pge/Welcome";
import Addform from "./Component/Pages/Addform";
import List from "./Component/Pages/List";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/addnew" element={<Addform />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/edit/:_id" element={<Edit />}></Route>
          <Route path="/view/:_id" element={<View />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
