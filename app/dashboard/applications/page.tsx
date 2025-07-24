"use client";

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Timestamp } from "firebase/firestore";

// Types
export interface JobApplication {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  coverLetter?: string;
  status: "Pending" | "Selected" | "Rejected";
  createdOn?: Timestamp | string | Date;
}

interface Job {
  id: string;
  title: string;
}

// ✅ Utility: Format Timestamp | Date | string safely
function formatDate(input?: string | Date | Timestamp): string {
  if (!input) return "-";
  if (typeof input === "string") return new Date(input).toLocaleString();
  if (input instanceof Date) return input.toLocaleString();
  if (typeof input === "object" && "toDate" in input) {
    return input.toDate().toLocaleString();
  }
  return "-";
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [appsRes, jobsRes] = await Promise.all([
        fetch("/api/job-applications").then((r) => r.json()),
        fetch("/api/jobs").then((r) => r.json()),
      ]);
      setApplications(appsRes);
      setJobs(jobsRes);
      setLoading(false);
    }
    fetchData();
  }, []);

  const getJobTitle = (jobId: string) => jobs.find((j) => j.id === jobId)?.title || "-";

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id);
    await fetch(`/api/job-applications/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setApplications((applications) =>
      applications.map((app) =>
        app.id === id ? { ...app, status: status as JobApplication["status"] } : app
      )
    );
    setUpdatingId(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {applications.length === 0 && <div>No applications found.</div>}
          {applications.map((app) => (
            <Card key={app.id} className="p-4 flex flex-col gap-2">
              <div className="font-semibold text-lg">{app.name}</div>
              <div className="text-sm text-muted-foreground">
                {app.email} | {app.phone}
              </div>
              <div className="text-sm">
                Job: <span className="font-medium">{getJobTitle(app.jobId)}</span>
              </div>
              <div className="text-sm">
                Status: <span className="font-medium">{app.status}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Applied: {formatDate(app.createdOn)}
              </div>
              {app.resumeUrl && (
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-xs"
                >
                  View Resume
                </a>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Select
                  value={app.status}
                  onValueChange={(val) => handleStatusChange(app.id, val)}
                  disabled={updatingId === app.id}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Selected">Selected</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                {updatingId === app.id && <span className="text-xs">Updating...</span>}
              </div>
              {app.coverLetter && (
                <div className="mt-2 text-xs bg-gray-50 p-2 rounded">
                  Cover Letter: {app.coverLetter}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
