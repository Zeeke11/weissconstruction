import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star, ArrowRight, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// We use custom icons rather than default Leaflet icons to avoid Vite import issues.
delete L.Icon.Default.prototype._getIconUrl;

// Custom Marker showcasing property image
const createCustomMarker = (imageUrl, isActive, index) => {
  return new L.DivIcon({
    className: 'custom-image-marker inline-block bg-transparent border-0',
    html: `
      <div onclick="window.__setActiveProject(${index})" class="relative transition-transform duration-300 ${isActive ? 'scale-[1.15] z-50' : 'scale-100 hover:scale-[1.05]'} flex flex-col items-center cursor-pointer pointer-events-auto" style="width: 72px; height: 60px; transform-origin: bottom center;">
        <div class="w-[72px] h-[52px] bg-white border-[2.5px] ${isActive ? 'border-[#E63B2E] shadow-[0_0_20px_rgba(230,59,46,0.6)]' : 'border-[#111111] shadow-xl'} rounded-md overflow-hidden z-10 shrink-0">
          <img src="${imageUrl}" class="w-full h-full object-cover pointer-events-none" />
        </div>
        <div class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] ${isActive ? 'border-t-[#E63B2E]' : 'border-t-[#111111]'} -mt-[2px] z-0"></div>
      </div>
    `,
    iconSize: [72, 60],
    iconAnchor: [36, 60],
    popupAnchor: [0, -60]
  });
};

const projects = [
  {
    id: 1,
    title: "Rural Elegance: Enhancing Irving, IL with Masterful Roofin...",
    desc: "Masterful Roofing implementation for a large residential property. Complete teardown and 24-gauge steel architectural installation.",
    location: "IRVING, IL",
    date: "MAR 2025",
    coords: [39.2081, -89.4009],
    image: "/vidsandpics/roof.webp",
    rating: 5,
    reviewSnippet: "I couldn’t be more pleased with the work Weiss Construction did on my farm! They replaced two roofs efficiently, as promised, and within budget. The team was professional, hardworking, and paid close attention to detail. It’s refreshing to work with a contractor who not only delivers exactly what they promise but also sticks to the agreed timeframe. I highly recommend Weiss Construction for anyone needing quality roofing work done right!",
    isGoogle: true
  }
];

// Helper to center the map when clicking a card
import { useEffect } from 'react';

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
};

const ProjectMap = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeProject = projects[activeIndex];

  // Expose setActiveIndex globally for native marker clicks
  useEffect(() => {
    window.__setActiveProject = (idx) => {
      setActiveIndex(idx);
    };
    return () => {
      delete window.__setActiveProject;
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="bg-black text-white flex flex-col lg:flex-row h-screen min-h-[800px] border-y border-white/5 relative z-10 w-full overflow-hidden font-['Space_Grotesk']">
      
      {/* Left Pane: Carousel Layout (400px width on large screens) */}
      <div className="w-full lg:w-[450px] shrink-0 h-[60vh] lg:h-full p-8 flex flex-col justify-center relative z-20 bg-black text-center shadow-[20px_0_40px_-10px_rgba(0,0,0,0.5)] z-20 border-r border-white/5">
        
        <h2 className="text-3xl font-bold mb-10 leading-snug text-white tracking-widest">
          Explore local project<br/>
          showcases!
        </h2>

        {/* Carousel Interactivity row */}
        <div className="flex items-center justify-between w-full max-w-[400px] mx-auto mb-12">
          
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0 outline-none"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
          
          {/* The Data Card */}
          <div className="flex-grow px-2 h-[420px] sm:h-[400px]">
             <div 
               onClick={() => setIsModalOpen(true)}
               className="bg-white text-black rounded-[1.5rem] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-left w-full h-full flex flex-col transition-all duration-500 ease-in-out cursor-pointer hover:scale-[1.02]"
             >
                {/* Image Section */}
                <div className="h-[45%] w-full relative shrink-0">
                   <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
                </div>
                
                {/* Text Content */}
                <div className="p-5 flex flex-col flex-grow">
                   <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-widest">
                     <div className="flex items-center gap-1 text-[#E63B2E]">
                       <MapPin size={14} className="fill-transparent text-[#E63B2E]" />
                       <span className="text-[#111111]">{activeProject.location}</span>
                     </div>
                     <span>{activeProject.date}</span>
                   </div>
                   
                   <h3 className="text-base sm:text-lg font-bold leading-tight mb-auto tracking-tight">
                     {activeProject.title}
                   </h3>
                   
                   <div className="h-[1px] w-full bg-gray-200 my-4 shrink-0"></div>
                   
                   {/* Review Footer */}
                   <div className="flex items-center justify-between shrink-0">
                     <div className="flex items-center gap-2">
                       <div className="font-bold flex items-center text-sm">
                         {activeProject.rating} <Star size={14} className="ml-1 fill-[#fbbc04] text-[#fbbc04]" />
                       </div>
                       <p className="text-xs text-gray-600 truncate max-w-[130px] font-medium">
                         "{activeProject.reviewSnippet}"
                       </p>
                     </div>
                     {activeProject.isGoogle && (
                       <svg className="w-5 h-5 ml-2 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                       </svg>
                     )}
                   </div>
                </div>
             </div>
          </div>
          
          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors shrink-0 outline-none"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

        </div>

        <Link to="/services" className="text-white mt-auto flex items-center justify-center gap-2 hover:text-gray-300 transition-colors font-bold tracking-widest text-sm cursor-pointer mx-auto group w-auto">
          See more project showcases <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Right Pane: Interactive Map */}
      <div className="flex-grow h-[40vh] lg:h-full bg-gray-100 relative z-0">
        <MapContainer 
          center={activeProject.coords} 
          zoom={12} 
          scrollWheelZoom={false} 
          className="w-full h-full"
          zoomControl={false}
        >
          {/* Light Map Tiles matching design */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          
          <ChangeView center={activeProject.coords} zoom={13} />

          {projects.map((proj, index) => (
            <Marker 
              key={proj.id} 
              position={proj.coords} 
              icon={createCustomMarker(proj.image, index === activeIndex, index)}
              eventHandlers={{
                click: () => setActiveIndex(index),
              }}
            />
          ))}
        </MapContainer>
        
        {/* Decorative Overlay Info */}
        <div className="absolute bottom-8 right-8 z-[400] pointer-events-none text-right">
           <p className="font-mono text-[10px] text-[#111111]/60 uppercase tracking-widest mb-1 shadow-[0_0_10px_rgba(255,255,255,0.8)] filter drop-shadow-lg">LAT / LNG</p>
           <p className="font-mono text-lg font-bold tracking-tighter text-[#111111] filter drop-shadow-xl">{activeProject.coords[0].toFixed(4)} <span className="text-gray-400">x</span> {activeProject.coords[1].toFixed(4)}</p>
        </div>
      </div>

      {/* Modal / Little Page */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] overflow-hidden w-full max-w-4xl shadow-2xl relative flex flex-col md:flex-row transition-all transform scale-100 max-h-[90vh]">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            {/* Image */}
            <div className="w-full md:w-5/12 h-64 md:h-auto relative shrink-0">
              <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent flex items-end p-6">
                 <div className="text-white">
                   <div className="flex items-center gap-1 text-[#E63B2E] text-sm font-bold uppercase tracking-widest mb-1">
                     <MapPin size={16} />
                     <span className="text-white">{activeProject.location}</span>
                   </div>
                 </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col bg-[#FAFAFA] overflow-y-auto">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span>PROJECT SPOTLIGHT</span>
                <span>{activeProject.date}</span>
              </div>
              
              <h3 className="text-2xl font-bold leading-tight mb-4 text-[#111] font-['Space_Grotesk']">
                {activeProject.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {activeProject.desc}
              </p>
              
              {/* Review Section */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 relative">
                 <div className="flex items-center justify-between mb-2">
                   <div className="flex gap-1 text-[#fbbc04]">
                     {[...Array(activeProject.rating)].map((_, i) => (
                       <Star key={i} size={16} className="fill-current" />
                     ))}
                   </div>
                   {activeProject.isGoogle && (
                     <div className="flex gap-1 items-center bg-gray-50 px-2 py-1 rounded">
                       <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                       </svg>
                     </div>
                   )}
                 </div>
                 <p className="text-sm font-medium italic text-gray-700">
                   "{activeProject.reviewSnippet}"
                 </p>
              </div>
              
              {/* Action Button */}
              <div className="mt-auto pt-4 border-t border-gray-100 flex">
                <Link 
                  to="/contact" 
                  className="w-full bg-[#E63B2E] text-white font-bold py-3 px-6 rounded-lg text-center hover:bg-black transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Get a Quote for Similar Work <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default ProjectMap;
