import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { useTranslation } from 'react-i18next';
import { servicesData, coursesData } from "../data";

const CardContent: React.FC<{ item: any; activeTab: string }> = ({
  item,
  activeTab,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-gray-300 transition cursor-pointer h-full flex flex-col">
      <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden border border-gray-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          width="400"
          height="192"
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      <h3 className="text-2xl font-bold text-[#1F4037] dark:text-white mb-4 line-clamp-1">
        {t(`services.${item.id}.title`)}
      </h3>

      <p className="text-gray-700 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
        {t(`services.${item.id}.description`)}
      </p>

      <div className="flex items-center gap-2 text-[#1F4037] dark:text-[#FDB827] font-semibold text-sm mt-auto">
        <span>Learn More</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTouching = useRef(false);
  const rafLock = useRef(false);

  const [activeTab, setActiveTab] = useState<"tech" | "institute">("tech");

  /** 🔥 Tilt allowed ONLY on fine pointer + hover devices */
  const [allowTilt, setAllowTilt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => setAllowTilt(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  const baseItems = servicesData;

  // ✅ duplicate on both sides for infinite feel
  const items = [...baseItems, ...baseItems, ...baseItems];

  // ✅ start from middle copy
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const middle = el.scrollWidth / 3;
    el.scrollLeft = middle;
  }, [activeTab]);

  // ✅ flicker-free infinite loop logic
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || rafLock.current) return;

    const third = el.scrollWidth / 3;

    rafLock.current = true;

    requestAnimationFrame(() => {
      const x = el.scrollLeft;

      // 🔥 only teleport when user is NOT actively touching
      if (!isTouching.current) {
        if (x < third * 0.5) {
          el.scrollLeft = x + third;
        } else if (x > third * 1.5) {
          el.scrollLeft = x - third;
        }
      }

      rafLock.current = false;
    });
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.8;

    el.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="py-20 bg-gray-100 dark:bg-gray-950 transition-colors"
      id="services"
    >
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <SectionHeader
            label={t("services.label", "Our Offerings")}
            title={t("services.title_main", "Solutions We")}
            subtitle={t("services.subtitle_main", "Provide")}
          />

          <div className="flex items-center gap-2">
            <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-md flex border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setActiveTab("tech");
                  // Optional: scroll to services if needed, but usually clicking tech just shows tech cards
                }}
                className={`px-4 py-2 rounded-full font-bold text-sm ${activeTab === "tech"
                  ? "bg-[#1F4037] text-white"
                  : "text-gray-500"
                  }`}
              >
                GKTech
              </button>

              <button
                onClick={() => {
                  setActiveTab("institute");
                  const element = document.getElementById("gk-institute-section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                  // Reset back to tech after a delay or keep as is? 
                  // Requirements say "Keep the toggle buttons", usually implying state.
                  // But since cards never change now, maybe keep GKTech active by default.
                  // Let's keep it highlighted for a moment or until they scroll back?
                  // Better: keep state but cards are always services.
                }}
                className={`px-4 py-2 rounded-full font-bold text-sm ${activeTab === "institute"
                  ? "bg-[#FDB827] text-[#1F4037]"
                  : "text-gray-500"
                  }`}
              >
                GKInstitute
              </button>
            </div>

            <Link
              to="/services"
              className="bg-[#1F4037] text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-3 shadow-md"
            >
              <span className="font-medium">
                View All Services
              </span>
              <span className="w-8 h-8 rounded-full bg-[#FDB827] text-[#1F4037] flex items-center justify-center">
                <ArrowRight size={16} strokeWidth={3} />
              </span>
            </Link>
          </div>
        </div>

        {/* Infinite Scroll Row */}
        <div className="relative group">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={() => (isTouching.current = true)}
            onTouchEnd={() => {
              isTouching.current = false;
              handleScroll();
            }}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-12 pt-4 px-4 snap-x snap-mandatory touch-pan-x overscroll-x-contain"
            style={{ scrollBehavior: "auto" }}
          >
            {items.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] xl:w-[23vw] snap-center transform-gpu"
              >
                <Link
                  to={`/service/${item.id}`}
                  className="block h-full"
                >
                  {allowTilt ? (
                    <TiltCard className="h-full" enableScale={false}>
                      <CardContent
                        item={item}
                        activeTab={activeTab}
                      />
                    </TiltCard>
                  ) : (
                    <CardContent
                      item={item}
                      activeTab={activeTab}
                    />
                  )}
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
