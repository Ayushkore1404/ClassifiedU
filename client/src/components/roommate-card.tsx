import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { RoommateProfile, User } from "@shared/schema";

interface RoommateCardProps {
  profile: RoommateProfile;
  user?: User;
  onMessage?: () => void;
}

export default function RoommateCard({ profile, user, onMessage }: RoommateCardProps) {
  const initials = user ? `${user.firstName[0]}${user.lastName[0]}` : "??";
  const name = user ? `${user.firstName} ${user.lastName}` : "Unknown User";
  const program = user ? `${user.major || "Unknown Major"}, ${user.year || "Unknown Year"}` : "Unknown Program";

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.avatar || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-600">{program}</p>
          </div>
        </div>
        
        <h5 className="font-medium mb-2">{profile.title}</h5>
        <p className="text-gray-700 mb-4 text-sm line-clamp-3">{profile.description}</p>
        
        {profile.preferences && profile.preferences.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.preferences.slice(0, 3).map((pref, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {pref}
              </Badge>
            ))}
            {profile.preferences.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.preferences.length - 3} more
              </Badge>
            )}
          </div>
        )}
        
        {profile.budget && (
          <p className="text-sm text-gray-600 mb-4">Budget: ${profile.budget}/month</p>
        )}
        
        <Button onClick={onMessage} className="w-full">
          <MessageCircle className="mr-2" size={16} />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
}
