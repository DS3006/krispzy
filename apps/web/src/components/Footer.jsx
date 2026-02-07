import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Welcome to the family! 🌿",
        description: "You've successfully subscribed to our artisanal newsletter.",
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-warm-brown text-cream relative overflow-hidden">
      {/* Decorative Image Strip */}
      <div className="h-24 w-full relative overflow-hidden opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1614061811009-82760cd2e83b" 
          alt="Healthy snack assortment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-brown/50 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-accent-gold font-serif">Artisan Snacks</h3>
            <p className="text-cream/80 mb-6 leading-relaxed">
              Handcrafted healthy snacks made with love and premium ingredients. 
              We believe in simple, honest food that nourishes the body and soul.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent-gold hover:text-warm-brown transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent-gold hover:text-warm-brown transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent-gold hover:text-warm-brown transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-gold uppercase tracking-wider">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-cream/70 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-cream/70 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Shop Collection
                </Link>
              </li>
              <li>
                <a href="#about" className="text-cream/70 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-cream/70 hover:text-white hover:translate-x-1 transition-all inline-block">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-gold uppercase tracking-wider">Visit Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream/70">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-1 text-sage-green" />
                <span>123 Artisan Street,<br/>Snack City, SC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70">
                <Phone className="h-5 w-5 flex-shrink-0 text-sage-green" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70">
                <Mail className="h-5 w-5 flex-shrink-0 text-sage-green" />
                <span>hello@artisansnacks.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-gold uppercase tracking-wider">Stay Updated</h4>
            <p className="text-cream/70 mb-4">
              Join our community for exclusive recipes and offers!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-accent-gold transition-all"
                  required
                />
              </div>
              <Button type="submit" className="bg-accent-gold hover:bg-accent-gold/90 text-warm-brown font-bold py-6">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-sm">
            © 2026 Artisan Snacks. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-cream/40">
            <a href="#" className="hover:text-cream transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;