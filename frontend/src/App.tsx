import { Routes, Route, Navigate } from "react-router-dom";
import EntriesPage from "./features/entries/components/EntriesPage";
import CategoriesPage from "./features/categories/components/CategoriesPage";
import RecurrentsPage from "./features/recurrents/components/RecurrentsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/entries" replace />} />
      <Route path="/entries" element={<EntriesPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/recurrents" element={<RecurrentsPage />} />
    </Routes>
  );
};

export default App;
