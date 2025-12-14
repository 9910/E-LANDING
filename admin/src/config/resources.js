export const resources = [
  {
    resourceKey: 'programs',
    label: 'Programs',
    description: 'Manage the learning paths and packages shown on the main site.',
    fields: [
      { name: 'name', label: 'Program Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'duration', label: 'Duration', type: 'text', required: true },
      { name: 'price', label: 'Price/Note', type: 'text', required: true },
      { name: 'image', label: 'Program Image', type: 'file', required: false }
    ]
  },
  {
    resourceKey: 'highlights',
    label: 'Highlights',
    description: 'Edit the campus advantages and differentiators.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'icon', label: 'Icon Text', type: 'text', required: true }
    ]
  },
  {
    resourceKey: 'testimonials',
    label: 'Testimonials',
    description: 'Update alumni stories.',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'quote', label: 'Quote', type: 'textarea', required: true }
    ]
  },
  {
    resourceKey: 'blogs',
    label: 'Blog Posts',
    description: 'Create or edit blog posts displayed in the blog section.',
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { name: 'content', label: 'Content', type: 'textarea', required: true },
      { name: 'author', label: 'Author', type: 'text', required: false }
    ]
  },
  {
    resourceKey: 'home',
    label: 'Home Page',
    description: 'Edit hero copy shown on the landing page.',
    fields: [
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'subheadline', label: 'Subheadline', type: 'textarea', required: true },
      { name: 'primaryCtaLabel', label: 'Primary CTA Label', type: 'text', required: true },
      { name: 'secondaryCtaLabel', label: 'Secondary CTA Label', type: 'text', required: true },
      { name: 'heroImage', label: 'Hero Image (fallback)', type: 'file', required: false },
      { name: 'heroImage1', label: 'Hero Image 1', type: 'file', required: false },
      { name: 'heroImage2', label: 'Hero Image 2', type: 'file', required: false },
      { name: 'heroImage3', label: 'Hero Image 3', type: 'file', required: false },
      { name: 'heroImage4', label: 'Hero Image 4', type: 'file', required: false }
    ],
    hydrateFormData: (record) => ({
      ...record,
      heroImage1: record.heroImages?.[0] || '',
      heroImage2: record.heroImages?.[1] || '',
      heroImage3: record.heroImages?.[2] || '',
      heroImage4: record.heroImages?.[3] || ''
    }),
    preparePayload: (formState) => {
      const heroImages = [formState.heroImage1, formState.heroImage2, formState.heroImage3, formState.heroImage4]
        .filter(Boolean)
        .slice(0, 4);
      return {
        ...formState,
        heroImages,
        heroImage: formState.heroImage || heroImages[0] || ''
      };
    }
  },
  {
    resourceKey: 'homeVideo',
    label: 'Home Video',
    description: 'Edit the campus video section on the landing page.',
    fields: [
      { name: 'label', label: 'Eyebrow Label', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'videoUrl', label: 'YouTube URL', type: 'text', required: true }
    ]
  }
];

export const getResourceByKey = (key) => resources.find((resource) => resource.resourceKey === key);
