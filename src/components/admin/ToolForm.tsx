'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Category, NewToolFormData, EditToolFormData, Tool } from '@/types';
import { getAICategorySuggestions } from '@/lib/actions';
import { useState, useTransition } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const pricingModels = ['Free', 'Freemium', 'Paid', 'Open Source', 'Free Trial'] as const;

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }).max(100),
  website_url: z.string().url({ message: 'Please enter a valid URL.' }),
  brief_description: z.string().min(10, { message: 'Brief description must be at least 10 characters.' }).max(200),
  detailed_description: z.string().optional(),
  logo_url: z.string().url({ message: 'Please enter a valid logo URL.' }).or(z.literal('')), // Allow empty or valid URL
  pricing_model: z.enum(pricingModels),
  platform: z.string().optional(),
  category_ids: z.array(z.number()).min(1, { message: 'Please select at least one category.' }),
});

type ToolFormValues = z.infer<typeof formSchema>;

interface ToolFormProps {
  allCategories: Category[];
  initialData?: Tool | null; // For editing
  onSubmit: (data: ToolFormValues) => Promise<Tool | undefined | null>;
  isEditMode?: boolean;
}

const ToolForm: React.FC<ToolFormProps> = ({ allCategories, initialData, onSubmit, isEditMode = false }) => {
  const [isSubmitting, startSubmitTransition] = useTransition();
  const [isSuggesting, startSuggestTransition] = useTransition();
  const [suggestedAITags, setSuggestedAITags] = useState<string[]>([]);
  const { toast } = useToast();

  const defaultValues: Partial<ToolFormValues> = initialData
    ? {
        name: initialData.name,
        website_url: initialData.website_url,
        brief_description: initialData.brief_description,
        detailed_description: initialData.detailed_description || '',
        logo_url: initialData.logo_url || '',
        pricing_model: initialData.pricing_model,
        platform: initialData.platform || '',
        category_ids: initialData.categories.map(cat => cat.id),
      }
    : {
        name: '',
        website_url: '',
        brief_description: '',
        detailed_description: '',
        logo_url: 'https://placehold.co/100x100.png',
        pricing_model: 'Free',
        platform: '',
        category_ids: [],
      };

  const form = useForm<ToolFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: ToolFormValues) => {
    startSubmitTransition(async () => {
      try {
        const result = await onSubmit(data);
        if (result) {
           toast({
            title: isEditMode ? "Tool Updated!" : "Tool Added!",
            description: `"${data.name}" has been successfully ${isEditMode ? 'updated' : 'added'}.`,
          });
          if (!isEditMode) {
            form.reset(defaultValues); // Reset form for new entry
            setSuggestedAITags([]); // Clear suggestions
          }
        } else {
          toast({
            title: "Error",
            description: `Failed to ${isEditMode ? 'update' : 'add'} tool. Please try again.`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Form submission error:", error);
        toast({
          title: "Error",
          description: `An unexpected error occurred. ${(error as Error).message}`,
          variant: "destructive",
        });
      }
    });
  };

  const handleSuggestCategories = async () => {
    const toolName = form.getValues('name');
    const toolDescription = form.getValues('brief_description');

    if (!toolName || !toolDescription) {
      toast({
        title: "Missing Information",
        description: "Please enter a tool name and brief description to get suggestions.",
        variant: "destructive",
      });
      return;
    }

    startSuggestTransition(async () => {
      try {
        const suggestions = await getAICategorySuggestions({ toolName, toolDescription });
        setSuggestedAITags(suggestions);
        toast({
          title: "AI Suggestions Ready!",
          description: `${suggestions.length} categories suggested. Review and select below.`,
        });
        
        // Attempt to pre-select categories based on suggestions
        const currentCategoryIds = form.getValues('category_ids') || [];
        const newCategoryIds = new Set<number>(currentCategoryIds);
        suggestions.forEach(suggestedName => {
          const matchedCategory = allCategories.find(cat => cat.name.toLowerCase() === suggestedName.toLowerCase());
          if (matchedCategory) {
            newCategoryIds.add(matchedCategory.id);
          }
        });
        form.setValue('category_ids', Array.from(newCategoryIds), { shouldValidate: true });

      } catch (error) {
        console.error("AI Suggestion error:", error);
        toast({
          title: "AI Suggestion Error",
          description: "Could not fetch AI category suggestions. Please try again or select manually.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">{isEditMode ? 'Edit Tool' : 'Add New AI Tool'}</CardTitle>
        <CardDescription>
          {isEditMode ? 'Update the details of the AI tool.' : 'Fill in the details of the new AI tool. Use the AI assistant for category suggestions!'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tool Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., IntelliWriter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/100x100.png" {...field} />
                  </FormControl>
                   <FormDescription>Provide a direct link to the tool's logo. Use https://placehold.co for placeholders.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brief_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A short summary of the tool (max 200 characters)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="detailed_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="More details about the tool, its features, and use cases." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pricing_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing Model</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pricingModels.map(model => (
                          <SelectItem key={model} value={model}>{model}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Web, iOS, API" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel>Categories</FormLabel>
              <Button type="button" variant="outline" size="sm" onClick={handleSuggestCategories} disabled={isSuggesting} className="mb-2 bg-accent text-accent-foreground hover:bg-accent/90">
                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Suggest Categories with AI
              </Button>
              {suggestedAITags.length > 0 && (
                <div className="p-3 bg-secondary/50 rounded-md text-sm">
                  <p className="font-medium mb-1">AI Suggested Tags:</p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {suggestedAITags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              )}
              <Controller
                control={form.control}
                name="category_ids"
                render={({ field }) => (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-md max-h-60 overflow-y-auto">
                    {allCategories.map((category) => (
                      <FormItem key={category.id} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(category.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), category.id]
                                : (field.value || []).filter((id) => id !== category.id);
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal text-sm">{category.name}</FormLabel>
                      </FormItem>
                    ))}
                  </div>
                )}
              />
               {form.formState.errors.category_ids && <p className="text-sm font-medium text-destructive">{form.formState.errors.category_ids.message}</p>}
              <FormDescription>Select all relevant categories. Use AI suggestions as a guide.</FormDescription>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Update Tool' : 'Add Tool'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ToolForm;
