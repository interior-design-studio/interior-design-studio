export const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="container">
        <div className="contact-info__content">
          <nav className="contact-info__nav">
            <a
              href="https://mail.google.com/mail/?view=cm&to=tavrdesignhouse@gmail.com"
              className="contact-info__link email button--text-underline"
              target="_blank"
              rel="noreferrer"
            >
              <p>tavrdesignhouse@gmail.com</p>
            </a>
            <span className="contact-info__divider">|</span>
            <a
              href="tel:+380931389963"
              className="contact-info__link phone button--text"
            >
              +38 093 138 99 63
            </a>
            <span className="contact-info__divider">|</span>
            <div className="contact-info__socials button--text">
              <a
                href="https://instagram.com/tavrdesignhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__social contact-info__social--instagram"
              >
                <p>instagram</p>
              </a>
              <a
                href="https://t.me/tavrdesignhouse"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__social contact-info__social--telegram"
              >
                <p>telegram</p>
              </a>
              <a
                href="viber://chat?number=+380931389963"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__social contact-info__social--viber"
              >
                <p>viber</p>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
