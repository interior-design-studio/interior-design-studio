import { motion } from 'framer-motion';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { useEffect, useState } from 'react';
import { getArticleList } from '../../utils/api';
import { BlogList } from './components/BlogList';

export const Blog = () => {
  const currentPage = 'Блог';

  const [articles, setArticles] = useState([]);
  const [loading, setLoadig] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticleList();
        setArticles(data);
      } catch (err) {
        setError(err.message);
        console.error('Помилка завантаження:', err);
      } finally {
        setLoadig(false);
      }
    };
    loadArticles();
  }, []);

  return (
    <motion.main
      className="page blog-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container">
        <BreadCrumb
          items={[
            { title: 'Головна', href: '/' },
            { title: currentPage, href: '/blog' },
          ]}
        />
      </div>
      <SectionHeader title="Блог" slogan={`“Натхнення починається зі слова”`} />
      <div className="container">
        <BlogList articles={articles} />
      </div>
    </motion.main>
  );
};
