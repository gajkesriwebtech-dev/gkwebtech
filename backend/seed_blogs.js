import mongoose from 'mongoose';
import Blog from './models/Blog.js';
import connectToDatabase from './api/db.js';

const initialBlogs = [
  {
    slug: "future-of-seo-ai",
    language: "en",
    category: 'SEO Strategy',
    date: '21 May 2024',
    title: 'The Future of SEO: AI and Voice Search Trends',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1400',
    excerpt: 'Explore how Artificial Intelligence and voice search are reshaping the landscape of Search Engine Optimization in 2024.',
    author: 'Dr. Anuj Tiwari',
    readTime: '5 min read',
    tags: ['AI', 'SEO', 'Technology', 'Trends'],
    primaryKeyword: "SEO",
    content: `
      <p>Search Engine Optimization (SEO) is undergoing a paradigm shift. With the advent of Generative AI and the increasing prevalence of voice search, the traditional methods of keyword stuffing and backlink farming are rapidly becoming obsolete. In 2024, the focus is squarely on <strong>user intent</strong> and <strong>contextual relevance</strong>.</p>
      
      <h3>The Rise of Generative Engine Optimization (GEO)</h3>
      <p>As search engines like Google integrate AI overviews (SGE), visibility isn't just about ranking number one on a blue link list; it's about being cited in the AI-generated answer. This requires content that is authoritative, comprehensive, and structured for machine understanding.</p>
      
      <h3>Voice Search is Non-Negotiable</h3>
      <p>With smart speakers and mobile assistants, voice queries are more conversational. "Best Italian restaurant near me" is replaced by "Hey Google, where can I find authentic pasta nearby that's open right now?" Optimizing for long-tail keywords and natural language is crucial.</p>
      
      <blockquote>"The future of search isn't just about finding links; it's about finding answers. Brands that provide direct, high-value answers will win."</blockquote>
      
      <h3>Key Takeaways for 2024:</h3>
      <ul>
        <li>Focus on E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness).</li>
        <li>Structure your data with Schema markup.</li>
        <li>Create content that answers specific questions directly.</li>
      </ul>
    `
  },
  {
    slug: "maximizing-roi-instagram-ads",
    language: "en",
    category: 'Social Media',
    date: '20 May 2024',
    title: 'Maximizing ROI on Instagram Ads in 2024',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1400',
    excerpt: 'Learn the latest strategies to lower your CPA and increase engagement with high-converting Instagram ad creatives.',
    author: 'Vanshika Joshi',
    readTime: '4 min read',
    tags: ['Social Media', 'Ads', 'Instagram', 'ROI'],
    primaryKeyword: "Instagram Ads",
    content: `
      <p>Instagram advertising has become more competitive, but it remains one of the most powerful tools for B2C brands. The key to success in 2024 isn't just budget; it's <strong>creative agility</strong>.</p>
      
      <h3>UGC is King</h3>
      <p>User-Generated Content (UGC) continues to outperform polished studio shots. Ads that look like organic content—specifically Reels—have a significantly lower Cost Per Click (CPC). Authenticity builds trust faster than high production value.</p>
      
      <h3>Leverage AI for Creative Testing</h3>
      <p>Meta's Advantage+ suite allows advertisers to automatically test different variations of headlines, copy, and visuals. Instead of guessing what works, let the algorithm find the winning combination for you.</p>
      
      <h3>Strategies for Success:</h3>
      <ol>
        <li><strong>Hook in 3 Seconds:</strong> You must grab attention immediately.</li>
        <li><strong>Use Vertical Video:</strong> 9:16 aspect ratio is mandatory for Reels placements.</li>
        <li><strong>Clear CTA:</strong> Tell the user exactly what to do next (e.g., "Shop Now", "Learn More").</li>
      </ol>
    `
  }
];

const seed = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to DB");
    
    // Clear existing blogs to avoid duplicates during test
    await Blog.deleteMany({ slug: { $in: initialBlogs.map(b => b.slug) } });
    
    for (const blogData of initialBlogs) {
      // Manual internal linking simulation for seed
      const existing = await Blog.find({ language: blogData.language });
      if (existing.length > 0) {
        let links = `\n\n<h3>Related Articles</h3><ul>`;
        existing.forEach(rel => {
          links += `<li><a href="/blog/${rel.slug}">${rel.title}</a></li>`;
        });
        links += `</ul>`;
        blogData.content += links;
      }
      
      const blog = new Blog(blogData);
      await blog.save();
      console.log(`Seeded: ${blog.title}`);
    }
    
    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
};

seed();
