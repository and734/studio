import type { Category, Tool } from '@/types';

export const categories: Category[] = [
  { id: 1, name: 'Generative AI', type: 'AI_TECHNOLOGY', description: 'AI that can generate new content like text, images, or code.' },
  { id: 2, name: 'NLP', type: 'AI_TECHNOLOGY', description: 'Natural Language Processing technologies.' },
  { id: 3, name: 'Computer Vision', type: 'AI_TECHNOLOGY', description: 'AI that processes and understands images and video.' },
  { id: 4, name: 'Content Creation', type: 'TASK_PURPOSE', description: 'Tools for creating written or visual content.' },
  { id: 5, name: 'Image Generation', type: 'TASK_PURPOSE', description: 'Tools specifically for generating images from prompts.' },
  { id: 6, name: 'Coding Assistant', type: 'TASK_PURPOSE', description: 'Tools that help developers write or debug code.' },
  { id: 7, name: 'Marketing', type: 'INDUSTRY', description: 'AI tools tailored for marketing tasks.' },
  { id: 8, name: 'Education', type: 'INDUSTRY', description: 'AI tools for educational purposes.' },
];

export const tools: Tool[] = [
  {
    id: 1,
    name: 'ChatGPT',
    website_url: 'https://chat.openai.com',
    brief_description: 'A powerful conversational AI by OpenAI.',
    detailed_description: 'ChatGPT can generate human-like text, answer questions, write code, and much more based on prompts.',
    pricing_model: 'Freemium',
    platform: 'Web, API',
    logo_url: 'https://placehold.co/100x100.png',
    date_added: new Date('2023-01-15T10:00:00Z').toISOString(),
    last_updated: new Date('2023-10-20T12:00:00Z').toISOString(),
    is_published: true,
    categories: [categories[0], categories[1], categories[3], categories[5]], // Generative AI, NLP, Content Creation, Coding Assistant
  },
  {
    id: 2,
    name: 'Midjourney',
    website_url: 'https://www.midjourney.com',
    brief_description: 'An AI image generator creating images from textual descriptions.',
    detailed_description: 'Midjourney is known for its artistic and high-quality image outputs via Discord commands.',
    pricing_model: 'Paid',
    platform: 'Discord (Web/Desktop/Mobile)',
    logo_url: 'https://placehold.co/100x100.png',
    date_added: new Date('2023-02-20T14:30:00Z').toISOString(),
    last_updated: new Date('2023-11-01T09:15:00Z').toISOString(),
    is_published: true,
    categories: [categories[0], categories[2], categories[4]], // Generative AI, Computer Vision, Image Generation
  },
  {
    id: 3,
    name: 'GitHub Copilot',
    website_url: 'https://copilot.github.com/',
    brief_description: 'AI pair programmer that suggests code.',
    detailed_description: 'Integrates with IDEs to provide code completions and suggestions in real-time.',
    pricing_model: 'Paid',
    platform: 'IDE Extension (VS Code, JetBrains)',
    logo_url: 'https://placehold.co/100x100.png',
    date_added: new Date('2023-03-10T08:00:00Z').toISOString(),
    last_updated: new Date('2023-10-25T16:45:00Z').toISOString(),
    is_published: true,
    categories: [categories[0], categories[5]], // Generative AI, Coding Assistant
  },
  {
    id: 4,
    name: 'DALL-E 3',
    website_url: 'https://openai.com/dall-e-3',
    brief_description: 'AI system that can create realistic images and art from a description in natural language.',
    detailed_description: 'DALL-E 3, developed by OpenAI, generates high-quality images from text prompts, offering more detail and accuracy.',
    pricing_model: 'Paid', // Typically via ChatGPT Plus or API credits
    platform: 'Web (via ChatGPT), API',
    logo_url: 'https://placehold.co/100x100.png',
    date_added: new Date('2023-04-05T11:20:00Z').toISOString(),
    last_updated: new Date('2023-11-05T10:00:00Z').toISOString(),
    is_published: true,
    categories: [categories[0], categories[2], categories[4]], // Generative AI, Computer Vision, Image Generation
  },
  {
    id: 5,
    name: 'Jasper',
    website_url: 'https://www.jasper.ai/',
    brief_description: 'AI writing assistant for creating marketing copy, blog posts, and more.',
    detailed_description: 'Jasper helps businesses and marketers create high-quality content faster with AI-powered templates and tools.',
    pricing_model: 'Paid',
    platform: 'Web',
    logo_url: 'https://placehold.co/100x100.png',
    date_added: new Date('2023-05-12T13:00:00Z').toISOString(),
    last_updated: new Date('2023-11-10T17:30:00Z').toISOString(),
    is_published: false, // Example of an unpublished tool
    categories: [categories[0], categories[1], categories[3], categories[6]], // Generative AI, NLP, Content Creation, Marketing
  },
];
