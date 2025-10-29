import { Routes, Route } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" />
        <Route path="/products/new" />
        <Route path="/products/import" />
        <Route path="/products/:id" />
      </Routes>
    </div>
  );
}
