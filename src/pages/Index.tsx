
import React from "react";
import IntakeForm from "@/components/IntakeForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-interactive pb-10">
      <header className="py-6 mb-6 bg-antihero border-b border-antihero-muted">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-white">Antihero Fitness Intake Form</h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <IntakeForm />
      </main>
      
      <footer className="mt-10 py-6 border-t border-antihero-muted no-print">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Antihero Fitness. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
