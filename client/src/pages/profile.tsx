import { useQuery } from "@tanstack/react-query";
import { Listing } from "@shared/schema";
import { useAuth } from "@/contexts/auth-context";
import Navbar from "@/components/navbar";
import ListingCard from "@/components/listing-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useLocation } from "wouter";
import { User, MapPin, Calendar, BookOpen, Plus } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: userListings, isLoading: listingsLoading } = useQuery<Listing[]>({
    queryKey: ['/api/users', user?.id, 'listings'],
    enabled: !!user,
  });

  if (!user) {
    setLocation("/login");
    return null;
  }

  const activeListings = userListings?.filter(listing => listing.isActive) || [];
  const soldListings = userListings?.filter(listing => !listing.isActive) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback className="text-xl">
                  {user.firstName[0]}{user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600 mb-4">@{user.username}</p>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-1" size={16} />
                    {user.university}
                  </div>
                  {user.major && (
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="mr-1" size={16} />
                      {user.major}
                    </div>
                  )}
                  {user.year && (
                    <Badge variant="secondary">{user.year}</Badge>
                  )}
                </div>
                
                {user.bio && (
                  <p className="text-gray-700 mb-4">{user.bio}</p>
                )}
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    <User className="mr-2" size={16} />
                    Edit Profile
                  </Button>
                  <Button asChild>
                    <Link href="/sell">
                      <Plus className="mr-2" size={16} />
                      Create Listing
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {activeListings.length}
              </div>
              <div className="text-gray-600">Active Listings</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">
                {soldListings.length}
              </div>
              <div className="text-gray-600">Items Sold</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                {user.createdAt ? new Date(user.createdAt).getFullYear() : new Date().getFullYear()}
              </div>
              <div className="text-gray-600">Member Since</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Listings */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Your Active Listings</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/sell">
                  <Plus className="mr-2" size={16} />
                  Add New
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {listingsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
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
            ) : activeListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No active listings</h3>
                <p className="text-gray-600 mb-4">Start selling by creating your first listing!</p>
                <Button asChild>
                  <Link href="/sell">
                    <Plus className="mr-2" size={16} />
                    Create First Listing
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sold Items */}
        {soldListings.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Sold Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldListings.map((listing) => (
                  <div key={listing.id} className="relative">
                    <ListingCard listing={listing} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                      <Badge className="bg-success text-white text-lg px-4 py-2">
                        SOLD
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
