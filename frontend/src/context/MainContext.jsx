import { createContext, useState, useContext, useEffect } from 'react';
import { getProjectsList } from '../utils/api';
import PropTypes from 'prop-types';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // 🔥 Новый state для фильтров
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [formData, setFormData] = useState({
    customer_name: '',
    phone_number: '',
    customer_question: '',
    chosen_answers: [
      { question: 1, option: null, custom_answer: '' },
      { question: 2, option: null, custom_answer: null },
      { question: 3, option: null, custom_answer: null },
      { question: 4, option: null, custom_answer: null },
      { question: 5, option: null, custom_answer: null },
    ],
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectsList();
        setProjects(data);
      } catch (err) {
        console.error('Помилка завантаження проектів:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <MainContext.Provider
      value={{
        projects,
        loading,
        error,
        formData,
        isValid,
        isOpenMobileMenu,
        isOpenMobileFilters,
        width,
        selectedFilters,
        setSelectedFilters,
        setFormData,
        setLoading,
        setError,
        setIsValid,
        setIsOpenMobileMenu,
        setIsOpenMobileFilters,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }
  return context;
};
