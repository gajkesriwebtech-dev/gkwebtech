import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../types';

export const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchBlogs();
  }, [i18n.language]);

  const fetchBlogs = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      console.log("API URL Blogs Component:", backendUrl);
      
      const res = await fetch(`${backendUrl}/api/blogs?lang=${i18n.language}`, { cache: "no-store" });
      const data = await res.json();
      
      console.log("Fetched home blogs:", data);
      setBlogs(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching homepage blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null; // Or a subtle loader
  if (blogs.length === 0) return <div className="text-center py-10">No blogs found.</div>;

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-950 transition-colors" id="blogs">
      <div className="container mx-auto px-4 md:px-6 xl:px-12 2xl:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <SectionHeader label={t("blogs.section_label", "Insights")} title={t("blogs.section_title", "Marketing")} subtitle={t("blogs.section_subtitle", "News & Trends")} />
           <div className="mb-12">
               <Button variant="primary" icon="arrow" href="/blogs" className="bg-primary text-white hover:bg-primary-dark dark:bg-gray-800 dark:hover:bg-gray-700">
                 {t("blogs.view_all", "View All Articles")}
               </Button>
           </div>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {blogs.map((blog, idx) => (
            <div key={blog._id || blog.id} className="min-w-[85vw] md:min-w-0 snap-center h-full animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <Link 
                to={i18n.language === 'en' ? `/blog/${blog.slug}` : `/${i18n.language}/blog/${blog.slug}`} 
                className="block group cursor-pointer bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-xl dark:shadow-none border border-gray-300 dark:border-gray-800 active:border-secondary md:hover:border-secondary transition-all duration-300 h-full active:scale-[0.98]"
              >
                <div className="rounded-2xl overflow-hidden mb-6 relative aspect-[4/3]">
                   <img 
                     src={blog.image} 
                     alt={blog.title} 
                     loading="lazy" 
                     decoding="async"
                     width="800"
                     height="600"
                     className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110" 
                   />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-secondary rounded-full flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <span className="text-primary font-bold text-xl">↗</span>
                   </div>
                </div>
                <div className="flex gap-4 mb-3 text-xs font-semibold">
                  <span className="bg-secondary/20 text-primary dark:text-secondary px-3 py-1 rounded-full">{blog.category}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 px-3 py-1 rounded-full">{blog.date}</span>
                </div>
                <h3 className="text-xl font-bold text-text-dark dark:text-white mb-3 line-clamp-2 leading-tight group-active:text-primary md:group-hover:text-primary dark:group-active:text-secondary dark:md:group-hover:text-secondary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-500 text-sm mb-4 line-clamp-2">
                   {blog.excerpt}
                </p>
                <span className="text-primary dark:text-secondary font-semibold text-sm underline underline-offset-4 decoration-secondary group-active:no-underline md:group-hover:no-underline">
                  {t("blogs.read_more", "Read More")}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};