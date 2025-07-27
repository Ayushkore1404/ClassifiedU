import { useQuery } from "@tanstack/react-query";
import { Listing } from "@shared/schema";
import ListingCard from "./listing-card";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedListings() {
  const { data: listings, isLoading } = useQuery<Listing[]>({
    queryKey: ['/api/listings'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Link href="/browse" className="text-primary font-semibold hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredListings = listings?.slice(0, 4) || [];

  return (
    <section className="py-16 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Listings</h2>
          <Link href="/browse" className="text-primary font-semibold hover:underline">
            View All
          </Link>
        </div>
        
        {featuredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-4">Be the first to post an item!</p>
            <Link href="/sell" className="text-primary font-semibold hover:underline">
              Create a listing →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
