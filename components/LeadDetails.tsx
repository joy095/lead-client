"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api";
import { Lead } from "@/types";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function LeadDetails({ id }: { id: string }) {
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await apiClient.get<Lead>(`/leads/${id}`);

        if (!response.data) {
          throw new Error("Lead not found");
        }

        setLead(response.data);
      } catch (error) {
        console.error("Error fetching lead:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  if (loading)
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );

  if (!lead)
    return (
      <div className="p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">
          Lead not found
        </div>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/leads">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lead.name}</h1>
            <p className="text-muted-foreground">{lead.email}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`mailto:${lead.email}`}>
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/dashboard/leads/${lead._id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" asChild>
            <Link href="#">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Lead Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-muted-foreground">Name</h3>
                <p className="font-medium">{lead.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Email</h3>
                <p className="font-medium">{lead.email}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Phone</h3>
                <p className="font-medium">{lead.phone || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Company</h3>
                <p className="font-medium">{lead.company || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Source</h3>
                <p className="font-medium">{lead.source || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Stage</h3>
                <Badge
                  variant={
                    lead.stage === "converted"
                      ? "default"
                      : lead.stage === "lost"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {lead.stage.charAt(0).toUpperCase() + lead.stage.slice(1)}
                </Badge>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Value</h3>
                <p className="font-medium">
                  ${lead.value?.toFixed(2) || "0.00"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Created</h3>
                <p className="font-medium">
                  {format(new Date(lead.createdAt), "MMM dd, yyyy")}
                </p>
              </div>
            </div>

            {lead.notes && (
              <div>
                <h3 className="font-medium text-muted-foreground">Notes</h3>
                <p className="whitespace-pre-line">{lead.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full" asChild>
              <Link href={`mailto:${lead.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`tel:${lead.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Lead
              </Link>
            </Button>
            <Button variant="outline" className="w-full">
              Schedule Follow-up
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
