import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsData } from '../data';
import { ArrowLeft, User, Calendar, Clock, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Seo } from './Seo';

export const BlogDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const blog = blogsData.find(b => b.id === id);
   const { t } = useTranslation();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [id]);

   if (!blog) {
      return (
         <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4 bg-bg-light dark:bg-gray-950">
            <h2 className="text-4xl font-bold text-primary dark:text-white mb-4">{t("blog.not_found", "Article Not Found")}</h2>
            <Link to="/blogs" className="text-secondary hover:underline">{t("blog.return_to_blog", "Return to Blog")}</Link>
         </div>
      );
   }

   return (
      <div className="pt-24 pb-20 bg-bg-light dark:bg-gray-950 min-h-screen transition-colors">
         <Seo
            title={`${blog.title} | GK WebTech | GKWebTech`}
            description={`${blog.excerpt} ${t('seo.detail_suffix.blog')}`}
            keywords={(blog.tags || []).join(', ')}
            canonical={window.location.href}
            image={blog.image}
            type="article"
            structuredData={{
               "@context": "https://schema.org",
               "@type": "Article",
               "headline": blog.title,
               "image": [blog.image],
               "author": { "@type": "Person", "name": blog.author },
               "datePublished": blog.date
            }}
         />

         {/* Article Header Background */}
         <div className="w-full h-[40vh] md:h-[50vh] relative overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
               src={blog.image}
               alt={blog.title}
               fetchPriority="high"
               loading="eager" /* LCP Optimization */
               width="1920"
               height="1080"
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
               <div className="container mx-auto px-4 text-center">
                  <Link to="/blogs" className="inline-flex items-center gap-2 text-white/80 hover:text-secondary mb-6 transition-colors backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
                     <ArrowLeft size={16} />
                     <span>{t("blog.back_articles", "Back to Articles")}</span>
                  </Link>
               </div>
            </div>
         </div>

         <div className="container mx-auto px-4 md:px-6 relative z-30 -mt-32">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">

               <div className="p-8 md:p-12">
                  {/* Meta Data */}
                  <div className="flex flex-wrap gap-4 md:gap-8 items-center text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
                     <span className="bg-secondary/20 text-primary dark:text-secondary px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide">
                        {t(`blogs.${blog.id}.category`, blog.category)}
                     </span>
                     <div className="flex items-center gap-2">
                        <Calendar size={16} /> {blog.date}
                     </div>
                     <div className="flex items-center gap-2">
                        <Clock size={16} /> {blog.readTime}
                     </div>
                     <div className="flex items-center gap-2">
                        <User size={16} /> By {blog.author}
                     </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-5xl font-bold text-text-dark dark:text-white mb-8 leading-tight">
                     {t(`blogs.${blog.id}.title`, blog.title)}
                  </h1>

                  {/* Content Body */}
                  <div
                     className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                     dangerouslySetInnerHTML={{ __html: t(`blogs.${blog.id}.content`, blog.content) }}
                  ></div>

               </div>
            </div>
         </div>
      </div>
   );
};
