import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ImageCarousel from "@/components/image-carousel";
import FloatingCards from "@/components/floating-cards";
import UniversityIllustration from "@/components/university-illustration";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-24 relative overflow-hidden">
      <div className="floating-shapes"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              🎓 Trusted by 50,000+ Students
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Your Campus Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed font-light">
              Buy, sell, and rent academic materials. Find the perfect roommate. 
              All within your university community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button asChild size="lg" className="font-semibold px-10 py-6 text-lg rounded-2xl bg-white text-ocean-600 hover:bg-blue-50 shadow-strong hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="/browse">🔍 Start Browsing</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold px-10 py-6 text-lg rounded-2xl border-2 border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-medium hover:shadow-strong">
                <Link href="/sell">✨ Post Your First Item</Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Verified Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Secure Payments</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in">
            <div className="grid gap-6">
              {/* Modern floating cards */}
              <FloatingCards className="" />
              
              {/* Automatic sliding image carousel */}
              <ImageCarousel className="" />
            </div>
            
            {/* Modern floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-coral-400 to-coral-600 rounded-3xl opacity-80 animate-pulse shadow-medium"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-br from-ocean-400 to-ocean-600 rounded-2xl opacity-70 animate-bounce shadow-medium"></div>
            <div className="absolute top-1/2 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
