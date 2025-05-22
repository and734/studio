import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, SearchCheck } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <SearchCheck className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl mb-6">
        Welcome to <span className="text-primary">IntelliFind</span>!
      </h1>
      <p className="max-w-2xl text-xl text-muted-foreground mb-10">
        Your ultimate compendium for discovering, comparing, and exploring the cutting edge of Artificial Intelligence tools and applications.
      </p>
      
      <div className="mb-12">
        <Link href="/tools">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            Explore AI Tools
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-12">
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-primary mb-3">Curated Directory</h3>
          <p className="text-muted-foreground">Hand-picked and verified AI tools across diverse categories.</p>
        </div>
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-primary mb-3">Detailed Insights</h3>
          <p className="text-muted-foreground">Comprehensive information including features, pricing, and platforms.</p>
        </div>
        <div className="bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-primary mb-3">AI-Powered Suggestions</h3>
          <p className="text-muted-foreground">Smart category recommendations for new tool submissions.</p>
        </div>
      </div>
      
      <div className="mt-20 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-foreground mb-6">Featured Tool Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Generative AI', 'NLP', 'Computer Vision', 'Content Creation', 'Marketing'].map(cat => (
            <Link key={cat} href={`/tools?category=${encodeURIComponent(cat)}`}>
              <Button variant="outline" className="hover:bg-secondary">
                {cat}
              </Button>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="mt-16">
          <Image 
            src="https://placehold.co/800x400.png" 
            alt="Abstract AI visualization" 
            width={800} 
            height={400} 
            className="rounded-lg shadow-2xl"
            data-ai-hint="abstract technology"
          />
      </div>
    </div>
  );
}
