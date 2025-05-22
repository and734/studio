'use client';

import type { Tool } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit3, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { togglePublishTool } from '@/lib/actions'; // Assuming this action exists
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminToolTableProps {
  tools: Tool[];
}

export default function AdminToolTable({ tools }: AdminToolTableProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleTogglePublish = async (toolId: number, currentStatus: boolean) => {
    startTransition(async () => {
      try {
        const updatedTool = await togglePublishTool(toolId);
        if (updatedTool) {
          toast({
            title: "Status Updated",
            description: `Tool "${updatedTool.name}" is now ${updatedTool.is_published ? 'published' : 'unpublished'}.`,
          });
        } else {
          toast({ title: "Error", description: "Failed to update tool status.", variant: "destructive" });
        }
      } catch (error) {
        toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
      }
    });
  };
  
  // Placeholder for delete functionality
  const handleDeleteTool = async (toolId: number, toolName: string) => {
    startTransition(async () => {
      // Replace with actual delete action
      console.log(`Attempting to delete tool: ${toolName} (ID: ${toolId})`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Tool Deletion (Simulated)",
        description: `Tool "${toolName}" would be deleted. This is a placeholder.`,
      });
      // Revalidate relevant paths after actual deletion
    });
  };


  if (tools.length === 0) {
    return <p className="text-muted-foreground text-center py-8">No tools found. Add some new tools to get started!</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id}>
              <TableCell className="font-medium">
                <Link href={`/admin/edit/${tool.id}`} className="hover:text-primary hover:underline">
                  {tool.name}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant={tool.is_published ? 'default' : 'outline'} 
                       className={tool.is_published ? 'bg-green-500 hover:bg-green-600 text-white' : 'border-amber-500 text-amber-600'}>
                  {tool.is_published ? 'Published' : 'Draft'}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {tool.categories.map(cat => cat.name).join(', ')}
              </TableCell>
              <TableCell>{new Date(tool.date_added).toLocaleDateString()}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleTogglePublish(tool.id, tool.is_published)}
                  disabled={isPending}
                  title={tool.is_published ? "Unpublish" : "Publish"}
                >
                  {tool.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" asChild title="Edit Tool">
                  <Link href={`/admin/edit/${tool.id}`}>
                    <Edit3 className="h-4 w-4" />
                  </Link>
                </Button>
                 <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon" title="Delete Tool" disabled={isPending}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the tool "{tool.name}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteTool(tool.id, tool.name)} 
                        disabled={isPending}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
