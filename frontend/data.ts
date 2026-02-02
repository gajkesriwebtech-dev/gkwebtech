import { Service, BlogPost, Project, TeamMember, Testimonial } from './types';
import { cld, cldFetch } from "./utils/cloudinary";
import { getUnsplashUrl } from "./utils/unsplash";

export const servicesData: Service[] = [
  {
    id: "seo-optimization",
    updatedAt: "2025-10-15",
    image: getUnsplashUrl("photo-1460925895917-afdab827c52f", 600),
    detailImage: getUnsplashUrl("photo-1571786256017-aee7a0c009b6", 1200),
    title: "SEO Optimization",
    description: "Improve your search rankings and drive organic traffic with our data-driven SEO strategies.",
    fullDescription: "Our SEO Optimization service is designed to propel your business to the top of search engine results. We go beyond basic keyword insertion to provide a comprehensive strategy that includes technical SEO audits, on-page optimization, high-quality link building, and content optimization. We analyze search intent to ensure your brand connects with the right audience at the right time.",
    features: [
      "Comprehensive Website Audit & Technical SEO",
      "Keyword Research & Competitor Analysis",
      "On-Page Optimization (Meta tags, Headings, Content)",
      "Off-Page Link Building & Authority Growth",
      "Local SEO for Geographic Targeting",
      "Monthly Performance Reporting & Tracking"
    ]
  },
  {
    id: "social-media-marketing",
    updatedAt: "2025-10-20",
    image: getUnsplashUrl("photo-1611162617474-5b21e879e113", 600),
    detailImage: getUnsplashUrl("photo-1611926653458-09294b3142bf", 1200),
    title: "Social Media Marketing",
    description: "Engage your audience and build brand loyalty across all major social media platforms.",
    fullDescription: "Social media is the heartbeat of modern digital interaction. Our team creates bespoke social media strategies that amplify your brand voice, foster community engagement, and drive conversions. From Instagram Reels to LinkedIn thought leadership, we manage your presence across all relevant platforms to ensure consistent and impactful messaging.",
    features: [
      "Platform-Specific Strategy (Instagram, LinkedIn, Twitter, TikTok)",
      "Content Calendar Creation & Scheduling",
      "Community Management & Engagement",
      "Influencer Partnership Management",
      "Social Listening & Trend Analysis",
      "Paid Social Campaigns Integration"
    ]
  },
  {
    id: "content-strategy",
    updatedAt: "2025-10-25",
    image: getUnsplashUrl("photo-1552664730-d307ca884978", 600),
    detailImage: getUnsplashUrl("photo-1519389950473-47ba0277781c", 1200),
    title: "Content Strategy & Branding",
    description: "Create compelling content and a strong brand identity that resonates with your audience.",
    fullDescription: "Content is king, but context is queen. We develop robust content strategies that align with your business goals and speak directly to your customer's pain points. Our branding services ensure that every piece of content—from blog posts to whitepapers—reflects your unique identity, establishing trust and authority in your industry.",
    features: [
      "Brand Voice & Identity Development",
      "Content Audits & Gap Analysis",
      "Blog Writing & Long-form Content",
      "Copywriting for Web & Ad Creatives",
      "Visual Storytelling & Infographics",
      "Newsletter & Email Marketing Content"
    ]
  },
  {
    id: "google-meta-ads",
    updatedAt: "2025-11-01",
    image: getUnsplashUrl("photo-1533750516457-a7f992034fec", 600),
    detailImage: getUnsplashUrl("photo-1432888498266-38ffec3eaf0a", 1200),
    title: "Google & Meta Ads",
    description: "Maximize ROI with targeted PPC campaigns on Google, Facebook, and Instagram.",
    fullDescription: "Stop wasting money on vague advertising. Our paid media experts design high-conversion campaigns on Google Ads and Meta (Facebook/Instagram). We utilize advanced targeting, retargeting pixels, and A/B testing to lower your Cost Per Acquisition (CPA) while maximizing your Return on Ad Spend (ROAS).",
    features: [
      "Google Search & Display Ads Management",
      "Facebook & Instagram Ad Campaigns",
      "Retargeting & Lookalike Audiences",
      "A/B Testing for Ad Creatives",
      "Conversion Tracking Setup",
      "Real-time Budget Optimization"
    ]
  },
  {
    id: "campaign-planning",
    updatedAt: "2025-11-05",
    image: getUnsplashUrl("photo-1551288049-bebda4e38f71", 600),
    detailImage: getUnsplashUrl("photo-1454165804606-c3d57bc86b40", 1200),
    title: "Campaign Planning & Analytics",
    description: "Strategic planning and in-depth analytics to optimize every aspect of your marketing.",
    fullDescription: "Data without insight is just noise. We provide end-to-end campaign planning backed by rigorous analytics. Whether you are launching a new product or looking to scale, our team maps out the entire customer journey. We set clear KPIs and use advanced analytics tools to track performance, ensuring every dollar spent contributes to your bottom line.",
    features: [
      "Full-Funnel Campaign Strategy",
      "Customer Journey Mapping",
      "Google Analytics 4 (GA4) Setup & Audit",
      "Custom Dashboard Creation",
      "Conversion Rate Optimization (CRO)",
      "Competitor Benchmarking"
    ]
  },
  {
    id: "website-management",
    updatedAt: "2025-11-10",
    image: getUnsplashUrl("photo-1547658719-da2b51169166", 600),
    detailImage: getUnsplashUrl("photo-1467232004584-a241de8bcf5d", 1200),
    title: "Website Management & WordPress",
    description: "Secure, fast, and optimized website management services specialized in WordPress.",
    fullDescription: "Your website is your digital storefront. We offer comprehensive WordPress management services to keep your site secure, fast, and up-to-date. From plugin updates and security patches to speed optimization and minor design tweaks, we handle the technical details so you can focus on running your business.",
    features: [
      "WordPress Theme & Plugin Updates",
      "Site Speed Optimization (Core Web Vitals)",
      "Daily Backups & Security Monitoring",
      "Malware Removal & Protection",
      "Content Updates & Layout Fixes",
      "Hosting Management & Migration"
    ]
  },
  {
    id: "creative-design",
    updatedAt: "2025-11-15",
    image: getUnsplashUrl("photo-1550745165-9bc0b252726f", 600),
    detailImage: getUnsplashUrl("photo-1550745165-9bc0b252726f", 1200),
    title: "Creative Ad Design & Reels",
    description: "Eye-catching visuals and short-form video content designed to go viral.",
    fullDescription: "In a crowded digital landscape, visuals are your first impression. Our creative studio produces stunning graphic designs and high-energy short-form videos (Reels/TikToks) that capture attention instantly. We blend aesthetics with psychology to create ads that not only look good but drive action.",
    features: [
      "Social Media Graphics & Templates",
      "Short-Form Video Production (Reels/Shorts)",
      "Display Ad Banners & Creatives",
      "Motion Graphics & Animation",
      "Video Editing & Post-Production",
      "Thumbnail Design"
    ]
  }
];

export const coursesData = [
  {
    id: "seo-optimization",
    updatedAt: "2025-11-20",
    image: getUnsplashUrl("photo-1460925895917-afdab827c52f", 600),
    detailImage: getUnsplashUrl("photo-1571786256017-aee7a0c009b6", 1200),
    title: "SEO Optimization Training",
    description: "3-month training + 6-month internship, certification included. Learn technical SEO, keyword strategy, and ranking growth.",
    fullDescription: "Master SEO from basics to advanced ranking strategies. This course includes 3 months of structured training followed by a 6-month internship. Tenure may vary based on learning capabilities. Training certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (duration may vary by candidate learning speed)",
    certificates: [
      "3-Month Training Certificate",
      "6-Month Internship Certificate"
    ],
    pricingNote: "Contact us for pricing and enrollment details",
    internship: "Includes 6-month internship after training. Internship tenure may vary depending on candidate learning capabilities.",
    features: [
      "SEO Fundamentals & Technical Audits",
      "Keyword Research & Competitor Strategy",
      "On-Page Optimization (Meta, Content, Structure)",
      "Off-Page SEO & Authority Building",
      "Live Internship With Real Projects",
      "Certification & Pricing Guidance"
    ],
    cta: {
      enrollText: "Enroll Now",
      contactText: "Contact for Pricing"
    }
  },
  {
    id: "social-media-marketing",
    updatedAt: "2025-11-22",
    image: getUnsplashUrl("photo-1611162617474-5b21e879e113", 600),
    detailImage: getUnsplashUrl("photo-1611926653458-09294b3142bf", 1200),
    title: "Social Media Marketing Training",
    description: "3-month training + 6-month internship, certificate included. Learn growth, reels, content & paid campaigns.",
    fullDescription: "Become a social media expert. Learn Instagram, LinkedIn, TikTok, Twitter growth strategies + reels, psychology-based content, and paid ads integration. 3 months training followed by live internship. Internship tenure may vary based on learning pace. Training certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (may vary by candidate learning capabilities)",
    certificates: [
      "Social Media Training Certificate",
      "Internship Experience Certificate"
    ],
    pricingNote: "Contact for pricing and plan details",
    internship: "6-month internship included after training. Duration may vary based on candidate learning speed.",
    features: [
      "Platform-Wise Growth Strategy",
      "Content & Reels Training",
      "Community Management",
      "Influencer & Trend Research",
      "Paid Campaign Execution in Internship",
      "Certificate + Pricing Support"
    ],
    cta: {
      enrollText: "Start Learning",
      contactText: "Contact for Pricing"
    }
  },
  {
    id: "content-strategy",
    updatedAt: "2025-11-25",
    image: getUnsplashUrl("photo-1552664730-d307ca884978", 600),
    detailImage: getUnsplashUrl("photo-1519389950473-47ba0277781c", 1200),
    title: "Content Strategy & Branding Training",
    description: "3-month training + 6-month internship, certification included. Learn copywriting, branding, and content psychology.",
    fullDescription: "Learn to build a brand using powerful content. Includes 3 months of guided training and 6-month internship. Internship tenure may vary based on learning pace. Training certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (duration may vary based on candidate learning speed)",
    certificates: [
      "Content Strategy Training Certificate",
      "Internship Certificate"
    ],
    pricingNote: "Contact for pricing and enrollment details",
    internship: "6-month internship included after training. Internship tenure may vary based on candidate learning pace.",
    features: [
      "Brand Identity & Voice",
      "Copywriting & Web Content",
      "Visual Storytelling",
      "Infographic Content",
      "Newsletter & Campaign Writing",
      "Live Internship + Certificate + Pricing Support"
    ],
    cta: {
      enrollText: "Join Course",
      contactText: "Contact for Pricing"
    }
  },
  {
    id: "google-meta-ads",
    updatedAt: "2025-11-28",
    image: getUnsplashUrl("photo-1533750516457-a7f992034fec", 600),
    detailImage: getUnsplashUrl("photo-1432888498266-38ffec3eaf0a", 1200),
    title: "Google & Meta Ads Training",
    description: "3-month PPC training + 6-month internship, certificate included. Learn paid media, CPA, ROAS, A/B testing.",
    fullDescription: "Learn to run profitable PPC campaigns. Includes 3 months of training and live internship. Internship tenure may vary based on learning speed. PPC training certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (may vary by learning capabilities)",
    certificates: [
      "Paid Media Training Certificate",
      "Internship Certificate"
    ],
    pricingNote: "Contact for pricing and campaign plans",
    internship: "6-month internship included after training. Duration may vary based on candidate learning pace.",
    features: [
      "Google Ads Search & Display",
      "Meta Ads Fundamentals",
      "Retargeting & A/B Testing",
      "Conversion Tracking",
      "Live Internship Projects",
      "Certificate + Pricing Support"
    ],
    cta: {
      enrollText: "Start Course",
      contactText: "Contact for Pricing"
    }
  },
  {
    id: "campaign-planning",
    updatedAt: "2025-12-01",
    image: getUnsplashUrl("photo-1551288049-bebda4e38f71", 600),
    detailImage: getUnsplashUrl("photo-1454165804606-c3d57bc86b40", 1200),
    title: "Campaign Planning & Analytics Training",
    description: "3-month training + 6-month internship, certification included. Learn full-funnel strategy, KPIs, dashboards.",
    fullDescription: "Learn data-driven campaign planning. 3 months training + internship. Internship tenure may vary based on learning pace. Campaign planning certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (may vary by candidate learning pace)",
    certificates: [
      "Analytics Training Certificate",
      "Internship Certificate"
    ],
    pricingNote: "Contact for pricing and KPI plans",
    internship: "6-month internship included after training. Internship tenure may vary based on candidate learning capabilities.",
    features: [
      "Full Funnel Strategy",
      "Customer Journey Mapping",
      "GA4 Training",
      "Dashboard & KPI Setup",
      "Internship With Live Projects",
      "Certificate + Pricing Support"
    ],
    cta: {
      enrollText: "Join Analytics Course",
      contactText: "Contact for Pricing"
    }
  },
  {
    id: "website-management",
    updatedAt: "2025-12-05",
    image: getUnsplashUrl("photo-1547658719-da2b51169166", 600),
    detailImage: getUnsplashUrl("photo-1467232004584-a241de8bcf5d", 1200),
    title: "Website Management & WordPress Training",
    description: "3-month training + 6-month internship, certification included. Learn hosting, migrations, security & updates.",
    fullDescription: "Learn WordPress management. 3 months training + internship. Internship tenure may vary based on learning speed. Website training certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (may vary by learning pace)",
    certificates: [
      "WordPress Training Certificate",
      "Internship Certificate"
    ],
    pricingNote: "Contact for pricing and hosting plans",
    internship: "6-month internship included after training. Internship tenure may vary based on learning capabilities.",
    features: [
      "WP Theme & Plugin Management",
      "Hosting & Migration",
      "Security Monitoring",
      "Live Internship Projects",
      "Certificate + Pricing Support",
      "Pricing & Plan Guidance"
    ],
    cta: {
      enrollText: "Start WordPress Course",
      contactText: "Contact for Pricing"
    }
  },
  {
    id: "creative-design",
    updatedAt: "2025-12-08",
    image: getUnsplashUrl("photo-1550745165-9bc0b252726f", 600),
    detailImage: getUnsplashUrl("photo-1550745165-9bc0b252726f", 1200),
    title: "Creative Ad Design, Reels & Video Editing Training",
    description: "3-month creative training + 6-month internship, certificate included. Learn banners, reels, editing & thumbnails.",
    fullDescription: "Learn creative ad design + reels + video editing. 3 months training + live internship. Internship tenure may vary by learning pace. Creative certificate + Internship certificate provided. Contact for pricing.",
    tenure: "3 months training + 6 months internship (duration may vary by candidate learning pace)",
    certificates: [
      "Creative Design & Reels Certificate",
      "Internship Certificate"
    ],
    pricingNote: "Contact for pricing and creative plans",
    internship: "6-month internship included after training. Internship tenure may vary based on candidate learning speed.",
    features: [
      "Social Graphics & Templates",
      "Reels & Shorts Creation",
      "Video Editing & Motion Graphics",
      "Banners & Thumbnails",
      "Live Internship With Projects",
      "Certificate + Pricing Support"
    ],
    cta: {
      enrollText: "Start Creative Course",
      contactText: "Contact for Pricing"
    }
  }
];

export const blogsData: BlogPost[] = [
  {
    id: "future-of-seo-ai",
    category: 'SEO Strategy',
    date: '21 May 2024',
    title: 'The Future of SEO: AI and Voice Search Trends',
    image: getUnsplashUrl('photo-1620712943543-bcc4688e7485', 1400),
    excerpt: 'Explore how Artificial Intelligence and voice search are reshaping the landscape of Search Engine Optimization in 2024.',
    author: 'Dr. Anuj Tiwari',
    readTime: '5 min read',
    tags: ['AI', 'SEO', 'Technology', 'Trends'],
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
    id: "maximizing-roi-instagram-ads",
    category: 'Social Media',
    date: '20 May 2024',
    title: 'Maximizing ROI on Instagram Ads in 2024',
    image: getUnsplashUrl('photo-1507238691740-187a5b1d37b8', 1400),
    excerpt: 'Learn the latest strategies to lower your CPA and increase engagement with high-converting Instagram ad creatives.',
    author: 'Vanshika Joshi',
    readTime: '4 min read',
    tags: ['Social Media', 'Ads', 'Instagram', 'ROI'],
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
  },
  {
    id: "content-strategy-converts",
    category: 'Content Marketing',
    date: '19 May 2024',
    title: 'How to Build a Content Strategy That Converts',
    image: getUnsplashUrl('photo-1558655146-d09347e92766', 1400),
    excerpt: 'Stop creating content for the sake of it. Here is a blueprint for a content funnel that turns readers into buyers.',
    author: 'Dr. Anuj Tiwari',
    readTime: '6 min read',
    tags: ['Content', 'Marketing', 'Strategy', 'Funnel'],
    content: `
      <p>Many businesses fall into the trap of "content churn"—publishing blog posts and social updates without a clear purpose. A high-converting content strategy maps content to the <strong>buyer's journey</strong>.</p>
      
      <h3>Top of Funnel (Awareness)</h3>
      <p>At this stage, your audience is looking for answers to problems, not products. Create educational blog posts, infographics, and "how-to" videos. The goal is traffic and trust.</p>
      
      <h3>Middle of Funnel (Consideration)</h3>
      <p>Now they know who you are. Offer them value in exchange for contact info. Think webinars, case studies, and free downloadable templates.</p>
      
      <h3>Bottom of Funnel (Decision)</h3>
      <p>This is where you sell. Product comparisons, testimonials, and detailed service pages (like the ones on this site!) are critical here.</p>
      
      <p>Remember: Consistency is key, but quality creates conversion.</p>
    `
  },
  {
    id: "wordpress-security-essentials",
    category: 'Web Development',
    date: '15 May 2024',
    title: 'WordPress Security Essentials for 2024',
    image: getUnsplashUrl('photo-1555066931-4365d14bab8c', 1400),
    excerpt: 'Protect your business assets with these critical security measures for your WordPress website.',
    author: 'Utkarsh Sharma',
    readTime: '7 min read',
    tags: ['WordPress', 'Security', 'Web Dev', 'Cybersecurity'],
    content: `
      <p>WordPress powers over 40% of the web, making it a prime target for hackers. Securing your site is not optional; it's a fundamental business requirement.</p>
      
      <h3>1. Keep Everything Updated</h3>
      <p>Outdated plugins and themes are the #1 entry point for vulnerabilities. Enable auto-updates for minor versions and check major updates in a staging environment first.</p>
      
      <h3>2. Use a Web Application Firewall (WAF)</h3>
      <p>Services like Cloudflare or Wordfence provide a shield between your site and incoming traffic, blocking malicious requests before they reach your server.</p>
      
      <h3>3. Enforce Strong Authentication</h3>
      <p>Two-Factor Authentication (2FA) is a must for all admin accounts. Additionally, limit login attempts to prevent brute-force attacks.</p>
      
      <p>Don't wait for a hack to take security seriously. Prevention is always cheaper than recovery.</p>
    `
  },
  {
    id: "power-of-email-marketing",
    category: 'Email Marketing',
    date: '10 May 2024',
    title: 'Why Email Marketing Still Deliver the Best ROI',
    image: getUnsplashUrl('photo-1563986768494-4dee2763ff3f', 1400),
    excerpt: 'Despite the rise of social media, email remains the most effective channel for direct sales and customer retention.',
    author: 'Vanshika Joshi',
    readTime: '4 min read',
    tags: ['Email', 'Marketing', 'Retention', 'ROI'],
    content: `
      <p>It's easy to get distracted by the latest social media trends, but when it comes to dollars and cents, <strong>email is undisputed</strong>. The average ROI for email marketing is $36 for every $1 spent.</p>
      
      <h3>Ownership vs. Rental</h3>
      <p>On social media, you are renting your audience from an algorithm that can change tomorrow. Your email list is an asset you own. No one can throttle your reach to your own subscribers.</p>
      
      <h3>Personalization at Scale</h3>
      <p>Modern email tools allow for hyper-segmentation. You can send different offers to people who abandoned a cart versus those who just read a blog post. This relevance drives revenue.</p>
      
      <h3>Automation is Your Friend</h3>
      <p>Set up welcome sequences, birthday discounts, and re-engagement campaigns once, and let them generate revenue while you sleep.</p>
    `
  }
];

export const projectsData: Project[] = [
  {
    id: "nirvanavan-foundation",
    updatedAt: "2026-01-15",
    title: "Nirvanavan Foundation",
    location: "Dadikar, Rajasthan",
    category: "Event ",
    description: "A cinematic event coverage for an 8-day NGO-organized art initiative (World Art Mela, 1–8 December, 2025), where artists from across India created live artwork and raised donations for social causes. We are the digital partener of Nirvanavan Foundation .",
    image: cld("WhatsApp_Image_2026-01-13_at_6.23.58_PM_1_kih29k", 1000),
    mediaStats: { photos: 3, videos: 0 },
    tags: ["Video", "Photography", "Art", "NGO", "Event Coverage"],
    client: "Nirvanan Foundation",
    duration: "1 Week",
    challenge: "The foundation needed meaningful visual documentation of the art mela that truly reflected its purpose — live artist participation, community engagement, and donation impact — rather than generic event photos. The challenge was to capture emotions, storytelling, and credibility in a single day while doing justice to 8 days of artistic contribution.",
    solution:
    "We created a cinematic storytelling film focusing on artists, their artwork process, visitor interactions, and the foundation’s mission. Along with structured photography of artwork, crowds, donation moments, and volunteer participation, we produced a video optimized for awareness and trust-building on YouTube and social platforms.",
  results: [
    "Successfully documented 20+ artists and live artwork creation",
    "NGO gained strong visual assets for awareness and credibility",
    "Video published on YouTube to drive long-term engagement and support"
  ],
    testimonial: {
      text: "GKWebTech didn’t just cover an event — they captured our mission and the artists' passion beautifully. The film will help us inspire more people to contribute and connect with our cause.",
      author: "Nirvanan Bodhisattva",
      role: "Founder of Nirvanan Foundation"
    },
    gallery: [cld("WhatsApp_Image_2026-01-13_at_6.23.59_PM_cnasnv", 500), cld("WhatsApp_Image_2026-01-13_at_6.24.01_PM_kyguhh", 500), cld("WhatsApp_Image_2026-01-13_at_6.24.16_PM_vpk3mm", 500)],
    youtubeIds: []

  },
  {
    id: "rambihari-palace",
    updatedAt: "2025-12-20",
    title: "Rambihari Palace",
    location: "Kishanpur, Alwar, Rajasthan",
    category: "Hospitality & Luxury Palace Shoot",
    description: "A creation of a comprehensive stay-and-evaluate project at the heritage Rambihari Palace in Alwar, focusing on assessing the property against European wellness retreat standards. We are the partners for digital scale up of the chain.",
    image: cld("20251213_230354_l2hgaz", 1000),
    mediaStats: { photos: 18, videos: 1 },
    tags: ["Hospitality", "Wellness", "Royality", "Lifestyle", "Heritage"],
    client: "Rambihari Palace A Luxury Hotel",
    duration: "1 Week",
    challenge:
    "To conduct an objective evaluation of the palace’s facilities, service standards, wellness potential, and guest experience from a European perspective — while staying as actual guests, understanding cultural expectations, quality benchmarks, and retreat viability in a heritage hospitality context.",
  solution:
    "We spent 2 nights and 3 days at the property with our foreign guest, assessing key elements including room comfort, service quality, wellness offerings, food experience, ambiance, natural surroundings, and overall suitability for a wellness retreat. Through structured on-site observation, interviews with staff, lifestyle photography, and cinematic video coverage, we produced a detailed evaluation report and visual assets for the client’s strategic planning.",
  results: [
    "Documented comprehensive guest experience report aligned with international wellness standards",
    "Captured high-quality visuals of architecture, spaces, amenities, and environment",
    "Provided actionable recommendations for retreat potential & guest comfort enhancement"
  ],
    testimonial: {
      text: "The team's attention to detail is unmatched. They managed to balance the heritage with a modern aesthetic perfectly.",
      author: "Mr. Ram Kaushik",
      role: "Owner"
    },
    gallery: [cld("IMG_0448_mfyomu", 500), cld("IMG_0408_nmu61m", 500), cld("IMG_0437_dri1jg", 500), cld("IMG_0385_uygivi", 500), cld("IMG_0653_s9e4nv", 500), cld("IMG_0651_y8s52e", 500), cld("IMG_0551_tuqhob", 500), cld("IMG_0639_ifttl1", 500), cld("IMG_0648_cqoqcs", 500), cld("IMG_0435_omnunp", 500), cld("IMG_0654_hvew7w", 500), cld("IMG_0592_srab9h", 500), cld("IMG_0336_efugld", 500), cld("IMG_0633_wowjxk", 500), cld("20251213_224325_efvgkv", 500), cld("IMG_0545_lde7am", 500), cld("9.1_u0eyc2", 500), cld("6.1_ofhox5", 500)],
    youtubeIds: ["https://youtu.be/42aWXPvK53s?si=kplS07SGB9q3cC3r"]
  },
  {
    id: "dadikar-fort",
    updatedAt: "2025-12-25",
    title: "Dadikar Fort",
    location: "Dadikar, Rajasthan",
    category: "Heritage Hospitality & Luxury Fort Shoot",
    description: "Creation of a comprehensive business and digital marketing strategy to evaluate and scale the property for destination weddings and wellness tourism. Our team produced cinematic promotional material through strategic outdoor shoots, supported by SEO and GEO optimization. We are the digital scale-up partners, guiding its expansion for international retreat and wedding audiences.",
    image: cld("511c8d9a_oopq2y", 1000),
    mediaStats: { photos: 11, videos: 1 },
    tags: ["Heritage", "Wellness", "Hospitality", "Lifestyle",],
    client: "Dadhikar Fort & Resorts Private Limited",
    duration: "1 Week",
    challenge:
    "To evaluate whether this historic fort-hotel — with roots tracing back to the 9th–10th century and now restored with modern hospitality — meets international wellness retreat benchmarks while capturing its historic essence, cultural value, and guest comfort levels within a limited timeframe.",  
  solution:
    "Our team conducted a detailed on-site assessment over the stay, exploring accommodation quality, guest services, interaction with local cultural elements, hospitality standards, wellness potential (tranquility, nature access, amenities), and overall guest experience. We paired this with cinematic videography and curated photography that presents the property’s heritage charm, modern amenities, and retreat suitability in a compelling, professional format.",  
  results: [
    "Delivered a comprehensive European-standard wellness evaluation report",
    "Captured rich visual storytelling of history, hospitality, and serene landscapes",
    "Provided actionable recommendations for retreat positioning and guest experience enhancement"
  ],
    gallery: [cld("Group_ab3s76", 1000), cld("20251217_122441_ccans2", 500), cld("DDF7_1_uzekib", 500), cld("DDF1_mlh0dl", 500), cld("DDF4_jf6kgn", 500), cld("20251217_062041_mmwdr2", 500), cld("20251216_194812_ljxyr2", 500), cld("20251217_061903_yw55mk", 500), cld("20251216_194935_rrdkhk", 500), cld("DDF8_m6tz4c", 500), cld("DDF3_1_qxt0en", 500)],
    youtubeIds: ["https://youtu.be/R2gEQOMuUcI?si=LVT3fRgOaA7b4yRK"]
  },
  {
    id: "bamboo-saa-resort-and-spa",
    updatedAt: "2025-12-10",
    title: "Bamboo Saa Resort & Spa",
    location: "Jaipur, Rajasthan",
    category: "Wellness Hospitality Assessment & Collaboration",
    description:  "A stay-and-audit project to benchmark the wellness retreat experience against European hospitality and comfort standards. We delivered strategy-aligned promotional shoots and digital assets for wellness-focused platform scale-up. Partnership advisory backed by SEO and GEO recommendations to enhance global wellness search visibility and retreat positioning.",
    image: cld("download_mopedx", 800),
    mediaStats: { photos: 5, videos: 0 },
    tags: ["Wellness", "Resort", "Spa", "Hospitality", "Retreat"],
    client: "Mr. V.K. Agarwal",
    duration: "1 Week",
    challenge:
    "To benchmark an existing wellness retreat against European wellness tourism expectations while staying as real guests, ensuring our feedback captured practicality, cultural compatibility, business potential, and partnership scope without disrupting ongoing retreat operations.",
  solution:
    "We conducted an immersive, unbiased assessment covering wellness programs, spa services, food quality, staff behavior, hygiene protocols, ambiance, sustainability, silence zones, nature integration, accessibility, and guest comfort. After evaluation, we delivered a structured suggestion brief to the owner and discussed potential collaboration and long-term partnership opportunities.",
  results: [
    "Validated the property as an exceptional wellness retreat with international appeal",
    "Shared European-standard recommendations for future retreat expansion and operations",
    "Initiated partnership conversations for collaboration in retreat experience & international guest programs"
  ],
    gallery: [cld("IMG_1348_o3w5o8", 500), cld("IMG_1349_iizzwv", 500), cld("IMG_1389_w1cim0", 500), cld("IMG_1368_umg7in", 500), cld("IMG_1406_gbkjp1", 500)]
  }
];

export const teamData: TeamMember[] = [
  {
    name: "Dr. Anuj Tiwari",
    education: "PhD, Erasmus Uni., Netherlands",
    role: "Founder & Director",
    country: "Netherlands",
    github: "#",
    image: cld("Founder_kwgszb", 200),
    linkedin: "https://www.linkedin.com/in/gk-webtech-03570938a/",
    youtube: "https://www.youtube.com/@GK-Web-Tech",
    instagram: "https://www.instagram.com/gkwebtech.cloud?utm_source=qr&igsh=MTlxemFqbG5wMGsydg%3D%3D",
  },
  {
    name: "Preeti Tiwari ",
    education: "Phd, Auckland Uni., New Zealand",
    role: "Managing Director",
    country: "New Zealand",
    image: cld("Preeti_kyad0g", 200),
    youtube: "#",
    instagram: "#",
    linkedin: "https://www.linkedin.com/in/preetitiwari2025/",
    github: "#",
  },
  {
    name: "J. E. Spek",
    education: "",
    role: "Advisor",
    country: "Netherlands",
    image: cld("judith_aruw3a", 200),
    linkedin: "https://www.linkedin.com/in/judithspek/",
    github: "#",
    youtube: "#",
    instagram: "#",
  },
  {
    name: "Utkarsh Sharma",
    education: "",   
    role: "Chief Technical Officer",
    country: "India",
    image: cld("Utkarsh1_yiat7m", 200),
    linkedin: "https://www.linkedin.com/in/utkarsh-sharma-2b9110362",
    github: "https://github.com/Utkarsh9571",
    youtube: "#",
    instagram: "#",
  },
  {
    name: "Vanshika Joshi",
    education: "",
    role: "Chief Managing Officer",
    country: "India",
    image: cld("Vanshika_hji2lk", 200),
    linkedin: "https://www.linkedin.com/in/vanshika-joshi-599247251/",
    github: "#",
    youtube: "#",
    instagram: "#",
  }
];

export const testimonialsData: Testimonial[] = [
  {
    rating: 5,
    text: "GKWebTech completely transformed our online presence. Our organic traffic increased by 200% in just six months, and the lead quality has never been better.",
    name: "Leslie Alexander",
    role: "CMO, TechStart Inc.",
    image: cldFetch("https://randomuser.me/api/portraits/women/44.jpg", 200)
  },
  {
    rating: 5,
    text: "Their social media team is outstanding. They captured our brand voice perfectly and engaged our community in ways we couldn't have imagined.",
    name: "Sahil Gupta",
    role: "Youtuber",
    image: cldFetch("https://randomuser.me/api/portraits/men/1.jpg", 200)
  },
  {
    rating: 4,
    text: "The ROI we've seen from their PPC campaigns is incredible. Professional, data-driven, and transparent reporting. Highly recommended!",
    name: "Jenny Wilson",
    role: "Director of Marketing, FashionNova",
    image: cldFetch("https://randomuser.me/api/portraits/women/68.jpg", 200)
  }
];
