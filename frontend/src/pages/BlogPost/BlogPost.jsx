import { motion } from 'framer-motion';
import { BreadCrumb } from '../../components/ui/BreadCrumb';
import { getBlogPosttById } from '../../utils/api';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogPostItem } from './components/BlogPostItem';
import { BlogPostCtaSection } from './components/BlogPostCtaSection';
import { useMainContext } from '../../context/MainContext';
import { GoBackButton } from '../../components/ui/GoBackButton';

export const BlogPost = () => {
  const { width } = useMainContext();
  const isMobile = width < 767;
  const { blogPostId } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        const data = await getBlogPosttById(blogPostId);
        setBlogPost(data);
      } catch (err) {
        setError(err.message);
        console.error('Помилка завантаження статті:', err);
      } finally {
        setLoading(false);
      }
    };

    if (blogPostId) {
      loadBlogPost();
    }
  }, [blogPostId]);

  return (
    <motion.main
      className="page blog-post-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {blogPost && (
        <article className="blog-post-content">
          <div className="container">
            <BreadCrumb
              items={[
                { title: 'Головна', href: '/' },
                { title: 'Блог', href: '/blog' },
                { title: blogPost.title },
              ]}
            />
            {isMobile && <GoBackButton />}
          </div>
          <div className={`${!isMobile ? 'container' : ''}`}>
            <section className="blog-post-page__top">
              <div
                className="blog-post__main-poster bg-image"
                style={{
                  backgroundImage: `url(${blogPost.image})`,
                }}
              ></div>
              <div className="container">
                <h1 className="blog-post__title h1--bold">{blogPost.title}</h1>
                <div className="blog-post__description">{blogPost.content}</div>
              </div>
            </section>
          </div>

          <div className="container">
            <section className="blog-post__main-content grid">
              <ul className="blog-post__components-list grid--onDesktop-2-11">
                {blogPost.components.map((item) => (
                  <li className="blog-post__components-item" key={item.id}>
                    <BlogPostItem details={item} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      )}

      <BlogPostCtaSection />
    </motion.main>
  );
};
