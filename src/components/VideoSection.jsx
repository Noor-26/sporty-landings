
import { useEffect, useRef } from 'react';

const VideoSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add('animate-fade-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setAttribute('muted', '');
      videoRef.current.setAttribute('playsinline', '');
      
      const attemptPlay = () => {
        videoRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      };
      
      attemptPlay();
      
      // Try again when visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          attemptPlay();
        }
      });
    }
  }, []);
  
  return (
    <section className="py-16 bg-white">
      <div className="section-container opacity-0" ref={sectionRef}>
        <h2 className="section-title text-center mb-12">Watch Our Event Highlight</h2>
        
        <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
          <iframe 
            ref={videoRef}
            src="https://www.youtube.com/embed/ZIdELerlt1E?si=3dio9jqTyzZ-W4zX&autoplay=1&mute=1&controls=0"
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="w-full h-full object-cover"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
