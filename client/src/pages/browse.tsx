import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Listing } from "@shared/schema";
import Navbar from "@/components/navbar";
import ListingCard from "@/components/listing-card";
import Footer from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";

export default function Browse() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const categoryFromUrl = urlParams.get('category') || '';
  const searchFromUrl = urlParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || 'all');
  const [priceRange, setPriceRange] = useState<string>('any');

  const { data: listings, isLoading } = useQuery<Listing[]>({
    queryKey: ['/api/listings'],
  });

  const filteredListings = listings?.filter(listing => {
    const matchesSearch = !searchQuery || 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === 'all' ||
      listing.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesPrice = !priceRange || priceRange === 'any' || (() => {
      switch (priceRange) {
        case 'under-50':
          return listing.price < 50;
        case '50-100':
          return listing.price >= 50 && listing.price <= 100;
        case '100-500':
          return listing.price > 100 && listing.price <= 500;
        case 'over-500':
          return listing.price > 500;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesCategory && matchesPrice;
  }) || [];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange('any');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Browse Marketplace</h1>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="textbooks">Textbooks</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="notes">Study Notes</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Price</SelectItem>
                <SelectItem value="under-50">Under $50</SelectItem>
                <SelectItem value="50-100">$50 - $100</SelectItem>
                <SelectItem value="100-500">$100 - $500</SelectItem>
                <SelectItem value="over-500">Over $500</SelectItem>
              </SelectContent>
            </Select>
            
            {(searchQuery || (selectedCategory && selectedCategory !== 'all') || (priceRange && priceRange !== 'any')) && (
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="mr-2" size={16} />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'} found
          </p>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || (selectedCategory && selectedCategory !== 'all') || (priceRange && priceRange !== 'any')
                ? "Try adjusting your filters or search terms"
                : "Be the first to post an item!"
              }
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
