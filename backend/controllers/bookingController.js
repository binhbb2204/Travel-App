import TourBooking from "../Models/TourBooking.js";

export const createTourBooking = async(req, res) => {
    const newTourBooking = new TourBooking(req.body);
    try {
        const saveTourBooking = await newTourBooking.save();
        res.status(200).json({status: true, message: "Your tour is booked!", data: saveTourBooking})
    } catch (error) {
        res.status(500).json({status: true, message: "Internal Server Error"})
    }
}

//GET all tourbooking
export const getAllTourBooking = async(req, res) => {
    try {
        const books = await TourBooking.find()
        res.status(200).json({status: true, message: "Successful", data: books})
    } catch (error) {
        res.status(404).json({status: false, message: "Tour Not Found",})
    }
}

export const getTourBooking = async(req, res) => {
    const id = req.params.id
    try {
        const book = await TourBooking.findById(id)

        res.status(200).json({status: true, message: "Successful", data: book})
    } catch (error) {
        res.status(500).json({status: false, message: "Internal Server Error",})
    }
}

export const getUserTourBooking = async (req, res) => {

    const { userId, status } = req.query;

    try {
        const query = {};

        if (userId) query.userId = userId;
        if (status) query.status = status;

        const bookings = await TourBooking.findOne(query);


        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for the given user and status.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully retrieved bookings",
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings. Try again.",
        });
    }
};

export const deleteUserTourBooking = async (req, res) => {

    const { userId, status } = req.query;

    try {
        const query = {};

        if (userId) query.userId = userId;
        if (status) query.userId = userId;

        const bookings = await TourBooking.findOneAndDelete(query);

        if (bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for the given user and status.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully retrieved bookings",
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings. Try again.",
        });
    }
};

export const deleteTourBooking = async (req, res) => {
    const id = req.params.id;
    try {
        await TourBooking.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully deleted"}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to delete. Try again"});
    }
};

export const updateTourBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTourBooking = await TourBooking.findByIdAndUpdate(id, {$set: req.body}, {new:true});
        res.status(200).json({success: true, message: "Successfully updated", data: updatedTourBooking,}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to update. Try again"});
    }
};

export const updateUserTourBooking = async (req, res) => {

    const { userId, status } = req.query;

    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required to update a booking.",
            });
        }

        const query = {};
        if (userId) query.userId = userId;
        if (status) query.status = status;

        // Find and update the booking
        const updatedTourBooking = await TourBooking.findOneAndUpdate(
            query, // Query to find the booking
            { $set: req.body }, // Update data
            { new: true } // Return the updated document
        );

        if (!updatedTourBooking) {
            return res.status(404).json({
                success: false,
                message: "No booking found for the given userId.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated the booking.",
            data: updatedTourBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update the booking. Try again but this is right.",
        });
    }
};