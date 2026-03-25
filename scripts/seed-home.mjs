import SanityClient from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN env var')
  process.exit(1)
}

const client = SanityClient({
  projectId: 'gvzh9o1j',
  dataset: 'production',
  apiVersion: '2022-11-15',
  token,
  useCdn: false,
})

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function block(text, marks = []) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks }],
  }
}

// Bio paragraph 1 has italic "creative producer and systems designer"
const aboutBio = [
  {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [
      { _type: 'span', _key: key(), text: 'Lauren Brady is a ', marks: [] },
      { _type: 'span', _key: key(), text: 'creative producer and systems designer', marks: ['em'] },
      { _type: 'span', _key: key(), text: ' working across media, events, and broadcast environments. Her practice is built on the intersection of creative vision and operational precision.', marks: [] },
    ],
  },
  block('With 8+ years producing across branded content, live events, linear television, and independent cultural platforms, she specializes in building the infrastructure that allows complex creative work to get made—on time, at scale, and with collaborative teams.'),
  block("She's equally at home defining production pipelines for a virtual studio and running the floor at a live event. Her independent platform, More / More Dancing, reflects her commitment to building systems for collective creative production."),
]

const patch = {
  eyebrow: 'Creative Producer & Systems Designer',
  tagline: 'Building and operating multi-platform media, events, and collaborative production systems.',
  navLinks: [
    { _key: key(), label: 'Work', href: '#work' },
    { _key: key(), label: 'Production', href: '#production' },
    { _key: key(), label: 'Approach', href: '#approach' },
    { _key: key(), label: 'About', href: '#about' },
    { _key: key(), label: 'Events', href: '/events' },
  ],
  experienceEntries: [
    {
      _key: key(),
      company: 'American Express',
      role: 'Project Manager',
      tags: ['Virtual Production', 'Pipelines', 'Cross-functional'],
      contentParagraphs: [
        'Owned production operations for an in-house virtual production studio, managing schedules, budgets, and multi-team workflows across concurrent productions.',
        'Built and standardized production pipelines across creative, technical, and marketing teams—improving consistency, reducing turnaround, and ensuring output quality across formats.',
        'Coordinated daily operations across a complex stakeholder environment: designers, engineers, marketing leads, and external vendors operating under tight and evolving deadlines.',
      ],
    },
    {
      _key: key(),
      company: 'Vox Media',
      role: 'Creative Producer / Director',
      tags: ['Campaigns', 'Scale', 'Multi-platform'],
      contentParagraphs: [
        'Led end-to-end production of 70+ campaigns from scope through final delivery. Managed budgets ranging from $250K to $1.5MM across concurrent projects and client relationships.',
        'Coordinated cross-functional teams including editors, designers, writers, and on-screen talent. Delivered multi-platform assets across digital, social, and broadcast channels.',
        'Operated as primary point of contact between creative, production, and client stakeholders—aligning goals, managing expectations, and resolving scope changes in real time.',
      ],
    },
    {
      _key: key(),
      company: 'Netflix / Live Broadcast',
      role: 'Creative Director',
      tags: ['Broadcast Standards', 'Live Production', 'Talent Coordination'],
      contentParagraphs: [
        'Directed a live variety show featuring multiple remote and in-person performances. Managed complex production environments across talent, technical crews, and distribution timelines.',
        'Ensured deliverables met platform specifications, broadcast standards, and scheduling requirements. Coordinated logistics for high-profile talent across live and recorded outputs.',
      ],
    },
    {
      _key: key(),
      company: 'Magnolia Network',
      role: 'Director',
      tags: ['Linear Television', 'Series Production', '10 Episodes'],
      contentParagraphs: [
        'Directed a full season of linear television across 10 episodes. Oversaw casting, production logistics, and narrative continuity—ensuring cohesion across a structured multi-episode arc.',
        'Managed the full production lifecycle: pre-production planning through post-production delivery. Aligned production teams with platform requirements and broadcast timelines.',
      ],
    },
    {
      _key: key(),
      company: 'Feature Film',
      role: 'Producer / Line Producer',
      tags: ['~$1MM Budget', 'International', 'Multi-unit'],
      contentParagraphs: [
        'Managed approximately $1MM production budget and full operational logistics across an international shoot—coordinating stunts, marine units, and cross-border equipment transport.',
        'Operated in high-ambiguity environments with shifting constraints. Maintained schedule and budget integrity across multiple concurrent production units.',
      ],
    },
    {
      _key: key(),
      company: 'More / More Dancing',
      role: 'Founder, Creative Producer',
      tags: ['Platform Design', 'Events', 'Media Systems'],
      contentParagraphs: [
        'Built and operate a recurring event and media platform integrating live performance, broadcast, and digital distribution. Designed production systems for events, documentation, and content release.',
        'Coordinate collaborators across music, design, spatial production, and media—operating within tight timelines and evolving creative constraints.',
        'Maintain distributed production and release infrastructure as a founder-operator, with responsibility across concept, execution, and delivery.',
      ],
    },
  ],
  approachBlocks: [
    {
      _key: key(),
      title: 'Project Scoping',
      body: 'Define goals, deliverables, and technical requirements across platforms before production begins. Scope timelines, resource needs, and risk factors early to keep complex projects on track.',
    },
    {
      _key: key(),
      title: 'Cross-functional Leadership',
      body: 'Align creative, production, and technical teams toward shared outcomes. Serve as the central communication point across design, motion, engineering, and client stakeholders.',
    },
    {
      _key: key(),
      title: 'Timeline & Delivery',
      body: 'Build and manage production schedules under tight and evolving constraints. Track milestones, adapt to scope shifts, and maintain delivery integrity across concurrent workstreams.',
    },
    {
      _key: key(),
      title: 'Multi-platform Production',
      body: 'Deliver work across broadcast, live events, and digital environments. Familiar with format, resolution, and localization requirements for channel, retail, and web platforms.',
    },
    {
      _key: key(),
      title: 'Systems Thinking',
      body: 'Design repeatable workflows and tooling that support scalable creative output. Continuously improve process structure so teams can focus on quality, not logistics.',
    },
    {
      _key: key(),
      title: 'Ambiguity & Adaptability',
      body: 'Comfortable operating in environments with vague goals and evolving processes. Build structure where none exists—then iterate as projects and stakeholder needs develop.',
    },
  ],
  toolGroups: [
    {
      _key: key(),
      heading: 'Creative & Motion',
      items: ['Adobe After Effects', 'Photoshop', 'Premiere Pro / Final Cut', 'Figma'],
    },
    {
      _key: key(),
      heading: '3D / Animation Familiarity',
      items: ['Cinema 4D', 'Maya', '2D/3D Animation Workflows', 'Multi-format Delivery'],
    },
    {
      _key: key(),
      heading: 'Production Systems',
      items: ['Movie Magic Budgeting', 'Notion / Project Tracking', 'Run-of-show Architecture', 'Broadcast QC & Localization'],
    },
  ],
  aboutBio,
  aboutFacts: [
    { _key: key(), label: 'Based', value: 'New York, NY' },
    { _key: key(), label: 'Specialization', value: 'Broadcast, Live Events, Digital' },
    { _key: key(), label: 'Background', value: 'Film, Television, Brand Content' },
    { _key: key(), label: 'Scale', value: 'Campaigns to Feature Film' },
    { _key: key(), label: 'Contact', value: 'lauren@lauren-brady.com' },
  ],
  footerLinks: [
    { _key: key(), label: 'Email', href: 'mailto:lauren@lauren-brady.com' },
    { _key: key(), label: 'LinkedIn', href: '#' },
  ],
}

// Find the home document
const existing = await client.fetch(`*[_type == "home"][0]{ _id }`)

if (!existing?._id) {
  console.error('No home document found. Create one in Sanity Studio first.')
  process.exit(1)
}

console.log(`Patching home document: ${existing._id}`)
await client.patch(existing._id).set(patch).commit()
console.log('Done.')
