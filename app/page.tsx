'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, ArrowRight, Activity, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-teal-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/20 rounded-full animate-bounce delay-1000"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        {/* Hero Section */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Logo/Icon */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
            <Eye className="w-10 h-10 text-white" />
          </div>
          
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
              Eye Disease Detection
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Know your eye diseases, monitor the problematic parts of your eyes, and know how to treat them.
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 py-8">
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <Eye className="w-5 h-5 text-green-500" />
              <span className="text-gray-700 font-medium">Fundus Detection</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <Activity className="w-5 h-5 text-teal-500" />
              <span className="text-gray-700 font-medium">Easy to Use</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700 font-medium">Care Team</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link href="/login">
              <Button 
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping delay-100"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping delay-200"></div>
        </div>
      </div>
    </div>
  );
}