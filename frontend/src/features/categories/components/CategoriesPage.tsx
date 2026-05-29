import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import useCategoriesPage from "../hooks/useCategoriesPage";
import Nav from "../../../shared/components/Nav";

const TEXTS = {
  title: "Categories",
  loading: "Loading categories...",
  loadError: "Failed to load categories.",
};

const COLORS = {
  bg: "bg-[#f0efea]",
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

  return (
    <div className={`min-h-screen ${COLORS.bg}`}>
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-6">
        <h1 className={`text-lg font-semibold ${COLORS.text.primary} mb-6`}>
          {TEXTS.title}
        </h1>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            {loading && (
              <p className={`text-sm ${COLORS.text.secondary}`}>
                {TEXTS.loading}
              </p>
            )}
            {error && <p className="text-sm text-red-500">{TEXTS.loadError}</p>}
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
