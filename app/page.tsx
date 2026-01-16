import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Lead Management Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Streamline your sales process with our powerful lead management
          system. Track, analyze, and convert leads efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8">
            <Link href="/dashboard">Access Dashboard</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="px-8">
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Track Leads</h3>
            <p className="text-gray-600 text-sm">
              Monitor your leads through every stage of the sales funnel
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Analyze Performance</h3>
            <p className="text-gray-600 text-sm">
              Get insights into conversion rates and sales metrics
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Convert Faster</h3>
            <p className="text-gray-600 text-sm">
              Optimize your workflow to close deals quickly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
