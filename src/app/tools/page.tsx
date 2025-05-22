import { Suspense } from 'react';
import { fetchTools, fetchCategories } from '@/lib/actions';
import ToolCard from '@/components/tools/ToolCard';
import PaginationControls from '@/components/common/PaginationControls';
import ToolFilters from '@/components/tools/ToolFilters';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, ListX } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ITEMS_PER_PAGE = 9;

async function ToolsList({ currentPage, categoryId, searchQuery }: { currentPage: number, categoryId?: number, searchQuery?: string }) {
  const { data: tools, total } = await fetchTools(currentPage, ITEMS_PER_PAGE, categoryId, searchQuery);

  if (tools.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <ListX className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">No Tools Found</h2>
        <p className="text-muted-foreground">
          Try adjusting your filters or search query.
        </p>
      </div>
    );
  }

  return (
    <>
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </>
  );
}

function ToolsListSkeleton() {
  return Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
    <div key={index} className="bg-card p-4 rounded-xl shadow-lg">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="h-16 w-16 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  ));
}


export default async function ToolsPage({
  searchParams,
}: {
  searchParams?: { page?: string; category?: string; search?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const categoryIdParam = searchParams?.category;
  const searchQuery = searchParams?.search;

  const categories = await fetchCategories();
  
  // Find category ID from name if name is passed, otherwise use ID directly if number
  let categoryId: number | undefined = undefined;
  if (categoryIdParam) {
    const foundCategoryById = categories.find(c => c.id.toString() === categoryIdParam);
    if (foundCategoryById) {
      categoryId = foundCategoryById.id;
    } else {
       // This part handles if category name was passed in URL (e.g. from homepage links)
       // It's generally better to use IDs in query params for robustness
      const foundCategoryByName = categories.find(c => c.name.toLowerCase() === categoryIdParam.toLowerCase());
      if(foundCategoryByName) categoryId = foundCategoryByName.id;
    }
  }


  // Fetch total count for pagination based on current filters for accurate totalPages
  // This could be optimized by fetchTools returning totalPages or totalItems based on filters
  const { total } = await fetchTools(1, ITEMS_PER_PAGE * 1000, categoryId, searchQuery); // Fetch all to get total count for current filter
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Explore AI Tools</h1>
        <p className="text-lg text-muted-foreground">
          Find the perfect AI tools for your needs from our curated directory.
        </p>
      </div>

      <ToolFilters categories={categories} initialCategoryId={categoryId?.toString()} initialSearchQuery={searchQuery} />
      
      <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><ToolsListSkeleton /></div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolsList currentPage={currentPage} categoryId={categoryId} searchQuery={searchQuery} />
        </div>
      </Suspense>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={currentPage < totalPages}
        hasPrevPage={currentPage > 1}
      />
    </div>
  );
}
