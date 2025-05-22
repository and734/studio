import ToolForm from '@/components/admin/ToolForm';
import { fetchCategories, fetchAdminToolById, updateTool } from '@/lib/actions';
import type { EditToolFormData, Tool } from '@/types';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function EditToolPage({ params }: { params: { id: string } }) {
  const toolId = parseInt(params.id, 10);
  if (isNaN(toolId)) {
    notFound();
  }

  const [categories, toolToEdit] = await Promise.all([
    fetchCategories(),
    fetchAdminToolById(toolId),
  ]);

  if (!toolToEdit) {
    notFound();
  }

  const handleUpdateTool = async (data: Omit<EditToolFormData, 'id'>) => {
    'use server';
    const updatedTool = await updateTool(toolId, data);
    if (updatedTool) {
      // Optionally redirect or show success
      // For now, revalidation is handled in the action
    }
    return updatedTool;
  };


  return (
    <div className="space-y-6">
       <Button variant="outline" asChild className="mb-6">
        <Link href="/admin">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin Dashboard
        </Link>
      </Button>
      <ToolForm 
        allCategories={categories} 
        initialData={toolToEdit}
        onSubmit={handleUpdateTool}
        isEditMode={true}
      />
    </div>
  );
}
