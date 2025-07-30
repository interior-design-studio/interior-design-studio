import { useMainContext } from '../../../context/MainContext';

export const FiltersResetButton = () => {
  const { setSelectedFilters } = useMainContext();

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <button
      className="filters-reset__button button--text-underline"
      onClick={resetFilters}
    >
      Скинути фільтри
    </button>
  );
};
