import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight } from "lucide-react";
import { coursesData } from "../data";

export const Courses: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-950 transition-colors" id="courses">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <SectionHeader label="Our Courses" title="Courses We" subtitle="Offer" />

          <Link
            to="/courses"
            className="flex items-center gap-2 text-[#1F4037] dark:text-[#FDB827] font-bold hover:underline"
          >
            <span>View All Courses</span>
            <ArrowRight size={20} />
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {coursesData.map((course) => (
              <div
                key={course.id}
                className="min-w-[300px] md:min-w-[350px] snap-center bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-gray-300 dark:border-gray-800 transition hover:shadow-2xl flex flex-col h-full active:scale-95 duration-200"
              >
                <div className="w-full h-48 rounded-2xl mb-6 overflow-hidden border border-gray-100 dark:border-gray-700">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <h3 className="text-xl font-bold text-[#1F4037] dark:text-white mb-3 line-clamp-1">
                  {course.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3 flex-grow">
                  {course.description}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/course/${course.id}`}
                    className="inline-flex items-center gap-2 text-[#1F4037] dark:text-[#FDB827] font-semibold text-sm hover:underline"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
