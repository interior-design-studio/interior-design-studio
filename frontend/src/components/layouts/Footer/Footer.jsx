import { MainLogo } from '../../ui/MainLogo';
import { contactLinks } from '../../../data/contactLinks';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__nav-bar">
          <MainLogo className="footer__logo" />
          <div className="footer-contacts__wrapper">
            <ul className="footer__contact-list footer__contact-list--column">
              {contactLinks.slice(0, 2).map(({ id, to, label }, index) => (
                <li key={id} className="footer__nav-item button--text">
                  <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`footer__nav-link ${id === 2 ? 'phone' : ''} ${
                      index >= 2 && index <= 4
                        ? 'footer__nav-link--underline'
                        : ''
                    }`}
                  >
                    {label}
                  </a>
                  {index < 2 && (
                    <div className="footer__contacts-separator button--text"></div>
                  )}
                </li>
              ))}
            </ul>
            <ul className="footer__contact-list footer__contact-list--row">
              {contactLinks.slice(2).map(({ id, to, label }, index) => (
                <li key={id} className="footer__nav-item button--text">
                  <a
                    href={to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__nav-link footer__nav-link--underline"
                  >
                    {label}
                  </a>
                  {index < 2 && (
                    <div className="footer__contacts-separator button--text"></div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  );
};
