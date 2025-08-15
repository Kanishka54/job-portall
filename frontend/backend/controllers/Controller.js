import { Webhook } from "svix";
import User from "../models/User.js";

export const ClerkWebhook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const event = whook.verify(
      JSON.stringify(req.body),
      req.headers
    );
    
    console.log("✅ Clerk webhook verified:", event);
    
    // Handle user.created event
    if (event.type === "user.created") {
      const { 
        id, 
        email_addresses, 
        first_name, 
        last_name,
        image_url 
      } = event.data;
      
      // Check if user already exists
      const existingUser = await User.findOne({ 
        $or: [
          { clerkId: id },
          { email: email_addresses[0]?.email_address }
        ]
      });
      
      if (existingUser) {
        console.log("👤 User already exists:", existingUser.email);
        return res.status(200).json({ message: "User already exists" });
      }
      
      // Create user matching your schema
      const newUser = new User({
        clerkId: id,
        name: `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous User',
        email: email_addresses[0]?.email_address || '',
        image: image_url || 'https://via.placeholder.com/150', // Default image
        authProvider: 'clerk'
        // Don't set password for Clerk users - they authenticate through Clerk
        // resume can be added later by the user
      });
      
      await newUser.save();
      console.log("💾 User saved from Clerk:", newUser);
    }
    
    // Handle user.updated event (optional)
    if (event.type === "user.updated") {
      const { 
        id, 
        email_addresses, 
        first_name, 
        last_name,
        image_url 
      } = event.data;
      
      const updatedUser = await User.findOneAndUpdate(
        { clerkId: id },
        {
          name: `${first_name || ''} ${last_name || ''}`.trim() || 'Anonymous User',
          email: email_addresses[0]?.email_address || '',
          image: image_url || 'https://via.placeholder.com/150',
        },
        { new: true }
      );
      
      if (updatedUser) {
        console.log("📝 User updated from Clerk:", updatedUser);
      }
    }
    
    // Handle user.deleted event (optional)
    if (event.type === "user.deleted") {
      const { id } = event.data;
      const deletedUser = await User.findOneAndDelete({ clerkId: id });
      if (deletedUser) {
        console.log("🗑️ User deleted from Clerk:", deletedUser.email);
      }
    }
    
    res.status(200).json({ message: "Webhook processed successfully" });
    
  } catch (error) {
    console.error("❌ Error handling Clerk webhook:", error);
    res.status(400).json({ error: "Invalid webhook" });
  }
};