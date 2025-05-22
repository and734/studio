'use server';

import { categories as mockCategories, tools as mockTools } from './mock-data';
import type { Category, Tool, NewToolFormData, AISuggestionRequest } from '@/types';
import { suggestCategories as suggestCategoriesAI } from '@/ai/flows/suggest-categories';
import { revalidatePath } from 'next/cache';

// Simulate database interactions with latency
const simulateDBDelay = (delay = 500) => new Promise(resolve => setTimeout(resolve, delay));

export async function fetchTools(page: number = 1, limit: number = 10, categoryId?: number, searchQuery?: string): Promise<{ data: Tool[], total: number }> {
  await simulateDBDelay();
  let filteredTools = mockTools.filter(tool => tool.is_published);

  if (categoryId) {
    filteredTools = filteredTools.filter(tool => tool.categories.some(cat => cat.id === categoryId));
  }

  if (searchQuery) {
    const lowercasedQuery = searchQuery.toLowerCase();
    filteredTools = filteredTools.filter(tool => 
      tool.name.toLowerCase().includes(lowercasedQuery) ||
      tool.brief_description.toLowerCase().includes(lowercasedQuery) ||
      tool.detailed_description?.toLowerCase().includes(lowercasedQuery)
    );
  }
  
  const total = filteredTools.length;
  const paginatedTools = filteredTools.slice((page - 1) * limit, page * limit);
  return { data: paginatedTools, total };
}

export async function fetchAllToolsForAdmin(): Promise<Tool[]> {
  await simulateDBDelay();
  // Return all tools, published or not, for admin view
  return [...mockTools].sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
}


export async function fetchToolById(id: number): Promise<Tool | undefined> {
  await simulateDBDelay();
  return mockTools.find(tool => tool.id === id && tool.is_published);
}

export async function fetchAdminToolById(id: number): Promise<Tool | undefined> {
  await simulateDBDelay();
  return mockTools.find(tool => tool.id === id);
}


export async function fetchCategories(): Promise<Category[]> {
  await simulateDBDelay();
  return mockCategories;
}

export async function createTool(formData: NewToolFormData): Promise<Tool> {
  await simulateDBDelay(1000);
  const newId = mockTools.length > 0 ? Math.max(...mockTools.map(t => t.id)) + 1 : 1;
  const toolCategories = mockCategories.filter(cat => formData.category_ids.includes(cat.id));
  
  const newTool: Tool = {
    id: newId,
    ...formData,
    date_added: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    is_published: false, // New tools are unpublished by default
    categories: toolCategories,
  };
  mockTools.unshift(newTool); // Add to the beginning of the array for easier finding in admin
  
  revalidatePath('/tools');
  revalidatePath('/admin');
  return newTool;
}

export async function updateTool(id: number, formData: NewToolFormData): Promise<Tool | undefined> {
  await simulateDBDelay(1000);
  const toolIndex = mockTools.findIndex(t => t.id === id);
  if (toolIndex === -1) {
    return undefined;
  }

  const toolCategories = mockCategories.filter(cat => formData.category_ids.includes(cat.id));
  const updatedTool: Tool = {
    ...mockTools[toolIndex],
    ...formData,
    last_updated: new Date().toISOString(),
    categories: toolCategories,
  };
  mockTools[toolIndex] = updatedTool;

  revalidatePath('/tools');
  revalidatePath(`/tools/${id}`);
  revalidatePath('/admin');
  revalidatePath(`/admin/edit/${id}`);
  return updatedTool;
}

export async function togglePublishTool(id: number): Promise<Tool | undefined> {
  await simulateDBDelay(500);
  const toolIndex = mockTools.findIndex(t => t.id === id);
  if (toolIndex === -1) {
    return undefined;
  }
  mockTools[toolIndex].is_published = !mockTools[toolIndex].is_published;
  mockTools[toolIndex].last_updated = new Date().toISOString();
  
  revalidatePath('/tools');
  revalidatePath(`/tools/${id}`);
  revalidatePath('/admin');
  return mockTools[toolIndex];
}


export async function getAICategorySuggestions(data: AISuggestionRequest): Promise<string[]> {
  try {
    const result = await suggestCategoriesAI({
      toolName: data.toolName,
      toolDescription: data.toolDescription,
    });
    return result.suggestedCategories;
  } catch (error) {
    console.error("Error fetching AI category suggestions:", error);
    return []; // Return empty array or throw custom error
  }
}
