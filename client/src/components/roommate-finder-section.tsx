import { useQuery } from "@tanstack/react-query";
import { RoommateProfile, User } from "@shared/schema";
import RoommateCard from "./roommate-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface RoommateWithUser extends RoommateProfile {
  user?: User;
}

export default function RoommateFinderSection() {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  
  const { data: profiles, isLoading } = useQuery<RoommateProfile[]>({
    queryKey: ['/api/roommates'],
  });

  const handleMessage = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to send messages.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Message Feature",
      description: "Messaging system coming soon!",
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Find Your Perfect Roommate</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Connect with compatible students in your area. Create a profile and find someone who shares your lifestyle and study habits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Skeleton className="w-full h-64 rounded-xl" />
            </div>
            <div className="space-y-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex space-x-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredProfiles = profiles?.slice(0, 2) || [];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Find Your Perfect Roommate</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Connect with compatible students in your area. Create a profile and find someone who shares your lifestyle and study habits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern college dorm room"
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
          
          <div className="space-y-6">
            {featuredProfiles.length > 0 ? (
              featuredProfiles.map((profile) => (
                <div key={profile.id} className="bg-muted rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold">Student User</h4>
                      <p className="text-sm text-gray-600">University Student</p>
                    </div>
                  </div>
                  <h5 className="font-medium mb-2">{profile.title}</h5>
                  <p className="text-gray-700 mb-4 text-sm">{profile.description}</p>
                  {profile.preferences && profile.preferences.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile.preferences.slice(0, 3).map((pref, index) => (
                        <span key={index} className="bg-primary text-white text-xs px-2 py-1 rounded">
                          {pref}
                        </span>
                      ))}
                    </div>
                  )}
                  <button 
                    onClick={handleMessage}
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <span className="mr-2">✉</span>Send Message
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">No roommate profiles yet</h3>
                <p className="text-gray-600">Be the first to create a roommate profile!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
