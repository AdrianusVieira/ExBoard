import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import { NavLink } from "react-router-dom";
import useCategoriesPage from "../hooks/useCategoriesPage";

const TEXTS = {
  brand: "Ex Board",
  title: "Categories",
  nav: {
    entries: "Entries",
    categories: "Categories",
  },
  loading: "Loading categories...",
  loadError: "Failed to load categories.",
};

const COLORS = {
  bg: "bg-[#f0efea]",
  nav: "bg-white border-b border-black/10",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
};

const CategoriesPage = () => {
  const {
    categories,
    description,
    editing,
    error,
    loading,
    name,
    type,
    handleCancel,
    handleChangeDescription,
    handleChangeName,
    handleChangeType,
    handleEdit,
    handleRemove,
    handleSubmit,
  } = useCategoriesPage();

  const shouldRenderContent = !loading && !error;

  const showLoading = () => (
    <p className={`text-sm ${COLORS.text.secondary}`}>{TEXTS.loading}</p>
  );

  const showError = () => (
    <p className="text-sm text-red-500">{TEXTS.loadError}</p>
  );

  return (
    <div className={`min-h-screen ${COLORS.bg}`}>
      <nav
        className={`${COLORS.nav} px-6 py-3 flex items-center justify-between`}
      >
        <span className={`text-sm font-semibold ${COLORS.text.primary}`}>
          {TEXTS.brand}
        </span>
        <div className="flex gap-1">
          <NavLink
            to="/entries"
            className={({ isActive }) =>
              `text-sm px-3 py-1.5 rounded-md transition-colors ${isActive ? "bg-[#f5f5f7] text-[#1a1a2e] font-medium" : "text-[#6b6b80] hover:text-[#1a1a2e]"}`
            }
          >
            {TEXTS.nav.entries}
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-sm px-3 py-1.5 rounded-md transition-colors ${isActive ? "bg-[#f5f5f7] text-[#1a1a2e] font-medium" : "text-[#6b6b80] hover:text-[#1a1a2e]"}`
            }
          >
            {TEXTS.nav.categories}
          </NavLink>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <h1 className={`text-lg font-semibold ${COLORS.text.primary} mb-6`}>
          {TEXTS.title}
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            {loading && showLoading()}
            {error && showError()}
            {shouldRenderContent && (
              <CategoryList
                categories={categories}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            )}
          </div>
          <div>
            <CategoryForm
              description={description}
              editing={editing}
              name={name}
              type={type}
              onCancel={handleCancel}
              onChangeDescription={handleChangeDescription}
              onChangeName={handleChangeName}
              onChangeType={handleChangeType}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
