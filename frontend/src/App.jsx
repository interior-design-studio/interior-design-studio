import { ParallaxProvider } from 'react-scroll-parallax';
import './App.scss';
import { Header } from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import AnimatedRoutes from './routes/AnimatedRoutes';
import { MobileMenu } from './pages/MobileMenu';

export const App = () => {
  return (
    <ParallaxProvider>
      <div className="App">
        <Header />
        <MobileMenu />
        <AnimatedRoutes />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};
