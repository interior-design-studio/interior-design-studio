import { useNavigate } from 'react-router-dom';

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="go-back-button button--text-underline"
    >
      <p>Назад</p>
    </button>
  );
};
