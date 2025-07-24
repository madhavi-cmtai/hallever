import { db } from "@/app/api/config/firebase";
import admin from "firebase-admin";
import { Job } from "@/lib/redux/slice/careerSlice";

export class JobService {
    // Add a new job
    static async addJob(
        jobData: Omit<Job, "id" | "createdOn" | "updatedOn">
    ): Promise<Job> {
        try {
            const timestamp = admin.firestore.FieldValue.serverTimestamp();

            const newJobRef = await db.collection("jobs").add({
                ...jobData,
                createdOn: timestamp,
                updatedOn: timestamp,
            });

            const savedDoc = await newJobRef.get();
            const savedData = savedDoc.data() as Job;

            return {
                ...savedData,
                id: newJobRef.id,
            };
        } catch (error) {
            console.error("Error adding job:", error);
            throw new Error("Failed to add job");
        }
    }

    // Get all jobs ordered by created date
    static async getAllJobs(): Promise<Job[]> {
        try {
            const snapshot = await db.collection("jobs").orderBy("createdOn", "desc").get();
            return snapshot.docs.map((doc) => ({
                ...(doc.data() as Job),
                id: doc.id,
            }));
        } catch (error) {
            console.error("Error fetching jobs:", error);
            throw new Error("Failed to fetch jobs");
        }
    }

    // Get a job by ID
    static async getJobById(id: string): Promise<Job | null> {
        try {
            const doc = await db.collection("jobs").doc(id).get();
            if (!doc.exists) return null;

            return {
                ...(doc.data() as Job),
                id: doc.id,
            };
        } catch (error) {
            console.error("Error fetching job by ID:", error);
            throw new Error("Failed to fetch job");
        }
    }

    // Update a job by ID
    static async updateJob(id: string, jobData: Partial<Job>): Promise<Job | null> {
        try {
            const jobRef = db.collection("jobs").doc(id);
            const doc = await jobRef.get();
            if (!doc.exists) return null;

            const timestamp = admin.firestore.FieldValue.serverTimestamp();

            await jobRef.update({
                ...jobData,
                updatedOn: timestamp,
            });

            const updatedDoc = await jobRef.get();
            return {
                ...(updatedDoc.data() as Job),
                id: updatedDoc.id,
            };
        } catch (error) {
            console.error("Error updating job:", error);
            throw new Error("Failed to update job");
        }
    }

    // Delete a job by ID
    static async deleteJob(id: string): Promise<boolean> {
        try {
            await db.collection("jobs").doc(id).delete();
            return true;
        } catch (error) {
            console.error("Error deleting job:", error);
            return false;
        }
    }
}

export default JobService;
