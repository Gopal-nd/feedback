import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen ">
    

      {/* Hero Section */}
      <section className="text-center py-20 px-6 ">
        <h2 className="text-4xl font-bold mb-4">
          Collect Feedback Effortlessly
        </h2>
        <p className="text-lg mb-6">
          Embed a feedback widget on your website in minutes. Understand your users better.
        </p>
        <Link
          href="/dashboard"
          >
          <Button 
          className=" px-6 py-3 rounded text-lg "
          
          >
            
          Get Started
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-8 text-center">
          How It Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 shadow-md rounded">
            <h4 className="text-xl font-bold mb-2">1. Login</h4>
            <p>Create an account or login to your dashboard.</p>
          </div>
          <div className="p-6  shadow-md rounded">
            <h4 className="text-xl font-bold mb-2">2. Register Website</h4>
            <p>Add your website/project and get your widget code.</p>
          </div>
          <div className="p-6  shadow-md rounded">
            <h4 className="text-xl font-bold mb-2">3. Embed Widget</h4>
            <p>Paste the code into your site to start collecting feedback.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
<section className="py-16 px-6 max-w-6xl mx-auto">
  <h3 className="text-2xl font-semibold mb-8 text-center">
    Why Choose Us?
  </h3>
  <div className="grid md:grid-cols-3 gap-8 text-center">
    <div className="p-6 rounded border hover:shadow-lg transition">
      <h4 className="text-xl font-bold mb-2">⚡ Real-Time Feedback</h4>
      <p>Get notified instantly when someone submits feedback.</p>
    </div>
    <div className="p-6 rounded border hover:shadow-lg transition">
      <h4 className="text-xl font-bold mb-2">🧩 Easy Integration</h4>
      <p>Just copy & paste a small code snippet into your website.</p>
    </div>
    <div className="p-6 rounded border hover:shadow-lg transition">
      <h4 className="text-xl font-bold mb-2">🎨 Fully Customizable</h4>
      <p>Match the widget to your brand’s look and feel.</p>
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="text-center p-4 border-t text-sm text-gray-500">
        &copy; {new Date().getFullYear()} FeedbackApp. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
