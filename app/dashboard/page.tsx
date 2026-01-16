import AnalyticsCards from "@/components/AnalyticsCards";
import LeadsTable from "@/components/LeadsTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here&#39;s what&#39;s happening today.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
            Add Lead
          </button>
        </div>
      </div>

      <AnalyticsCards />
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
        <LeadsTable />
      </div>
    </div>
  );
}
