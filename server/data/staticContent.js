const programs = [
  {
    _id: 'program-full-stack',
    name: 'Full Stack Web Development',
    description: 'Master MERN, DevOps fundamentals, and agile delivery while building launch-ready products.',
    duration: '9 Months - Hybrid',
    price: 'Contact Us',
    image: '/uploads/programs/full-stack.svg',
    thumbnail: '/uploads/programs/full-stack.svg',
    longDescription:
      'Learn front-end, back-end, databases, and deployment. Build production-grade apps with modern tooling, code reviews, and CI/CD best practices.',
    highlights: ['MERN stack with TypeScript', 'API design & testing', 'DevOps basics with CI/CD', 'Capstone product build'],
    videoUrl: 'https://www.youtube.com/embed/Z1Yd7upQsXY'
  },
  {
    _id: 'program-data-science',
    name: 'Applied Data Science',
    description: 'Hands-on with Python, SQL, machine learning, and dashboards for real business insights.',
    duration: '6 Months - Online Live',
    price: '$2,499',
    image: '/uploads/programs/data-science.svg',
    thumbnail: '/uploads/programs/data-science.svg',
    longDescription:
      'Analyze, model, and visualize data with Python, SQL, and ML. Ship dashboards and models that drive business outcomes.',
    highlights: ['Python & Pandas', 'SQL for analytics', 'ML workflows & MLOps-lite', 'Dashboarding & storytelling'],
    videoUrl: 'https://www.youtube.com/embed/aircAruvnKk'
  },
  {
    _id: 'program-digital-marketing',
    name: 'Digital Marketing Leadership',
    description: 'Growth marketing, automation, analytics, and brand storytelling guided by agency mentors.',
    duration: '4 Months - Weekend',
    price: '$1,799',
    image: '/uploads/programs/digital-marketing.svg',
    thumbnail: '/uploads/programs/digital-marketing.svg',
    longDescription:
      'Plan and run campaigns, build funnels, automate journeys, and read the numbers that matter. Learn growth playbooks from agency practitioners.',
    highlights: ['Performance marketing', 'Automation & CRM journeys', 'Analytics & attribution', 'Brand storytelling'],
    videoUrl: 'https://www.youtube.com/embed/nlJ8MFza2OM'
  },
  {
    _id: 'program-ui-ux',
    name: 'UI/UX Design Career Sprint',
    description: 'Design thinking, research, product strategy, and Figma prototyping for portfolio-ready work.',
    duration: '5 Months - Hybrid',
    price: '$2,099',
    image: '/uploads/programs/ui-ux.svg',
    thumbnail: '/uploads/programs/ui-ux.svg',
    longDescription:
      'Go from brief to handoff with research, UX strategy, UI systems, and prototyping. Build a portfolio with mentor feedback each sprint.',
    highlights: ['Research & usability', 'Design systems in Figma', 'Prototyping & testing', 'Portfolio storytelling'],
    videoUrl: 'https://www.youtube.com/embed/_Kk8H6jIjGk'
  },
  {
    _id: 'program-product-management',
    name: 'Product Management Pro',
    description: 'Roadmapping, discovery, analytics, and stakeholder leadership with real-world case playbooks.',
    duration: '4 Months - Hybrid',
    price: '$2,299',
    image: '/uploads/programs/1763229019360-ref.jpg',
    thumbnail: '/uploads/programs/1763229019360-ref.jpg',
    longDescription:
      'Learn to discover problems, prioritize bets, and ship outcomes. Practice writing PRDs, defining metrics, and aligning teams.',
    highlights: ['Discovery & user interviews', 'Roadmaps & prioritization', 'PRDs & delivery', 'Metrics & experimentation'],
    videoUrl: 'https://www.youtube.com/embed/QA4Sx7iLjSQ'
  },
  {
    _id: 'program-cybersecurity',
    name: 'Cybersecurity & Cloud Defense',
    description: 'Security fundamentals, cloud hardening, SOC workflows, and incident response simulations.',
    duration: '5 Months - Weekend',
    price: '$2,399',
    image: '/uploads/programs/1763226058542-whatsapp-image-2025-11-15-at-11.08.05-am.jpeg',
    thumbnail: '/uploads/programs/1763226058542-whatsapp-image-2025-11-15-at-11.08.05-am.jpeg',
    longDescription:
      'Secure networks and cloud workloads. Practice blue-team operations, monitoring, and incident response drills with mentors.',
    highlights: ['Security fundamentals', 'Cloud hardening', 'SOC & SIEM basics', 'Incident response runbooks'],
    videoUrl: 'https://www.youtube.com/embed/2L3DzuVzP2E'
  },
  {
    _id: 'program-ai-ml',
    name: 'AI & Machine Learning Foundations',
    description: 'Python, ML pipelines, GenAI prompts, and deployment on modern AI stacks.',
    duration: '6 Months - Online Live',
    price: '$2,799',
    image: '/uploads/programs/1763233099356-whatsapp-image-2025-11-14-at-3.21.08-pm.jpeg',
    thumbnail: '/uploads/programs/1763233099356-whatsapp-image-2025-11-14-at-3.21.08-pm.jpeg',
    longDescription:
      'Build ML models, work with embeddings and LLMs, and deploy lightweight services. Learn data prep, evaluation, and responsible AI basics.',
    highlights: ['ML foundations', 'Vector stores & LLMs', 'Model evaluation', 'Deploy & monitor'],
    videoUrl: 'https://www.youtube.com/embed/4Bdc55j80l8'
  },
  {
    _id: 'program-communication',
    name: 'Advanced Communication & Public Speaking',
    description: 'Executive presence, storytelling, and structured communication for interviews and leadership.',
    duration: '2 Months - Evening',
    price: '$899',
    image: '/uploads/programs/1763809902817-images.jfif',
    thumbnail: '/uploads/programs/1763809902817-images.jfif',
    longDescription:
      'Craft clear narratives, present with confidence, and handle Q&A under pressure. Practice live with peers and coaches.',
    highlights: ['Story structures', 'Executive presence', 'Interview narratives', 'Live practice labs'],
    videoUrl: 'https://www.youtube.com/embed/pGkcm02LzIg'
  }
];

const highlights = [
  {
    _id: 'highlight-career-labs',
    title: 'Career Labs',
    description: '1:1 coaching, mock interviews, and onsite hiring days with unicorn startups.',
    icon: 'CL'
  },
  {
    _id: 'highlight-innovation-pods',
    title: 'Innovation Pods',
    description: 'Cross-disciplinary teams prototype solutions with cutting-edge tech stacks.',
    icon: 'IP'
  },
  {
    _id: 'highlight-global-faculty',
    title: 'Global Faculty',
    description: 'Lead mentors from MIT, IITs, and FAANG companies join live masterclasses weekly.',
    icon: 'GF'
  },
  {
    _id: 'highlight-scholarship-fund',
    title: 'Scholarship Fund',
    description: 'Need and merit-based grants worth $1.2M distributed annually to learners.',
    icon: 'SF'
  }
];

const testimonials = [
  {
    _id: 'testimonial-priya-sharma',
    name: 'Priya Sharma',
    role: 'Product Analyst at Amazon',
    quote:
      'The mentorship at EduElevate is second to none. We built three products, pitched to real clients, and I landed an offer before graduation.'
  },
  {
    _id: 'testimonial-miguel-santos',
    name: 'Miguel Santos',
    role: 'Growth Marketer at StartUpX',
    quote:
      'Hands-on marketing labs and data storytelling modules made me confident to lead campaigns across regions from day one.'
  },
  {
    _id: 'testimonial-alisha-khan',
    name: 'Alisha Khan',
    role: 'UI/UX Designer at Figma Community',
    quote:
      'Design reviews from mentors working at top studios helped me craft a portfolio that truly stands out. The community is electric!'
  }
];

const blogs = [
  {
    _id: 'blog-project-based-learning',
    title: 'How Project-Based Learning Transforms Careers',
    excerpt: 'Learn how our immersive approach gives learners job-ready experience before graduation.',
    content:
      'At our institute, every course module culminates in a capstone project designed with industry partners. Learners tackle real briefs and present solutions to professionals, building both confidence and an impressive portfolio. Project-based learning also encourages collaboration, communication, and problem-solving skills - traits hiring managers prioritize. Join us to experience hands-on learning at its best.',
    author: 'Academic Team',
    publishedAt: '2024-02-12T10:00:00.000Z'
  },
  {
    _id: 'blog-top-5-skills',
    title: 'Top 5 Skills Employers Expect in 2025',
    excerpt: 'Future-proof your career with these in-demand technical and soft skills cultivated in our classrooms.',
    content:
      'Employers continue to value adaptable professionals who can lead cross-functional initiatives. Our curriculum emphasizes analytical thinking, cloud-native development, ethical AI use, persuasive storytelling, and continuous learning habits. From hackathons to peer reviews, you will constantly refine these skills - traits hiring managers prioritize.',
    author: 'Career Services',
    publishedAt: '2024-03-05T10:00:00.000Z'
  },
  {
    _id: 'blog-funding-education',
    title: 'Funding Your Education: Scholarships & Payment Plans',
    excerpt: 'Quality education should be accessible. Discover the flexible payment options that keep your goals within reach.',
    content:
      'We offer merit-based scholarships, need-sensitive aid, and deferred payment plans to support diverse learners. Our advisors collaborate with each student to craft an affordable roadmap so finances never block ambition. Schedule a consultation to explore personalized options and get started on your transformation.',
    author: 'Admissions',
    publishedAt: '2024-03-28T10:00:00.000Z'
  }
];

const homeContent = {
  _id: 'home-default',
  headline: 'Ranked No.1 IELTS Coaching Institute in Panchkula',
  subheadline:
    'Kriti IELTS Academy is the best IELTS coaching institute in Panchkula that gives best coaching in IELTS, PTE & Spoken English.',
  primaryCtaLabel: 'Call Now',
  secondaryCtaLabel: 'View Services',
  heroImage: '/uploads/home/1763832224210-ref.jpg',
  heroImages: [
    '/uploads/home/1763829814508-ref.jpg',
    '/uploads/home/1763832224210-ref.jpg',
    '/uploads/programs/1763229019360-ref.jpg',
    '/uploads/programs/1763226058542-whatsapp-image-2025-11-15-at-11.08.05-am.jpeg'
  ]
};

const homeVideo = {
  _id: 'home-video-default',
  label: 'Watch our campus overview',
  title: 'Why learners choose EduElevate',
  description:
    'Discover how our vibrant campus, remote lab access, and supportive mentors help thousands of learners accelerate their careers. Take a quick tour of our community spaces, innovation labs, and student success center.',
  videoUrl: 'https://www.youtube.com/embed/Z1Yd7upQsXY'
};

module.exports = {
  programs,
  highlights,
  testimonials,
  blogs,
  homeContent,
  homeVideo
};
