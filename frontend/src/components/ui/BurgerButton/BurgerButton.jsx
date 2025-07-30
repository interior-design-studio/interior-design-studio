import { useMainContext } from '../../../context/MainContext';

export const BurgerButton = () => {
  const { isOpenMobileMenu, setIsOpenMobileMenu } = useMainContext();

  const toggleMenu = ({ onClick }) => {
    setIsOpenMobileMenu((prev) => !prev);
    if (onClick) onClick(!isOpenMobileMenu);
  };

  return (
    <button
      className={`burger-button ${isOpenMobileMenu ? 'open' : ''}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};
