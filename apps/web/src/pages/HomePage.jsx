import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Leaf, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductsList from '@/components/ProductsList';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Artisan Snacks - Handcrafted Healthy Chips & Treats</title>
        <meta name="description" content="Discover our artisanal healthy snacks crafted with care using premium ingredients. Homemade quality chips, nuts, and dried fruits delivered to your door." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1534882406436-6b6b0152efae)',
            backgroundPosition: 'center 40%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-brown/90 via-warm-brown/70 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block py-1 px-3 rounded-full bg-accent-gold/20 border border-accent-gold/50 text-accent-gold font-semibold mb-6 backdrop-blur-sm"
            >
              Est. 2024 • Small Batch Quality
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight drop-shadow-xl"
            >
              Artisanal <br/>
              <span className="text-accent-gold">Crispy Perfection</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl mb-10 max-w-2xl text-cream/90 font-light leading-relaxed drop-shadow-md"
            >
              Experience the crunch of our handmade vegetable chips and healthy snacks. 
              Crafted from farm-fresh ingredients with zero artificial preservatives.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <Button size="lg" className="bg-accent-gold hover:bg-accent-gold/90 text-warm-brown font-bold text-lg px-10 py-7 rounded-full shadow-premium hover:scale-105 transition-transform">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/#about">
                <Button size="lg" variant="outline" className="border-2 border-cream text-cream hover:bg-cream hover:text-warm-brown font-bold text-lg px-10 py-7 rounded-full backdrop-blur-sm hover:scale-105 transition-transform">
                  Our Story
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sage-green font-bold tracking-wider uppercase text-sm mb-2 block">Handpicked Favorites</span>
            <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-4">
              Signature Snacks
            </h2>
            <div className="w-24 h-1 bg-accent-gold mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most loved artisanal creations, from savory vegetable chips to sweet dried fruit medleys.
            </p>
          </motion.div>

          <ProductsList limit={4} />

          <div className="text-center mt-16">
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-2 border-warm-brown text-warm-brown hover:bg-warm-brown hover:text-white font-semibold px-8 py-6 rounded-xl">
                View All Products <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: 'Crafted with Care',
                description: 'Every batch is handmade in our artisanal kitchen, ensuring the perfect crunch and flavor profile in every bite.'
              },
              {
                icon: Leaf,
                title: '100% Natural',
                description: 'We use only premium, non-GMO ingredients sourced directly from sustainable farms. No artificial additives ever.'
              },
              {
                icon: Award,
                title: 'Premium Quality',
                description: 'Our commitment to excellence means we never compromise. Only the finest ingredients make it into our bags.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="bg-sage-green/10 w-24 h-24 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:bg-sage-green/20 transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-sage-green" />
                </div>
                <h3 className="text-2xl font-bold text-warm-brown mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="about" className="py-24 bg-gradient-to-b from-cream to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-gold font-bold tracking-wider uppercase text-sm mb-2 block">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-bold text-warm-brown mb-8">
                From Our Kitchen <br/> to Your Home
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                What started as a weekend experiment to create the perfect healthy chip has grown into a passion for artisanal snacking. We believe that "healthy" shouldn't mean "boring".
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                We slice, season, and slow-roast our snacks in small batches to preserve their natural nutrients and flavors. Using simple, honest ingredients like sea salt, olive oil, and fresh herbs, we create snacks that nourish your body and delight your taste buds.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Team member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-bold text-warm-brown">Meet our Artisans</p>
                  <p>Dedicated to quality</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-premium-lg transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1608061140823-78087d6d2874"
                  alt="Artisanal snack preparation with fresh ingredients"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute bottom-8 left-8 z-20 text-white">
                  <p className="text-3xl font-bold mb-1">Handcrafted</p>
                  <p className="text-white/80">Daily in small batches</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-sage-green/20 rounded-full blur-xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent-gold/20 rounded-full blur-xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;