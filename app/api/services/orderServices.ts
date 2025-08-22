// app/api/services/orderService.ts
import { db } from "../config/firebase";
import consoleManager from "../utils/consoleManager";
import admin from "firebase-admin";
import { OrderFormData, SelectedProduct } from "@/lib/redux/slice/orderSlice";

export interface Order {
    id: string;
    formData: OrderFormData;
    selectedProducts: SelectedProduct[];
    totalAmount: number;
    createdOn?: FirebaseFirestore.Timestamp;
    updatedOn?: FirebaseFirestore.Timestamp;
}

class OrderService {
    static orders: Order[] = [];
    static isInitialized = false;

    // Initialize Firestore listener (runs once)
    static initOrders(): void {
        if (this.isInitialized) return;

        consoleManager.log("Initializing Firestore listener for orders...");
        const ordersCollection = db.collection("orders");

        ordersCollection.onSnapshot((snapshot) => {
            this.orders = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Order, "id">),
            }));
            consoleManager.log("🔥 Firestore Read: Orders updated, count:", this.orders.length);
        });

        this.isInitialized = true;
    }

    // Get all orders (uses cache unless forceRefresh is true)
    static async getAllOrders(forceRefresh = false): Promise<Order[]> {
        if (forceRefresh || !this.isInitialized) {
            consoleManager.log("Force refreshing orders from Firestore...");
            const snapshot = await db.collection("orders").orderBy("createdOn", "desc").get();
            this.orders = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Order, "id">),
            }));
            this.isInitialized = true;
        } else {
            consoleManager.log("Returning cached orders. No Firestore read.");
        }
        return this.orders;
    }

    // Get order by ID
    static async getOrderById(orderId: string): Promise<Order | null> {
        const cachedOrder = this.orders.find((order) => order.id === orderId);
        if (cachedOrder) {
            consoleManager.log("✅ Order fetched from cache:", orderId);
            return cachedOrder;
        }

        const docRef = db.collection("orders").doc(orderId);
        const doc = await docRef.get();

        if (!doc.exists) {
            consoleManager.warn("⚠️ Order not found:", orderId);
            return null;
        }

        const order = { id: doc.id, ...(doc.data() as Omit<Order, "id">) };
        consoleManager.log("✅ Order fetched from Firestore:", orderId);
        return order;
    }

    // Add new order
    static async addOrder(data: { formData: OrderFormData; selectedProducts: SelectedProduct[]; totalAmount: number }): Promise<Order> {
        // Add the order to Firestore
        const newOrderRef = await db.collection("orders").add({
            ...data,
            createdOn: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Read it back to get actual timestamp and data
        const doc = await newOrderRef.get();
        const orderData = doc.data();

        const newOrder = {
            id: doc.id,
            formData: orderData?.formData,
            selectedProducts: orderData?.selectedProducts,
            totalAmount: orderData?.totalAmount,
            createdOn: orderData?.createdOn,
        } as Order;

        // Update cache
        this.orders.unshift(newOrder);
        consoleManager.log("✅ Order added to cache:", newOrder.id);

        return newOrder;
    }


    // Update order
    static async updateOrder(
        orderId: string,
        updatedData: Partial<{ formData: OrderFormData; selectedProducts: SelectedProduct[]; totalAmount: number }>
    ): Promise<Order> {
        const orderRef = db.collection("orders").doc(orderId);

        await orderRef.update({
            ...updatedData,
            updatedOn: admin.firestore.FieldValue.serverTimestamp(),
        });

        const doc = await orderRef.get();
        const orderData = doc.data();

        const updatedOrder = {
            id: doc.id,
            formData: orderData?.formData,
            selectedProducts: orderData?.selectedProducts,
            totalAmount: orderData?.totalAmount,
            createdOn: orderData?.createdOn,
            updatedOn: orderData?.updatedOn,
        } as Order;

        // Update cache
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
            this.orders[index] = updatedOrder;
        }
        consoleManager.log("✅ Order updated in cache:", orderId);

        return updatedOrder;
    }


    // Delete order
    static async deleteOrder(orderId: string): Promise<{ success: boolean; message: string }> {
        await db.collection("orders").doc(orderId).delete();
        consoleManager.log("✅ Order deleted:", orderId);

        await this.getAllOrders(true);
        return { success: true, message: "Order deleted successfully" };
    }
}

export default OrderService;
