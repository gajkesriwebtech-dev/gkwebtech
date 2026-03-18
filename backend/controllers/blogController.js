import Blog from "../models/Blog.js";

// Helper function for keyword matching to find related articles
const findRelatedBlogs = (currentBlog, existingBlogs) => {
  const related = existingBlogs
    .filter(b => b.slug !== currentBlog.slug) // Don't link to itself
    .map(blog => {
      let score = 0;
      
      // Check title keywords
      const currentTitleWords = currentBlog.title.toLowerCase().split(/\s+/);
      const blogTitleWords = blog.title.toLowerCase().split(/\s+/);
      const commonTitleWords = currentTitleWords.filter(word => blogTitleWords.includes(word) && word.length > 3);
      score += commonTitleWords.length * 2;

      // Check tags
      const commonTags = (currentBlog.tags || []).filter(tag => (blog.tags || []).includes(tag));
      score += commonTags.length * 3;

      // Check primary keyword
      if (currentBlog.primaryKeyword && blog.primaryKeyword && currentBlog.primaryKeyword.toLowerCase() === blog.primaryKeyword.toLowerCase()) {
        score += 5;
      }
      
      return { blog, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .slice(0, 4) // Get top 4
    .map(item => item.blog);

  return related;
};

export const getBlogs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    console.log("Requested lang:", lang);

    // Optimized $in query to grab the requested language and English together
    let blogs = await Blog.find({ language: { $in: [lang, "en"] } }).sort({ createdAt: -1 });

    // Deduplicate blogs by slug, prioritizing the requested language over the fallback "en"
    const uniqueBlogsMap = new Map();
    for (const blog of blogs) {
      if (!uniqueBlogsMap.has(blog.slug)) {
        uniqueBlogsMap.set(blog.slug, blog);
      } else {
        // If we already have a blog with this slug, we only overwrite it if the current blog matches the requested language exactly
        if (blog.language === lang) {
          uniqueBlogsMap.set(blog.slug, blog);
        }
      }
    }
    
    // Convert back to array
    blogs = Array.from(uniqueBlogsMap.values());

    // 🔥 FINAL fallback (VERY IMPORTANT) - If DB is totally empty of even English fallbacks for some reason
    if (!blogs.length) {
      blogs = await Blog.find({}).sort({ createdAt: -1 });
    }

    console.log("Blogs found:", blogs.length);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const lang = req.query.lang || "en";
    
    console.log("Fetching blog - Slug:", slug, "Language:", lang);
    
    let blog = await Blog.findOne({ slug, language: lang });
    
    // Fallback to English if translation is missing
    if (!blog && lang !== "en") {
      console.log(`Blog not found for language ${lang}, falling back to 'en'`);
      blog = await Blog.findOne({ slug, language: "en" });
    }

    if (!blog) {
      console.log("Blog not found for slug:", slug);
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error in getBlogBySlug:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    
    // Ensure language field is always set
    blogData.language = blogData.language || "en";
    
    // Fetch existing blogs for internal linking
    const existingBlogs = await Blog.find({ language: blogData.language });
    
    // Find related blogs
    const relatedBlogs = findRelatedBlogs(blogData, existingBlogs);
    
    if (relatedBlogs.length > 0) {
      let internalLinksHtml = `\n\n<h3>Related Articles</h3><ul>`;
      relatedBlogs.forEach(rel => {
        const prefix = rel.language === "en" ? "" : `/${rel.language}`;
        const link = `${prefix}/blog/${rel.slug}`;
        internalLinksHtml += `<li><a href="${link}">${rel.title}</a></li>`;
      });
      internalLinksHtml += `</ul>`;
      
      blogData.content += internalLinksHtml;
    }

    const newBlog = new Blog(blogData);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
