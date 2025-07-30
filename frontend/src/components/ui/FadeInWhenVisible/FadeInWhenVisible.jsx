import { useAnimation, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, [breakpoint]);

  return isMobile;
};

export const FadeInWhenVisible = ({
  children,
  direction = 'up',
  threshold = 0.2,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold });
  const isMobile = useIsMobile();

  const variants = {
    hidden: {
      opacity: 0,
      y: isMobile
        ? 0
        : direction === 'up'
          ? 100
          : direction === 'down'
            ? -100
            : 0,
      x: isMobile
        ? 0
        : direction === 'left'
          ? 100
          : direction === 'right'
            ? -100
            : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{ overflowX: 'hidden', overflowY: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

FadeInWhenVisible.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  threshold: PropTypes.number,
};
