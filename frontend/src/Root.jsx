import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { Project } from './pages/Project';
import { MainProvider } from './context';
import { ScrollToTop } from './components/routing/ScrollToTop';
import { BlogPost } from './pages/BlogPost';
import { PageNotFound } from './pages/PageNotFound';

export const Root = () => (
  <BrowserRouter basename="/interior-design-studio">
    <ScrollToTop />
    <MainProvider>
      <Routes>
        <Route path="*" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<Services />} />
          <Route path="projects" element={<Portfolio />} />
          <Route path="projects/:projectId" element={<Project />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:blogPostId" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </MainProvider>
  </BrowserRouter>
);
