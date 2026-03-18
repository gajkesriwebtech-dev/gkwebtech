import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { ArrowRight, ArrowLeft, User, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './SectionHeader';
import { TiltCard } from './TiltCard';
import { Seo } from './Seo';

export const BlogsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, [i18n.language]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
      console.log("API URL Blogs Page:", backendUrl);
      
      const res = await fetch(`${backendUrl}/api/blogs?lang=${i18n.language}`, { cache: "no-store" });
      const data = await res.json();
      
      console.log("Fetched paginated blogs:", data);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // Fallback to static data if API fails (optional, based on your preference)
      // setBlogs(blogsData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-bg-light dark:bg-gray-950 min-h-screen transition-colors">
      <Seo
        title={t('seo.blogs.title', 'Blogs | GK WebTech | GKWebTech')}
        description={t('seo.blogs.description', 'Stay updated with the latest digital marketing trends, SEO tips, and industry insights from the GK WebTech team.')}
        keywords={t('seo.blogs.keywords', 'blogs, marketing tips, SEO trends, industry insights')}
        canonical={`${window.location.origin}/blogs`}
        image={`${window.location.origin}/images/logo.png`}
        type="website"
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-secondary transition-colors backdrop-blur-sm bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full">
            <ArrowLeft size={16} />
            <span>{t("nav.back_home", "Back to Home")}</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-0.5 w-4 bg-secondary"></span>
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              {t("blogs_page.insights", "Our Insights")}
            </span>
            <span className="h-0.5 w-4 bg-secondary"></span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark dark:text-white mb-6">
            {t("blogs_page.latest", "Latest")} <span className="text-secondary">{t("blogs_page.articles", "Articles")}</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {t("blogs_page.description", "Expert analysis, digital marketing trends, and actionable strategies to help your business grow.")}
          </p>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-text-dark dark:text-white text-xl">
            No blogs found in this language.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <div key={blog._id || blog.id} className="animate-fade-in-up h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link 
                  to={i18n.language === 'en' ? `/blog/${blog.slug}` : `/${i18n.language}/blog/${blog.slug}`} 
                  className="block h-full group"
                >
                  <TiltCard className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 active:shadow-2xl md:hover:shadow-2xl active:border-secondary md:hover:border-secondary transition-all duration-300 h-full flex flex-col active:scale-[0.98]">

                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                        className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-primary px-3 py-1 rounded-full text-xs font-bold shadow-md">
                        {blog.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                        <span className="flex text-gray-600 dark:text-gray-400 items-center gap-1">
                          <Clock size={14} /> {blog.readTime}
                        </span>
                        <span>|</span>
                        <span className="flex text-gray-600 dark:text-gray-400 items-center gap-1">
                          <User size={14} /> {blog.author}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-text-dark dark:text-white mb-3 line-clamp-2 leading-tight group-active:text-primary md:group-hover:text-primary dark:group-active:text-secondary dark:md:group-hover:text-secondary transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-700 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center text-primary dark:text-secondary font-semibold text-sm mt-auto group-active:underline md:group-hover:underline decoration-2 underline-offset-4">
                        {t("blogs.read_full", "Read Full Article")} <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>

                  </TiltCard>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
