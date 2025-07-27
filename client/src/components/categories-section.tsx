import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Book, Laptop, StickyNote, Users } from "lucide-react";

const categories = [
  {
    name: "Textbooks",
    description: "Find affordable textbooks for your courses",
    icon: Book,
    color: "bg-primary",
    href: "/browse?category=textbooks"
  },
  {
    name: "Electronics", 
    description: "Laptops, tablets, calculators & more",
    icon: Laptop,
    color: "bg-secondary",
    href: "/browse?category=electronics"
  },
  {
    name: "Study Notes",
    description: "Share and access quality study materials", 
    icon: StickyNote,
    color: "bg-success",
    href: "/browse?category=notes"
  },
  {
    name: "Roommates",
    description: "Find compatible roommates nearby",
    icon: Users,
    color: "bg-purple-500",
    href: "/roommates"
  }
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What are you looking for?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="vibrant-card hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full transform hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-gray-800">{category.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
