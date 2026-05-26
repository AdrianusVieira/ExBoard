import { Routes, Route, Navigate } from "react-router-dom";
import EntriesPage from "./features/entries/components/EntriesPage";
import CategoriesPage from "./features/categories/components/CategoriesPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/entries" replace />} />
      <Route path="/entries" element={<EntriesPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  );
};

export default App;
