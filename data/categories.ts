import { ToolCategory } from '../types';

export const CATEGORIES: ToolCategory[] = [
  { 
    id: 'ai', 
    name: 'AI Tools', 
    description: 'Advanced AI powered generation and analysis', 
    icon: '🧠', 
    color: 'bg-indigo-500',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1620712943543-bcc46386c635?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'social', 
    name: 'Social Media', 
    description: 'Engagement boosters and content planners', 
    icon: '📱', 
    color: 'bg-cyan-500',
    images: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'image', 
    name: 'Image Tools', 
    description: 'Compress, resize, and edit images online', 
    icon: '🖼️', 
    color: 'bg-emerald-500',
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'pdf', 
    name: 'PDF Tools', 
    description: 'Merge, split, and convert PDF documents', 
    icon: '📄', 
    color: 'bg-red-500',
    images: [
      'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'video', 
    name: 'Video Tools', 
    description: 'Convert, trim and edit video files', 
    icon: '🎥', 
    color: 'bg-purple-500',
    images: [
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'audio', 
    name: 'Audio Tools', 
    description: 'Convert, compress and edit audio files', 
    icon: '🎧', 
    color: 'bg-blue-500',
    images: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'file', 
    name: 'File Tools', 
    description: 'Convert, compress and manage system files', 
    icon: '📁', 
    color: 'bg-amber-600',
    images: [
      'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'data', 
    name: 'Data Tools', 
    description: 'View, convert and clean data structures', 
    icon: '📊', 
    color: 'bg-cyan-500',
    images: [
      'https://images.unsplash.com/photo-1551288049-bbda6462f744?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'dev', 
    name: 'Developer Tools', 
    description: 'JSON, Code, and Debugging utilities', 
    icon: '💻', 
    color: 'bg-slate-800',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'seo', 
    name: 'SEO Tools', 
    description: 'Keyword and Meta tag optimization', 
    icon: '🔍', 
    color: 'bg-blue-500',
    images: [
      'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'calculators', 
    name: 'Calculators', 
    description: 'Financial and Mathematical tools', 
    icon: '🔢', 
    color: 'bg-orange-500',
    images: [
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'unit-converters', 
    name: 'Unit Converters', 
    description: 'Instant measurement conversions', 
    icon: '📏', 
    color: 'bg-emerald-600',
    images: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'utility', 
    name: 'Utility', 
    description: 'Text tools and miscellaneous utilities', 
    icon: '🛠️', 
    color: 'bg-pink-500',
    images: [
      'https://images.unsplash.com/photo-1530124560676-586cad3223c0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'security', 
    name: 'Security', 
    description: 'Passwords and Encryption', 
    icon: '🛡️', 
    color: 'bg-teal-500',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'network', 
    name: 'Network Tools', 
    description: 'IP, DNS and Speed testing', 
    icon: '🌐', 
    color: 'bg-cyan-500',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1558494949-ef01091591c6?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'office', 
    name: 'Office Tools', 
    description: 'Word, Excel and Productivity', 
    icon: '📁', 
    color: 'bg-blue-600',
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  { 
    id: 'education', 
    name: 'Education', 
    description: 'Learning and Academic tools', 
    icon: '🎓', 
    color: 'bg-amber-500',
    images: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200'
    ]
  },
];