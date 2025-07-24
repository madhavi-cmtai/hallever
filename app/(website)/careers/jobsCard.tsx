'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, GraduationCap, IndianRupee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Job } from '@/lib/redux/slice/careerSlice';
import ApplyModal from './jobApplyModal';

// Example job data
const jobs: Job[] = [
    {
        id: '1',
        title: 'Frontend Developer',
        department: 'Engineering',
        location: 'Bangalore, India',
        type: 'Full-time',
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
        responsibilities: [
            'Develop and maintain user-facing features.',
            'Collaborate with UI/UX designers.',
        ],
        salaryRange: '₹8L - ₹12L',
        experience: '2+ years',
        education: 'B.Tech / B.E. in Computer Science',
        status: 'open',
    },
    {
        id: '2',
        title: 'Content Marketing Intern',
        department: 'Marketing',
        location: 'Remote',
        type: 'Internship',
        skills: ['SEO', 'Content Writing', 'Social Media'],
        responsibilities: [
            'Write blog posts and newsletters.',
            'Assist in social media campaigns.',
        ],
        salaryRange: '10,000/month',
        experience: '0-1 year',
        education: 'Any graduate',
        status: 'open',
    },
];

interface JobCardProps {
    job: Job;
    index?: number;
    onApply?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, index = 0, onApply }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-[0_4px_20px_rgba(255,0,0,0.15)] transition-all"
        >
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-[var(--primary-red)]">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.department}</p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{job.type}</span>
                </div>

                {job.salaryRange && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IndianRupee className="w-4 h-4" />
                        <span>{job.salaryRange}</span>
                    </div>
                )}

                {job.education && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{job.education}</span>
                    </div>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {job.skills.map((skill, i) => (
                            <Badge key={i} className="bg-[var(--primary-gold)] text-white">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Apply Button */}
                {onApply && (
                    <Button
                        onClick={() => onApply(job)}
                        className="mt-4 w-fit bg-[var(--primary-red)] text-white hover:bg-red-700 transition"
                    >
                        Apply Now
                    </Button>
                )}
            </div>
        </motion.div>
    );
};

export const JobListSection = () => {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    return (
        <section className="my-20">
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Latest <span className="text-[var(--primary-red)]">Jobs</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore exciting opportunities across departments and roles.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ml-8">
                {jobs.map((job, index) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        index={index}
                        onApply={() => setSelectedJob(job)}
                    />
                ))}
            </div>

            {selectedJob && (
                <ApplyModal
                    open={!!selectedJob}
                    onClose={() => setSelectedJob(null)}
                    jobTitle={selectedJob.title}
                />
            )}
        </section>
    );
};

export default JobListSection;
