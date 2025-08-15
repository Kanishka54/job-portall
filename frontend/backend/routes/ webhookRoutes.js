// routes/webhookRoutes.js
import express from 'express';
import { Webhook } from 'svix';


const router = express.Router();

// Clerk webhook endpoint
router.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    // Get the headers
    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('Missing svix headers');
      return res.status(400).json({ error: 'Missing svix headers' });
    }

    // Get the body
    const body = req.body;
    
    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || 'whsec_your_webhook_secret_here');

    let evt;

    // Verify the payload using Svix
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return res.status(400).json({ error: 'Webhook verification failed' });
    }

    // Get the event type and data
    const { type, data } = evt;
    
    console.log(`Received Clerk webhook: ${type}`);
    console.log('Event data:', JSON.stringify(data, null, 2));

    // Handle different event types
    switch (type) {
      case 'user.created':
        await handleUserCreated(data);
        break;
      
      case 'user.updated':
        await handleUserUpdated(data);
        break;
      
      case 'user.deleted':
        await handleUserDeleted(data);
        break;
      
      case 'session.created':
        await handleSessionCreated(data);
        break;
      
      case 'session.ended':
        await handleSessionEnded(data);
        break;

      // Subscription events (if using Clerk's billing features)
      case 'subscriptionItem.created':
        await handleSubscriptionCreated(data);
        break;

      case 'subscriptionItem.canceled':
        await handleSubscriptionCanceled(data);
        break;

      case 'subscriptionItem.ended':
        await handleSubscriptionEnded(data);
        break;

      default:
        console.log(`Unhandled webhook event: ${type}`);
    }

    // Return 200 to acknowledge receipt
    res.status(200).json({ success: true, message: 'Webhook processed successfully' });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error processing webhook' });
  }
});

// Event handler functions
async function handleUserCreated(data) {
  console.log('🎉 New user created:', data.id);
  
  try {
    // Example: Save user to your database
    // You might want to sync the user data with your local database
    const userData = {
      clerkId: data.id,
      email: data.email_addresses?.[0]?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      imageUrl: data.image_url,
      createdAt: new Date(data.created_at),
    };
    
    console.log('User data to save:', userData);
    
    // TODO: Save to your database
    // await User.create(userData);
    
  } catch (error) {
    console.error('Error handling user creation:', error);
    throw error;
  }
}

async function handleUserUpdated(data) {
  console.log('📝 User updated:', data.id);
  
  try {
    // Example: Update user in your database
    const updateData = {
      email: data.email_addresses?.[0]?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      imageUrl: data.image_url,
      updatedAt: new Date(),
    };
    
    console.log('User update data:', updateData);
    
    // TODO: Update in your database
    // await User.findOneAndUpdate({ clerkId: data.id }, updateData);
    
  } catch (error) {
    console.error('Error handling user update:', error);
    throw error;
  }
}

async function handleUserDeleted(data) {
  console.log('🗑️ User deleted:', data.id);
  
  try {
    // Example: Delete or soft-delete user in your database
    // TODO: Handle user deletion
    // await User.findOneAndDelete({ clerkId: data.id });
    // or soft delete:
    // await User.findOneAndUpdate({ clerkId: data.id }, { isDeleted: true });
    
  } catch (error) {
    console.error('Error handling user deletion:', error);
    throw error;
  }
}

async function handleSessionCreated(data) {
  console.log('🔐 Session created:', data.id);
  
  try {
    // Example: Log session creation, update last login, etc.
    // TODO: Handle session creation logic
    // await User.findOneAndUpdate(
    //   { clerkId: data.user_id }, 
    //   { lastLogin: new Date() }
    // );
    
  } catch (error) {
    console.error('Error handling session creation:', error);
    throw error;
  }
}

async function handleSessionEnded(data) {
  console.log('🚪 Session ended:', data.id);
  
  try {
    // Example: Handle session end logic
    // TODO: Handle session end
    
  } catch (error) {
    console.error('Error handling session end:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(data) {
  console.log('💳 Subscription created:', data.id);
  
  try {
    // Example: Handle subscription creation
    // TODO: Update user's subscription status
    
  } catch (error) {
    console.error('Error handling subscription creation:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(data) {
  console.log('❌ Subscription canceled:', data.id);
  
  try {
    // Example: Handle subscription cancellation
    // TODO: Update user's subscription status
    
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
    throw error;
  }
}

async function handleSubscriptionEnded(data) {
  console.log('🔚 Subscription ended:', data.id);
  
  try {
    // Example: Handle subscription end
    // TODO: Update user's subscription status, revoke access, etc.
    
  } catch (error) {
    console.error('Error handling subscription end:', error);
    throw error;
  }
}

export default router;