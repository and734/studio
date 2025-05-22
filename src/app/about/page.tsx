import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <section className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary mb-6">About IntelliFind</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          IntelliFind is your premier destination for discovering and exploring the vast world of Artificial Intelligence tools. We aim to simplify your search for the perfect AI solution.
        </p>
      </section>

      <section>
        <Image 
          src="https://placehold.co/1200x400.png" 
          alt="Team working on AI projects" 
          width={1200} 
          height={400} 
          className="rounded-xl shadow-2xl object-cover"
          data-ai-hint="team collaboration"
        />
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <Target className="w-12 h-12 text-accent mb-3" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide a comprehensive, curated, and easy-to-navigate directory of AI tools, empowering users to find the best solutions for their specific needs.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <Lightbulb className="w-12 h-12 text-accent mb-3" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be the leading platform for AI tool discovery, fostering innovation and accessibility in the rapidly evolving field of artificial intelligence.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <Users className="w-12 h-12 text-accent mb-3" />
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We are a passionate team of AI enthusiasts and developers dedicated to making AI technology more understandable and accessible to everyone.
            </p>
          </CardContent>
        </Card>
      </section>
      
      <section className="text-center py-10 bg-secondary/40 rounded-xl">
        <h2 className="text-3xl font-semibold text-foreground mb-4">Join Our Community</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Stay updated with the latest AI tools and trends. Suggest a tool or provide feedback to help us grow.
        </p>
        {/* Add Call to action buttons or links here if needed */}
      </section>
    </div>
  );
}
