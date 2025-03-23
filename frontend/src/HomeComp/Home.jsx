import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSatellite, FaWhatsapp, FaChartLine, FaMapMarkedAlt, FaGithub, FaLinkedin, FaTwitter, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { TbPlant, TbCloudRain, TbSunset } from 'react-icons/tb';
import { MdOutlineWaterDrop, MdOutlineInsights } from 'react-icons/md';
import { BsBank2 } from 'react-icons/bs';
import { RiPlantLine } from 'react-icons/ri';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

// Placeholder for logo import - you'll need to provide your own logo
const logo = "https://via.placeholder.com/100x50";

// Simplified Navbar component
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-900/90 backdrop-blur-md border-b border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-10 w-auto" src={logo} alt="KisanCredit Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#farm-data" className="text-yellow-100 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Farm Data</a>
                <a href="#loan-approval" className="text-yellow-100 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Loan Approval</a>
                <a href="#easy-access" className="text-yellow-100 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Easy Access</a>
                <a href="#safety" className="text-yellow-100 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium">Safety</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-green-900 px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-lg shadow-yellow-500/20">
              Apply for Loan
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-200 hover:text-white hover:bg-green-700 focus:outline-none"
            >
              {mobileMenuOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-900 border-b border-green-700">
          <a href="#home" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="#farm-data" className="text-yellow-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Farm Data</a>
          <a href="#loan-approval" className="text-yellow-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Loan Approval</a>
          <a href="#easy-access" className="text-yellow-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Easy Access</a>
          <a href="#safety" className="text-yellow-100 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Safety</a>
          <button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-green-900 px-4 py-2 rounded-md text-sm font-bold transition-colors shadow-lg">
            Apply for Loan
          </button>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  const [text] = useTypewriter({
    words: [
      'Loans That Understand Farmers',
      'Fair Rates Based on Your Farm',
      'Quick Approvals for Growing Season',
      'Loans Without Complicated Paperwork',
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <main className="w-full overflow-x-hidden bg-green-900 text-white">
      <Navbar />
      
      {/* Hero Section - Farm themed */}
      <section id="home" className="relative min-h-screen w-full bg-green-900 pt-24">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background patterns */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-700/20 via-green-900/70 to-green-900" />
          
          {/* Animated farm elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`plant-${i}`}
              className="absolute h-2 w-2 bg-yellow-400 rounded-full"
              style={{
                top: `${70 + Math.random() * 30}%`, // Mostly at the bottom
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
          
          {/* Farm soil gradient at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-900/40 to-transparent" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-7xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8">
                <span className="text-yellow-400">
                  {text}
                </span>
                <Cursor cursorColor="#FFD700" />
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-yellow-100 mb-10 max-w-3xl mx-auto">
                Getting farm loans should be simple. We look at what matters - your land, crops, and farming skill - not just paperwork and credit history.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-green-900 px-10 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
              >
                Get Your Farm Loan
              </motion.button>
              
              {/* Key benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                {[
                  { value: "40%", label: "More Farmers Approved" },
                  { value: "3 Days", label: "Quick Loan Decision" },
                  { value: "7%", label: "Better Interest Rates" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.2) }}
                    className="bg-green-800 border border-yellow-500/40 rounded-xl p-6 shadow-lg shadow-yellow-500/5"
                  >
                    <h3 className="text-4xl font-bold text-yellow-400 mb-2">{stat.value}</h3>
                    <p className="text-yellow-100">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Farm Data Section */}
      <section id="farm-data" className="relative py-32 w-full bg-green-800">
        <div className="absolute inset-0 overflow-hidden">
          {/* Farm-themed background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-700/20 via-green-800 to-green-800" />
          
          {/* Crop pattern background */}
          <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10 bg-[url('https://pattern.monster/assets/img/patterns/farm-pattern.png')]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">We Look at Your Whole Farm</h2>
            <p className="text-yellow-100 max-w-2xl mx-auto">Your land tells a story that paperwork doesn't. We use modern tools to see what makes your farm special.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FaMapMarkedAlt,
                title: "Your Land's True Value",
                description: "We use satellite photos and soil maps to see your farm's real value and growing potential"
              },
              {
                icon: TbCloudRain,
                title: "Local Weather Patterns",
                description: "We check your area's rainfall and growing conditions to understand your farm's challenges"
              },
              {
                icon: RiPlantLine,
                title: "Crop & Soil Quality",
                description: "We look at what you grow and how well your soil supports it - beyond just numbers on paper"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-yellow-500/10 rounded-2xl transform -rotate-6 group-hover:rotate-0 transition-transform" />
                <div className="relative bg-green-900 p-8 rounded-2xl border border-yellow-500/40 hover:border-yellow-400 transition-all shadow-lg">
                  <div className="bg-yellow-500/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="text-3xl text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">{item.title}</h3>
                  <p className="text-yellow-100">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Approval Section */}
      <section id="loan-approval" className="relative py-32 w-full bg-green-900">
        <div className="absolute inset-0">
          {/* Grid pattern for fields */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
                style={{
                  top: `${(i + 1) * 10}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleX: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`vertical-${i}`}
                className="absolute h-full w-px bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent"
                style={{
                  left: `${(i + 1) * 10}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Fair Loan Decisions</h2>
            <p className="text-yellow-100 max-w-2xl mx-auto">We look at what makes sense for your farm, not just what computers and paperwork say</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Clear Reasons for Every Decision",
                description: "We explain exactly why you qualify and how much you can borrow - no mystery or confusing terms",
                features: ["Simple Explanations", "No Hidden Fees", "Fair Rates"]
              },
              {
                title: "Based on Your Growing Potential",
                description: "We predict how well your crops will do and what income you can expect",
                features: ["Seasonal Planning", "Harvest Value", "Repayment Timing"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-green-800 p-8 rounded-2xl border border-yellow-500/40 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                  {item.title}
                </h3>
                <p className="text-yellow-100 mb-6">{item.description}</p>
                <div className="grid grid-cols-3 gap-4">
                  {item.features.map((feature, i) => (
                    <div key={i} className="text-center p-3 bg-yellow-500/10 rounded-lg hover:bg-yellow-500/20 transition-all duration-300">
                      <span className="text-yellow-300 font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Easy Access Section */}
      <section id="easy-access" className="relative py-32 w-full bg-green-800">
        <div className="absolute inset-0">
          {/* Wave pattern background */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  borderRadius: '50%',
                  border: '2px solid #FFD700',
                  transform: `scale(${1 + i * 0.1})`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1 + i * 0.1, 1.1 + i * 0.1, 1 + i * 0.1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Easy to Use for Everyone</h2>
            <p className="text-yellow-100 max-w-2xl mx-auto">Simple tools that work for farmers, banks, and lenders - even with poor internet</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaUsers,
                title: "Farmer-Friendly",
                description: "Simple forms with help available in your local language"
              },
              {
                icon: BsBank2,
                title: "Bank Dashboard",
                description: "Clear information for lenders to approve loans faster"
              },
              {
                icon: MdOutlineInsights,
                title: "Loan Reports",
                description: "Easy-to-read reports explaining your loan options"
              },
              {
                icon: FaWhatsapp,
                title: "Works on WhatsApp",
                description: "Get updates and submit information through WhatsApp"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-green-900 p-6 rounded-xl border border-yellow-500/40 hover:border-yellow-400 shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-yellow-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                >
                  <item.icon className="text-2xl text-yellow-400" />
                </motion.div>
                <h3 className="text-lg font-bold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-yellow-100 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" className="relative py-32 w-full bg-green-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5" />
          {/* Animated lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"
              style={{
                top: `${(i + 1) * 20}%`,
                left: `${i % 2 === 0 ? 0 : 'auto'}`,
                right: `${i % 2 === 0 ? 'auto' : 0}`,
              }}
              animate={{
                x: i % 2 === 0 ? ['-100%', '100%'] : ['100%', '-100%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-yellow-400">Your Information Stays Safe</h2>
            <p className="text-yellow-100 max-w-2xl mx-auto">We protect your data and follow all government rules while adapting to your local farming needs</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Your Data Stays Private",
                description: "We keep your farm and financial information secure and protected from misuse",
                features: ["Strong Protection", "Controlled Access", "Regular Checks"]
              },
              {
                title: "Government Approved",
                description: "We follow all banking rules and requirements for farm loans",
                features: ["ID Verification", "Legal Compliance", "Proper Records"]
              },
              {
                title: "Works for Your Region",
                description: "Our system adjusts to your local crops, weather, and farming methods",
                features: ["Local Crop Knowledge", "Weather Understanding", "Regional Adjustments"]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-yellow-500/5 rounded-2xl transform group-hover:scale-105 transition-transform" />
                <div className="relative bg-green-800 p-8 rounded-2xl border border-yellow-500/40 hover:border-yellow-400 shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">{item.title}</h3>
                  <p className="text-yellow-100 mb-6">{item.description}</p>
                  <div className="space-y-3">
                    {item.features.map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="text-yellow-200">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 w-full bg-yellow-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-600 to-yellow-700" />
          
          {/* Farm-themed elements */}
          <div className="absolute bottom-0 left-0 right-0 h-20 opacity-20 bg-[url('https://pattern.monster/assets/img/patterns/farm-pattern.png')]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready for a Farm Loan That Works for You?</h2>
              <p className="text-yellow-100 mb-8 text-lg">
                Join thousands of farmers who are getting fair loans based on their actual farming skill and land quality
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-yellow-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold shadow-lg"
                >
                  Apply for Farm Loan
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold"
                >
                  How It Works
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-green-900 border-t border-yellow-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">KisanCredit</h3>
                <p className="text-yellow-100 mb-4">
                  Making farm loans fair and simple with a system that truly understands farming.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="text-yellow-300 hover:text-yellow-400"
                  >
                    <FaGithub className="text-2xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="text-yellow-300 hover:text-yellow-400"
                  >
                    <FaLinkedin className="text-2xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="text-yellow-300 hover:text-yellow-400"
                  >
                    <FaTwitter className="text-2xl" />
                  </motion.a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">How It Works</a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">For Banks</a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">For Farmers</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-yellow-300">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">Farming Tips</a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">Money Advice</a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">Success Stories</a>
                  </li>
                  <li>
                    <a href="#" className="text-yellow-100 hover:text-yellow-400">Help Center</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-yellow-800/50 mt-12 pt-8 text-center md:text-left">
            <p className="text-yellow-200 text-sm">
              &copy; {new Date().getFullYear()} KisanCredit. All rights reserved.
            </p>
            <p className="text-yellow-200/70 text-xs mt-2">
              Helping farmers access fair credit through innovative assessment.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;