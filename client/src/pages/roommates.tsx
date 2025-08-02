import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RoommateProfile,
  User,
  insertRoommateProfileSchema,
  InsertRoommateProfile,
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";
import RoommateCard from "@/components/roommate-card";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { RoommateCardSkeleton } from "@/components/loading-skeleton";
import { Plus, Users, Search, X } from "lucide-react";

interface RoommateWithUser extends RoommateProfile {
  user?: User;
}

export default function Roommates() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPreferences, setCurrentPreferences] = useState<string[]>([]);
  const [newPreference, setNewPreference] = useState("");

  const { data: profiles, isLoading: profilesLoading } = useQuery<
    RoommateWithUser[]
  >({
    queryKey: ["/api/roommates"],
  });

  const { data: userProfile } = useQuery<RoommateProfile>({
    queryKey: ["/api/users", user?.id, "roommate"],
    enabled: !!user,
  });

  const form = useForm<InsertRoommateProfile>({
    resolver: zodResolver(insertRoommateProfileSchema),
    defaultValues: {
      title: "",
      description: "",
      preferences: [],
      budget: undefined,
      moveInDate: "",
      location: "",
      contactInfo: "",
      isActive: true,
    },
  });

  const createProfileMutation = useMutation({
    mutationFn: async (data: InsertRoommateProfile & { userId: string }) => {
      const response = await apiRequest("POST", "/api/roommates", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/roommates"] });
      queryClient.invalidateQueries({
        queryKey: ["/api/users", user?.id, "roommate"],
      });
      toast({
        title: "Success!",
        description: "Your roommate profile has been created.",
      });
      setIsCreateDialogOpen(false);
      form.reset();
      setCurrentPreferences([]);
    },
    onError: (error: Error) => {
      console.error("Profile creation error:", error);
      let errorMessage = "Failed to create profile. Please try again.";

      // Handle specific error cases
      if (error.message.includes("duplicate")) {
        errorMessage =
          "You already have a roommate profile. Please edit your existing profile instead.";
      } else if (error.message.includes("validation")) {
        errorMessage = "Please check your form data and try again.";
      } else if (error.message.includes("network")) {
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      toast({
        title: "Error Creating Profile",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: InsertRoommateProfile & { id: number }) => {
      const response = await apiRequest("PUT", `/api/roommates/${data.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/roommates"] });
      queryClient.invalidateQueries({
        queryKey: ["/api/users", user?.id, "roommate"],
      });
      toast({
        title: "Success!",
        description: "Your roommate profile has been updated.",
      });
      setIsEditDialogOpen(false);
      form.reset();
      setCurrentPreferences([]);
    },
    onError: (error: Error) => {
      console.error("Profile update error:", error);
      toast({
        title: "Error Updating Profile",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleMessage = () => {
    if (!user) {
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

  const addPreference = () => {
    if (
      newPreference.trim() &&
      !currentPreferences.includes(newPreference.trim())
    ) {
      const updatedPreferences = [...currentPreferences, newPreference.trim()];
      setCurrentPreferences(updatedPreferences);
      form.setValue("preferences", updatedPreferences);
      setNewPreference("");
    }
  };

  const removePreference = (pref: string) => {
    setCurrentPreferences(currentPreferences.filter((p) => p !== pref));
  };

  const handleEditProfile = () => {
    if (!userProfile) return;
    
    // Populate form with existing data
    form.reset({
      title: userProfile.title || "",
      description: userProfile.description || "",
      preferences: userProfile.preferences || [],
      budget: userProfile.budget || undefined,
      moveInDate: userProfile.moveInDate || "",
      location: userProfile.location || "",
      contactInfo: userProfile.contactInfo || "",
      isActive: userProfile.isActive ?? true,
    });
    
    // Set current preferences for the UI
    setCurrentPreferences(userProfile.preferences || []);
    setIsEditDialogOpen(true);
  };

  const onSubmit = (data: InsertRoommateProfile) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to create a roommate profile.",
        variant: "destructive",
      });
      return;
    }

    // Frontend validation
    if (!data.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a title for your profile.",
        variant: "destructive",
      });
      return;
    }

    if (!data.description?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a description for your profile.",
        variant: "destructive",
      });
      return;
    }

    if (!data.contactInfo?.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide contact information.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactInfo)) {
      toast({
        title: "Validation Error",
        description: "Please provide a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Determine if this is an edit or create operation
    if (isEditDialogOpen && userProfile) {
      // Update existing profile
      updateProfileMutation.mutate({
        ...data,
        id: Number(userProfile.id),
      });
    } else {
      // Create new profile
      createProfileMutation.mutate({
        ...data,
        userId: user.id,
      });
    }
  };

  const filteredProfiles =
    profiles?.filter((profile) => {
      if (!searchQuery) return true;
      return (
        profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Find Your Perfect Roommate
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with compatible students in your area. Create a profile and
            find someone who shares your lifestyle and study habits.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Input
              type="text"
              placeholder="Search roommate profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          {user && !userProfile && (
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2" size={16} />
                  Create Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Roommate Profile</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Looking for a clean and quiet roommate"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell potential roommates about yourself, your lifestyle, and what you're looking for..."
                              className="min-h-[100px]"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Preferences
                      </label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a preference (e.g., Non-smoker, Clean, Quiet)"
                          value={newPreference}
                          onChange={(e) => setNewPreference(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addPreference())
                          }
                        />
                        <Button type="button" onClick={addPreference} size="sm">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentPreferences.map((pref) => (
                          <Badge
                            key={pref}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {pref}
                            <X
                              size={12}
                              className="cursor-pointer hover:text-red-500"
                              onClick={() => removePreference(pref)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget (per month)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="800"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value) || null)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="moveInDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Move-in Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Near campus, downtown, etc."
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Information *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@university.edu"
                              aria-describedby="contact-description"
                              required
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <p
                            id="contact-description"
                            className="text-sm text-gray-500 mt-1"
                          >
                            Provide a valid email address for potential
                            roommates to contact you
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createProfileMutation.isPending}
                    >
                      {createProfileMutation.isPending
                        ? "Creating..."
                        : "Create Profile"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}

          {/* Edit Profile Dialog */}
          {user && userProfile && (
            <Dialog
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
            >
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Roommate Profile</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Looking for a clean and quiet roommate"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell potential roommates about yourself, your lifestyle, and what you're looking for..."
                              className="min-h-[100px]"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Preferences
                      </label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a preference (e.g., Non-smoker, Clean, Quiet)"
                          value={newPreference}
                          onChange={(e) => setNewPreference(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addPreference())
                          }
                        />
                        <Button type="button" onClick={addPreference} size="sm">
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentPreferences.map((pref) => (
                          <Badge
                            key={pref}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {pref}
                            <X
                              size={12}
                              className="cursor-pointer hover:text-red-500"
                              onClick={() => removePreference(pref)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget (per month)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="800"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value) || null)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="moveInDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Move-in Date</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Near campus, Downtown, etc."
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Information *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@university.edu"
                              aria-describedby="contact-description"
                              required
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <p
                            id="contact-description"
                            className="text-sm text-gray-500 mt-1"
                          >
                            Provide a valid email address for potential
                            roommates to contact you
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending
                        ? "Updating..."
                        : "Update Profile"}
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Current User's Profile */}
        {user && userProfile && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold mb-2">{userProfile.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {userProfile.description}
                    </p>
                    {userProfile.preferences &&
                      userProfile.preferences.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {userProfile.preferences.map((pref, index) => (
                            <Badge key={index} variant="secondary">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      )}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleEditProfile}>
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profiles Grid */}
        {profilesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <RoommateCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <RoommateCard
                key={profile.id}
                profile={profile}
                user={profile.user}
                onMessage={handleMessage}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No profiles found" : "No roommate profiles yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Be the first to create a roommate profile!"}
            </p>
            {!searchQuery && user && !userProfile && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2" size={16} />
                Create Profile
              </Button>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
