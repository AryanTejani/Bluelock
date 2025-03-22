
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10 ${
        isScrolled ? 'py-3 glassmorphism' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="text-2xl font-display font-bold text-dark-500 transition-all"
          >
            agro<span className="text-primary">tech</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <Button className="ml-4 bg-primary hover:bg-primary/90 text-white">
              Get Started
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-primary transition-all" />
            ) : (
              <Menu className="w-6 h-6 text-dark-500 transition-all" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-24 px-6`}
      >
        <nav className="flex flex-col items-center space-y-8 text-xl">
          <a 
            href="#home" 
            className="nav-link active"
            onClick={toggleMenu}
          >
            Home
          </a>
          <a 
            href="#features" 
            className="nav-link"
            onClick={toggleMenu}
          >
            Features
          </a>
          <a 
            href="#about" 
            className="nav-link"
            onClick={toggleMenu}
          >
            About
          </a>
          <a 
            href="#contact" 
            className="nav-link"
            onClick={toggleMenu}
          >
            Contact
          </a>
          <Button 
            className="mt-4 w-full bg-primary hover:bg-primary/90 text-white"
            onClick={toggleMenu}
          >
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
