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
    resourceKey: 'stats',
    label: 'Stats',
    description: 'Adjust the metrics strip on the homepage.',
    fields: [
      { name: 'value', label: 'Value', type: 'text', required: true },
      { name: 'label', label: 'Label', type: 'text', required: true }
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
  }
];

export const getResourceByKey = (key) => resources.find((resource) => resource.resourceKey === key);
