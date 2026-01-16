import LeadDetails from "@/components/LeadDetails";

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  return <LeadDetails id={params.id} />;
}
