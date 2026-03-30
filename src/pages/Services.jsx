import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Footer from '../components/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Drill, Shield, Hammer } from 'lucide-react';
import { servicesData } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const mainRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from(".hero-text-enter", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      });

      // Scroll Reveal & Parallax for Service Rows
      gsap.utils.toArray(".service-row").forEach((row) => {
        // Fade Up Row
        gsap.from(row, {
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
          y: 80,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        });
        
        // Slow Image Parallax
        const img = row.querySelector("img");
        if(img) {
          gsap.to(img, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });
    }, mainRef);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-[#F5F3EE] text-[#111111] selection:bg-[#E63B2E] selection:text-white overflow-x-hidden font-['Space_Grotesk'] min-h-screen">
      {/* Global Noise */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05]">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-full border border-[#111111]/10 ${isScrolled ? "bg-[#F5F3EE]/90 backdrop-blur-xl shadow-2xl" : "bg-transparent"
        }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss" className="h-full w-auto object-contain" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-[#111111]/70">
          <Link to="/" className="hover:text-[#E63B2E] transition-colors">Home</Link>
          <Link to="/services" className="text-[#E63B2E] transition-colors">Services</Link>
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

      {/* HERO SECTION */}
      <section className="relative pt-48 pb-24 w-full px-6 flex items-center justify-center text-center overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#E63B2E]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
           <div className="overflow-hidden mb-8 flex justify-center">
             <div className="bg-[#E63B2E]/10 border border-[#E63B2E]/20 px-8 py-3 rounded-full flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-[#E63B2E] animate-pulse" />
               <p className="hero-text-enter font-mono uppercase tracking-[0.3em] text-[#E63B2E] font-bold text-xs">Active Capability Matrix</p>
             </div>
           </div>
           <h1 className="leading-[0.9] tracking-tighter text-[#111111] mb-10">
             <span className="hero-text-enter block text-5xl md:text-[6.5rem] font-bold uppercase">Divisions of</span>
             <span className="hero-text-enter block text-7xl md:text-[11rem] font-serif italic text-[#E63B2E] font-['DM_Serif_Display']">Excellence.</span>
           </h1>
           <p className="hero-text-enter text-xl md:text-3xl opacity-60 font-medium max-w-3xl mx-auto leading-relaxed">
             From deep structural interventions to shield-grade roofing, our service divisions operate with uncompromising precision.
           </p>
        </div>
      </section>

      {/* INFINITE SCROLLING MARQUEE */}
      <div className="w-full bg-[#111111] py-5 overflow-hidden border-y border-[#111111]/10 relative z-20 flex shadow-2xl">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 mx-5 text-[#E8E4DD]">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] font-bold">Structural Integrity</span>
              <span className="w-2 h-2 rounded-full bg-[#E63B2E]" />
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] font-bold">Zero-Tolerance Execution</span>
              <span className="w-2 h-2 rounded-full bg-[#E63B2E]" />
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] font-bold">Shield-Grade Defenses</span>
              <span className="w-2 h-2 rounded-full bg-[#E63B2E]" />
            </div>
          ))}
        </div>
      </div>

      {/* PREMIUM STAGGERED LAYOUT */}
      <section className="py-32 px-6 md:px-20 max-w-[100rem] mx-auto flex flex-col gap-32 md:gap-48 relative">
        {/* Central connecting line for desktop */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#111111]/20 to-transparent hidden lg:block" />

        {servicesData.map((service, idx) => (
           <PremiumServiceRow key={service.id} service={service} index={idx} />
        ))}
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

// Premium Row Component
const PremiumServiceRow = ({ service, index }) => {
  const { id, title, desc, media } = service;
  // Alternate layout alignment based on odd/even index
  const isEven = index % 2 === 0;

  return (
    <div className={`service-row flex flex-col lg:flex-row gap-12 lg:gap-24 items-center w-full relative group ${isEven ? '' : 'lg:flex-row-reverse'}`}>
      
      {/* Massive Background Number (Decorative) */}
      <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-0' : 'left-0'} text-[12rem] md:text-[25rem] font-serif italic text-[#111111]/[0.02] font-['DM_Serif_Display'] leading-none pointer-events-none select-none z-0 transition-colors duration-700 group-hover:text-[#E63B2E]/[0.05]`}>
        0{index + 1}
      </div>

      {/* Image Block */}
      <div className="w-full lg:w-1/2 h-[450px] md:h-[650px] relative z-10 overflow-hidden rounded-[2.5rem] border border-[#111111]/10 shadow-lg group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] group-hover:border-[#111111]/30 transition-all duration-700">
        <img 
          src={media} 
          alt={title} 
          // Origin top to anchor parallax nicely
          className="w-full h-[130%] object-cover origin-top absolute top-[-15%] transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        {/* Floating Badge overlay */}
        <div className="absolute top-8 left-8 flex gap-3">
          <span className="bg-[#111111]/40 backdrop-blur-md text-white px-5 py-2 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest border border-white/20 shadow-xl">
            System 0{index + 1}
          </span>
        </div>
      </div>

      {/* Content Block */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center z-10 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-12 bg-[#E63B2E] transition-all duration-700 ease-out group-hover:w-32" />
          <span className="font-mono text-[#E63B2E] font-bold text-xs uppercase tracking-[0.3em]">Module {id.split('-')[0]}</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-8 group-hover:text-[#E63B2E] transition-colors duration-500 leading-none">
          {title}
        </h2>
        
        <p className="text-xl md:text-2xl opacity-60 font-medium leading-relaxed mb-14 max-w-xl">
          {desc}
        </p>

        <Link to={`/services/${id}`} className="group/btn relative overflow-hidden bg-[#111111] text-white px-10 py-6 rounded-full flex items-center gap-6 w-fit hover:pr-14 transition-all duration-500 shadow-xl hover:shadow-[#E63B2E]/20 hover:-translate-y-1">
           <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-xs md:text-sm">Execute Build</span>
           <ArrowRight size={20} strokeWidth={2.5} className="relative z-10 group-hover/btn:translate-x-2 transition-transform" />
           <div className="absolute inset-0 bg-[#E63B2E] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
        </Link>
      </div>

    </div>
  );
};

export default Services;
