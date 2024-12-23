import Tour from "../Models/Tour.js";

// Create a new tour
export const createTour = async (req, res) => {
    try {
        const { title, country, city, price, duration, maxGroupSize, desc, featured, highlights } = req.body;

        // Collect uploaded file URLs from Cloudinary
        const photoUrls = req.files.map((file) => file.path);

        // Create the new tour
        const newTour = new Tour({
            title,
            country,
            city,
            price,
            duration,
            maxGroupSize,
            desc,
            featured: featured || false,
            highlights: highlights || [],
            photos: photoUrls, // Add uploaded photos
        });

        const savedTour = await newTour.save();
        res.status(201).json({
            success: true,
            message: 'Tour created successfully',
            data: savedTour,
        });
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
        // Find the existing tour
        const existingTour = await Tour.findById(id);
        
        if (!existingTour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found'
            });
        }

        // Get the list of photos to keep from the request body
        const photosToKeep = req.body.photosToKeep ? JSON.parse(req.body.photosToKeep) : [];
        
        // Filter existing photos based on photosToKeep array
        const remainingPhotos = existingTour.photos.filter(photo => photosToKeep.includes(photo));

        // Add any new uploaded photos
        const newPhotoUrls = req.files ? req.files.map((file) => file.path) : [];

        // Combine remaining old photos with new photos
        const updatedPhotos = [...remainingPhotos, ...newPhotoUrls];

        const updateData = {
            ...req.body,
            photos: updatedPhotos
        };

        // Remove the photosToKeep field from updateData as it's not part of the tour model
        delete updateData.photosToKeep;

        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }
        );

        res.status(200).json({ 
            success: true, 
            data: updatedTour 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get a single tour by ID
export const getSingleTour = async (req, res) => {
    const { id } = req.params;

    try {
        const tour = await Tour.findById(id).populate('reviews');
        if (!tour) {
            return res.status(404).json({
                success: false,
                message: 'Tour not found',
            });
        }
        res.status(200).json({ success: true, data: tour });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all tours
export const getAllTours = async (req, res) => {
    const page = parseInt(req.query.page)
    console.log(page)
    try {
        const tours = await Tour.find({})
            .populate('reviews')
            .skip(page * 8)
        res.status(200).json({ success: true, count: tours.length, message: "successful", data: tours });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

//get featured tour
export const getFeaturedTours = async (req, res) => {
    const page = parseInt(req.query.page)
    try {
        const tours = await Tour.find({featured:true})
            .populate('reviews')
            .skip(page * 8)
            .limit(8);
        res.status(200).json({ success: true, count: tours.length, message: "successful", data: tours });
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

export const searchTours = async (req, res) => {
    const { keyword, country, city, duration, maxGroupSize, minPrice, maxPrice } = req.query;

    const titleRegex = keyword ? new RegExp(keyword, 'i') : undefined;
    const countryRegex = country ? new RegExp(country, 'i') : undefined;
    const cityRegex = city ? new RegExp(city, 'i') : undefined;

    const minDuration = duration ? parseInt(duration) : undefined;
    const minGroupSize = maxGroupSize ? parseInt(maxGroupSize) : undefined;
    
    const minPriceRange = minPrice ? parseInt(minPrice) : undefined;
    const maxPriceRange = maxPrice ? parseInt(maxPrice) : undefined;

    try {
        const query = {};

        if(titleRegex) query.title = titleRegex;
        // Adding filters for country, city, duration, and group size
        if (countryRegex) query.country = countryRegex;
        if (cityRegex) query.city = cityRegex;
        if (minDuration) query.duration = { $gte: minDuration };
        if (minGroupSize) query.maxGroupSize = { $gte: minGroupSize };

        // Adding filters for price range
        if (minPriceRange || maxPriceRange) {
            query.price = {};
            if (minPriceRange) query.price.$gte = minPriceRange; // Minimum price
            if (maxPriceRange) query.price.$lte = maxPriceRange; // Maximum price
        }

        const tours = await Tour.find(query).populate('reviews');

        if (tours.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tours found matching the search criteria.',
            });
        }

        res.status(200).json({ success: true, message: "Successful", data: tours });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const getTourCount = async(req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tourCount
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}