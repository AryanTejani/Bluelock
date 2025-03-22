
import { useEffect, useRef } from 'react';
import { CloudSun, Droplet, BarChart, Cpu, Leaf, Shield } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-card');
            
            elements.forEach((el, index) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add('animate-scale-in');
              }, 150 * index);
            });
            
            // Stop observing after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const features = [
    {
      icon: <CloudSun className="w-6 h-6 text-primary" />,
      title: "Weather Forecasting",
      description: "Accurate weather predictions to plan your agricultural activities with confidence."
    },
    {
      icon: <Droplet className="w-6 h-6 text-primary" />,
      title: "Irrigation Management",
      description: "Optimize water usage with smart irrigation scheduling based on soil conditions."
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      title: "Yield Analytics",
      description: "Detailed analytics to track and improve crop yields season after season."
    },
    {
      icon: <Cpu className="w-6 h-6 text-primary" />,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms that provide actionable insights for your farm."
    },
    {
      icon: <Leaf className="w-6 h-6 text-primary" />,
      title: "Crop Health Monitoring",
      description: "Early detection of diseases and pests to protect your investment."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Resource Optimization",
      description: "Minimize waste and maximize efficiency with smart resource allocation."
    }
  ];
  
  return (
    <div id="features" className="section-padding bg-nature-50 relative" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm md:text-base font-semibold text-primary px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark-500">
            Innovative Solutions for Modern Agriculture
          </h2>
          <p className="text-dark-300 text-lg">
            Our platform combines cutting-edge technology with agricultural expertise to deliver a comprehensive solution for farming operations of all sizes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card opacity-0 p-6 rounded-xl glassmorphism border border-white/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 mb-5 rounded-lg bg-primary/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-dark-500">
                {feature.title}
              </h3>
              <p className="text-dark-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-tech-200 rounded-full filter blur-[150px] opacity-30 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-earth-100 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow"></div>
    </div>
  );
};

export default Features;
