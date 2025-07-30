import { useState, useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';

export const MobileFilters = () => {
  const {
    isOpenMobileFilters,
    setIsOpenMobileFilters,
    selectedFilters,
    setSelectedFilters,
  } = useMainContext();

  const [localFilters, setLocalFilters] = useState([]);

  useEffect(() => {
    if (isOpenMobileFilters) {
      setLocalFilters(selectedFilters);
    }

    if (isOpenMobileFilters) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpenMobileFilters]);

  const stylesOptions = [
    'Еко-стиль',
    'Індустріальний',
    'Скандинавський',
    'Мінімалізм',
  ];

  const areaOptions = [
    'Вітальня',
    'Спальня',
    'Санвузол',
    'Кухня',
    'Гардеробна',
    'Дитяча',
  ];

  const toggleMobileFilters = () => {
    setIsOpenMobileFilters((prev) => !prev);
  };

  const toggleLocalFilter = (value) => {
    if (localFilters.includes(value)) {
      setLocalFilters(localFilters.filter((f) => f !== value));
    } else {
      setLocalFilters([...localFilters, value]);
    }
  };

  const applyFilters = () => {
    setSelectedFilters(localFilters);
    setIsOpenMobileFilters(false);
  };

  return (
    <aside className={`mobile-filters ${isOpenMobileFilters ? 'open' : ''}`}>
      <div className="container">
        <div className="mobile-filters-top">
          <h1 className="mobile-filters__title h1--bold">Фільтри</h1>
          <button
            type="button"
            className="mobile-filters__close-button bg-image"
            onClick={toggleMobileFilters}
          ></button>
        </div>
      </div>

      <div className="mobile-filters__content-devider"></div>

      <div className="container">
        <div className="mobile-filters__block">
          <div className="mobile__filter">
            <h4 className="mobile-filter__title">ВИБЕРІТЬ СТИЛЬ:</h4>
            <ul className="mobile-filter__options" role="listbox">
              {stylesOptions.map((option) => (
                <li key={option} className="mobile-filter__option">
                  <label>
                    <input
                      type="checkbox"
                      checked={localFilters.includes(option)}
                      onChange={() => toggleLocalFilter(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="mobile__filter">
            <h4 className="mobile-filter__title">ВИБЕРІТЬ ПРИМІЩЕННЯ:</h4>
            <ul className="mobile-filter__options" role="listbox">
              {areaOptions.map((option) => (
                <li key={option} className="mobile-filter__option">
                  <label>
                    <input
                      type="checkbox"
                      checked={localFilters.includes(option)}
                      onChange={() => toggleLocalFilter(option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          className="filters-apply__button button--text"
          onClick={applyFilters}
        >
          Застосувати
        </button>
      </div>
    </aside>
  );
};
