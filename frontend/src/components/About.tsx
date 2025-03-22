
import { useEffect, useRef } from 'react';
import { TrendingUp, CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // GSAP animations
    if (sectionRef.current && statsRef.current) {
      // Animate stats with GSAP counter effect
      const stats = statsRef.current.querySelectorAll('.stat-number');
      
      stats.forEach((stat) => {
        const value = stat.textContent;
        gsap.fromTo(
          stat,
          { textContent: "0" },
          {
            textContent: value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              if (this.targets()[0].textContent.includes('%')) {
                this.targets()[0].textContent = Math.ceil(this.progress() * parseInt(value as string)) + '%';
              } else if (this.targets()[0].textContent.includes('/')) {
                this.targets()[0].textContent = '24/7';
              } else {
                this.targets()[0].textContent = Math.ceil(this.progress() * parseInt(value as string)) + '%';
              }
            }
          }
        );
      });
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const achievements = [
    { number: "85%", text: "Increase in crop yield" },
    { number: "40%", text: "Less water consumption" },
    { number: "65%", text: "Less fertilizer used" },
    { number: "24/7", text: "Real-time monitoring" }
  ];
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div id="about" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="about-content"
          >
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-sm md:text-base font-semibold text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
            >
              About AgroTech
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-dark-500"
            >
              Transforming Traditional Farming with Technology
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-dark-300 text-lg mb-6"
            >
              Founded with a mission to revolutionize agriculture, AgroTech combines 
              decades of farming expertise with cutting-edge technology to create 
              solutions that address the challenges of modern farming.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-dark-300 text-lg mb-8"
            >
              Our team of agronomists, engineers, and data scientists work together 
              to deliver a platform that helps farmers make informed decisions, 
              increase productivity, and promote sustainable practices.
            </motion.p>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4 mb-10"
            >
              {["Precision agriculture solutions", "Data-driven decision making", "Sustainable farming practices", "Comprehensive farm management"].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-dark-400">{item}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1 stat-number">{item.number}</div>
                  <div className="text-sm text-dark-300">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="about-image relative"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Modern farming with technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-500/20 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30, y: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="absolute -bottom-6 -left-6 w-64 glassmorphism rounded-xl p-5 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold">Crop Growth</h4>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              
              <div className="space-y-3">
                {["Corn", "Wheat", "Soybeans"].map((crop, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-sm">
                      <span>{crop}</span>
                      <span className="font-medium">{85 + index * 5}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 + index * 5}%` }}
                        transition={{ duration: 1.5, delay: 0.7 + (index * 0.2), ease: "easeOut" }}
                        className="h-full bg-primary rounded-full" 
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-1/4 left-0 w-96 h-96 bg-nature-100 rounded-full filter blur-[150px] opacity-30"
      ></motion.div>
    </div>
  );
};

export default About;
