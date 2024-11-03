import * as functions from "firebase-functions/v2"; // Importing the v2 API
import * as admin from "firebase-admin";

admin.initializeApp();

// Using onDocumentCreated for the trigger on document creation

admin.initializeApp();

export const sendNotificationOnNewMessage =
  functions.firestore.onDocumentCreated(
    "messages/{messageId}",
    async (event) => {
      // Accessing the new document data
      const documentSnapshot =
        event.document as unknown as admin.firestore.DocumentSnapshot; // Use admin.firestore instead of firebase
      const newMessage = documentSnapshot.data(); // Use data() method to access document data

      // Extracting the fields based on Firestore's structure
      const senderName = newMessage?.senderName;
      const messageText = newMessage?.text;
      const recipientToken = newMessage?.recipientToken;

      const payload = {
        notification: {
          title: `New message from ${senderName}`, // Accessing senderName
          body: messageText, // Accessing message text
          icon: "default", // You can add a custom icon here
        },
      };

      if (recipientToken) {
        try {
          await admin.messaging().sendToDevice(recipientToken, payload);
          console.log("Notification sent successfully.");
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }
    }
  );
