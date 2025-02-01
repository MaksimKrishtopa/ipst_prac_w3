import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
