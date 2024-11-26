import Tour from "../Models/Tour.js";

// Create a new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, data: savedTour });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update an existing tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedTour });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a single tour by ID
export const getSingleTour = async (req, res) => {
    const { id } = req.params;

    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found',
            });
        }
        res.status(200).json({ success: true, data: tour });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find({}).skip(page * 8).limit(8);
        res.status(200).json({ success: true, data: tours });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete a tour
export const deleteTour = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found',
            });
        }
        res.status(200).json({ success: true, message: 'Tour deleted successfully' });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
