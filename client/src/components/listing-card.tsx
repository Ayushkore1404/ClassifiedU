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
      return 'bg-indigo-500';
    case 'electronics':
      return 'bg-cyan-500';
    case 'notes':
      return 'bg-emerald-500';
    default:
      return 'bg-slate-500';
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
    <Card className="vibrant-card hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-2" onClick={onClick}>
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 text-foreground">{listing.title}</h3>
        <p className="text-3xl font-bold text-primary mb-3">${listing.price}</p>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{listing.description}</p>
        <div className="flex items-center justify-between">
          <Badge className={`${getCategoryColor(listing.category)} text-white text-xs px-3 py-1 rounded-full font-medium`}>
            {listing.category}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">{listing.university}</span>
        </div>
      </CardContent>
    </Card>
  );
}
