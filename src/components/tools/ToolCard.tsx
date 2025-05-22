import Link from 'next/link';
import Image from 'next/image';
import type { Tool } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Tag, Briefcase, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl">
      <CardHeader className="p-4">
        <div className="flex items-start gap-4">
          <Image
            src={tool.logo_url || `https://placehold.co/64x64.png?text=${tool.name[0]}`}
            alt={`${tool.name} logo`}
            width={64}
            height={64}
            className="rounded-md border"
            data-ai-hint="logo company"
          />
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-primary mb-1 leading-tight">
              <Link href={`/tools/${tool.id}`} className="hover:underline">
                {tool.name}
              </Link>
            </CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
               <CircleDollarSign className="w-3 h-3 mr-1" /> {tool.pricing_model}
               <span className="mx-1.5">·</span> 
               <Briefcase className="w-3 h-3 mr-1" /> {tool.platform || 'N/A'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground mb-3 h-20 overflow-hidden line-clamp-4">
          {tool.brief_description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-xs font-medium text-foreground">
            <Tag className="w-3.5 h-3.5 mr-1.5 text-primary" />
            Categories:
          </div>
          <div className="flex flex-wrap gap-2">
            {tool.categories.slice(0, 3).map((category) => (
              <Badge key={category.id} variant="secondary" className="text-xs">
                {category.name}
              </Badge>
            ))}
            {tool.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.categories.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30">
        <Button asChild variant="default" size="sm" className="w-full bg-primary hover:bg-primary/90">
          <Link href={`/tools/${tool.id}`} className="flex items-center justify-center">
            View Details
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
