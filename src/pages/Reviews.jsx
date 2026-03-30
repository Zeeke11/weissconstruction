import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useReviews } from '../context/ReviewContext';
import { Star, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const mainRef = useRef(null);
  const { reviews } = useReviews();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(".anim-stagger", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      gsap.utils.toArray(".review-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, mainRef);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reviews]);

  return (
    <div ref={mainRef} className="bg-[#111111] text-[#E8E4DD] min-h-screen font-['Space_Grotesk'] selection:bg-[#E63B2E] selection:text-white">
      {/* NAVBAR */}
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-full border border-white/10 ${isScrolled ? "bg-[#111111]/90 backdrop-blur-xl shadow-xl" : "bg-transparent"
        }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss" className="h-full w-auto object-contain invert" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-white/70">
          <Link to="/" className="hover:text-[#E63B2E] transition-colors">Home</Link>
          <Link to="/services" className="hover:text-[#E63B2E] transition-colors">Services</Link>
          <Link to="/about" className="hover:text-[#E63B2E] transition-colors">About</Link>
          <Link to="/reviews" className="text-[#E63B2E] transition-colors">Reviews</Link>
        </div>
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <Link to="/contact" className="bg-[#E63B2E] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform text-center flex items-center justify-center">
            Connect
          </Link>
          <span className="font-bold uppercase tracking-tighter text-lg text-white">WEISS</span>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <section className="pt-48 pb-20 px-6 md:px-20 text-center max-w-4xl mx-auto">
        <h1 className="anim-stagger text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
          Operational <span className="font-serif italic text-[#E63B2E] font-['DM_Serif_Display'] block">Logs.</span>
        </h1>
        <p className="anim-stagger text-xl md:text-2xl opacity-60 font-medium max-w-2xl mx-auto leading-relaxed">
          Unfiltered feedback from the field. A transparent record of our structural execution and client satisfaction.
        </p>
      </section>

      {/* REVIEWS GRID */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="review-card bg-[#0a0a0a] border border-white/10 p-8 rounded-[2rem] hover:border-[#E63B2E]/50 hover:-translate-y-2 transition-all duration-300 shadow-2xl flex flex-col h-full relative overflow-hidden group">
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#E63B2E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < review.rating ? "fill-[#E63B2E] text-[#E63B2E]" : "text-white/20"}`} 
                      />
                    ))}
                  </div>
                  <ShieldCheck className="text-white/20 w-6 h-6 group-hover:text-[#E63B2E] transition-colors duration-300" />
                </div>
                
                <p className="text-lg opacity-90 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                  "{review.text}"
                </p>
                
                <div className="mt-auto border-t border-white/10 pt-6 relative z-10">
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#E63B2E] mb-1">
                    {review.source}
                  </span>
                  <span className="block text-xs font-mono opacity-50 uppercase tracking-widest">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-[#0a0a0a] rounded-[3rem] border border-white/10">
            <ShieldCheck className="w-16 h-16 text-white/20 mx-auto mb-6" />
            <h2 className="text-3xl font-bold uppercase tracking-tighter mb-4 opacity-50">No Logs Found</h2>
            <p className="opacity-40 max-w-md mx-auto">The operational record is currently empty. Protocols are awaiting execution.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
