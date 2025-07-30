import { useEffect } from 'react';
import { useMainContext } from '../../context/MainContext';
import { navLinks } from '../../data/navLinks';
import { NavLink } from 'react-router-dom';

export const MobileMenu = () => {
  const { isOpenMobileMenu, setIsOpenMobileMenu } = useMainContext();

  const toggleMenu = () => {
    setIsOpenMobileMenu((prev) => !prev);
  };

  useEffect(() => {
    if (isOpenMobileMenu) {
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
  }, [isOpenMobileMenu]);

  return (
    <aside className={`mobile-menu ${isOpenMobileMenu ? 'open' : ''}`}>
      <div className="container">
        <ul className="mobile-menu__nav-list">
          {navLinks.map(({ id, to, label }) => (
            <li key={id} className="mobile-menu__nav-item" onClick={toggleMenu}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'mobile-menu__nav-link mobile-menu__nav-link--active'
                    : 'mobile-menu__nav-link'
                }
                end
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu__devider"></div>
      </div>
    </aside>
  );
};
