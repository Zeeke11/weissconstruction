import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Footer from '../components/Footer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, ArrowRight, Activity, Cpu, Star } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';
import { servicesData } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);
  const mainRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position when loading new page

    const ctx = gsap.context(() => {
      // Hero elements entrance
      gsap.from(".anim-stagger", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // Paragraph reveals
      gsap.utils.toArray(".text-reveal").forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Parallax image
      gsap.to(".parallax-bg", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, mainRef);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id]);

  if (!service) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#F5F3EE] text-[#111111]">
        <h1 className="text-4xl font-bold uppercase mb-4">Service Not Found</h1>
        <Link to="/services" className="text-[#E63B2E] font-bold underline hover:no-underline">Return to Services</Link>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="bg-[#111111] text-[#E8E4DD] selection:bg-[#E63B2E] selection:text-white overflow-x-hidden font-['Space_Grotesk'] min-h-screen">
      
      {/* NAVBAR */}
      <nav className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 flex items-center px-6 py-3 w-[95%] md:w-[800px] rounded-full border border-white/10 ${isScrolled ? "bg-[#111111]/90 backdrop-blur-xl shadow-xl" : "bg-transparent"
        }`}>
        <Link to="/" className="h-10 hover:scale-105 transition-transform flex items-center">
          <img src="/logo.webp" alt="Weiss" className="h-full w-auto object-contain invert" />
        </Link>
        <div className="hidden md:flex gap-8 ml-auto mr-8 text-sm font-bold uppercase tracking-widest text-white/70">
          <Link to="/" className="hover:text-[#E63B2E] transition-colors">Home</Link>
          <Link to="/services" className="text-[#E63B2E] transition-colors">Services</Link>
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

      {/* HERO SECTION */}
      <section className="hero-section relative h-[80vh] w-full overflow-hidden flex items-end pb-20 px-6 md:px-20">
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <img 
            src={service.media} 
            className="parallax-bg w-full h-[120%] object-cover opacity-85 absolute -top-[10%]" 
            alt={service.title} 
          />
          {/* Gradients to blend image into the dark background smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/30 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl">
          <div className="flex items-center gap-4 mb-6 anim-stagger">
             <div className="bg-[#E63B2E] text-white p-2 rounded relative overflow-hidden group">
               <Cpu size={20} className="relative z-10" />
               <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             </div>
             <span className="font-mono text-[#E63B2E] uppercase tracking-[0.3em] font-bold text-sm">Project Details</span>
          </div>
          <h1 className="anim-stagger text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.9] mb-8 text-white">
            {service.title}
          </h1>
          <p className="anim-stagger text-xl md:text-3xl opacity-60 font-medium max-w-2xl leading-relaxed border-l-2 border-[#E63B2E] pl-6 py-2">
            {service.desc}
          </p>
        </div>
      </section>

      {/* CONTENT / PARAGRAPHS */}
      <section className="py-24 px-6 md:px-20 max-w-5xl mx-auto">
         <div className="space-y-16">
           {service.paragraphs.map((para, i) => (
             <React.Fragment key={i}>
               <div className="text-reveal relative">
                  <p className="text-xl md:text-2xl font-medium leading-[1.8] opacity-80 md:pl-24">
                    <span className="md:absolute top-2 left-0 font-mono text-sm text-[#E63B2E] opacity-50 hidden md:block select-none">[SEC {i + 1}]</span>
                    {para}
                  </p>
               </div>
               
               {/* Render inline image if it exists for this paragraph index */}
               {service.inlineImages && service.inlineImages[i] && (
                 <div className="text-reveal w-full md:pl-24 mt-8 mb-4">
                   <div className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl relative bg-[#0a0a0a]">
                     <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none mix-blend-overlay" />
                     <img 
                       src={service.inlineImages[i]} 
                       alt={`${service.title} implementation phase ${i + 1}`} 
                       className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent pointer-events-none z-10" />
                   </div>
                 </div>
               )}
             </React.Fragment>
           ))}
         </div>

         {/* Interactive Review Section */}
         <ReviewSection serviceName={service.title} />

         {/* Call to action connecting to service */}
         <div className="mt-32 border border-white/10 bg-[#0a0a0a] p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden text-reveal group">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
               <Activity className="text-[#E63B2E] animate-pulse w-16 h-16" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Initiate Consultation</h2>
            <p className="opacity-60 font-medium mb-12 max-w-lg mx-auto">Ready to deploy these structural systems on your property? Secure your timeline with Weiss today.</p>
            <Link to="/contact" className="inline-block bg-[#E63B2E] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(230,59,46,0.3)]">
               Commit to Project
            </Link>
         </div>
      </section>

      <Footer />

    </div>
  );
};

const ReviewSection = ({ serviceName }) => {
  const { addReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      addReview({
        rating,
        text: reviewText,
        source: serviceName
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="mt-20 border border-white/10 bg-[#0a0a0a] p-10 md:p-16 rounded-[3rem] relative overflow-hidden text-reveal shadow-2xl">
      <h3 className="text-3xl font-bold uppercase tracking-tighter mb-8">Service Log & Review</h3>
      {submitted ? (
        <div className="text-center py-10 bg-black/40 rounded-2xl border border-white/5">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#E63B2E]/20 mb-6">
            <ShieldCheck className="text-[#E63B2E] w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold uppercase tracking-widest text-[#E63B2E] mb-3">Request Logged</h4>
          <p className="opacity-60 font-medium">Your operational feedback has been secured.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#E63B2E] mb-4">Operational Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star 
                    className={`w-10 h-10 transition-all duration-300 ${
                      (hoverRating || rating) >= star 
                        ? "fill-[#E63B2E] text-[#E63B2E] drop-shadow-[0_0_15px_rgba(230,59,46,0.5)]" 
                        : "text-white/10 hover:text-white/30"
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="review" className="block text-xs font-bold uppercase tracking-[0.2em] text-[#E63B2E] mb-4">Field Notes (Optional)</label>
            <textarea 
              id="review"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Detail your experience with this exact project..."
              className="w-full bg-black/60 border border-white/10 rounded-2xl p-6 text-[#E8E4DD] placeholder-white/20 focus:outline-none focus:border-[#E63B2E] focus:ring-1 focus:ring-[#E63B2E] transition-all resize-none font-medium text-lg leading-relaxed shadow-inner"
            />
          </div>
          <div className="flex justify-end mt-4">
             <button 
               type="submit" 
               disabled={rating === 0}
               className={`px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 ${
                 rating > 0 
                 ? "bg-[#E63B2E] text-white hover:scale-105 shadow-[0_0_20px_rgba(230,59,46,0.3)]" 
                 : "bg-white/5 text-white/20 cursor-not-allowed"
               }`}
             >
               Submit Feedback
             </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ServiceDetail;
