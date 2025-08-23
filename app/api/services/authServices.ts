import { auth, db } from "@/app/api/config/firebase";
import consoleManager from "@/app/api/utils/consoleManager";
import { generateTLCUserId } from "@/lib/utils";
import { UserRecord } from "firebase-admin/auth";

// Add typing for the extra user data
interface ExtraUserData {
    fullName?: string;
    phoneNumber?: string;
    role?: string;
}

class AuthService {
    //  Register new user
    static async registerUser(email: string, password: string, extraData: ExtraUserData = {}) {
        try {
            // 1. Generate TLC ID
            const now = new Date();
            const month = (now.getMonth() + 1).toString().padStart(2, "0");

            const snapshot = await db
                .collection("users")
                .where("tlcId", ">=", `TLC${month}`)
                .where("tlcId", "<", `TLC${month}99`)
                .orderBy("tlcId", "desc")
                .limit(1)
                .get();

            const lastTlcId = snapshot.empty ? undefined : snapshot.docs[0].data().tlcId;
            const newTlcId = generateTLCUserId(lastTlcId);

            // 2. Create Firebase Auth user
            const userRecord: UserRecord = await auth.createUser({
                email,
                password,
                displayName: extraData.fullName || "",
                phoneNumber: extraData.phoneNumber,
            });

            console.log(UserRecord);

            // 3. Save to Firestore
            await db.collection("users").doc(userRecord.uid).set({
                uid: userRecord.uid,
                email: userRecord.email,
                fullName: extraData.fullName || "",
                role: extraData.role || "user",
                phoneNumber: extraData.phoneNumber || "",
                tlcId: newTlcId,
                createdOn: new Date().toISOString(),
            });
            consoleManager.log("✅ User saved in Firestore:", userRecord);
            consoleManager.log("User registered:", userRecord.uid, "TLC ID:", newTlcId);

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                fullName: extraData.fullName || "",
                tlcId: newTlcId,
                role: extraData.role || "user",
            };
        } catch (error: unknown) {
            let errorMessage = "Registration failed.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            consoleManager.error("registerUser error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    //  Login
    static async loginUser(email: string, _password: string) {
        try {
            const userRecord = await auth.getUserByEmail(email);
            if (!userRecord) throw new Error("User not found");

            const userDoc = await db.collection("users").doc(userRecord.uid).get();
            if (!userDoc.exists) throw new Error("User profile not found");

            return {
                uid: userRecord.uid,
                email: userRecord.email,
                ...userDoc.data(),
            };
        } catch (error: unknown) {
            let errorMessage = "Registration failed.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            consoleManager.error("registerUser error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    // Get user by ID
    static async getUserById(uid: string) {
        try {
            const userDoc = await db.collection("users").doc(uid).get();
            if (!userDoc.exists) return null;

            return {
                uid: userDoc.id,
                ...userDoc.data(),
            };
        } catch (error: unknown) {
            consoleManager.error("getUserById error:", error);
            throw new Error("Failed to fetch user");
        }
    }

    // Update user
    static async updateUser(uid: string, updateData: { fullName?: string; phoneNumber?: string }) {
        try {
            const userRef = db.collection("users").doc(uid);
            const userDoc = await userRef.get();
            
            if (!userDoc.exists) return null;

            await userRef.update({
                ...updateData,
                updatedOn: new Date().toISOString(),
            });

            const updatedDoc = await userRef.get();
            return {
                uid: updatedDoc.id,
                ...updatedDoc.data(),
            };
        } catch (error: unknown) {
            consoleManager.error("updateUser error:", error);
            throw new Error("Failed to update user");
        }
    }

    //  Delete user
    static async deleteUserByUid(uid: string) {
        try {
            // Delete from Firestore
            await db.collection("users").doc(uid).delete();
            
            // Delete from Firebase Auth
            await auth.deleteUser(uid);
            
            consoleManager.log("✅ User deleted:", uid);
            return { success: true, message: "User deleted successfully" };
        } catch (error: unknown) {
            consoleManager.error("deleteUserByUid error:", error);
            return { success: false, message: "Failed to delete user" };
        }
    }

    //  Update Firestore profile fields
    static async updateUserInFirestore(uid: string, updateData: Record<string, unknown>) {
        try {
            await db.collection("users").doc(uid).update({
                ...updateData,
                updatedOn: new Date().toISOString(),
            });
            consoleManager.log("Firestore user updated:", uid);
        } catch (error: unknown) {
            let errorMessage = "Registration failed.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            consoleManager.error("registerUser error:", errorMessage);
            throw new Error(errorMessage);
        }

    }

    //  Get user by email
    static async getUserByEmail(email: string) {
        try {
            const snapshot = await db.collection("users").where("email", "==", email).get();
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { uid: doc.id, ...doc.data() };
        } catch (error: unknown) {
            let errorMessage = "Registration failed.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            consoleManager.error(" registerUser error:", errorMessage);
            throw new Error(errorMessage);
        }

    }

    //  Get all users
    static async getAllUsers() {
        try {
            const snapshot = await db.collection("users").get();
            return snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }));
        } catch (error: unknown) {
            let errorMessage = "Registration failed.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            consoleManager.error(" registerUser error:", errorMessage);
            throw new Error(errorMessage);
        }

    }
}

export default AuthService;
