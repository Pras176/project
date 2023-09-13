import View from "./Component/View";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Edit from "./Component/Edit";

import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<View />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/update/:id" element={<Update/>}/> */}
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}
