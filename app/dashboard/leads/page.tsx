"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
  fetchLeads,
  addLead,
  updateLead,
  deleteLead,
  selectLeads,
  Lead,
} from "@/lib/redux/slice/leadSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus, Loader2 } from "lucide-react";

interface LeadForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
}

const LeadsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const leads = useSelector(selectLeads);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [form, setForm] = useState<LeadForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new",
  });
  const [editLeadId, setEditLeadId] = useState<string | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);

    const isValidStatus = (status: string): status is Lead["status"] => {
      return ["new", "contacted", "converted", "rejected"].includes(status);
    };

    const safeStatus = isValidStatus(form.status) ? form.status : "new";

    if (editLeadId) {
      await dispatch(
        updateLead(editLeadId, {
          id: editLeadId,
          ...form,
          status: safeStatus,
        })
      );
    } else {
      await dispatch(
        addLead({
          id: "",
          ...form,
          status: safeStatus,
        })
      );
    }

    closeModal();
    setIsEditing(false);
  };

  const openAddModal = () => {
    setForm({ name: "", email: "", phone: "", message: "", status: "new" });
    setEditLeadId(null);
    setModalOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
      message: lead.message || "",
      status: lead.status,
    });
    setEditLeadId(lead.id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditLeadId(null);
    setForm({ name: "", email: "", phone: "", message: "", status: "new" });
  };

  const handleDelete = async () => {
    if (leadToDelete) {
      await dispatch(deleteLead(leadToDelete));
      setLeadToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-[var(--primary-red)]">Lead List</h2>
        <Button
          onClick={openAddModal}
          className="gap-2 w-full sm:w-auto bg-[var(--primary-red)] hover:bg-[var(--primary-pink)] text-white"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[var(--primary-red)]">{lead.name}</h3>
              <div className="flex gap-2">
                <Pencil
                  className="w-4 h-4 cursor-pointer text-[var(--primary-red)] hover:opacity-70"
                  onClick={() => openEditModal(lead)}
                />
                <Trash
                  className="w-4 h-4 cursor-pointer text-[var(--primary-red)] hover:text-[var(--primary-pink)]"
                  onClick={() => {
                    setLeadToDelete(lead.id);
                    setDeleteModalOpen(true);
                  }}
                />
              </div>
            </div>
            <p className="text-sm">{lead.email}</p>
            <p className="text-sm">{lead.phone}</p>
            {lead.message && <p className="text-sm text-gray-600">{lead.message}</p>}
            <Badge
              className={
                lead.status === "new"
                  ? "bg-[var(--primary-pink)] text-[var(--primary-red)] border border-[var(--primary-red)]"
                  : lead.status === "contacted"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    : lead.status === "converted"
                      ? "bg-green-100 text-green-700 border border-green-700"
                      : lead.status === "rejected"
                        ? "bg-red-100 text-[var(--primary-red)] border border-[var(--primary-red)]"
                        : "bg-gray-200 text-gray-600 border border-gray-300"
              }
            >
              {lead.status}
            </Badge>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--primary-red)]">
              {editLeadId ? "Edit Lead" : "Add Lead"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <Textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none border-[var(--primary-red)] text-[var(--primary-red)]"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              required
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="rejected">Rejected</option>
            </select>
            <Button
              type="submit"
              disabled={isEditing}
              className="gap-2 bg-[var(--primary-red)] hover:bg-[var(--primary-pink)] text-white"
            >
              {isEditing && <Loader2 className="w-4 h-4 animate-spin" />}
              {editLeadId ? "Update" : "Add"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={() => setDeleteModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--primary-red)]">Delete Lead</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this lead?{" "}
            <span className="font-semibold text-[var(--primary-red)]">{leadToDelete}</span>
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-[var(--primary-red)] hover:bg-[var(--primary-pink)] text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadsPage;
