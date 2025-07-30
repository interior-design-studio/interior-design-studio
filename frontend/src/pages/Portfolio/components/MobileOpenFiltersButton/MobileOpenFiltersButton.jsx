import { useMainContext } from '../../../../context/MainContext';

export const MobileFiltersOpenButton = () => {
  const { isOpenMobileFilters, setIsOpenMobileFilters } = useMainContext();

  const toggleMobileFilters = () => {
    setIsOpenMobileFilters((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="mobile-filters-button button--text-underline"
      onClick={toggleMobileFilters}
    >
      Фільтри
    </button>
  );
};
