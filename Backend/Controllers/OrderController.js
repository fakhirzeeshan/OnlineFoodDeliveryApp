const Order = require('../Models/OrderModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Stripe = require('stripe');



exports.createCheckoutSession = async (req, res) => {
    const { items, totalAmount, shippingCharges, successUrl, cancelUrl } = req.body;

    try {
        // Create line items from food items
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
            },
            quantity: item.quantity,
        }));

        // If shipping charges exist, add them as a line item
        if (shippingCharges) {
            lineItems.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Shipping Charges',
                    },
                    unit_amount: Math.round(shippingCharges * 100), // Convert to cents
                },
                quantity: 1, // Typically shipping is a single charge
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Place Order (User-side)
exports.placeOrder = async (req, res) => {
    const { userId, paymentMethod, foodItems, totalAmount, billingInfo , selectedCrust , selectedSize } = req.body;

    try {
        const newOrder = new Order({
            userId,
            foodItems,
            totalAmount,
            paymentMethod,
            billingInfo,
            selectedCrust,
            selectedSize,
            status: 'PENDING', // Initial status
            timestamp: Date.now(),
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully!' , orderId: newOrder._id, });
        
        
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'An error occurred while placing the order.', error: error.message });
    }
};



// Get Orders by User (User-side)
exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;

    // Ensure userId is valid
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const orders = await Order.find({ userId }).populate('foodItems.foodId');
        
        if (!orders.length) {
            return res.status(404).json({ message: "No orders found for this user." });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error); // Log the error for debugging
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};



// Get All Orders (Admin-side)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('userId').populate('foodItems.foodId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// Update Order Status (Admin-side)
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        order.statusUpdatedAt = Date.now(); // Optional: track when the status was updated
        await order.save();

        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
};
