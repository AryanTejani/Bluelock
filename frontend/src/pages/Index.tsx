
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Offset for header
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.main 
      className="min-h-screen flex flex-col"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </motion.main>
  );
};

export default Index;
