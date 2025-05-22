const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p>&copy; {new Date().getFullYear()} IntelliFind. All rights reserved.</p>
        <p className="text-sm mt-1">Discover the future of AI, today.</p>
      </div>
    </footer>
  );
};

export default Footer;
