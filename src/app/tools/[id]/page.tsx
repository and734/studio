import { fetchToolById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, ExternalLink, Tag, Briefcase, CircleDollarSign, Info, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default async function ToolDetailPage({ params }: { params: { id: string } }) {
  const toolId = parseInt(params.id, 10);
  if (isNaN(toolId)) {
    notFound();
  }

  const tool = await fetchToolById(toolId);

  if (!tool) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/tools">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl rounded-xl">
        <CardHeader className="p-6 bg-secondary/30">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Image
              src={tool.logo_url || `https://placehold.co/128x128.png?text=${tool.name[0]}`}
              alt={`${tool.name} logo`}
              width={128}
              height={128}
              className="rounded-lg border-2 border-border object-cover"
              data-ai-hint="logo software"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary mb-2">{tool.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{tool.brief_description}</p>
              <Button asChild variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon={<CircleDollarSign />} title="Pricing Model" value={tool.pricing_model} />
            <InfoCard icon={<Briefcase />} title="Platform" value={tool.platform || 'N/A'} />
            <InfoCard icon={<CalendarDays />} title="Date Added" value={new Date(tool.date_added).toLocaleDateString()} />
            <InfoCard icon={<CalendarDays />} title="Last Updated" value={new Date(tool.last_updated).toLocaleDateString()} />
          </div>
          
          <Separator />

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center">
              <Info className="mr-2 h-6 w-6 text-primary" /> Detailed Description
            </h2>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {tool.detailed_description || 'No detailed description available.'}
            </p>
          </div>

          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-3 flex items-center">
              <Tag className="mr-2 h-6 w-6 text-primary" /> Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {tool.categories.map((category) => (
                <Link key={category.id} href={`/tools?category=${category.id}`}>
                  <Badge variant="secondary" className="text-sm px-3 py-1 hover:bg-muted transition-colors cursor-pointer">
                    {category.name} <span className="ml-1.5 text-xs opacity-70">({category.type.replace('_', ' ')})</span>
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => (
  <div className="bg-secondary/50 p-4 rounded-lg flex items-start">
    <div className="text-primary mr-3 mt-1 shrink-0">{React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}</div>
    <div>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-md font-semibold text-foreground">{value}</p>
    </div>
  </div>
);
