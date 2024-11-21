const Cart = require('../Models/CartModel');
const Food = require('../Models/FoodModel');

// Add to Cart
const addToCart = async (req, res) => {
    const { userId, foodId, quantity, selectedCrust, selectedSize, foodname, price, image } = req.body; // Include image

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const existingItemIndex = cart.foodItems.findIndex(item => item.foodId.toString() === foodId);

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                cart.foodItems[existingItemIndex].quantity += quantity;
            } else {
                // Add new food item to cart
                cart.foodItems.push({ foodId, quantity, selectedCrust, selectedSize, foodname, price, image }); // Add image here
            }
        } else {
            // Create new cart for user
            cart = new Cart({ userId, foodItems: [{ foodId, quantity, selectedCrust, selectedSize, foodname, price, image }] }); // Add image here
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
};


// Remove from Cart
const removeFromCart = async (req, res) => {
    const { userId, foodId } = req.body; // Expect foodId and userId in the request body

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Filter out the food item from foodItems
        cart.foodItems = cart.foodItems.filter(item => item.foodId.toString() !== foodId);

        await cart.save();
        res.status(200).json(cart); // Return updated cart
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing from cart', error: error.message });
    }
};

// Clear Cart
const clearCart = async (req, res) => {
    const { userId } = req.body; // Expect userId in the request body

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        // Clear all food items from the cart
        cart.foodItems = [];
        await cart.save(); // Save the changes

        res.status(200).json({ message: 'Cart cleared successfully', foodItems: cart.foodItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};



// Get Cart
const getCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('foodItems.foodId');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching cart' });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
};
