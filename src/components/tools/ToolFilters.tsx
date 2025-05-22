'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ToolFiltersProps {
  categories: Category[];
  initialCategoryId?: string;
  initialSearchQuery?: string;
}

const ToolFilters: React.FC<ToolFiltersProps> = ({ categories, initialCategoryId, initialSearchQuery }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId || '');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');

  useEffect(() => {
    setSelectedCategoryId(searchParams.get('category') || '');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);


  const handleFilterChange = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    if (selectedCategoryId) {
      const category = categories.find(c => c.id.toString() === selectedCategoryId);
      if (category) {
        current.set('category', category.id.toString()); // Use ID for query param
      } else {
        current.delete('category');
      }
    } else {
      current.delete('category');
    }

    if (searchQuery) {
      current.set('search', searchQuery);
    } else {
      current.delete('search');
    }
    current.set('page', '1'); // Reset to first page on filter change

    router.push(`${pathname}?${current.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedCategoryId('');
    setSearchQuery('');
    router.push(`${pathname}?page=1`);
  }

  return (
    <div className="mb-8 p-6 bg-card rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-1">Search Tools</label>
          <div className="relative">
            <Input
              id="search"
              type="text"
              placeholder="e.g., image generator, coding assistant"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">Filter by Category</label>
          <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2 md:col-span-1">
          <Button onClick={handleFilterChange} className="w-full md:w-auto bg-primary hover:bg-primary/90">
            <Search className="mr-2 h-4 w-4" /> Apply Filters
          </Button>
          <Button onClick={handleResetFilters} variant="outline" className="w-full md:w-auto">
             <X className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolFilters;
