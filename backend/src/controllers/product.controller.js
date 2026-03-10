const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch products by collection
// @route   GET /api/products/collection/:name
// @access  Public
const getProductsByCollection = async (req, res) => {
    try {
        const products = await Product.find({ collectionName: req.params.name });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name || 'Sample name',
            price: req.body.price || 0,
            user: req.user?._id || null,
            image: req.body.image || '/images/sample.jpg',
            brand: req.body.brand || 'Sample brand',
            longevity: req.body.longevity || 'Sample longevity',
            gender: req.body.gender || 'Unisex',
            description: req.body.description || 'Sample description',
            story: req.body.story || 'Sample story',
            rating: 0,
            collectionName: req.body.collectionName || 'Sample collection',
            year: req.body.year || new Date().getFullYear(),
            mood: req.body.mood || [],
            occasion: req.body.occasion || [],
            scentPyramid: req.body.scentPyramid || { top: [], heart: [], base: [] },
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const {
            name, price, description, image, brand, collectionName, gender,
            longevity, story, year, mood, occasion, scentPyramid
        } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.collectionName = collectionName || product.collectionName;
            product.gender = gender || product.gender;
            product.longevity = longevity || product.longevity;
            product.story = story || product.story;
            product.year = year || product.year;
            product.mood = mood || product.mood;
            product.occasion = occasion || product.occasion;
            product.scentPyramid = scentPyramid || product.scentPyramid;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getProductsByCollection,
    createProduct,
    updateProduct,
    deleteProduct,
};
