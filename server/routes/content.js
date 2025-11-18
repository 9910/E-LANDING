const express = require('express');
const Program = require('../models/Program');
const Highlight = require('../models/Highlight');
const Stat = require('../models/Stat');
const Testimonial = require('../models/Testimonial');

const router = express.Router();

const seedData = async () => {
  const [programsCount, highlightsCount, statsCount, testimonialsCount] = await Promise.all([
    Program.countDocuments(),
    Highlight.countDocuments(),
    Stat.countDocuments(),
    Testimonial.countDocuments()
  ]);

  const tasks = [];

  if (programsCount === 0) {
    tasks.push(
            Program.insertMany([
        {
          name: 'Full Stack Web Development',
          description: 'Master MERN, DevOps fundamentals, and agile delivery while building launch-ready products.',
          duration: '9 Months - Hybrid',
          price: 'Contact Us',
          image: '/uploads/programs/full-stack.svg'
        },
        {
          name: 'Applied Data Science',
          description: 'Hands-on with Python, SQL, machine learning, and dashboards for real business insights.',
          duration: '6 Months - Online Live',
          price: '$2,499',
          image: '/uploads/programs/data-science.svg'
        },
        {
          name: 'Digital Marketing Leadership',
          description: 'Growth marketing, automation, analytics, and brand storytelling guided by agency mentors.',
          duration: '4 Months - Weekend',
          price: '$1,799',
          image: '/uploads/programs/digital-marketing.svg'
        },
        {
          name: 'UI/UX Design Career Sprint',
          description: 'Design thinking, research, product strategy, and Figma prototyping for portfolio-ready work.',
          duration: '5 Months - Hybrid',
          price: '$2,099',
          image: '/uploads/programs/ui-ux.svg'
        }
      ])
    );
  }

  if (highlightsCount === 0) {
    tasks.push(
      Highlight.insertMany([
        {
          title: 'Career Labs',
          description: '1:1 coaching, mock interviews, and onsite hiring days with unicorn startups.',
          icon: 'CL'
        },
        {
          title: 'Innovation Pods',
          description: 'Cross-disciplinary teams prototype solutions with cutting-edge tech stacks.',
          icon: 'IP'
        },
        {
          title: 'Global Faculty',
          description: 'Lead mentors from MIT, IITs, and FAANG companies join live masterclasses weekly.',
          icon: 'GF'
        },
        {
          title: 'Scholarship Fund',
          description: 'Need and merit-based grants worth $1.2M distributed annually to learners.',
          icon: 'SF'
        }
      ])
    );
  }

  if (statsCount === 0) {
    tasks.push(
      Stat.insertMany([
        { value: '10K+', label: 'Global Alumni' },
        { value: '92%', label: 'Placement Rate' },
        { value: '150+', label: 'Industry Mentors' },
        { value: '35', label: 'Partner Campuses' }
      ])
    );
  }

  if (testimonialsCount === 0) {
    tasks.push(
      Testimonial.insertMany([
        {
          name: 'Priya Sharma',
          role: 'Product Analyst at Amazon',
          quote:
            'The mentorship at EduElevate is second to none. We built three products, pitched to real clients, and I landed an offer before graduation.'
        },
        {
          name: 'Miguel Santos',
          role: 'Growth Marketer at StartUpX',
          quote:
            'Hands-on marketing labs and data storytelling modules made me confident to lead campaigns across regions from day one.'
        },
        {
          name: 'Alisha Khan',
          role: 'UI/UX Designer at Figma Community',
          quote:
            'Design reviews from mentors working at top studios helped me craft a portfolio that truly stands out. The community is electric!'
        }
      ])
    );
  }

  if (tasks.length > 0) {
    await Promise.all(tasks);
  }
};

router.get('/seed', async (_req, res) => {
  try {
    await seedData();
    return res.json({ message: 'Content seeded successfully.' });
  } catch (error) {
    console.error('Seed content error:', error);
    return res.status(500).json({ message: 'Server error seeding content.' });
  }
});

const createGetAllRoute = (path, Model, sort = { createdAt: -1 }) => {
  router.get(path, async (_req, res) => {
    try {
      const records = await Model.find().sort(sort);
      return res.json(records);
    } catch (error) {
      console.error(`Fetch ${path} error:`, error);
      return res.status(500).json({ message: `Server error fetching ${path}.` });
    }
  });
};

router.get('/programs', async (req, res) => {
  try {
    const limit = Number.parseInt(req.query.limit, 10);
    const skip = Number.parseInt(req.query.skip, 10);

    let query = Program.find().sort({ createdAt: -1 });
    if (!Number.isNaN(skip) && skip > 0) {
      query = query.skip(skip);
    }
    if (!Number.isNaN(limit) && limit > 0) {
      query = query.limit(limit);
    }

    const records = await query.exec();
    return res.json(records);
  } catch (error) {
    console.error('Fetch /programs error:', error);
    return res.status(500).json({ message: 'Server error fetching /programs.' });
  }
});

createGetAllRoute('/highlights', Highlight);
createGetAllRoute('/stats', Stat);
createGetAllRoute('/testimonials', Testimonial);

seedData().catch((error) => {
  console.error('Initial content seed error:', error);
});

module.exports = router;

