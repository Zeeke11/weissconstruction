import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Footer from '../components/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ProjectMap from '../components/ProjectMap';
import {
  ArrowRight,
  ChevronRight,
  Hammer,
  ShieldCheck,
  Layers,
  Calendar,
  Menu,
  X,
  Mail,
  Phone,
  FileText,
  Facebook,
  MapPin
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      tl.from(".hero-text", {
        y: 60,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
      }).from(".hero-cta", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.6");

      // Scroll Reveal for Generic Sections
      gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Smooth flowing stagger for the Core Principles grid items
      gsap.from(".core-value-item", {
        scrollTrigger: {
          trigger: ".core-values-grid",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Majestic, flowing entrance for the WEISS letters
      gsap.from(".core-letter", {
        scrollTrigger: {
          trigger: ".core-values-grid",
          start: "top 80%",
        },
        x: -60,
        y: 20,
        rotationZ: -15,
        opacity: 0,
        duration: 1.8,
        stagger: 0.15,
        ease: "expo.out"
      });

      // Protocol Stacking
      const cards = gsap.utils.toArray(".protocol-card");
      cards.forEach((card, i) => {
        if (i !== cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              gsap.to(card, {
                scale: 1 - self.progress * 0.05,
                opacity: 1 - (self.progress * 0.4),
                filter: `brightness(${1 - (self.progress * 0.5)})`,
              });
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
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-full border border-[#111111]/10 ${isScrolled ? "bg-[#F5F3EE]/90 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss Construction" className="h-full w-auto object-contain" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-[#111111]/70">
          <Link to="/" className="text-[#E63B2E] transition-colors">Home</Link>
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

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-end p-8 md:p-20">
        <div className="absolute inset-0 z-0 bg-[#E8E4DD]">
          <img
            src="/vidsandpics/struct.webp"
            className="w-full h-full object-cover opacity-60"
            alt="Brutalist concrete construction"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E8E4DD] via-[#E8E4DD]/80 to-[#E8E4DD]/20" />
        </div>

        <div className="relative z-10 max-w-4xl translate-y-[8px]">
          <h2 className="hero-text text-sm md:text-xl font-bold uppercase tracking-[0.2em] mb-4">
            Weiss Construction & Roofing
          </h2>
          <h1 className="hero-text leading-[0.85] tracking-tighter mb-8 text-[#111111]">
            <span className="block text-5xl md:text-8xl font-bold uppercase">Engineer the</span>
            <span className="block text-7xl md:text-[10rem] font-serif italic text-[#E63B2E] font-['DM_Serif_Display']">Standard.</span>
          </h1>
          <p className="hero-text text-lg md:text-2xl max-w-xl mb-8 font-medium opacity-80 leading-relaxed">
            Forging structural integrity through raw precision. From ground-up builds to industrial-grade roofing.
          </p>

          <div
            className={`transition-[opacity,max-height,transform,margin] duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden flex flex-wrap items-center justify-start gap-4 origin-top ${isScrolled ? "max-h-40 opacity-100 mb-10 translate-y-0" : "max-h-0 opacity-0 mb-0 translate-y-6"
              }`}
          >
            {/* Headquarters Pill */}
            <a
              href="https://maps.google.com/?q=1603+School+St,+Hillsboro,+IL+62049"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-[#111111]/5 backdrop-blur-xl border border-[#111111]/10 px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-[#E63B2E]/40 hover:bg-[#E63B2E]/5 hover:shadow-xl group"
            >
              <div className="w-8 h-8 rounded-full bg-[#E63B2E]/10 flex items-center justify-center border border-[#E63B2E]/30 group-hover:bg-[#E63B2E] transition-colors">
                <MapPin size={14} className="text-[#E63B2E] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#E63B2E] leading-none mb-1.5">
                  HQ / Operations
                </span>
                <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs opacity-70 leading-none">
                  Hillsboro, IL
                </span>
              </div>
            </a>

            {/* Facebook Pill */}
            <a
              href="https://www.facebook.com/profile.php?id=61561002837674#"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-[#111111]/5 backdrop-blur-xl border border-[#111111]/10 px-6 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:border-[#0866FF]/40 hover:bg-[#0866FF]/5 hover:shadow-xl group"
            >
              <div className="w-8 h-8 rounded-full bg-[#0866FF]/10 flex items-center justify-center border border-[#0866FF]/30 group-hover:bg-[#0866FF] transition-colors">
                <Facebook size={14} className="text-[#0866FF] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#0866FF] leading-none mb-1.5">
                  Network Feed
                </span>
                <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs opacity-70 leading-none">
                  Facebook Page
                </span>
              </div>
            </a>
          </div>

          <Link to="/services" className="hero-cta group relative overflow-hidden bg-[#111111] text-white px-12 py-6 rounded-full flex items-center gap-6 transition-all hover:pr-16 shadow-2xl w-fit">
            <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-sm">See our work</span>
            <ArrowRight strokeWidth={2.5} className="relative z-10 group-hover:translate-x-3 transition-transform" />
            <div className="absolute inset-0 bg-[#E63B2E] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="work" className="py-32 px-6 md:px-20 bg-[#E8E4DD]">
        <div className="max-w-7xl mx-auto mb-20 text-center reveal">
          <span className="font-mono text-[#E63B2E] uppercase tracking-[0.3em] text-xs font-bold block mb-4">A Legacy of Execution</span>
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-6">Our Core Specialties</h2>
          <p className="text-lg md:text-xl font-medium opacity-70 max-w-2xl mx-auto">
            We deliver high-tolerance structural completion across foundational, residential, and industrial-grade sectors.
          </p>
        </div>

        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="New Construction"
            desc="Turnkey structural execution from foundation to peak."
            type="shuffler"
            media="/vidsandpics/struct.webp"
            linkTo="/services/new-construction"
          />
          <FeatureCard
            title="Elite Remodeling"
            desc="Architectural interventions that redefine existing space."
            type="typewriter"
            media="/vidsandpics/crib.webp"
            linkTo="/services/remodeling"
          />
          <FeatureCard
            title="Industrial Roofing"
            desc="Shield-grade protection engineered for the elements."
            type="scheduler"
            media="/vidsandpics/roof.webp"
            linkTo="/services/roofing-installation"
          />
        </div>
      </section>

      {/* LOCAL PROJECT SHOWCASES (MAP INTERFACE) */}
      <ProjectMap />

      {/* PHILOSOPHY */}
      <section className="py-40 bg-[#0a0a0a] text-[#E8E4DD] relative overflow-hidden px-8 md:px-20 border-y border-[#E8E4DD]/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-70" alt="texture" />
        </div>
        <div className="relative z-10 max-w-5xl">
          <p className="text-xl md:text-2xl uppercase tracking-widest opacity-60 mb-12">
            Most construction focuses on: <span className="line-through">surface-level aesthetics</span>.
          </p>
          <h2 className="text-5xl md:text-8xl font-bold leading-tight">
            We focus on: <br />
            <span className="font-serif italic text-[#E63B2E] font-['DM_Serif_Display']">Functional Permanence.</span>
          </h2>
        </div>
      </section>

      {/* CORE VALUES (THE WEISS ACRONYM) */}
      <section className="py-32 bg-[#111111] text-[#E8E4DD] px-6 md:px-20 relative border-b border-[#E8E4DD]/5 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E63B2E]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 reveal">
            <span className="font-mono text-[#E63B2E] uppercase tracking-[0.3em] text-xs font-bold block mb-4">The Foundation</span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Core Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 core-values-grid">
            {[
              { l: "W", w: "Workmanship", d: "Master-level execution crafted to endure." },
              { l: "E", w: "Exteriors", d: "Formidable barrier systems against the elements." },
              { l: "I", w: "Integrity", d: "Uncompromising standards in every joint." },
              { l: "S", w: "Safety", d: "Rigorous onsite protocols protecting lives." },
              { l: "S", w: "Structures", d: "Monolithic permanence engineered for life." }
            ].map((item, i) => (
              <div key={i} className="core-value-item relative group px-6 py-8 md:py-0 md:border-r border-white/10 last:border-0">
                <div className="core-letter absolute top-0 right-6 text-[8rem] md:text-[10rem] font-serif italic text-white/20 font-['DM_Serif_Display'] leading-none group-hover:text-[#E63B2E]/40 transition-colors duration-500 pointer-events-none select-none z-0">
                  {item.l}
                </div>
                <div className="relative z-10 mt-12 md:mt-24">
                  <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4 group-hover:text-[#E63B2E] transition-colors">{item.w}</h3>
                  <p className="opacity-60 text-sm font-medium leading-relaxed">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOL SECTION */}
      <section id="process" className="bg-[#E8E4DD] relative">
        <div className="h-screen w-full relative z-[10]">
          <ProtocolCard
            num="01"
            title="Structural Audit"
            desc="Deep-tissue inspection of existing systems and ground conditions."
            visual="scan"
          />
        </div>
        <div className="h-screen w-full relative z-[20]">
          <ProtocolCard
            num="02"
            title="Precision Drafting"
            desc="CAD-driven blueprints with millimeter tolerance for zero-waste execution."
            visual="rotate"
          />
        </div>
        <div className="h-screen w-full relative z-[30]">
          <ProtocolCard
            num="03"
            title="Material Synthesis"
            desc="Deploying industrial-grade concrete and 24-gauge steel alloys."
            visual="pulse"
          />
        </div>
      </section>

      {/* HOW TO GET A QUOTE (QUOTE PROCESS) */}
      <section id="quote-process" className="py-32 px-6 md:px-20 bg-[#111111] text-[#E8E4DD] relative overflow-hidden">
        {/* Subtle BG Line Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#E8E4DD 1px, transparent 1px), linear-gradient(90deg, #E8E4DD 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 reveal">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">Secure a Quote</h2>
            <p className="font-mono text-[#E63B2E] text-xs uppercase tracking-[0.3em] font-bold">Fast. Professional. Zero Friction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#E63B2E]/50 to-transparent z-0" />

            {/* Step 1 */}
            <div className="reveal group bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 text-center hover:border-[#E63B2E]/50 transition-all duration-500 hover:-translate-y-2 relative z-10">
              <div className="w-20 h-20 mx-auto bg-[#111111] border border-white/10 rounded-full flex items-center justify-center mb-8 relative group-hover:bg-[#E63B2E] transition-colors duration-500">
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#E63B2E] text-white flex items-center justify-center font-bold text-sm border-2 border-[#0a0a0a]">1</span>
                <Mail className="w-8 h-8 text-white/50 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Send an Email</h3>
              <p className="opacity-60 text-sm font-medium leading-relaxed">Reach out directly to our command center with details of your project. We respond instantly.</p>
            </div>

            {/* Step 2 */}
            <div className="reveal group bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 text-center hover:border-[#E63B2E]/50 transition-all duration-500 hover:-translate-y-2 relative z-10">
              <div className="w-20 h-20 mx-auto bg-[#111111] border border-white/10 rounded-full flex items-center justify-center mb-8 relative group-hover:bg-[#E63B2E] transition-colors duration-500">
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#E63B2E] text-white flex items-center justify-center font-bold text-sm border-2 border-[#0a0a0a]">2</span>
                <Phone className="w-8 h-8 text-white/50 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Give Us a Call</h3>
              <p className="opacity-60 text-sm font-medium leading-relaxed">Prefer to speak directly? Our structural consultants are ready to discuss your blueprint.</p>
            </div>

            {/* Step 3 */}
            <div className="reveal group bg-[#E63B2E] border border-transparent rounded-[2rem] p-10 text-center hover:shadow-[0_0_30px_rgba(230,59,46,0.3)] transition-all duration-500 hover:-translate-y-2 relative z-10">
              <div className="w-20 h-20 mx-auto bg-white/20 border border-white/30 rounded-full flex items-center justify-center mb-8 relative">
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm border-2 border-[#E63B2E]">3</span>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Get a Quote</h3>
              <p className="opacity-90 text-sm font-medium leading-relaxed">Receive a highly detailed, transparent quote structured around your exact needs.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA / CONTACT */}
      <section id="contact" className="py-40 px-6 text-center bg-[#F5F3EE]">
        <div className="max-w-4xl mx-auto rounded-[3rem] border border-[#111111]/10 bg-white p-16 md:p-24 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-10">
          </div>
          <h2 className="text-5xl md:text-7xl font-bold uppercase mb-8 tracking-tighter">Ready to Build?</h2>
          <p className="text-xl md:text-2xl mb-14 opacity-60 font-medium">Secure your project timeline with Weiss today.</p>
          <Link to="/contact" className="inline-block bg-[#111111] text-white px-14 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#E63B2E] hover:scale-105 transition-all duration-300 shadow-xl">
            Start Project
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// --- SUB-COMPONENTS ---

const FeatureCard = ({ title, desc, type, media, linkTo }) => {
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "> STABILIZING STRUCTURE... 100% COMPLETE. > REINFORCING SEAMS... ACTIVE.";

  useEffect(() => {
    if (type === 'typewriter') {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) i = 0;
      }, 50);
      return () => clearInterval(interval);
    }
  }, [type]);

  useEffect(() => {
    if (type === 'shuffler') {
      const interval = setInterval(() => {
        setShuffleIndex(prev => (prev + 1) % 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [type]);

  return (
    <Link to={linkTo || "#"} className="bg-[#FFFFFF] p-12 rounded-[2rem] border border-[#111111]/10 flex flex-col h-[480px] reveal group hover:shadow-xl hover:border-[#111111]/30 hover:-translate-y-2 transition-all duration-500">
      <h3 className="text-3xl font-bold uppercase mb-4 tracking-tighter group-hover:text-[#E63B2E] transition-colors">{title}</h3>
      <p className="text-sm opacity-60 mb-8 font-medium leading-relaxed">{desc}</p>

      <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-[#111111]/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
        <img src={media} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]" alt="construction telemetry feed" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

      </div>
    </Link>
  );
};

const ProtocolCard = ({ num, title, desc, visual }) => {
  return (
    <div className="protocol-card h-screen w-full bg-[#FFFFFF] flex items-center px-8 md:px-24 border-t-2 border-[#111111] shadow-[0_-10px_40px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center w-full max-w-7xl mx-auto">
        <div>
          <span className="font-mono text-[#E63B2E] text-2xl mb-6 block font-bold tracking-tighter">[{num}]</span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">{title}</h2>
          <p className="text-xl md:text-2xl font-medium opacity-60 max-w-lg">{desc}</p>
        </div>
        <div className="h-[400px] flex items-center justify-center relative">
          {visual === 'rotate' && (
            <div className="w-64 h-64 border-[1px] border-[#111111]/20 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="w-48 h-48 border-[4px] border-[#E63B2E] border-dashed rounded-full" />
              <div className="absolute w-full h-[1px] bg-[#111111]/20 rotate-45" />
              <div className="absolute w-full h-[1px] bg-[#111111]/20 -rotate-45" />
            </div>
          )}
          {visual === 'scan' && (
            <div className="w-full h-80 md:h-full relative overflow-hidden bg-white/5 rounded-2xl border border-white/10 shadow-2xl group">
              {/* Before Image (Always at the absolute bottom) */}
              <img src="/before-roof.jpg" alt="Structural Audit Before" className="absolute inset-0 w-full h-full object-cover" />

              {/* After Image (Reveals over before image) */}
              <img src="/after-roof.jpg" alt="Structural Audit After" className="absolute inset-0 w-full h-full object-cover animate-[reveal-after_4s_ease-in-out_infinite]" />


              {/* The Scanning Laser Line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#E63B2E] shadow-[0_0_20px_#E63B2E,0_0_8px_#ffffff] animate-[scan_4s_ease-in-out_infinite] z-20 pointer-events-none" />
            </div>
          )}
          {visual === 'pulse' && (
            <div className="w-full flex items-center justify-center">
              <svg viewBox="0 0 200 100" className="w-full max-w-md">
                <path
                  d="M0 50 L40 50 L50 20 L60 80 L70 50 L120 50 L130 10 L140 90 L150 50 L200 50"
                  fill="none"
                  stroke="#E63B2E"
                  strokeWidth="3"
                  className="path-pulse"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0% }
          50% { top: 100% }
        }
        @keyframes reveal-after {
          0%, 100% { clip-path: inset(0 0 100% 0); }
          50% { clip-path: inset(0 0 0% 0); }
        }
        .path-pulse {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 3s linear infinite;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;
