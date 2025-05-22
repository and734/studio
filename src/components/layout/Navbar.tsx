import Link from 'next/link';
import { Briefcase, Home, Info, LayoutDashboard, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <Search className="h-7 w-7 text-accent" />
          <span>IntelliFind</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="flex items-center gap-1 hover:text-accent transition-colors">
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link href="/tools" className="flex items-center gap-1 hover:text-accent transition-colors">
            <Briefcase className="h-5 w-5" />
            Browse Tools
          </Link>
          <Link href="/about" className="flex items-center gap-1 hover:text-accent transition-colors">
            <Info className="h-5 w-5" />
            About
          </Link>
          <Link href="/admin" className="flex items-center gap-1 hover:text-accent transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Admin
          </Link>
        </nav>
        {/* TODO: Mobile Menu Trigger */}
      </div>
    </header>
  );
};

export default Navbar;
