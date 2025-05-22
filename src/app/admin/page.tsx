import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListChecks } from 'lucide-react';
import { fetchAllToolsForAdmin, togglePublishTool } from '@/lib/actions';
import AdminToolTable from '@/components/admin/AdminToolTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AdminDashboardPage() {
  const tools = await fetchAllToolsForAdmin();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage AI tools and categories.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/admin/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Tool
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <ListChecks className="mr-2 h-6 w-6 text-primary" />
            Manage Tools
          </CardTitle>
          <CardDescription>View, edit, and publish AI tools in the directory.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminToolTable tools={tools} />
        </CardContent>
      </Card>
      
      {/* Placeholder for category management */}
      {/* 
      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Add, edit, or remove tool categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Category management coming soon.</p>
        </CardContent>
      </Card>
      */}
    </div>
  );
}
