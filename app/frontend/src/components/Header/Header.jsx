import { NavLink } from 'react-router-dom';
import { MainLogo } from '../UI/MainLogo';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <MainLogo className={'main-logo--header'} />
          <nav className="header__nav nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                >
                  Головна
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                >
                  Послуги
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                >
                  Портфоліо
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                >
                  Блог
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive ? 'nav__link nav__link--active' : 'nav__link'
                  }
                >
                  Контакти
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
