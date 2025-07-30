import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

export const Filter = ({
  title,
  options,
  isOpen,
  setIsOpen,
  selected,
  onSelect,
}) => {
  const ref = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((item) => item !== option));
    } else {
      onSelect([...selected, option]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="filter-wrapper" ref={ref}>
      <button
        className={`filter__toggle ${isOpen ? 'filter__toggle--is-open' : ''} button button--text`}
        onClick={toggleDropdown}
      >
        {title}
      </button>
      {isOpen && (
        <ul className="filter__options" role="listbox">
          {options.map((option) => (
            <li key={option} className="filter__option text-secondary--regular">
              <label>
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};
