import { useState, useEffect } from "react";
import { Book, Users, Home, ShoppingBag, Laptop, Coffee } from "lucide-react";

interface FloatingCard {
  icon: React.ReactNode;
  title: string;
  color: string;
  delay: number;
}

const floatingCards: FloatingCard[] = [
  {
    icon: <Book className="w-6 h-6" />,
    title: "Textbooks",
    color: "from-blue-500 to-blue-600",
    delay: 0
  },
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Electronics",
    color: "from-purple-500 to-purple-600",
    delay: 0.5
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Furniture",
    color: "from-green-500 to-green-600",
    delay: 1
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Roommates",
    color: "from-coral-500 to-coral-600",
    delay: 1.5
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "Supplies",
    color: "from-indigo-500 to-indigo-600",
    delay: 2
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "Lifestyle",
    color: "from-amber-500 to-amber-600",
    delay: 2.5
  }
];

export default function FloatingCards({ className = "" }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative h-64 ${className}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg rounded-3xl shadow-strong"></div>
      
      {/* Floating Cards */}
      <div className="relative h-full p-6 overflow-hidden">
        {floatingCards.map((card, index) => (
          <div
            key={card.title}
            className={`absolute transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{
              transitionDelay: `${card.delay}s`,
              left: `${15 + (index % 3) * 30}%`,
              top: `${20 + Math.floor(index / 3) * 35}%`,
              animation: isVisible ? `float-${index} 6s ease-in-out infinite` : undefined,
              animationDelay: `${card.delay}s`
            }}
          >
            <div className={`bg-gradient-to-br ${card.color} p-3 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 hover:scale-110 cursor-pointer group`}>
              <div className="text-white group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
            </div>
            <p className="text-xs font-medium text-white/90 mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {card.title}
            </p>
          </div>
        ))}

        {/* Central "NEW" Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-coral-500 text-white text-xs font-bold rounded-full animate-pulse shadow-medium">
          NEW
        </div>

        {/* Stats Counter */}
        <div className="absolute bottom-4 left-4 text-white/90">
          <div className="text-2xl font-bold">50K+</div>
          <div className="text-xs opacity-80">Active Users</div>
        </div>
      </div>


    </div>
  );
}
