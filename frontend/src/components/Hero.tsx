
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateHero = () => {
      const elements = heroRef.current?.querySelectorAll('.animate-on-load');
      
      if (elements) {
        elements.forEach((el, index) => {
          setTimeout(() => {
            (el as HTMLElement).style.opacity = '1';
            (el as HTMLElement).style.transform = 'translateY(0)';
          }, 200 * index);
        });
      }
    };
    
    // GSAP animation for background elements
    const bgElements = heroRef.current?.querySelectorAll('.bg-element');
    if (bgElements) {
      gsap.fromTo(
        bgElements,
        { 
          scale: 0.8,
          opacity: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out"
        },
        {
          scale: 1,
          opacity: 0.7,
          duration: 1.5,
          stagger: 0.2,
          ease: "power2.out"
        }
      );
    }
    
    // Start animation after a small delay to ensure DOM is ready
    setTimeout(animateHero, 100);
  }, []);
  
  return (
    <div 
      ref={heroRef} 
      id="home" 
      className="relative min-h-screen flex items-center pt-20 pb-16 px-6 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        <motion.div 
          className="bg-element absolute top-16 right-[20%] w-64 h-64 bg-nature-100 rounded-full filter blur-[80px] opacity-70"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="bg-element absolute top-[25%] right-[5%] w-96 h-96 bg-tech-200 rounded-full filter blur-[100px] opacity-30"
          animate={{ 
            y: [0, 40, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="bg-element absolute bottom-[10%] left-[10%] w-80 h-80 bg-earth-100 rounded-full filter blur-[90px] opacity-40"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            ref={textRef} 
            className="flex flex-col space-y-6 max-w-2xl"
          >
            <motion.span 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base font-semibold text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 inline-flex items-center self-start"
            >
              <motion.span 
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-2 h-2 bg-primary rounded-full mr-2"
              ></motion.span>
              Next-Gen Agricultural Technology
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight hero-text-shadow"
            >
              Revolutionizing{" "}
              <motion.span 
                initial={{ color: "#3E9142" }}
                animate={{ color: ["#3E9142", "#7BED8D", "#3E9142"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                className="text-primary"
              >
                Agriculture
              </motion.span>{" "}
              With Smart Technology
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-dark-300"
            >
              Harness the power of precision agriculture with our innovative platform. Monitor crops, optimize resources, and increase yields with data-driven insights.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary hover:bg-primary/90 text-white py-6 px-8 rounded-lg flex items-center gap-2 text-lg shadow-lg shadow-primary/20">
                  Start Now 
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-dark-200 hover:bg-dark-100/10 py-6 px-8 rounded-lg text-lg">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="pt-8 flex items-center space-x-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((num) => (
                  <motion.div 
                    key={num}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1 + (num * 0.1) }}
                    whileHover={{ y: -3, zIndex: 10 }}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-xs font-semibold text-dark-500">U{num}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
              >
                <div className="text-sm text-dark-400">Trusted by</div>
                <div className="font-semibold">500+ Farmers Worldwide</div>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-[500px]"
          >
            <motion.div 
              className="relative w-full h-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-[90%] h-[90%] rounded-2xl overflow-hidden glassmorphism shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-nature-200/40 to-transparent"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                    alt="Smart Agriculture" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 w-40 h-40 glassmorphism rounded-lg p-4 shadow-lg"
              >
                <div className="text-sm font-semibold mb-2">Crop Health</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold text-primary">94%</div>
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xs text-green-600"
                  >
                    ↑ 12%
                  </motion.div>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="h-full bg-primary rounded-full" 
                  ></motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-4 -left-4 lg:top-8 lg:-left-8 w-40 glassmorphism rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-1.5 rounded-lg">
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-primary rounded-full"
                    ></motion.div>
                  </div>
                  <div className="text-sm font-semibold">Live Monitoring</div>
                </div>
                <div className="mt-2 text-xs text-dark-300">
                  Data updated in real-time
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
      ></motion.div>
    </div>
  );
};

export default Hero;
