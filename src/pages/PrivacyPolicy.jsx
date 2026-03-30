import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy = () => {
  const mainRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-[#F5F3EE] text-[#111111] selection:bg-[#E63B2E] selection:text-white overflow-x-hidden font-['Space_Grotesk'] min-h-screen flex flex-col">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-full border border-[#111111]/10 ${
        isScrolled ? "bg-[#F5F3EE]/90 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss Construction" className="h-full w-auto object-contain" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-[#111111]/70">
          <Link to="/" className="hover:text-[#E63B2E] transition-colors">Home</Link>
          <Link to="/services" className="hover:text-[#E63B2E] transition-colors">Services</Link>
          <Link to="/about" className="hover:text-[#E63B2E] transition-colors">About</Link>
          <Link to="/reviews" className="hover:text-[#E63B2E] transition-colors">Reviews</Link>
        </div>
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <Link to="/contact" className="bg-[#E63B2E] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center flex items-center justify-center">
            Connect
          </Link>
          <span className="font-bold uppercase tracking-tighter text-lg">WEISS</span>
        </div>
      </nav>

      <main className="flex-grow pt-40 pb-20 px-6 md:px-20 max-w-4xl mx-auto w-full relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 text-lg opacity-80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">1. Introduction</h2>
            <p>At Weiss Construction, we prioritize the privacy and security of our clients' information. This Privacy Policy outlines the types of personal information we receive and collect when you use our website and services, as well as how we safeguard your information.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">2. Information We Collect</h2>
            <p className="mb-4">We may collect personal information that you provide to us voluntarily, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, and mailing address when you request a quote or contact us.</li>
              <li>Project details, property information, and financial data required for billing and service execution.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">3. How We Use Your Information</h2>
            <p className="mb-4">The information we collect is used in the following ways:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our services.</li>
              <li>To improve, personalize, and expand our website.</li>
              <li>To understand and analyze how you use our website.</li>
              <li>To communicate with you directly regarding project updates, estimates, and customer service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">4. Data Protection</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">5. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">6. Consent</h2>
            <p>By using our site, you consent to our privacy policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-4 text-[#E63B2E]">7. Contact Us</h2>
            <p>If there are any questions regarding this privacy policy, you may contact us using the information provided on our website.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
