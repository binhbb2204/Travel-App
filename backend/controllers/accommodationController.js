import Accommodation from "../Models/Accommodation.js";


export const updateAccommodation = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedAcco = await Accommodation.findByIdAndUpdate(id, {$set: req.body}, {new:true});
        res.status(200).json({success: true, message: "Successfully updated", data: updatedAcco,}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to update. Try again"});
    }
};

export const createAccommodation = async (req,res) => {
    const newAcco = new Accommodation(req.body);
    try {
        const savedAcco = await newAcco.save();
        res.status(200).json({success: true, message: "Successfully created", data: savedAcco,}); 
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to create. Try again"});
    }

};

export const deleteAccommodation = async (req, res) => {
    const id = req.params.id;
    try {
        await Accommodation.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully deleted"}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to delete. Try again"});
    }
};

export const getSingleAccommodation = async (req, res) => {
    const id = req.params.id;
    try {
        const acco = await Accommodation.findById(id);
        res.status(200).json({success: true, message: "Successfully found", data: acco,}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to find. Try again"});
    }
};

export const getAllAccommodation = async (req, res) => {
    const page = parseInt(req.query.page);
    try {
        const accos = await Accommodation.find({}).skip(page*8).limit(8);
        res.status(200).json({success: true, countr: accos.length, message: "Successfully get", data: accos,}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to get. Try again"});
    }
};

export const getAccommodationBySearch = async (req,res) => {
    const { title, country, city, type, groupSize, minPrice, maxPrice } = req.query;

    const titleRegex = title ? new RegExp(title, 'i') : undefined;
    const countryRegex = country ? new RegExp(country, 'i') : undefined;
    const cityRegex = city ? new RegExp(city, 'i') : undefined;
    const typeRegex = type ? new RegExp(type, 'i') : undefined;    
    const minPriceRange = minPrice ? parseInt(minPrice) : undefined;
    const maxPriceRange = maxPrice ? parseInt(maxPrice) : undefined;

    try {
        const query = {};

        if (titleRegex) query.title = titleRegex;
        if (countryRegex) query.country = countryRegex;
        if (cityRegex) query.city = cityRegex;
        if (typeRegex) query.type = typeRegex;
        if (groupSize) query.totalCapacity = { $gte: parseInt(groupSize) };

        // Adding filters for price range
        if (minPriceRange || maxPriceRange) {
            query.price = {};
            if (minPriceRange) query.price.$gte = minPriceRange; // Minimum price
            if (maxPriceRange) query.price.$lte = maxPriceRange; // Maximum price
        }

        const accos = await Accommodation.find(query).populate('reviews');

        if (accos.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No accommodations found matching the search criteria.',
            });
        }

        res.status(200).json({ success: true, message: "Successful", data: accos });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const getFeaturedAccommodations = async (req, res) => {
    const page = parseInt(req.query.page)
    try {
        const accos = await Accommodation.find({featured:true})
            .populate('reviews')
            .skip(page * 8)
            .limit(8);
        res.status(200).json({ success: true, count: accos.length, message: "successful", data: accos });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAccommodationCount = async(req, res) => {
    try {
        const accoCount = await Accommodation.estimatedDocumentCount()

        res.status(200).json({
            success: true,
            message: "Successful",
            data: accoCount
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
