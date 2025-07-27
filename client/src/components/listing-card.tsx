import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Listing } from "@shared/schema";

interface ListingCardProps {
  listing: Listing;
  onClick?: () => void;
}

const mockImages = {
  textbooks: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWNlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
  electronics: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
  notes: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
  calculator: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250"
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'textbooks':
      return 'bg-primary';
    case 'electronics':
      return 'bg-secondary';
    case 'notes':
      return 'bg-success';
    default:
      return 'bg-gray-500';
  }
};

const getImageForCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'textbooks':
      return mockImages.textbooks;
    case 'electronics':
      return mockImages.electronics;
    case 'notes':
      return mockImages.notes;
    default:
      return mockImages.textbooks;
  }
};

export default function ListingCard({ listing, onClick }: ListingCardProps) {
  const imageUrl = listing.images?.[0] || getImageForCategory(listing.category);
  
  return (
    <Card className="hover:shadow-lg transition cursor-pointer overflow-hidden" onClick={onClick}>
      <img
        src={imageUrl}
        alt={listing.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{listing.title}</h3>
        <p className="text-2xl font-bold text-primary mb-2">${listing.price}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.description}</p>
        <div className="flex items-center justify-between">
          <Badge className={`${getCategoryColor(listing.category)} text-white text-xs`}>
            {listing.category}
          </Badge>
          <span className="text-xs text-gray-500">{listing.university}</span>
        </div>
      </CardContent>
    </Card>
  );
}
