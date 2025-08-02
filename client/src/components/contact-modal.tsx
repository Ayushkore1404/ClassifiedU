import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, X } from "lucide-react";
// Note: Using alert for now, can be replaced with proper toast library
// import { toast } from "sonner";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("Message sent successfully! We'll get back to you within 24 hours.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      onClose();
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-coral-500 bg-clip-text text-transparent">
            Contact Us
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Have questions about ClassifiedU? We're here to help! Reach out to us through any of the channels below.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-ocean-100 dark:bg-ocean-900 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-ocean-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-300">support@classifiedu.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-coral-100 dark:bg-coral-900 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-coral-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Office</p>
                  <p className="text-gray-600 dark:text-gray-300">123 University Ave<br />College Town, CT 12345</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-ocean-50 to-coral-50 dark:from-ocean-950 dark:to-coral-950 p-4 rounded-lg border border-ocean-200 dark:border-ocean-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                🎓 Student Support Hours
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Monday - Friday: 9:00 AM - 8:00 PM<br />
                Saturday - Sunday: 10:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="your.email@university.edu"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 min-h-[120px]"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-ocean-600 to-coral-500 hover:from-ocean-700 hover:to-coral-600 text-white font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </div>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-6"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
