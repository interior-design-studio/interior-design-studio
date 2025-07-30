import { Filter } from '../Filter';
import { useState } from 'react';
import { FiltersResetButton } from '../../../../components/ui/FiltersResetButton';
import { useMainContext } from '../../../../context/MainContext';

export const Filters = () => {
  const { selectedFilters, setSelectedFilters } = useMainContext();
  const [openStates, setOpenStates] = useState({
    style: false,
    area: false,
  });

  const resetFilters = () => {
    setSelectedFilters([]);
    setOpenStates({
      style: false,
      area: false,
    });
  };

  const toggleFilter = (title) => {
    setOpenStates((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="filters-block">
      <div className="filters">
        <Filter
          title="Стиль"
          options={[
            'Еко-стиль',
            'Індустріальний',
            'Скандинавський',
            'Мінімалізм',
          ]}
          isOpen={openStates['style']}
          setIsOpen={() => toggleFilter('style')}
          selected={selectedFilters}
          onSelect={setSelectedFilters}
        />
        <Filter
          title="Приміщення"
          options={[
            'Вітальня',
            'Спальня',
            'Санвузол',
            'Кухня',
            'Гардеробна',
            'Дитяча',
          ]}
          isOpen={openStates['area']}
          setIsOpen={() => toggleFilter('area')}
          selected={selectedFilters}
          onSelect={setSelectedFilters}
        />
      </div>
      <FiltersResetButton resetFilters={resetFilters} />
    </div>
  );
};
