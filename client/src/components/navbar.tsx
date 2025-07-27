import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GraduationCap, Search, Plus, Bell, MessageCircle, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

export default function Navbar() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold text-primary">ClassifiedU</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search books, electronics, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </form>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-gray-700 hover:text-primary font-medium">
              Browse
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-primary font-medium">
              Sell
            </Link>
            <Link href="/roommates" className="text-gray-700 hover:text-primary font-medium">
              Roommates
            </Link>
            
            {user ? (
              <>
                <Button asChild>
                  <Link href="/sell">
                    <Plus className="mr-2" size={16} />
                    Post Listing
                  </Link>
                </Button>
                
                <div className="flex items-center space-x-3">
                  <Bell className="text-gray-600 cursor-pointer hover:text-primary" size={20} />
                  <MessageCircle className="text-gray-600 cursor-pointer hover:text-primary" size={20} />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar || ""} />
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2" size={16} />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2" size={16} />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </form>
                  
                  <Link href="/browse" className="text-gray-700 hover:text-primary font-medium">
                    Browse
                  </Link>
                  <Link href="/sell" className="text-gray-700 hover:text-primary font-medium">
                    Sell
                  </Link>
                  <Link href="/roommates" className="text-gray-700 hover:text-primary font-medium">
                    Roommates
                  </Link>
                  
                  {user ? (
                    <>
                      <Link href="/profile" className="text-gray-700 hover:text-primary font-medium">
                        Profile
                      </Link>
                      <Button onClick={handleLogout} variant="outline" className="justify-start">
                        <LogOut className="mr-2" size={16} />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
