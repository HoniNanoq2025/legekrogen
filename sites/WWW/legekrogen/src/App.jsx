import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList/ProductList";
import ProductCreate from "./pages/ProductCreate/ProductCreate";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/new" element={<ProductCreate />} />
        <Route path="/products/import" />
        <Route path="/products/:id" />
      </Routes>
    </div>
  );
}
