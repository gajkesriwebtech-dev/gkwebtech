"use client";

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Mail } from "lucide-react";
import { coursesData } from "../data";
import { TiltCard } from "./TiltCard";
import { Seo } from "./Seo";
import { useTranslation } from "react-i18next";

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const course = coursesData.find(c => c.id === id);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/", { state: { scrollTo: "contact" } });
  };

  if (!course) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold text-[#1F4037] mb-4">Course Not Found</h2>
        <Link to="/" className="text-[#FDB827] hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${course.title} | GK WebTech | GKWebTech`}
        description={`${course.description} GK WebTech delivers practical learning paths for digital growth. GKWebTech helps businesses grow online.`}
        keywords={course.features.join(', ')}
        canonical={`${window.location.origin}/course/${course.id}`}
        image={course.detailImage}
        type="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": course.title,
          "description": course.description,
          "url": `${window.location.origin}/course/${course.id}`,
          "image": course.detailImage,
          "provider": {
            "@type": "Organization",
            "name": "GK WebTech",
            "url": window.location.origin
          }
        }}
        breadcrumbs={[
          { name: t("nav.home", "Home"), item: "/" },
          { name: t("nav.courses", "Courses"), item: "/courses" },
          { name: course.title, item: `/course/${course.id}` }
        ]}
      />
      
      <div className="pt-24 pb-20 bg-bg-light dark:bg-gray-950 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={course.detailImage} 
            alt={course.title} 
            fetchPriority="high"
            loading="eager"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container mx-auto px-6 text-center">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#FDB827] mb-6 transition"
              >
                <ArrowLeft size={20} /> {t("common.back", "Back")}
              </button>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
                {course.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 md:px-6 -mt-20 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Details */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-800 transition-colors">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F4037] dark:text-white mb-6">{t("service.overview", "Overview")}</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-8">
                  {course.fullDescription}
                </p>

                <h3 className="text-xl font-bold text-[#1F4037] dark:text-white mb-6">{t("course.learn_title", "What You’ll Learn")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.features.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      <CheckCircle size={18} className="text-[#FDB827] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-900 dark:text-gray-200 font-medium text-sm">{topic}</span>
                    </div>
                  ))}
                </div>

                {/* Tenure Box */}
                <div className="mt-10 bg-[#FDB827]/10 p-5 rounded-xl border border-[#FDB827]/30">
                  <p className="font-bold text-[#1F4037] dark:text-secondary">{t("course.tenure", "Tenure")}:</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 mt-1">
                    {course.tenure}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-6 relative z-10">
              {/* CTA Card */}
              <TiltCard className="bg-[#1F4037] text-white rounded-3xl p-8 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDB827] rounded-full blur-[60px] opacity-20"></div>
                <h3 className="text-2xl font-bold mb-3">{t("course.start_journey", "Start Your Journey")}</h3>
                <p className="text-gray-300 text-sm mb-6">{t("course.enroll_desc", "Enroll or get guidance for pricing and batch details.")}</p>

                <div className="space-y-4">
                  <button
                    onClick={handleContactClick}
                    className="bg-[#FDB827] text-[#1F4037] w-full py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white transition"
                  >
                    <span>{t("common.enroll_now", "Enroll Now")}</span> <Mail size={18} />
                  </button>
                </div>
              </TiltCard>

              {/* Pricing Help Card */}
              <TiltCard className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-300 dark:border-gray-800 shadow-md">
                <h4 className="text-lg font-bold text-[#1F4037] dark:text-white mb-1">{t("course.pricing_title", "Pricing & Batches")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t("course.pricing_desc", "Training + Internship program. Contact for pricing.")}</p>
                <p className="text-2xl font-bold text-[#FDB827]">{t("common.contact_us", "Contact Us")}</p>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
