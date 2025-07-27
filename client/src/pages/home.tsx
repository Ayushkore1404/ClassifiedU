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
          <Button asChild size="lg" className="bg-white text-secondary hover:bg-gray-100">
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
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
