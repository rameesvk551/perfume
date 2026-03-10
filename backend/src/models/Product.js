const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    name: { type: String, required: true },
    intensity: { type: Number, required: true },
}, { _id: false });

const scentPyramidSchema = mongoose.Schema({
    top: [noteSchema],
    heart: [noteSchema],
    base: [noteSchema],
}, { _id: false });

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        scentPyramid: scentPyramidSchema,
        longevity: { type: String, required: true },
        mood: [String],
        occasion: [String],
        gender: { type: String, enum: ['Masculine', 'Feminine', 'Unisex'], required: true },
        description: { type: String, required: true },
        story: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        collectionName: { type: String, required: true },
        year: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
