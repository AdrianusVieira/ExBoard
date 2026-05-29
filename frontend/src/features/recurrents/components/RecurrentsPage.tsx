import Nav from "../../../shared/components/Nav";
import useRecurrentsPage from "../hooks/useRecurrentsPage";
import RecurrentForm from "./RecurrentForm";
import RecurrentList from "./RecurrentList";

const TEXTS = {
  title: "Recurrent incomes",
  description:
    "Recurrent incomes automatically generate a new entry each month once the previous one has passed.",
  buttons: {
    new: "New recurrent",
  },
  loading: "Loading recurrents...",
  loadError: "Failed to load recurrents.",
};

const COLORS = {
  bg: "bg-[#f0efea]",
  text: {
    primary: "text-[#1a1a2e]",
    secondary: "text-[#6b6b80]",
  },
};

const RecurrentsPage = () => {
  const {
    recurrents,
    categories,
    loading,
    error,
    showForm,
    handleNewRecurrent,
    handleCloseForm,
    handleSubmit,
    handleRemove,
  } = useRecurrentsPage();

  const shouldRenderContent = !loading && !error;

  return (
    <div className={`min-h-screen ${COLORS.bg}`}>
      <Nav />

      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-lg font-semibold ${COLORS.text.primary}`}>
              {TEXTS.title}
            </h1>
            <p className={`text-sm ${COLORS.text.secondary} mt-1`}>
              {TEXTS.description}
            </p>
          </div>
          <button
            onClick={handleNewRecurrent}
            className="text-sm px-4 py-2 border border-[#6fcfae] bg-[#e1f5ee] text-[#0f6e56] rounded-md font-medium cursor-pointer flex items-center gap-2 flex-shrink-0"
          >
            <i className="ti ti-plus text-sm" />
            {TEXTS.buttons.new}
          </button>
        </div>

        {loading && (
          <p className={`text-sm ${COLORS.text.secondary}`}>{TEXTS.loading}</p>
        )}
        {error && <p className="text-sm text-red-500">{TEXTS.loadError}</p>}
        {shouldRenderContent && (
          <RecurrentList recurrents={recurrents} onRemove={handleRemove} />
        )}
      </div>

      {showForm && (
        <RecurrentForm
          categories={categories}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default RecurrentsPage;
