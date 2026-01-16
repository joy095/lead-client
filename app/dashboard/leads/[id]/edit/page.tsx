"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { apiClient } from "@/lib/api";
import { Lead } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function EditLeadPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    stage: "" as "new" | "contacted" | "qualified" | "converted" | "lost",
    source: "",
    value: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await apiClient.get<Lead>(`/leads/${params.id}`);

        if (!response.data) {
          throw new Error("Lead not found");
        }

        const lead = response.data;

        setFormData({
          name: lead.name,
          email: lead.email,
          phone: lead.phone ?? "",
          company: lead.company ?? "",
          stage: lead.stage ?? "",
          source: lead.source ?? "",
          value: lead.value ? String(lead.value) : "",
          notes: lead.notes ?? "",
        });
      } catch (error) {
        toast.error("Failed to fetch lead data");
        console.error(error);
      }
    };

    fetchLead();
  }, [params.id]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value as any })); // Type assertion
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        value: formData.value ? parseFloat(formData.value) : undefined,
      };

      const response = await apiClient.put(`/leads/${params.id}`, payload);

      if (response.success) {
        toast.success("Lead updated successfully!");
        router.push(`/dashboard/leads/${params.id}`);
      } else {
        toast.error(response.message || "Failed to update lead");
      }
    } catch (err) {
      toast.error("Failed to update lead");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Lead</h1>
          <p className="text-gray-600 mt-1">Update lead information</p>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/dashboard/leads/${params.id}`}>Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Details</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="value">Estimated Value</Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stage">Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) => handleSelectChange("stage", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Add any additional notes about this lead..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/leads/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Update Lead"}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
