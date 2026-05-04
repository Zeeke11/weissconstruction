import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const mainRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from(".fade-up-contact", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, mainRef);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Transmitting...");
    
    // Create form data object from the form
    const formData = new FormData(event.target);

    // >>> YOUR WEB3FORMS ACCESS KEY GOES HERE <<<
    // Replace the string below with the access key you receive via email.
    formData.append("access_key", "32eb8e47-ebe2-4b6e-8087-d267b538c516");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus("Transmission Successful. Request Initiated.");
        event.target.reset(); // clear the form
        
        // Clear success message after 5 seconds
        setTimeout(() => setFormStatus(""), 5000);
      } else {
        console.error("Transmission Error:", data);
        setFormStatus("Transmission Failed. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setFormStatus("Network Error. Please try again later.");
    }
  };

  return (
    <div ref={mainRef} className="bg-[#111111] text-[#E8E4DD] selection:bg-[#E63B2E] selection:text-white min-h-screen overflow-x-hidden font-['Space_Grotesk'] flex flex-col">
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
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-full border border-white/10 ${
        isScrolled ? "bg-[#111111]/90 backdrop-blur-xl shadow-2xl" : "bg-transparent"
      }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss Construction" className="h-full w-auto object-contain invert" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-white/70">
          <Link to="/" className="hover:text-[#E63B2E] transition-colors">Home</Link>
          <Link to="/services" className="hover:text-[#E63B2E] transition-colors">Services</Link>
          <Link to="/about" className="hover:text-[#E63B2E] transition-colors">About</Link>
          <Link to="/reviews" className="hover:text-[#E63B2E] transition-colors">Reviews</Link>
        </div>
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <Link to="/contact" className="bg-[#E63B2E] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center flex items-center justify-center">
            Connect
          </Link>
          <span className="font-bold uppercase tracking-tighter text-lg text-white">WEISS</span>
        </div>
      </nav>

      {/* HERO / CONTACT SECTION */}
      <main className="flex-grow pt-40 pb-32 px-6 md:px-20 max-w-screen-2xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Info & Direct Contact */}
        <div className="lg:col-span-5 fade-up-contact">
          <div className="overflow-hidden mb-6 flex justify-start">
            <div className="bg-[#E63B2E]/10 border border-[#E63B2E]/20 px-6 py-2 rounded-full">
              <p className="font-mono uppercase tracking-[0.3em] text-[#E63B2E] font-bold text-xs">Command Center</p>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
            Initiate <br/>
            <span className="font-serif italic text-[#E63B2E] font-['DM_Serif_Display']">Standard.</span>
          </h1>
          <p className="text-xl opacity-60 font-medium leading-relaxed mb-16 max-w-lg">
            Ready to secure your project? Call us directly for an immediate estimate, or submit your blueprint details below to open a communication channel.
          </p>

          <div className="space-y-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4 ">Direct Line [Tap to Call]</p>
              <a href="tel:2175567355" className="group flex items-center gap-6 hover:text-[#E63B2E] transition-colors cursor-pointer w-fit">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E63B2E] group-hover:bg-[#E63B2E]/10 transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-3xl md:text-4xl font-bold tracking-tighter">217-556-7355</span>
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">Email Matrix</p>
              <a href="mailto:mweissconstruction@gmail.com" className="group flex items-center gap-6 hover:text-[#E63B2E] transition-colors cursor-pointer w-fit">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#E63B2E] group-hover:bg-[#E63B2E]/10 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-2xl md:text-3xl font-bold tracking-tighter">mweissconstruction@gmail.com</span>
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-widest opacity-40 mb-4">Base of Operations</p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tighter">Hillsboro, IL & Surrounding Areas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quote Form */}
        <div className="lg:col-span-7 fade-up-contact bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden group hover:border-white/20 transition-colors duration-500">
          {/* subtle glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E63B2E]/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">Request a Quote</h2>
          <p className="opacity-60 text-sm font-medium mb-10">All submissions are encrypted and reviewed by our core command team.</p>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 ml-2">Full Name</label>
                <input type="text" name="name" required placeholder="John Doe" className="bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#E63B2E] transition-colors w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 ml-2">Phone Number</label>
                <input type="tel" name="phone" required placeholder="(123) 456-7890" className="bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#E63B2E] transition-colors w-full" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 ml-2">Email Address</label>
              <input type="email" name="email" required placeholder="john@example.com" className="bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#E63B2E] transition-colors w-full" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 ml-2">Service Needed</label>
              <select name="service" required defaultValue="" className="bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#E63B2E] transition-colors appearance-none w-full text-white/50 focus:text-white">
                <option value="" disabled>Select a Service...</option>
                <option value="remodeling">Remodeling / Renovation</option>
                <option value="new_construction">New Construction</option>
                <option value="roofing_install">Roofing Installation</option>
                <option value="roofing_repair">Roofing Repair / Replacement</option>
                <option value="other">Other / Custom</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 ml-2">Project Details</label>
              <textarea name="message" required rows="4" placeholder="Describe the scope of your project..." className="bg-[#111111] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#E63B2E] transition-colors resize-none w-full"></textarea>
            </div>

            {/* Status Message */}
            {formStatus && (
              <p className={`font-mono text-xs uppercase tracking-widest font-bold ${formStatus.includes("Failed") || formStatus.includes("Error") ? 'text-red-500' : 'text-green-500'}`}>
                {formStatus}
              </p>
            )}

            <button type="submit" className="w-full group/btn relative overflow-hidden bg-[#E63B2E] text-white px-10 py-5 rounded-2xl flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(230,59,46,0.3)] transition-all duration-300">
              <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-sm">Transmit Request</span>
              <Send size={18} strokeWidth={2.5} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
