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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What are you looking for?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="hover:shadow-lg transition cursor-pointer group h-full">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition`}>
                    <category.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
