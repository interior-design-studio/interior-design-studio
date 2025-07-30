import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { HomePage } from '../pages/HomePage';
import { Services } from '../pages/Services';
import { Portfolio } from '../pages/Portfolio';
import { Project } from '../pages/Project';
import { Blog } from '../pages/Blog';
import { BlogPost } from '../pages/BlogPost';
import { Contact } from '../pages/Contact';
import { PageNotFound } from '../pages/PageNotFound';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<Services />} />
        <Route path="projects" element={<Portfolio />} />
        <Route path="projects/:projectId" element={<Project />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:blogPostId" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
