// lib/redux/slice/jobApplicationSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

export interface JobApplication {
    id: string;
    jobId: string;
    name: string;
    email: string;
    phone: string;
    resumeUrl?: string;
    coverLetter?: string;
    status: "Pending" | "Selected" | "Rejected";
    createdOn?: string;
}

interface JobApplicationState {
    applications: JobApplication[];
    selectedApplication: JobApplication | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobApplicationState = {
    applications: [],
    selectedApplication: null,
    loading: false,
    error: null,
};

const jobApplicationSlice = createSlice({
    name: "jobApplication",
    initialState,
    reducers: {
        setApplications(state, action) {
            state.applications = action.payload;
        },
        setSelectedApplication(state, action) {
            state.selectedApplication = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        updateStatus(state, action) {
            const { id, status } = action.payload;
            const app = state.applications.find((a) => a.id === id);
            if (app) app.status = status;
        },
        addApplication(state, action) {
            state.applications.push(action.payload);
        },
        deleteApplication(state, action) {
            state.applications = state.applications.filter((a) => a.id !== action.payload);
        },
    },
});

export const {
    setApplications,
    setSelectedApplication,
    setLoading,
    setError,
    updateStatus,
    addApplication,
    deleteApplication,
} = jobApplicationSlice.actions;

export default jobApplicationSlice.reducer;


// Fetch all
export const fetchJobApplications = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get("/api/routes/job-applications");
        dispatch(setApplications(res.data));
    } catch (error) {
        dispatch(setError(error.message || "Failed to fetch applications"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Fetch by ID
export const fetchJobApplicationById = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get(`/api/routes/job-applications/${id}`);
        dispatch(setSelectedApplication(res.data));
    } catch (error) {
        dispatch(setError(error.message || "Failed to fetch application"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Add (user-side submission)
export const addJobApplication = (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.post("/api/routes/job-applications", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        dispatch(addApplication(res.data));
    } catch (error) {
        dispatch(setError(error.message || "Failed to apply"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update status (admin)
export const updateJobApplicationStatus =
    (id: string, status: "Pending" | "Selected" | "Rejected") =>
        async (dispatch: AppDispatch) => {
            try {
                await axios.put(`/api/routes/job-applications/${id}`, { status });
                dispatch(updateStatus({ id, status }));
            } catch (error) {
                console.error("Failed to update status", error);
            }
        };

// Delete (admin)
export const deleteJobApplication = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await axios.delete(`/api/routes/job-applications/${id}`);
        dispatch(deleteApplication(id));
    } catch (error) {
        console.error("Failed to delete job application", error);
    }
};
