import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Footer from '../components/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin,
  Flame,
  Zap
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MagneticButton = ({ children, className }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    
    // Magnetic Hover Effect
    const xTo = gsap.quickTo(btn, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
    const yTo = gsap.quickTo(btn, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
      xTo(x);
      yTo(y);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button 
      ref={buttonRef} 
      className={`group relative overflow-hidden flex items-center justify-center transition-all ${className}`}
    >
      <div className="absolute inset-0 bg-[#E63B2E] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
      <span className="relative z-10 flex items-center gap-4">{children}</span>
    </button>
  );
};

const About = () => {
  const mainRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-up global utility
      gsap.utils.toArray('.fade-up').forEach((elem) => {
        gsap.fromTo(elem, 
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }
        );
      });

      // Hero Parallax
      gsap.to('.hero-bg', {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: '.hero-section',
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Manifesto Line Expansion
      gsap.fromTo('.manifesto-line', 
        { width: "0%" },
        { 
          width: "100%",
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: '.manifesto-section',
            start: "top 75%",
          }
        }
      );

      // Hero Text Entrance Stagger
      gsap.from('.hero-text-enter', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
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
    <div ref={mainRef} className="bg-[#F5F3EE] text-[#111111] selection:bg-[#E63B2E] selection:text-white overflow-x-hidden font-['Space_Grotesk']">
      
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
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-[2rem] border border-[#111111]/10 ${
        isScrolled ? "bg-[#F5F3EE]/90 backdrop-blur-xl shadow-lg" : "bg-transparent"
      }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss Construction" className="h-full w-auto object-contain" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-[#111111]/70">
          <Link to="/" className="hover:text-[#E63B2E] transition-colors">Home</Link>
          <Link to="/services" className="hover:text-[#E63B2E] transition-colors">Services</Link>
          <Link to="/about" className="text-[#E63B2E] transition-colors">About</Link>
          <Link to="/reviews" className="hover:text-[#E63B2E] transition-colors">Reviews</Link>
        </div>
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <Link to="/contact" className="bg-[#E63B2E] text-white px-5 py-2 rounded-[2rem] text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center flex items-center justify-center">
            Connect
          </Link>
          <span className="font-bold uppercase tracking-tighter text-lg">WEISS</span>
        </div>
      </nav>

      {/* 1. HERO: "The Origin Canvas" */}
      <section className="hero-section relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#E8E4DD]">
          <img 
            src="/vidsandpics/struct.webp" 
            className="hero-bg w-full h-[120%] object-cover opacity-60 absolute -top-[10%]"
            alt="Architectural Framing"
          />
          {/* Subtle vignette/gradient so text pops perfectly */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3EE]/50 to-[#F5F3EE]" />
        </div>
        
        <div className="relative z-10 text-center px-6 w-full max-w-7xl mt-20">
          <div className="overflow-hidden mb-4">
             <p className="hero-text-enter font-mono uppercase tracking-[0.3em] text-[#E63B2E] font-bold text-sm md:text-base mb-6">About</p>
          </div>
          <h1 className="leading-[0.9] tracking-tighter text-[#111111]">
            <span className="hero-text-enter block text-5xl md:text-[6rem] font-bold uppercase mb-2">Built on</span>
            <span className="hero-text-enter block text-7xl md:text-[12rem] font-serif italic text-[#E63B2E] font-['DM_Serif_Display']">Integrity.</span>
          </h1>
        </div>
      </section>

      {/* 2. THE MANIFESTO */}
      <section id="about" className="manifesto-section py-40 px-8 md:px-20 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start">
          <div className="col-span-1 md:col-span-5 fade-up">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
              The Manifesto
            </h2>
            <div className="mt-8 font-mono text-xs uppercase tracking-widest opacity-40">
              <p>Doc. Ref: WS-01A</p>
              <p>Classification: Public</p>
            </div>
          </div>
          <div className="col-span-1 md:col-span-7 fade-up">
            <h3 className="text-2xl md:text-4xl font-serif italic text-[#E63B2E] mb-10 font-['DM_Serif_Display'] leading-tight">
              A reputable roofing & construction authority.
            </h3>
            <div className="relative pt-10">
               {/* Signal Red Divider Line */}
               <div className="absolute top-0 left-0 h-[2px] bg-[#E63B2E] manifesto-line origin-left" />
               <p className="text-xl md:text-3xl font-medium leading-[1.6] opacity-80 max-w-3xl">
                 Dedicated to providing top-notch solutions. We merge unmatched expertise with robust engineering to deliver reliable installations that outlast the elements. 
                 This isn't just construction; it's a relentless pursuit of permanence.
               </p>
            </div>
            
            <MagneticButton className="mt-16 bg-[#111111] text-[#E8E4DD] px-10 py-5 rounded-[2rem] font-bold uppercase text-sm tracking-[0.2em] shadow-xl">
              <Link to="/" className="font-bold cursor-pointer">Explore Blueprint</Link>
              <ArrowRight size={20} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 3. SERVICE PILLARS (Image Grid) */}
      <section id="services" className="py-24 px-6 md:px-20 mx-auto w-full bg-[#111111] rounded-[2rem] my-10 max-w-[96%] relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="fade-up mb-20 text-center relative z-10">
          <h2 className="text-[#E8E4DD] text-5xl md:text-7xl font-bold uppercase tracking-tighter flex items-center justify-center gap-6">
            <Zap className="text-[#E63B2E] w-12 h-12" /> Service Pillars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          {/* Pillar 1 */}
          <Link to="/services/roofing-installation" className="block group relative overflow-hidden rounded-[2rem] h-[500px] md:h-[700px] fade-up cursor-pointer bg-[#0a0a0a]">
            <img 
              src="/vidsandpics/roof.webp" 
              alt="Roofing Textures" 
              className="w-full h-full object-cover opacity-80 scale-110 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 transform group-hover:-translate-y-4 transition-transform duration-500">
              <p className="font-mono text-[#E63B2E] text-xs font-bold tracking-[0.3em] mb-3 uppercase">Pillar 01</p>
              <h3 className="text-3xl md:text-5xl font-bold text-[#E8E4DD] uppercase tracking-tighter">Roofing</h3>
            </div>
          </Link>

          {/* Pillar 2 */}
          <Link to="/services/new-construction" className="block group relative overflow-hidden rounded-[2rem] h-[500px] md:h-[700px] md:-translate-y-12 fade-up cursor-pointer bg-[#0a0a0a]">
            <img 
              src="/vidsandpics/struct.webp" 
              alt="Structural Framing" 
              className="w-full h-full object-cover opacity-80 scale-110 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 transform group-hover:-translate-y-4 transition-transform duration-500">
              <p className="font-mono text-[#E63B2E] text-xs font-bold tracking-[0.3em] mb-3 uppercase">Pillar 02</p>
              <h3 className="text-3xl md:text-5xl font-bold text-[#E8E4DD] uppercase tracking-tighter">Framing</h3>
            </div>
          </Link>

          {/* Pillar 3 */}
          <Link to="/services/remodeling" className="block group relative overflow-hidden rounded-[2rem] h-[500px] md:h-[700px] fade-up cursor-pointer bg-[#0a0a0a]">
            <img 
              src="/vidsandpics/crib.webp" 
              alt="Modern Remodeling" 
              className="w-full h-full object-cover opacity-80 scale-110 group-hover:scale-100 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-10 transform group-hover:-translate-y-4 transition-transform duration-500">
              <p className="font-mono text-[#E63B2E] text-xs font-bold tracking-[0.3em] mb-3 uppercase">Pillar 03</p>
              <h3 className="text-3xl md:text-5xl font-bold text-[#E8E4DD] uppercase tracking-tighter">Remodeling</h3>
            </div>
          </Link>

        </div>
      </section>

      {/* 4. TRUST PROTOCOLS (Badge Reimagining) */}
      <section id="trust" className="py-40 px-6 md:px-20 max-w-screen-2xl mx-auto">
        <div className="text-center mb-24 fade-up">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Trust Signals</h2>
          <p className="font-mono text-sm tracking-widest opacity-50 uppercase">Authentication Matrix</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Badge 1 */}
          <div className="fade-up border border-[#111111]/20 rounded-[2rem] p-10 bg-white shadow-xl hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E63B2E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <ShieldCheck className="text-[#E63B2E] w-14 h-14 mb-8" strokeWidth={1.5} />
             <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Insured</h3>
             <p className="font-medium opacity-60 leading-relaxed text-sm">Full liability and workers comp coverage securely active.</p>
          </div>

          {/* Badge 2 */}
          <div className="fade-up border border-[#111111]/20 rounded-[2rem] p-10 bg-white shadow-xl hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E63B2E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <Award className="text-[#E63B2E] w-14 h-14 mb-8" strokeWidth={1.5} />
             <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Bonded</h3>
             <p className="font-medium opacity-60 leading-relaxed text-sm">Guaranteed project completion without compromise.</p>
          </div>

          {/* Badge 3 */}
          <div className="fade-up border border-[#111111]/20 rounded-[2rem] p-10 bg-white shadow-xl hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E63B2E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <Users className="text-[#E63B2E] w-14 h-14 mb-8" strokeWidth={1.5} />
             <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Family Owned</h3>
             <p className="font-medium opacity-60 leading-relaxed text-sm">A multi-generational commitment extending across Illinois.</p>
          </div>

          {/* Badge 4 */}
          <div className="fade-up border border-[#111111]/20 rounded-[2rem] p-10 bg-white shadow-xl hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#E63B2E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <MapPin className="text-[#E63B2E] w-14 h-14 mb-8" strokeWidth={1.5} />
             <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Locally Owned</h3>
             <p className="font-medium opacity-60 leading-relaxed text-sm">Hillsboro-based command center, seamlessly serving the region.</p>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default About;
