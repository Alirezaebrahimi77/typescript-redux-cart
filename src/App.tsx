import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";

function App() {
  return (
      <BrowserRouter>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
