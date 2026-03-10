import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, CheckCircle, Quote, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { useTranslation } from 'react-i18next';
import { projectsData } from '../data';
import { Seo } from './Seo';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fullScreenMedia, setFullScreenMedia] = useState<{ url: string, type: 'image' | 'video' } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (fullScreenMedia?.type === 'image' && galleryImages.length > 1) {
      if (isLeftSwipe) {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      }
      if (isRightSwipe) {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
  };

  const project = projectsData.find(p => p.id === id);
  const galleryImages = project?.gallery || [];
  const youtubeIds = project?.youtubeIds || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!fullScreenMedia) return;

      if (e.key === 'Escape') {
        setFullScreenMedia(null);
      }

      if (fullScreenMedia.type === 'image' && galleryImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
        } else if (e.key === 'ArrowRight') {
          setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullScreenMedia, galleryImages]);

  if (!project) return null;

  const openFullScreenImage = (img: string) => {
    const index = galleryImages.indexOf(img);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setFullScreenMedia({ url: img, type: 'image' });
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleStartProjectClick = () => {
    navigate('/services');
  };

  return (
    <>
      <Seo
        title={`${t(`portfolio.${project.id}.title`, project.title)} | GK WebTech | GKWebTech`}
        description={`${t(`portfolio.${project.id}.description`, project.description)} ${t('seo.detail_suffix.project')}`}
        keywords={(project.tags || []).join(', ')}
        canonical={`${window.location.origin}/portfolio/${project.id}`}
        image={project.image}
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": t(`portfolio.${project.id}.title`, project.title),
          "description": t(`portfolio.${project.id}.description`, project.description),
          "url": `${window.location.origin}/portfolio/${project.id}`,
          "image": project.image
        }}
      />

      <div className="pt-24 pb-20 bg-bg-light dark:bg-gray-950 min-h-screen transition-colors">

        {/* Hero */}
        <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10"></div>
          <img
            src={project.image}
            alt={t(`portfolio.${project.id}.title`, project.title)}
            className="w-full h-full object-cover"
            width="1920"
            height="1080"
            fetchPriority="high"
            loading="eager"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-12">
            <div className="container mx-auto px-4 md:px-6">
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/80 hover:text-secondary mb-6 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/10 w-fit">
                <ArrowLeft size={16} />
                <span>{t("portfolio.back_to_gallery", "Back to Gallery")}</span>
              </Link>
              <div className="flex flex-wrap gap-4 items-center text-white/90 mb-4 text-sm font-medium">
                <span className="bg-secondary text-primary px-3 py-1 rounded-full">{t(`portfolio.${project.id}.category`, project.category)}</span>
                <span className="flex items-center gap-1"><MapPin size={16} /> {t(`portfolio.${project.id}.location`, project.location)}</span>
                <span className="flex items-center gap-1"><Calendar size={16} /> {t(`portfolio.${project.id}.duration`, project.duration)}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {t(`portfolio.${project.id}.title`, project.title)}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Tabs (Challenge, Solution) */}
        <div className="container mx-auto px-4 md:px-6 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center text-lg">01</span>
                {t("portfolio.challenge", "The Challenge")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t(`portfolio.${project.id}.challenge`, project.challenge)}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-primary dark:text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary dark:bg-white/10 dark:text-white flex items-center justify-center text-lg">02</span>
                {t("portfolio.solution", "Our Solution")}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t(`portfolio.${project.id}.solution`, project.solution)}
              </p>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="container mx-auto px-4 md:px-6 mt-20">
          <h2 className="text-3xl font-bold text-primary dark:text-white mb-8">
            {t("portfolio.gallery", "Visual Showcase")}
          </h2>
          <div className="relative flex items-center">
            <button onClick={(e) => { e.stopPropagation(); galleryScrollRef.current?.scrollBy({ left: -400, behavior: "smooth" }); }} className="absolute left-[-18px] bg-[#1F4037]/80 dark:bg-gray-800/80 text-white p-2 rounded-full z-20 hover:bg-secondary transition">
              <ChevronLeft size={28} />
            </button>

            <div ref={galleryScrollRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar scroll-smooth">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="relative min-w-[280px] md:min-w-[400px] h-64 md:h-80 rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-gray-200 dark:border-gray-800 snap-center">
                  <img src={img} alt={`Gallery ${idx}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={(e) => { e.stopPropagation(); openFullScreenImage(img); }} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-colors">
                      <Maximize2 size={36} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={(e) => { e.stopPropagation(); galleryScrollRef.current?.scrollBy({ left: 400, behavior: "smooth" }); }} className="absolute right-[-18px] bg-[#1F4037]/80 dark:bg-gray-800/80 text-white p-2 rounded-full z-20 hover:bg-secondary transition">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* ▶ Video Gallery */}
        {youtubeIds.length > 0 && (
          <div className="container mx-auto px-4 md:px-6 mt-16">
            <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">
              {t("portfolio.videos_title", "Video Highlights")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {youtubeIds.map((url, idx) => {
                const videoId = url.includes("watch?v=")
                  ? url.split("watch?v=")[1].split("&")[0]
                  : url.replace("https://youtu.be/", "").split("?")[0];

                const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                return (
                  <div key={idx} className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg group border border-gray-200 dark:border-gray-800">

                    {/* Thumbnail */}
                    <img src={thumb} alt={`Video ${idx}`} loading="lazy" className="w-full h-full object-cover" />

                    {/* 🔴 Center Clickable YouTube Red Transparent Logo */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFullScreenMedia({ url: videoId, type: "video" });
                      }}
                      className="absolute inset-0 flex items-center justify-center transition-all hover:scale-125 z-20"
                    >
                      <img
                        src="/images/youtube-red-transparent.webp"
                        alt="youtube video indicator"
                        loading="lazy"
                        decoding="async"
                        width="112"
                        height="112"
                        className="w-28 opacity-100 drop-shadow-2xl transition-all duration-300 group-hover:opacity-100"
                      />
                    </button>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className="container mx-auto px-4 md:px-6 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
            {project.testimonial && (
              <div className="flex justify-center">
                <TiltCard className="bg-white rounded-3xl p-8 shadow-lg shadow-primary border border-transparent sticky top-24 w-full text-primary">
                  <h3 className="text-lg font-bold text-primary mb-6 border-b border-primary/20 pb-4 text-center">{t("portfolio.client_testimonial", "Client Testimonial")}</h3>
                  <div className="mt-2 text-center min-h-[18rem] flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <Quote className="text-primary" size={28} />
                      <p className="text-primary italic leading-relaxed">
                        {t(`portfolio.${project.id}.testimonial.text`, project.testimonial.text)}
                      </p>
                    </div>
                    <div className="mt-6">
                      <p className="font-semibold text-primary">{project.testimonial.author}</p>
                      <p className="text-sm text-primary/80">{project.testimonial.role}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            )}
            <div className="flex justify-center">
              <TiltCard className="bg-primary text-white rounded-3xl p-8 shadow-lg shadow-primary border border-transparent sticky top-24 w-full">
                <h3 className="text-lg font-bold mb-6 border-b border-white/20 pb-4">{t("portfolio.project_details", "Project Details")}</h3>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <h4 className="font-bold mb-4 text-sm uppercase">{t("portfolio.key_results", "Key Results")}</h4>
                  <ul className="space-y-3">
                    {t(`portfolio.${project.id}.results`, { returnObjects: true }) instanceof Array ?
                      (t(`portfolio.${project.id}.results`, { returnObjects: true }) as string[]).map((result: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                          <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={16} />
                          <span>{result}</span>
                        </li>
                      )) :
                      project.results?.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                          <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={16} />
                          <span>{result}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <button onClick={handleStartProjectClick} className="w-full mt-8 bg-secondary text-primary py-3 rounded-full font-bold hover:bg-white hover:text-primary transition-colors shadow-lg">
                  {t("portfolio.start_similar", "Start Similar Project")}
                </button>
              </TiltCard>
            </div>
          </div>
        </div>

      </div>

      {/* ▶ Fullscreen Modal */}
      {fullScreenMedia && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setFullScreenMedia(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* ❌ Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); setFullScreenMedia(null); }}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-[110]"
          >
            <X size={32} />
          </button>

          {/* ⬅➡ Image navigation */}
          {fullScreenMedia.type === "image" && galleryImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-[110]"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full z-[110]"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="relative max-w-[95vw] max-h-[95vh]" onClick={(e) => e.stopPropagation()}>

            {/* 🖼 IMAGE FULLSCREEN */}
            {fullScreenMedia.type === "image" && (
              <img
                src={galleryImages[currentImageIndex]}
                alt="Fullscreen"
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
              />
            )}

            {/* ▶ VIDEO FULLSCREEN */}
            {fullScreenMedia.type === "video" && (
              <iframe
                src={`https://www.youtube.com/embed/${fullScreenMedia.url}?autoplay=1&controls=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-[90vw] md:w-[80vw] h-[85vh] rounded-xl shadow-2xl border-0"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
