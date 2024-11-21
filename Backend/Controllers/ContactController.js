const Contact = require('../Models/ContactModel');

// Create a new contact message
exports.createContact = async (req, res) => {
    const { userId, name, email, message } = req.body;

    if (!userId || !name || !email || !message) {
        return res.status(400).json({ message: "All fields are required.You have to Login first" });
    }

    try {
        const contactMessage = new Contact({ userId, name, email, message });
        await contactMessage.save();
        res.status(201).json({ message: "Message received. Thank you for contacting us!" });
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ message: "Failed to send message. Please try again later." });
    }
};

// Optional: Retrieve all contact messages (e.g., for admin view)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().populate('userId', 'username email');
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error retrieving contact messages:", error);
        res.status(500).json({ message: "Failed to retrieve messages." });
    }
};
