import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from './SectionHeader';
import { Button } from './Button';
import { PricingLeadModal } from './PricingLeadModal';
import { TiltCard } from './TiltCard';
import { Seo } from './Seo';
import {
    Check,
    Minus,
    Plus,
    Target,
    Zap,
    Globe,
    MessageSquare,
    Search,
    X,
    HelpCircle,
    Sliders,
    Layers,
    Code,
    Database,
    Shield,
    Smartphone,
    Cpu,
    Palette,
    ClipboardCheck,
    Activity,
    Coins,
    TrendingUp,
    BarChart,
    Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { AccordionTable, AccordionSection } from './AccordionTable';

// --- Types ---

type CategoryId = 'web' | 'seo' | 'social' | 'ads' | 'branding';
type DurationId = 'monthly' | 'quarterly' | 'half-yearly' | 'annually';
type Currency = 'EUR' | 'USD' | 'INR';

interface DetailedViewColumn {
    title: string;
    items: string[];
}

interface PackageCardData {
    id: string;
    durationLabel: string; // e.g. "Monthly", "Quarterly"
    planName: string; // e.g. "Flexible Growth"
    priceEUR: number;
    durationId: DurationId;
    // New Rich Fields
    deliverables: string[];
    quality: string;
    strategy: string;
}

interface ServiceCategoryData {
    id: CategoryId;
    label: string;
    icon: React.ElementType;
    overview: string;
    customOnly?: boolean;
    cards?: PackageCardData[];
    detailedView: {
        columns: DetailedViewColumn[];
    };
}

// --- Data ---

const categoriesData: Record<CategoryId, ServiceCategoryData> = {
    web: {
        id: 'web',
        label: 'Web Dev',
        icon: Globe,
        overview: 'Robust, secure, and scalable web solutions for modern businesses.',
        customOnly: true,
        detailedView: {
            columns: [
                {
                    title: 'Purpose & Scale',
                    items: [
                        'Portfolio | SMB | Ecommerce | Enterprise',
                        'Page count based on scope',
                        'Database size optimization',
                        'Infrastructure tier selection'
                    ]
                },
                {
                    title: 'Design & Tech',
                    items: [
                        'Template-based | UX/UI | Design System',
                        'MERN | PHP | Shopify | WordPress',
                        'Java | AI-assisted coding',
                        'Responsive & Adaptive Layouts'
                    ]
                },
                {
                    title: 'Functionality',
                    items: [
                        'Authentication & Security Layers',
                        'Payments & Product Management',
                        'AI Agents & Bots Integration',
                        'Custom Dashboards & CMS',
                        'API Integrations & Multi-language'
                    ]
                },
                {
                    title: 'Process & Quality',
                    items: [
                        '3 PRD Revisions',
                        '3 Design Revisions',
                        'QA & Automated Testing',
                        'Deployment Support',
                        'Auditable Code Quality'
                    ]
                }
            ]
        }
    },
    seo: {
        id: 'seo',
        label: 'SEO',
        icon: Search,
        overview: 'Dominate search results with data-driven strategies.',
        cards: [
            {
                id: 'seo-monthly',
                durationId: 'monthly',
                durationLabel: 'Monthly',
                planName: 'Starter',
                priceEUR: 600,
                deliverables: ['Technical Audit', 'Local Keyword Research', 'Google Business Profile', 'Monthly Reporting'],
                quality: 'Optimized',
                strategy: 'Local focus'
            },
            {
                id: 'seo-quarterly',
                durationId: 'quarterly',
                durationLabel: 'Quarterly',
                planName: 'Growth',
                priceEUR: 1300,
                deliverables: ['National Keyword Strategy', 'On-Page Optimization', '4 Blog Posts/Month', 'Backlink Building'],
                quality: 'Advanced',
                strategy: 'National / Regional'
            },
            {
                id: 'seo-annual',
                durationId: 'annually',
                durationLabel: 'Half-Yearly',
                planName: 'Performance',
                priceEUR: 2700,
                deliverables: ['Global SEO Strategy', 'Technical Architecture', '10 Blog Posts/Month', 'High-Authority PR Links'],
                quality: 'Enterprise-grade',
                strategy: 'Global domination'
            }
        ],
        detailedView: {
            columns: [
                {
                    title: 'Scope',
                    items: ['Technical SEO Audit', 'Keyword Research & Strategy', 'On-Page Optimization', 'Off-Page Link Building', 'Local SEO Management']
                },
                {
                    title: 'Frequency',
                    items: ['Continuous Monitoring', 'Monthly Content Deliverables', 'Regular Backlink Acquisition', 'Quarterly Strategy Reviews']
                },
                {
                    title: 'Quality',
                    items: ['White-hat Techniques', 'Data-Driven Decisions', 'Enterprise Tools (Ahrefs, SEMrush)', 'Compliance with Google Core Updates']
                },
                {
                    title: 'Strategy',
                    items: ['Competitor Analysis', 'User Intent Optimization', 'Technical Health First', 'Content-Led Growth']
                }
            ]
        }
    },
    social: {
        id: 'social',
        label: 'Social | Content',
        icon: MessageSquare,
        overview: 'Build a loyal community and drive engagement with strategic content.',
        cards: [
            {
                id: 'social-monthly',
                durationId: 'monthly',
                durationLabel: 'Monthly',
                planName: 'Starter',
                priceEUR: 800,
                deliverables: ['Reels: 5', 'Posts: 10', 'Stories: 20', 'AI Avatars / Videos'],
                quality: 'Cinematic production',
                strategy: 'Engagement focus'
            },
            {
                id: 'social-quarterly',
                durationId: 'quarterly',
                durationLabel: 'Quarterly',
                planName: 'Growth',
                priceEUR: 1700,
                deliverables: ['Reels: 15', 'Posts: 35', 'Stories: 65', 'AI Avatars /On-site Shooting '],
                quality: 'Cinematic + Candid + Product ',
                strategy: 'Community growth'
            },
            {
                id: 'social-half-yearly',
                durationId: 'half-yearly',
                durationLabel: 'Half-Yearly',
                planName: 'Performance',
                priceEUR: 3500,
                deliverables: ['Reels: 35', 'Posts: 65', 'Stories: 135', '360° Branding'],
                quality: 'Broadcast quality',
                strategy: 'Brand authority'
            }
        ],
        detailedView: {
            columns: [
                {
                    title: "Campaign & Content Scope",
                    items: [
                        "Ad Campaigns: 2 / 3 / 5 / 10",
                        "Campaign Strategy & Setup",
                        "Target Audience Research",
                        "Pixel Installation",
                        "Custom Conversion Creation",
                        "Re-marketing",
                        "Detailed Audience Creation",
                        "Custom Audience Creation",
                        "Creation of Automated Rules"
                    ]
                },
                {
                    title: "Creative & Ad Production",
                    items: [
                        "Ad Campaign Setup",
                        "Ad Copy Writing",
                        "Instant Experience Ads Creation",
                        "Carousel and Collection Ads",
                        "Customization of Ad Placements",
                        "A/B Testing of Ad Set, Creative, and Placement",
                        "Catalog Creation (Premium Only)",
                        "Dynamic Ads Creation (Premium Only)"
                    ]
                },
                {
                    title: "Optimization & Monitoring",
                    items: [
                        "Traffic Monitoring",
                        "Ads Comment Monitoring",
                        "ROAS Bidding Strategy (Premium Only)",
                        "Conversion Rate Optimization (Premium Only)",
                        "Overspend Charges: 5% / 6% / 7% / 7%"
                    ]
                },
                {
                    title: "Reporting & Support",
                    items: [
                        "Weekly Campaign Performance Report",
                        "Monthly Campaign Performance Report",
                        "Google Analytics Report",
                        "WhatsApp Chat Support",
                        "E-Mail Support",
                        "Dedicated Facebook Ads Manager (Premium Only)",
                        "24 Hours Consultation Support (Premium Only)"
                    ]
                }
            ]
        }
    },
    ads: {
        id: 'ads',
        label: 'Campaigns | Ads',
        icon: Target,
        overview: 'Scale your revenue with high-ROI campaigns. Pricing exculde platform daily budget',
        cards: [
            {
                id: 'ads-monthly',
                durationId: 'monthly',
                durationLabel: 'Monthly',
                planName: 'Starter',
                priceEUR: 600,
                deliverables: ['1 Platform', 'Campaign Setup', 'Weekly Optimization', 'Monthly Report'],
                quality: 'Optimized',
                strategy: 'Traffic generation'
            },
            {
                id: 'ads-quarterly',
                durationId: 'quarterly',
                durationLabel: 'Quarterly',
                planName: 'Growth',
                priceEUR: 1300,
                deliverables: ['2 Platforms', 'A/B Testing', 'Retargeting Setup', 'Creative Refresh'],
                quality: 'Advanced',
                strategy: 'Conversion focus'
            },
            {
                id: 'ads-annual',
                durationId: 'annually',
                durationLabel: 'half-yearly',
                planName: 'Performance',
                priceEUR: 2700,
                deliverables: ['Omnichannel Strategy', 'Dynamic Creative', 'Funnel Optimization', 'Daily Management'],
                quality: 'AI-driven optimization',
                strategy: 'Maximum ROI'
            }
        ],
        detailedView: {
            columns: [
                {
                    title: 'Platforms & Scope',
                    items: ['Meta, Google, YouTube', 'LinkedIn, Others', 'Audience Research', 'Marketing Funnel Stages', 'Creative Testing']
                },
                {
                    title: 'Frequency / Quantity',
                    items: ['Continuous Bid Optimization', 'Weekly Creative Refreshes', 'Real-time Budget Adjustments', 'Daily Performance Checks']
                },
                {
                    title: 'Quality Level',
                    items: ['High-Intent Targeting', 'Premium Ad Copywriting', 'Conversion-Focused Design', 'Analytics Dashboards']
                },
                {
                    title: 'Strategy & Approach',
                    items: ['Max Reach with Min Budget', 'Iterative Optimization', 'Creative-Data Loops', 'ROI Reporting & Attribution', 'Funnel-Based Scaling']
                }
            ]
        }
    },
    branding: {
        id: 'branding',
        label: 'Branding | Design',
        icon: Zap,
        overview: 'Forge a memorable identity that resonates with your audience.',
        cards: [
            {
                id: 'branding-monthly',
                durationId: 'monthly',
                durationLabel: 'Monthly',
                planName: 'Starter',
                priceEUR: 600,
                deliverables: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines'],
                quality: 'Vector precision',
                strategy: 'Visual foundation'
            },
            {
                id: 'branding-quarterly',
                durationId: 'quarterly',
                durationLabel: 'Quarterly',
                planName: 'Growth',
                priceEUR: 1300,
                deliverables: ['Full Visual Identity', 'Complete Design System', 'Social Media Kit', 'Marketing Collateral'],
                quality: 'Comprehensive system',
                strategy: 'Market differentiation'
            },
            {
                id: 'branding-annual',
                durationId: 'annually',
                durationLabel: 'Half-yearly',
                planName: 'Performance',
                priceEUR: 2700,
                deliverables: ['Comprehensive Brand System', 'Scalable Design System', 'Environmental Design', 'Brand Strategy Workshop'],
                quality: 'World-class aesthetics',
                strategy: 'Brand-to-Scale'
            }
        ],
        detailedView: {
            columns: [
                {
                    title: "Brand Strategy",
                    items: [
                        "Brand Audit & Market Research",
                        "Audience Persona Development",
                        "Competitor Positioning Analysis",
                        "Brand Archetype & Personality",
                        "Value Proposition Framework",
                        "Messaging Hierarchy",
                        "Tone of Voice Definition",
                        "Brand Storytelling",
                        "Go-To-Market Strategy",
                        "Rebranding Consultation"
                    ]
                },
                {
                    title: "Visual Identity",
                    items: [
                        "Logo Design / Refresh",
                        "Typography System",
                        "Color Psychology Framework",
                        "Iconography Set",
                        "Illustration Style",
                        "Photography Direction",
                        "Brand Pattern System",
                        "Packaging Concepts",
                        "Merchandise Design",
                        "Environmental Branding"
                    ]
                },
                {
                    title: "Design Assets",
                    items: [
                        "Social Media Templates",
                        "Marketing Collateral",
                        "Pitch Deck Design",
                        "Sales Presentations",
                        "Email Templates",
                        "Ad Creative System",
                        "Website UI Kit",
                        "Landing Page Design",
                        "Print Materials",
                        "Campaign Creative Toolkit"
                    ]
                },
                {
                    title: "Process & Governance",
                    items: [
                        "Brand Guidelines Book",
                        "Logo Usage Rules",
                        "Color & Typography Rules",
                        "Asset Libraries",
                        "Design Systems",
                        "Figma Libraries",
                        "Revision Rounds",
                        "Quality Assurance",
                        "Scalable Brand Architecture",
                        "Future Expansion Framework"
                    ]
                }
            ]
        }
    }
};

const comparisonData: Record<string, AccordionSection[]> = {
    seo: [
        {
            title: 'Initial Website Analysis',
            rows: [
                { feature: 'Preliminary SEO Audit', starter: true, growth: true, performance: true, custom: true },
                { feature: 'SEO Strategy and Plan', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Keywords Analysis Report', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Competitor Analysis Report', starter: false, growth: true, performance: true, custom: true },
                { feature: 'Canonical Error Check & Fixing', starter: true, growth: true, performance: true, custom: true },
                { feature: 'XML sitemap Creation', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google Analytics Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google Webmaster Tool Setup', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'On Site Factors Analysis',
            rows: [
                { feature: 'Website Load Time Checking', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Checking the Page Size', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Broken Links Check', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Duplicate Content Checking', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Onsite blog optimization', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'On Page Optimization',
            rows: [
                { feature: 'Meta Tags Optimization (up to Target Page)', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Robots.txt Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Internal Linking Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Image Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Heading Tag Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Existing Content Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Website Structure Checking', starter: true, growth: true, performance: true, custom: true },
                { feature: 'URL Mapping and Rewriting', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Off-Page Optimization',
            rows: [
                { feature: 'Article Submission', starter: '10', growth: '20', performance: '35', custom: '100' },
                { feature: 'Web 2.0 Submission', starter: '10', growth: '20', performance: '35', custom: '120' },
                { feature: 'Social Bookmarking', starter: '10', growth: '15', performance: '30', custom: '50' },
                { feature: 'Blog Comments', starter: '10', growth: '25', performance: '35', custom: '150' },
                { feature: 'Business listing', starter: '15', growth: '25', performance: '35', custom: '100' },
                { feature: 'Video submission', starter: '5', growth: '10', performance: '15', custom: '50' },
                { feature: 'Classified Submission', starter: '10', growth: '20', performance: '25', custom: '80' },
                { feature: 'Document Sharing', starter: '5', growth: '10', performance: '15', custom: '50' },
                { feature: 'Image Sharing', starter: '10', growth: '15', performance: '20', custom: '50' },
                { feature: 'Competitor Backlinks', starter: '5', growth: '15', performance: '25', custom: '100' },
                { feature: 'Social Profile Submission', starter: '10', growth: '25', performance: '40', custom: '150' },
            ]
        },
        {
            title: 'Website Optimization for Local Search',
            rows: [
                { feature: 'Local Search Engine Submission', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google My Business Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Local Citation Building', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Project Reporting',
            rows: [
                { feature: 'Weekly Activity Report', starter: false, growth: true, performance: true, custom: true },
                { feature: 'Weekly SEO Ranking Reports', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Report of On-Page SEO', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google Analytical Report', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google search Console report', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Customer Support',
            rows: [
                { feature: 'WhatsApp Chat Support', starter: true, growth: true, performance: true, custom: true },
                { feature: 'E-Mail Support', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Dedicated SEO Manager', starter: false, growth: false, performance: true, custom: true },
                { feature: '24 Hours Consultation Support', starter: false, growth: false, performance: true, custom: true },
            ]
        }
    ],
    social: [
        {
            title: 'Campaign & Content Scope',
            rows: [
                { feature: 'Ad Campaigns', starter: '2', growth: '3', performance: '5', custom: '10' },
                { feature: 'Campaign Strategy & Setup', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Target Audience Research', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Pixel Installation', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Custom Conversion Creation', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Re-marketing', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Detailed Audience Creation', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Custom Audience Creation', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Creation of Automated Rules', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Creative & Ad Production',
            rows: [
                { feature: 'Ad Campaign Setup', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Ad Copy Writing', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Instant Experience Ads Creation', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Carousel and Collection Ads', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Customization of Ad Placements', starter: true, growth: true, performance: true, custom: true },
                { feature: 'A/B Testing of Ad Set, Creative, and Placement', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Catalog Creation', starter: false, growth: false, performance: true, custom: true },
                { feature: 'Dynamic Ads Creation', starter: false, growth: false, performance: true, custom: true },
            ]
        },
        {
            title: 'Optimization & Monitoring',
            rows: [
                { feature: 'Traffic Monitoring', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Ads Comment Monitoring', starter: true, growth: true, performance: true, custom: true },
                { feature: 'ROAS Bidding Strategy', starter: false, growth: false, performance: true, custom: true },
                { feature: 'Conversion Rate Optimization', starter: false, growth: false, performance: true, custom: true },
                { feature: 'Overspend Charges', starter: '5%', growth: '6%', performance: '7%', custom: '7%' },
            ]
        },
        {
            title: 'Reporting & Support',
            rows: [
                { feature: 'Weekly Campaign Performance Report', starter: false, growth: false, performance: true, custom: true },
                { feature: 'Monthly Campaign Performance Report', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google Analytics Report', starter: true, growth: true, performance: true, custom: true },
                { feature: 'WhatsApp Chat Support', starter: true, growth: true, performance: true, custom: true },
                { feature: 'E-Mail Support', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Dedicated Facebook Ads Manager', starter: false, growth: false, performance: true, custom: true },
                { feature: '24 Hours Consultation Support', starter: false, growth: false, performance: true, custom: true },
            ]
        }
    ],
    ads: [
        {
            title: 'Work / Campaign Structure',
            rows: [
                { feature: 'Campaigns', starter: '1', growth: '3', performance: '5', custom: '10' },
                { feature: 'Keywords', starter: '10', growth: '25', performance: '50', custom: '100+' },
                { feature: 'Campaign Type', starter: 'Search', growth: 'Search + Display', performance: 'Search + Display + Video', custom: 'All' },
                { feature: 'Ad Groups per Campaign', starter: '3', growth: '5', performance: '5', custom: '10' },
                { feature: 'Ad Copies per Group', starter: '3', growth: '3', performance: '5', custom: '5' },
            ]
        },
        {
            title: 'Initial Review & Setup',
            rows: [
                { feature: 'Website Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Landing Page Recommendations', starter: false, growth: 'One-time', performance: 'One-time', custom: 'Monthly' },
                { feature: 'Conversion Tracking Setup', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google Tag Manager Setup', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Analytics Setup', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Merchant Center Setup', starter: false, growth: true, performance: true, custom: true },
                { feature: 'Product Feed Setup', starter: false, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Ads Planning',
            rows: [
                { feature: 'Industry Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Competitive Research', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Landing Page Conversion Audit', starter: false, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Type of Ads',
            rows: [
                { feature: 'Target Network Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Budget Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Bidding Analysis', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Campaign Setup',
            rows: [
                { feature: 'Keyword Research', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Ad Copy Writing', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Campaign Deployment', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Campaign Management & Optimization',
            rows: [
                { feature: 'Campaign Monitoring', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Keyword Refinements', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Bid Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Search Term Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Negative Keyword Research', starter: true, growth: true, performance: true, custom: true },
                { feature: 'A/B Testing', starter: false, growth: true, performance: true, custom: true },
                { feature: 'Device & Location Optimization', starter: true, growth: true, performance: true, custom: true },
                { feature: 'ROI Tracking', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Performance Reporting',
            rows: [
                { feature: 'Weekly Campaign Performance Report', starter: false, growth: false, performance: true, custom: true },
                { feature: 'Monthly Campaign Performance Report', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Google Analytics Report', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Customer Support',
            rows: [
                { feature: 'WhatsApp Chat Support', starter: true, growth: true, performance: true, custom: true },
                { feature: 'E-Mail Support', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Dedicated Google Ads Manager', starter: false, growth: false, performance: true, custom: true },
            ]
        }
    ],
    branding: [
        {
            title: 'Brand Strategy',
            rows: [
                { feature: 'Brand Audit & Market Research', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Audience Persona Development', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Competitor Positioning Analysis', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Brand Archetype & Personality', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Value Proposition Framework', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Messaging Hierarchy', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Tone of Voice Definition', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Brand Storytelling', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Go-To-Market Strategy', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Rebranding Consultation', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Visual Identity',
            rows: [
                { feature: 'Logo Design / Refresh', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Typography System', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Color Psychology Framework', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Iconography Set', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Illustration Style', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Photography Direction', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Brand Pattern System', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Packaging Concepts', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Merchandise Design', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Environmental Branding', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Design Assets',
            rows: [
                { feature: 'Social Media Templates', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Marketing Collateral', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Pitch Deck Design', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Sales Presentations', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Email Templates', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Ad Creative System', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Website UI Kit', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Landing Page Design', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Print Materials', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Campaign Creative Toolkit', starter: true, growth: true, performance: true, custom: true },
            ]
        },
        {
            title: 'Process & Governance',
            rows: [
                { feature: 'Brand Guidelines Book', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Logo Usage Rules', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Color & Typography Rules', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Asset Libraries', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Design Systems', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Figma Libraries', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Revision Rounds', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Quality Assurance', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Scalable Brand Architecture', starter: true, growth: true, performance: true, custom: true },
                { feature: 'Future Expansion Framework', starter: true, growth: true, performance: true, custom: true },
            ]
        }
    ]
};

// --- Components ---

const DetailModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    category: ServiceCategoryData;
    onContact: (subject: string) => void;
}> = ({ isOpen, onClose, category, onContact }) => {
    const { t } = useTranslation();
    if (!isOpen) return null;

    const sections = comparisonData[category.id];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-[#1F4037] dark:hover:text-white transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="h-0.5 w-8 bg-secondary"></span>
                        <span className="text-sm font-bold uppercase tracking-wider text-secondary">{t("pricing.common.view_details", "Detailed View")}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-[#1F4037] dark:text-white mb-2">{t(`pricing.categories.${category.id}`, category.label)} Details</h2>
                    <p className="text-gray-600  dark:text-gray-300 mb-8">{category.overview}</p>

                    {sections ? (
                        <AccordionTable
                            sections={sections}
                            onContact={(plan) => { onClose(); onContact(`${plan} for ${category.label}`); }}
                        />
                    ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-gray-500 mb-4">Detailed comparison not available for this category.</p>
                            <Button onClick={() => { onClose(); onContact(`${category.label} Inquiry`); }} variant="primary">
                                {t("pricing.common.contact_us", "Contact for Custom Pricing")}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Pricing: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [currency, setCurrency] = useState<Currency>('EUR');
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>('seo'); // Default changed to SEO (first in list)

    const currencyRates = {
        EUR: 1,
        USD: 1.08,
        INR: 90
    };

    const formatPrice = (eur: number) => {
        const converted = eur * currencyRates[currency];

        const symbol =
            currency === 'EUR'
                ? '€'
                : currency === 'USD'
                    ? '$'
                    : '₹';

        return `${symbol}${Math.round(converted).toLocaleString()}+`;
    };

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Lead Modal State
    const [leadModalOpen, setLeadModalOpen] = useState(false);
    const [leadPayload, setLeadPayload] = useState<any>(null);

    // Custom Plan Builder State
    const [builderServices, setBuilderServices] = useState<string[]>([]);

    // Base Package
    const [basePackage, setBasePackage] = useState<string>('');

    // Service Configs
    const [webConfig, setWebConfig] = useState({
        purpose: 'SMB',
        design: 'UX/UI',
        features: [] as string[],
        integrations: [] as string[],
        techStack: [] as string[],
        scale: { pages: 10, traffic: 'Medium', database: 'Standard' },
        process: { prdRevisions: '3', designRevisions: '3' }
    });

    const [seoConfig, setSeoConfig] = useState({
        goals: [] as string[],
        pages: 20,
        keywords: 'Local',
        toggles: [] as string[]
    });

    const [adsConfig, setAdsConfig] = useState({
        platforms: [] as string[],
        funnel: 'Consideration',
        toggles: [] as string[]
    });

    const [socialConfig, setSocialConfig] = useState({
        contentTypes: [] as string[],
        production: [] as string[],
        photography: [] as string[],
        videography: [] as string[],
        aiOptions: [] as string[]
    });

    const [brandingConfig, setBrandingConfig] = useState({
        toggles: [] as string[]
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleFaq = (idx: number) => {
        setOpenFaq(openFaq === idx ? null : idx);
    };

    const handleContact = (subject: string) => {
        setLeadPayload({
            type: "pricing-inquiry",
            source: "pricing_page",
            notes: subject,
            currency,
            page: "pricing"
        });
        setLeadModalOpen(true);
    };

    const handleBookPackage = (card: PackageCardData) => {
        setLeadPayload({
            type: "pricing-prebuilt",
            source: "pricing_page",
            selectedCategory,
            selectedPlan: card.planName,
            duration: card.durationLabel,
            currency,
            priceShown: formatPrice(card.priceEUR),
            page: "pricing"
        });
        setLeadModalOpen(true);
    };

    // Service Prices (Base)
    const SERVICE_PRICES: Record<string, number> = {
        'Web Dev': 1500,
        'SEO': 600,
        'Social & Content': 800,
        'Campaigns & Ads': 600,
        'Branding & Design': 600
    };

    const handleBuilderSubmit = () => {
        const servicesList = builderServices.map(serviceName => ({
            id: serviceName.toLowerCase().replace(/\s+/g, '-'),
            name: serviceName,
            price: SERVICE_PRICES[serviceName] || 0
        }));

        const payload = {
            type: "pricing-custom",
            source: "pricing_page",
            basePackage,
            billingCycle: basePackage || 'Monthly Plan',
            selectedServices: servicesList,
            selectedAddons: [], // Future extensibility
            serviceConfigs: {
                web: builderServices.includes('Web Dev') ? webConfig : null,
                seo: builderServices.includes('SEO') ? seoConfig : null,
                ads: builderServices.includes('Campaigns & Ads') ? adsConfig : null,
                social: builderServices.includes('Social & Content') ? socialConfig : null,
                branding: builderServices.includes('Branding & Design') ? brandingConfig : null,
            },
            addons: [], // Deprecated, keeping for safety until backend fully switched
            currency,
            page: "pricing"
        };

        setLeadPayload(payload);
        setLeadModalOpen(true);
    };

    const handleViewDetails = () => {
        if (isMobile) {
            setIsModalOpen(true);
        } else {
            document.getElementById('detailed-view')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleBuilderService = (service: string) => {
        setBuilderServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    const applyPackagePreset = (preset: string) => {
        setBasePackage(preset);
    };

    const updateConfig = (service: string, key: string, value: any) => {
        switch (service) {
            case 'web': setWebConfig(prev => ({ ...prev, [key]: value })); break;
            case 'seo': setSeoConfig(prev => ({ ...prev, [key]: value })); break;
            case 'ads': setAdsConfig(prev => ({ ...prev, [key]: value })); break;
            case 'social': setSocialConfig(prev => ({ ...prev, [key]: value })); break;
            case 'branding': setBrandingConfig(prev => ({ ...prev, [key]: value })); break;
        }
    };

    const toggleArrayItem = (service: string, key: string, item: string) => {
        const getConfig = () => {
            switch (service) {
                case 'web': return webConfig;
                case 'seo': return seoConfig;
                case 'ads': return adsConfig;
                case 'social': return socialConfig;
                case 'branding': return brandingConfig;
                default: return {};
            }
        };

        const config = getConfig() as any;
        const currentArray = config[key] as string[] || [];
        const newArray = currentArray.includes(item)
            ? currentArray.filter(i => i !== item)
            : [...currentArray, item];

        updateConfig(service, key, newArray);
    };

    const currentCategory = categoriesData[selectedCategory];

    // Include Web Dev
    const selectorCategories = Object.values(categoriesData);

    const handleCategoryClick = (catId: CategoryId) => {
        if (catId === 'web') {
            document.getElementById('custom-builder')?.scrollIntoView({ behavior: 'smooth' });
            if (!builderServices.includes('Web Dev')) {
                setBuilderServices(prev => [...prev, 'Web Dev']);
            }
        } else {
            setSelectedCategory(catId);
        }
    };

    return (
        <>
            <Seo
                title={t("pricing.title", "Pricing Packages") + " | GK WebTech"}
                description={t("pricing.description", "Compare transparent digital marketing pricing from GK WebTech across growth stages.")}
                keywords="digital marketing pricing, seo packages, social media marketing cost, agency fees"
            />

            <DetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                category={currentCategory}
                onContact={handleContact}
            />

            <PricingLeadModal
                open={leadModalOpen}
                onClose={() => setLeadModalOpen(false)}
                payload={leadPayload}
                language={i18n.language}
                currency={currency}
            />

            <div className="pt-28 pb-20 bg-bg-light dark:bg-gray-950 min-h-screen">

                {/* 1) Hero Section */}
                <section className="container mx-auto px-4 md:px-6 mb-12 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1F4037] dark:text-white mb-6 leading-tight">
                            {t("pricing.title", "Flexible Packages for")} <span className="text-secondary">{t("pricing.subtitle", "Every Stage")}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                            {t("pricing.description", "Choose the category that fits your goals. Flexible plans, no hidden fees.")}
                        </p>
                    </div>
                </section>

                {/* 2) Service Category Selector */}
                <section className="container mx-auto px-4 md:px-6 mb-12 sticky top-20 z-40 bg-bg-light/95 dark:bg-gray-950/95 backdrop-blur-sm py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex justify-center">
                        <div className="flex flex-wrap justify-center gap-2 px-2">
                            {selectorCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${selectedCategory === cat.id && cat.id !== 'web'
                                            ? 'bg-[#1F4037] text-white border-[#1F4037] shadow-md transform scale-105'
                                            : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-secondary hover:text-[#1F4037] dark:hover:text-white'
                                        }`}
                                >
                                    {t(`pricing.categories.${cat.id}`, cat.label)}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3) Package Cards (Richer) */}
                <section className="container mx-auto px-4 md:px-6 mb-20">
                    <SectionHeader label={t(`pricing.categories.${selectedCategory}`, currentCategory.label)} title={t("pricing.header.title", "Choose Your")} subtitle={t("pricing.header.subtitle", "Plan")} center />

                    <div className="flex justify-end mb-8">
                        <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full inline-flex relative shadow-inner">
                            {(['EUR', 'USD', 'INR'] as Currency[]).map((cur) => (
                                <button
                                    key={cur}
                                    onClick={() => setCurrency(cur)}
                                    className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === cur
                                            ? 'bg-secondary dark:bg-gray-700 text-[#1F4037] dark:text-white shadow-md transform scale-105'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {cur}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Standard Cards */}
                        {!currentCategory.customOnly && currentCategory.cards?.map((card) => (
                            <TiltCard key={card.id} className="flex flex-col h-full bg-[#1F4037] text-white border border-gray-700 rounded-3xl p-6 relative overflow-hidden group shadow-lg">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity"></div>

                                <div className="mb-6 relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold">{card.planName}</h3>
                                        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-secondary font-bold uppercase tracking-wider">
                                            {t(`pricing.durations.${card.durationId}`, card.durationLabel)}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-1">
                                        {formatPrice(card.priceEUR)}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">{t("pricing.common.indicative", "Indicative range · Final pricing after scoping")}</div>
                                </div>

                                <div className="mb-8 flex-grow relative z-10 border-t border-white/10 pt-4 space-y-4">
                                    {/* Deliverables */}
                                    <div>
                                        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Deliverables</h4>
                                        <ul className="space-y-1.5">
                                            {card.deliverables.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                                    <Check size={12} className="text-secondary shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Quality */}
                                    <div>
                                        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Quality</h4>
                                        <p className="text-xs text-gray-300">{card.quality}</p>
                                    </div>

                                    {/* Strategy */}
                                    <div>
                                        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Strategy</h4>
                                        <p className="text-xs text-gray-300">{card.strategy}</p>
                                    </div>
                                </div>

                                <div className="mt-auto space-y-3 relative z-10">
                                    <Button
                                        onClick={() => handleBookPackage(card)}
                                        variant="secondary"
                                        className="w-full justify-center text-sm py-2"
                                    >
                                        {t("pricing.common.get_started", "Book This Package")}
                                    </Button>
                                    <button
                                        onClick={handleViewDetails}
                                        className="w-full py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors text-center border border-white/10 rounded-full hover:border-white/30"
                                    >
                                        {t("pricing.common.view_details", "View Details")}
                                    </button>
                                </div>
                            </TiltCard>
                        ))}

                        {/* Always show Custom Plan Card as the last option */}
                        <TiltCard className="flex flex-col h-full bg-white dark:bg-gray-900 border border-secondary/30 rounded-3xl p-8 relative overflow-hidden shadow-lg group">
                            <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors"></div>
                            <div className="relative z-10 flex flex-col h-full items-center justify-center text-center">
                                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-[#1F4037] dark:text-white">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1F4037] dark:text-white mb-4">Custom Plan</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-sm">
                                    Need something different? Let’s design a strategy specifically for your unique business model.
                                </p>
                                <Button onClick={() => handleContact('Custom Plan Quote')} variant="primary" className="w-full justify-center pr-6">
                                    {t("pricing.common.custom_quote", "Contact for Custom Quote")}
                                </Button>
                            </div>
                        </TiltCard>
                    </div>
                </section>

                {/* 4) Detailed View Section (Desktop) */}
                <section id="detailed-view" className="container mx-auto px-4 md:px-6 mb-24 hidden lg:block">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 border border-gray-200 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-1 w-12 bg-secondary"></span>
                            <span className="text-sm font-bold uppercase tracking-wider text-secondary">Compare Packages</span>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-[#1F4037] dark:text-white mb-4">
                                {t(`pricing.categories.${selectedCategory}`, currentCategory.label)} Details
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                                {currentCategory.overview}
                            </p>
                        </div>

                        {comparisonData[currentCategory.id] ? (
                            <AccordionTable
                                sections={comparisonData[currentCategory.id]}
                                onContact={(plan) => handleContact(`${plan} for ${currentCategory.label}`)}
                            />
                        ) : (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <p className="text-gray-500 mb-4">Detailed comparison not available for this category.</p>
                                <Button onClick={() => handleContact(`${currentCategory.label} Inquiry`)} variant="primary">
                                    {t("pricing.common.contact_us", "Contact for Custom Pricing")}
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* 5) Custom Plan Configurator */}
                <section id="custom-builder" className="container mx-auto px-4 md:px-6 mb-24 scroll-mt-24">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800 shadow-xl">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-[#1F4037] dark:text-white mb-4">Build Your Custom Growth Plan</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Configure your hybrid strategy below. Select multiple services to build a comprehensive roadmap.
                            </p>
                        </div>

                        <div className="space-y-10 max-w-5xl mx-auto">

                            {/* A) Base Package Preset */}
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-[#1F4037] dark:text-white">Start from an existing package?</h3>
                                    <p className="text-sm text-gray-500">Pre-fill options based on our popular plans.</p>
                                </div>
                                <select
                                    value={basePackage}
                                    onChange={(e) => applyPackagePreset(e.target.value)}
                                    className="w-full md:w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-secondary/50 focus:outline-none"
                                >
                                    <option value="">Select a base...</option>
                                    <option value="Monthly Plan">Monthly Plan</option>
                                    <option value="Quarterly Plan">Quarterly Plan</option>
                                    <option value="Half-Yearly Plan">Half-Yearly Plan</option>
                                </select>
                            </div>

                            {/* B) Service Selection */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#1F4037] dark:text-white border-l-4 border-secondary pl-3 uppercase tracking-wider">
                                    1. Select Services
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {['Web Dev', 'SEO', 'Campaigns & Ads', 'Social & Content', 'Branding & Design'].map((service) => (
                                        <label
                                            key={service}
                                            className={`flex items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all text-center font-medium text-sm ${builderServices.includes(service)
                                                    ? 'border-secondary bg-secondary/10 text-[#1F4037] dark:text-white shadow-sm'
                                                    : 'border-gray-200 dark:border-gray-700 hover:border-secondary/50 text-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={builderServices.includes(service)}
                                                onChange={() => toggleBuilderService(service)}
                                            />
                                            {service}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Final CTA */}
                            <div className="flex flex-col items-center justify-center pt-6 border-t border-gray-200 dark:border-gray-800">
                                <Button
                                    onClick={handleBuilderSubmit}
                                    variant="primary"
                                    className="w-full md:w-auto px-12 py-4 pr-6 text-lg"
                                >
                                    {t("pricing.common.custom_quote", "Request Custom Proposal")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6) Why GK WebTech (Redesigned) */}
                <section className="container mx-auto px-4 md:px-6 mb-24">
                    {/* Summary of logic, keeping original loop but potentially localizing title if needed */}
                    <div className="bg-[#1F4037] rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="relative z-10 max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                                    Why <span className="text-secondary">GK WebTech ?</span>
                                </h2>
                            </div>
                            {/* ... (rest of Why section logic) */}
                        </div>
                    </div>
                </section>

                {/* 7) FAQ */}
                <section className="container mx-auto px-4 md:px-6">
                    <SectionHeader label="FAQ" title={t("faq.title", "Frequently Asked Questions")} subtitle="" center />
                    {/* FAQ Loop here */}
                </section>
            </div>
        </>
    );
};
