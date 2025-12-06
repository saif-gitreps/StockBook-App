import { useState, useEffect } from "react";
import {
   TrendingUp,
   MessageSquare,
   Shield,
   BarChart3,
   Wallet,
   ArrowRight,
   ChevronRight,
   Star,
   CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LandingPage() {
   const [scrollY, setScrollY] = useState(0);

   useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const features = [
      {
         icon: <Wallet className="w-6 h-6" />,
         title: "Smart Portfolio Management",
         description:
            "Track and manage your stock investments in one unified dashboard with real-time insights.",
      },
      {
         icon: <BarChart3 className="w-6 h-6" />,
         title: "Advanced Analytics",
         description:
            "Get detailed stock metrics including market cap, dividends, and performance indicators.",
      },
      {
         icon: <MessageSquare className="w-6 h-6" />,
         title: "Community Discussions",
         description:
            "Share insights and discuss stocks with fellow investors in dedicated comment threads.",
      },
      {
         icon: <Shield className="w-6 h-6" />,
         title: "Secure & Private",
         description:
            "Your portfolio data is encrypted and protected with enterprise-grade security.",
      },
   ];

   const testimonials = [
      {
         name: "Sarah Johnson",
         role: "Day Trader",
         content:
            "StockBook transformed how I manage my portfolio. The community insights are invaluable!",
         rating: 4,
      },
      {
         name: "Michael Chen",
         role: "Long-term Investor",
         content:
            "Finally, a platform that combines portfolio tracking with social features. Love it!",
         rating: 5,
      },
      {
         name: "Emma Davis",
         role: "Financial Advisor",
         content: "I recommend StockBook to all my clients. It's intuitive and powerful.",
         rating: 4,
      },
   ];

   return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
         <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div
               className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -top-48 -left-48"
               style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />
            <div
               className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-1/3 -right-48"
               style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
            <div
               className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-0 left-1/3"
               style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
         </div>

         <nav className="container z-40 mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
               <div
                  className="flex items-center space-x-2 hover:cursor-pointer hover:opacity-80 "
                  onClick={(e) => {
                     e.preventDefault();
                     window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
               >
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                  <span className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-blue-900 bg-clip-text text-transparent">
                     StockBook
                  </span>
               </div>
               <div className="hidden md:flex items-center space-x-8">
                  <a
                     href="#features"
                     className="text-slate-300 hover:text-white transition-colors"
                  >
                     Features
                  </a>

                  <a
                     href="#how-it-works"
                     className="text-slate-300 hover:text-white transition-colors"
                  >
                     How It Works
                  </a>

                  <a
                     href="#testimonials"
                     className="text-slate-300 hover:text-white transition-colors"
                  >
                     Testimonials
                  </a>

                  <Button variant="ghost" className="bg-blue-950" type="button">
                     <Link to="/login">Login</Link>
                  </Button>
               </div>
            </div>
         </nav>

         <section className="relative z-10 container mx-auto px-6 pt-20 pb-10">
            <div className="max-w-4xl mx-auto text-center">
               <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8 animate-pulse">
                  <Star className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">Trusted by many users</span>
               </div>

               <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                  Your Investment
                  <span className="block bg-linear-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                     Journey Starts Here
                  </span>
               </h1>

               <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Track your portfolio, analyze stocks, and connect with a community of
                  investors. All in one powerful platform designed for modern traders.
               </p>

               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                  <Button
                     size="lg"
                     className="bg-linear-to from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-2xl shadow-emerald-500/30 px-8 py-6 text-lg group hover:cursor-pointer"
                  >
                     <Link to={"/login"}>Get started !</Link>

                     <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
               </div>

               {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                     <div key={index} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold bg-linear-to from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                           {stat.value}
                        </div>
                        <div className="text-slate-400 text-sm">{stat.label}</div>
                     </div>
                  ))}
               </div> */}
            </div>
         </section>

         <section id="features" className="relative z-10 container mx-auto px-6 py-24">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Everything You Need to
                  <span className="block bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                     Master Your Portfolio
                  </span>
               </h2>
               <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Powerful features designed to help you make smarter investment decisions
               </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {features.map((feature, index) => (
                  <Card
                     key={index}
                     className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/10 group"
                  >
                     <CardContent className="p-6">
                        <div className="w-12 h-12 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                           <div className="text-emerald-400">{feature.icon}</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                           {feature.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                           {feature.description}
                        </p>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </section>

         <section
            id="how-it-works"
            className="relative z-10 container mx-auto px-6 py-24"
         >
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Get Started in
                  <span className="block bg-linear-to from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                     Three Simple Steps
                  </span>
               </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {[
                  {
                     step: "01",
                     title: "Create Account",
                     desc: "Sign up in seconds with your email. No credit card required.",
                  },
                  {
                     step: "02",
                     title: "Build Portfolio",
                     desc: "Add your stocks and start tracking performance in real-time.",
                  },
                  {
                     step: "03",
                     title: "Grow & Learn",
                     desc: "Engage with the community and make informed decisions.",
                  },
               ].map((item, index) => (
                  <div key={index} className="relative">
                     <div className="text-center">
                        <div className="text-6xl font-bold text-emerald-500/20 mb-4">
                           {item.step}
                        </div>
                        <div className="w-16 h-16 bg-linear-to from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                           <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-3 text-white">
                           {item.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                     </div>
                     {index < 2 && (
                        <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-700 w-8 h-8" />
                     )}
                  </div>
               ))}
            </div>
         </section>

         <section
            id="testimonials"
            className="relative z-10 container mx-auto px-6 py-24"
         >
            <div className="text-center mb-16">
               <h2 className="text-2xl md:text-5xl font-bold mb-0">
                  Loved by
                  <span className="block bg-linear-to from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                     Investors Worldwide
                  </span>
               </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {testimonials.map((testimonial, index) => (
                  <Card
                     key={index}
                     className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:bg-slate-900/80 transition-all duration-300"
                  >
                     <CardContent className="p-6">
                        <div className="flex mb-4">
                           {[...Array(testimonial.rating)].map((_, i) => (
                              <Star
                                 key={i}
                                 className="w-5 h-5 text-yellow-400 fill-yellow-400"
                              />
                           ))}
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                           "{testimonial.content}"
                        </p>
                        <div className="flex items-center">
                           <div className="w-12 h-12 bg-linear-to from-emerald-500 to-blue-500 rounded-full mr-4" />
                           <div>
                              <div className="font-semibold text-white">
                                 {testimonial.name}
                              </div>
                              <div className="text-slate-400 text-sm">
                                 {testimonial.role}
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </section>

         <footer className="relative z-10 container mx-auto px-6 py-12 border-t border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between">
               <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  <span className="text-xl font-bold text-white">StockBook</span>
               </div>
            </div>
            <div className="text-center mt-8 text-slate-500 text-sm">
               © 2025 StockBook. All rights reserved.
            </div>
         </footer>
      </div>
   );
}
