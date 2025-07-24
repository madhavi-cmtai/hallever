'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ApplyModalProps {
    open: boolean;
    onClose: () => void;
    jobTitle: string;
}

export default function ApplyModal({ open, onClose, jobTitle }: ApplyModalProps) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null as File | null,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('jobTitle', jobTitle);
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        if (form.resume) formData.append('resume', form.resume);

        const res = await fetch('/api/routes/jobs/applications', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            alert('Application submitted!');
            onClose();
        } else {
            alert('Failed to submit. Try again.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Apply for <span className='text-red-600'>{jobTitle} </span></DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Full Name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                        placeholder="Email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                        placeholder="Phone Number"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <Input
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) => setForm({ ...form, resume: e.target.files?.[0] ?? null })}
                    />
                    <Button type="submit" className="w-full bg-[var(--primary-red)] hover:bg-[var(--primary-pink)]">Submit Application</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
