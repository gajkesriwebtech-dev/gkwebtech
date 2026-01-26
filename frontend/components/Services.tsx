import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { servicesData, coursesData } from "../data";

const CardContent: React.FC<{ item: any; activeTab: string }> = ({ item, activeTab }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-gray-300 transition cursor-pointer h-full flex flex-col">
      <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden border border-gray-100">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      <h3 className="text-2xl font-bold text-[#1F4037] dark:text-white mb-4 line-clamp-1">
        {item.title}
      </h3>

      <p className="text-gray-700 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
        {item.description}
      </p>

      <div className="flex items-center gap-2 text-[#1F4037] dark:text-[#FDB827] font-semibold text-sm mt-auto">
        <span>{activeTab === "tech" ? "Learn More" : "View Syllabus"}</span>
        <ArrowRight size={16} />
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"tech" | "institute">("tech");

  const baseItems = activeTab === "tech" ? servicesData : coursesData;

  // ✅ duplicate on both sides for infinite feel
  const items = [...baseItems, ...baseItems, ...baseItems];

  const tiltEnabled =
    typeof window !== "undefined" &&
    window.innerWidth > 1024 &&
    window.matchMedia("(hover: hover)").matches;

  // ✅ start from middle copy
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const middle = el.scrollWidth / 3;
    el.scrollLeft = middle;
  }, [activeTab]);

  // ✅ seamless infinite loop
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const third = el.scrollWidth / 3;

    if (el.scrollLeft < third * 0.5) {
      el.scrollLeft += third;
    } else if (el.scrollLeft > third * 1.5) {
      el.scrollLeft -= third;
    }
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
    <section className="py-20 bg-gray-100 dark:bg-gray-950 transition-colors" id="services">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <SectionHeader label="Our Offerings" title="Solutions We" subtitle="Provide" />

          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-md flex border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-6 py-2 rounded-full font-bold text-sm ${
                  activeTab === "tech"
                    ? "bg-[#1F4037] text-white"
                    : "text-gray-500"
                }`}
              >
                GKTech
              </button>

              <button
                onClick={() => setActiveTab("institute")}
                className={`px-6 py-2 rounded-full font-bold text-sm ${
                  activeTab === "institute"
                    ? "bg-[#FDB827] text-[#1F4037]"
                    : "text-gray-500"
                }`}
              >
                GKInstitute
              </button>
            </div>

            <Link
              to={activeTab === "tech" ? "/services" : "/courses"}
              className="bg-[#1F4037] text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-3 shadow-md"
            >
              <span className="font-medium">
                {activeTab === "tech" ? "View All Services" : "View All Courses"}
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
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-12 pt-4 px-4 snap-x snap-mandatory"
          >
            {items.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className="shrink-0 w-[85vw] sm:w-[45vw] md:w-[30vw] xl:w-[23vw] snap-center"
              >
                <Link
                  to={`/${activeTab === "tech" ? "service" : "course"}/${item.id}`}
                  className="block h-full"
                >
                  {tiltEnabled ? (
                    <TiltCard className="h-full">
                      <CardContent item={item} activeTab={activeTab} />
                    </TiltCard>
                  ) : (
                    <CardContent item={item} activeTab={activeTab} />
                  )}
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;
