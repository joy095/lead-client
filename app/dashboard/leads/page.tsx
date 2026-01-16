import LeadsTable from "@/components/LeadsTable";

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Leads</h1>
          <p className="text-gray-600 mt-1">Manage and track all your leads</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <LeadsTable />
      </div>
    </div>
  );
}
