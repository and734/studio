import ToolForm from '@/components/admin/ToolForm';
import { fetchCategories, createTool } from '@/lib/actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AddNewToolPage() {
  const categories = await fetchCategories();

  return (
    <div className="space-y-6">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/admin">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin Dashboard
        </Link>
      </Button>
      <ToolForm allCategories={categories} onSubmit={createTool} />
    </div>
  );
}
