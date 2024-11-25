import { app } from "@/lib/api/config";
import { JobApplicationData, JobData } from "@/types";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
} from "firebase/firestore";
import { DB_COLLECTIONS } from "./constants";

const db = getFirestore(app);

export function addJob(job: JobData, creatorUserId: string) {
	return addDoc(collection(db, DB_COLLECTIONS.JOBS), { ...job, creatorUserId });
}

export async function getJob(jobId: string) {
	const job = await getDoc(doc(db, DB_COLLECTIONS.JOBS, jobId));
	return { id: job.id, ...(job.data() as JobData) };
}

export function applyToJob(jobData: JobApplicationData) {
	return addDoc(collection(db, DB_COLLECTIONS.JOB_APPLICATION), jobData);
}
