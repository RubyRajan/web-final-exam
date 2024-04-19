import { Cart } from './cartSchema.js';

export const createCartItem = async (req, res) => {
  try {
    const { product, quantity, user } = req.body;

    const cartItem = new Cart({ product, quantity, user });

    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { product, quantity, user } = req.body;

    const updatedCartItem = await Cart.findByIdAndUpdate(
      id,
      { product, quantity, user },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.json(updatedCartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCartItem = await Cart.findByIdAndDelete(id);

    if (deletedCartItem) {
      return res.status(200).json({ message: 'Cart Item deleted' });
    } else {
      return res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
