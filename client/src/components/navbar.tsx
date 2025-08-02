import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Plus, Bell, MessageCircle, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <nav className="bg-background/98 dark:bg-background/98 backdrop-blur-lg border-b border-border/50 shadow-soft sticky top-0 z-50 supports-[backdrop-filter]:bg-background/80 dark:supports-[backdrop-filter]:bg-background/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-strong transition-all duration-300 group-hover:scale-105">
              <Logo size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-coral-500 bg-clip-text text-transparent">
              ClassifiedU
            </span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search books, electronics, notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-ocean-400 focus:ring-ocean-400/20 bg-white/80 backdrop-blur-sm shadow-soft text-base placeholder:text-gray-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Button 
                type="submit" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ocean-500 hover:bg-ocean-600 text-white rounded-xl px-4 py-2 shadow-medium hover:shadow-strong transition-all duration-200"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-foreground/80 dark:text-foreground/90 hover:text-ocean-600 dark:hover:text-ocean-400 font-medium transition-colors duration-200 hover:scale-105 transform">
              Browse
            </Link>
            <Link href="/sell" className="text-foreground/80 dark:text-foreground/90 hover:text-coral-500 dark:hover:text-coral-400 font-medium transition-colors duration-200 hover:scale-105 transform">
              Sell
            </Link>
            <Link href="/roommates" className="text-foreground/80 dark:text-foreground/90 hover:text-ocean-600 dark:hover:text-ocean-400 font-medium transition-colors duration-200 hover:scale-105 transform">
              Roommates
            </Link>
            
            <ThemeToggle />
            
            {user ? (
              <>
                <Button asChild className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-medium hover:shadow-strong transition-all duration-300 rounded-xl px-6 py-2">
                  <Link href="/sell">
                    <Plus className="mr-2" size={16} />
                    Post Listing
                  </Link>
                </Button>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Bell className="text-foreground/70 dark:text-foreground/80 cursor-pointer hover:text-ocean-500 dark:hover:text-ocean-400 transition-colors duration-200 hover:scale-110 transform" size={20} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral-500 rounded-full animate-pulse"></div>
                  </div>
                  <MessageCircle className="text-foreground/70 dark:text-foreground/80 cursor-pointer hover:text-ocean-500 dark:hover:text-ocean-400 transition-colors duration-200 hover:scale-110 transform" size={20} />
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="w-10 h-10 ring-2 ring-ocean-200 hover:ring-ocean-400 transition-all duration-200">
                        <AvatarImage src={user.avatar || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-ocean-500 to-ocean-600 text-white font-semibold">
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-strong rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                      <DropdownMenuItem asChild className="rounded-xl m-1">
                        <Link href="/profile" className="flex items-center px-3 py-2 hover:bg-ocean-50 dark:hover:bg-ocean-900/30 text-foreground">
                          <User className="mr-3 text-ocean-500 dark:text-ocean-400" size={16} />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout} className="rounded-xl m-1 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400">
                        <LogOut className="mr-3" size={16} />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="outline" asChild className="border-2 border-ocean-200 text-ocean-600 hover:bg-ocean-50 rounded-xl px-6 py-2 font-medium transition-all duration-200">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white shadow-medium hover:shadow-strong transition-all duration-300 rounded-xl px-6 py-2">
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
