export type Category = 'objects' | 'places' | 'craft' | 'art' | 'people' | 'ideas'

export type ArchiveEntry = {
  id: string
  type: Category
  title: string
  originalTitle?: string
  country: string
  city?: string
  date: string
  description: string
  story: string
  image: string
  tags: string[]
  relatedIds: string[]
}

export const archive: ArchiveEntry[] = [
  {
    id: 'kodo',
    type: 'objects',
    title: 'Kōdō',
    originalTitle: '香道',
    country: 'Japan',
    city: 'Kyoto',
    date: '2026-08-07',
    description: 'The ritual of listening to incense.',
    story: 'Kōdō treats fragrance as something to notice rather than consume: a layered ritual of scent, memory, etiquette and quiet attention.',
    image: '/images/reference-hero.png',
    tags: ['ritual', 'incense', 'sensory'],
    relatedIds: ['tea-bowl', 'washi', 'kyoto'],
  },
  {
    id: 'fushimi-inari',
    type: 'places',
    title: 'Fushimi Inari',
    originalTitle: '伏見稲荷',
    country: 'Japan',
    city: 'Kyoto',
    date: '2026-08-05',
    description: 'A mountain path of repeating vermilion gates.',
    story: 'The shrine route turns repetition into atmosphere: each gate marks a gift, a name, a memory and another step upward.',
    image: '/images/reference-hero.png',
    tags: ['shrine', 'architecture', 'kyoto'],
    relatedIds: ['kyoto', 'sagano', 'kodo'],
  },
  {
    id: 'washi',
    type: 'craft',
    title: 'Washi',
    originalTitle: '和紙',
    country: 'Japan',
    city: 'Gifu',
    date: '2026-08-01',
    description: 'Paper that carries light.',
    story: 'Handmade washi is valued for what it reveals through thinness: fibers, shadows and a surface that changes with the room around it.',
    image: '/images/reference-hero.png',
    tags: ['paper', 'craft', 'material'],
    relatedIds: ['kodo', 'tea-bowl'],
  },
  {
    id: 'tea-bowl',
    type: 'objects',
    title: 'Tea Bowl',
    originalTitle: '茶碗',
    country: 'Japan',
    city: 'Shigaraki',
    date: '2026-07-28',
    description: 'A handmade object for a quiet moment.',
    story: 'A tea bowl can make asymmetry feel intentional: the hand, the kiln and the clay all remain visible in the finished form.',
    image: '/images/reference-hero.png',
    tags: ['tea', 'ceramics', 'wabi-sabi'],
    relatedIds: ['washi', 'kodo'],
  },
  {
    id: 'sagano',
    type: 'places',
    title: 'Sagano',
    originalTitle: '嵯峨野',
    country: 'Japan',
    city: 'Kyoto',
    date: '2026-07-21',
    description: 'Where the wind moves softly through bamboo.',
    story: 'Sagano is less about a single landmark than the changing rhythm of pathways, bamboo, sound and small domestic views.',
    image: '/images/reference-hero.png',
    tags: ['landscape', 'bamboo', 'kyoto'],
    relatedIds: ['fushimi-inari', 'kyoto'],
  },
  {
    id: 'kyoto',
    type: 'places',
    title: 'Kyoto',
    originalTitle: '京都',
    country: 'Japan',
    city: 'Kyoto',
    date: '2026-07-18',
    description: 'A city where old forms keep changing shape.',
    story: 'Kyoto becomes most interesting where ritual, commerce, craft and ordinary contemporary life overlap instead of staying in separate historical layers.',
    image: '/images/reference-hero.png',
    tags: ['city', 'architecture', 'culture'],
    relatedIds: ['fushimi-inari', 'sagano', 'kodo'],
  },
]

export const featuredStory = {
  slug: 'why-japanese-objects-feel-different',
  title: 'Why Japanese objects feel different',
  type: 'essay',
  date: '2026-08-08',
  readTime: 12,
  excerpt: 'An essay about quiet intention, imperfect materials and the beauty of things made by human hands.',
  body: [
    'There are objects that ask to be looked at, and objects that teach you how to look. Japanese craft often becomes memorable through the second category.',
    'A tea bowl, a sheet of paper, a wooden tray or a small incense vessel does not need visual perfection to feel resolved. Surface, proportion and the evidence of making carry the story.',
    'The interesting detail is usually one you notice after the first impression: a thumb mark, a repair, a slight asymmetry, the way an edge catches light.',
  ],
  heroImage: '/images/reference-hero.png',
  tags: ['Japan', 'craft', 'objects'],
}

export const allTags = Array.from(new Set(archive.flatMap((item) => item.tags))).sort()
