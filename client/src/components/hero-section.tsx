import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import UniversityIllustration from "@/components/university-illustration";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20 relative overflow-hidden">
      <div className="floating-shapes"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Campus Marketplace
            </h1>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Buy, sell, and rent academic materials. Find the perfect roommate. 
              All within your university community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="white" className="font-semibold px-8 py-4 rounded-xl shadow-lg">
                <Link href="/browse">Start Browsing</Link>
              </Button>
              <Button asChild size="lg" variant="transparent" className="font-semibold px-8 py-4 rounded-xl">
                <Link href="/sell">Post Your First Item</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="grid gap-6">
              {/* Custom University Illustration */}
              <div className="relative rounded-2xl overflow-hidden bg-white/10 p-4">
                <UniversityIllustration className="h-64" />
              </div>
              
              {/* Real Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400"
                  alt="College students studying together"
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-400 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-teal-400 rounded-full opacity-70 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
