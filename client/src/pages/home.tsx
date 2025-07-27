import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import CategoriesSection from "@/components/categories-section";
import FeaturedListings from "@/components/featured-listings";
import RoommateFinderSection from "@/components/roommate-finder-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function CreateListingCTA() {
  return (
    <section className="py-16 secondary-gradient text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Selling?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of students already using ClassifiedU to buy, sell, and connect with their campus community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100 hover:text-secondary">
            <Link href="/sell">Create Listing</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-secondary">
            <Link href="/roommates">Join as Roommate</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { label: "Active Listings", value: "5,247" },
    { label: "Students Registered", value: "12,438" },
    { label: "Universities", value: "147" },
    { label: "Total Savings", value: "$2.4M" }
  ];

  return (
    <section className="py-20 university-bg text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Join the Community</h2>
          <p className="text-xl opacity-90">See what makes ClassifiedU the top choice for students</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.label} className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-5xl font-bold mb-3 text-orange-300">{stat.value}</div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedListings />
      <RoommateFinderSection />
      <CreateListingCTA />
      <StatsSection />
      <Footer />
    </div>
  );
}
