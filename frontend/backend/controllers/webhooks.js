import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Create webhook instance with secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify and parse the incoming webhook
    const event = whook.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
      }
    );

    const { type, data } = event; // Extract event type & data

    // Handle different Clerk events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url,
          resume: ""
        };

        await User.create(userData);
        console.log("✅ User created:", userData);
        break;
      }

      case "user.updated": {
        const updatedData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          image: data.image_url
        };

        await User.findByIdAndUpdate(data.id, updatedData);
        console.log("✅ User updated:", data.id);
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("❌ User deleted:", data.id);
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    res.status(400).json({ error: "Webhook verification failed" });
  }
};
