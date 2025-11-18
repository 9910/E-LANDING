const express = require('express');
const BlogPost = require('../models/BlogPost');

const router = express.Router();

router.get('/seed', async (_req, res) => {
  try {
    const count = await BlogPost.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Blog collection already seeded.' });
    }

    const samplePosts = [
      {
        title: 'How Project-Based Learning Transforms Careers',
        excerpt: 'Learn how our immersive approach gives learners job-ready experience before graduation.',
        content:
          'At our institute, every course module culminates in a capstone project designed with industry partners. Learners tackle real briefs and present solutions to professionals, building both confidence and an impressive portfolio. Project-based learning also encourages collaboration, communication, and problem-solving skills - traits hiring managers prioritize. Join us to experience hands-on learning at its best.',
        author: 'Academic Team'
      },
      {
        title: 'Top 5 Skills Employers Expect in 2025',
        excerpt: 'Future-proof your career with these in-demand technical and soft skills cultivated in our classrooms.',
        content:
          'Employers continue to value adaptable professionals who can lead cross-functional initiatives. Our curriculum emphasizes analytical thinking, cloud-native development, ethical AI use, persuasive storytelling, and continuous learning habits. From hackathons to peer reviews, you will constantly refine these skills - traits hiring managers prioritize.',
        author: 'Career Services'
      },
      {
        title: 'Funding Your Education: Scholarships & Payment Plans',
        excerpt: 'Quality education should be accessible. Discover the flexible payment options that keep your goals within reach.',
        content:
          'We offer merit-based scholarships, need-sensitive aid, and deferred payment plans to support diverse learners. Our advisors collaborate with each student to craft an affordable roadmap so finances never block ambition. Schedule a consultation to explore personalized options and get started on your transformation.',
        author: 'Admissions'
      }
    ];

    await BlogPost.insertMany(samplePosts);
    return res.json({ message: 'Sample blog posts added.' });
  } catch (error) {
    console.error('Seed blogs error:', error);
    return res.status(500).json({ message: 'Server error seeding blogs.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const blogs = await BlogPost.find().sort({ publishedAt: -1 });
    return res.json(blogs);
  } catch (error) {
    console.error('Fetch blogs error:', error);
    return res.status(500).json({ message: 'Server error fetching blogs.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }
    return res.json(blog);
  } catch (error) {
    console.error('Fetch blog error:', error);
    return res.status(500).json({ message: 'Server error fetching blog.' });
  }
});

module.exports = router;
