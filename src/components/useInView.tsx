import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
