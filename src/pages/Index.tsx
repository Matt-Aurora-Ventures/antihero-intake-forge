
import React from "react";
import IntakeForm from "@/components/IntakeForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[10%] left-[20%] w-20 h-20 bg-gray-800 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-[70%] left-[75%] w-32 h-32 bg-gray-800 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-[40%] left-[10%] w-40 h-40 bg-gray-800 rounded-full opacity-10 animate-pulse delay-300"></div>
        <div className="absolute top-[25%] left-[65%] w-28 h-28 bg-gray-700 rounded-full opacity-15 animate-pulse delay-700"></div>
        <div className="absolute top-[60%] left-[30%] w-36 h-36 bg-gray-700 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      {/* Grid background pattern */}
      <div className="absolute inset-0 z-0 opacity-5" 
           style={{ 
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)', 
             backgroundSize: '30px 30px' 
           }}>
      </div>
      
      <header className="py-6 mb-6 bg-black border-b border-gray-800 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-white">Antihero Fitness Intake Form</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 relative z-10">
        <IntakeForm />
      </main>
      
      <footer className="mt-10 py-6 border-t border-gray-800 relative z-10 no-print">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Antihero Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
