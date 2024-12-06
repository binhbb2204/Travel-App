import AccommodationBooking from "../Models/AccommodationBooking.js";

export const createAccommodationBooking = async(req, res) => {
    const newAccommodationBooking = new AccommodationBooking(req.body);
    console.log("tried create acco booking");
    try {
        // // Extract the data from the request body
        // const {
        //     userId,
        //     // accommodationId,
        //     name,
        //     accommodationName,
        //     email,
        //     phone,
        //     checkInDate,
        //     checkOutDate,
        //     adults,
        //     children,
        //     specialRequest,
        //     totalPrice,
        //     serviceCharge,
        //     status,
        // } = req.body;

        // // Convert userId and accommodationId to ObjectId (if they are not already)
        // const bookingData = {
        //     userId: mongoose.Types.ObjectId(userId),  // Convert userId to ObjectId
        //     // accommodationId: mongoose.Types.ObjectId(accommodationId),  // Convert accommodationId to ObjectId
        //     name,
        //     accommodationName,
        //     email,
        //     phone,
        //     checkInDate,
        //     checkOutDate,
        //     adults,
        //     children,
        //     specialRequest,
        //     totalPrice,
        //     serviceCharge,
        //     status,
        // };

        // // Create a new accommodation booking
        // const newAccommodationBooking = new AccommodationBooking(bookingData);
        const saveAccoBooking = await newAccommodationBooking.save();
        res.status(200).json({status: true, message: "Your accommodation is booked!", data: saveAccoBooking})
    } catch (error) {
        res.status(500).json({status: true, message: "Internal Server Error"})
    }
}

export const getAllAccommodationBooking = async(req, res) => {
    try {
        const books = await AccommodationBooking.find()

        res.status(200).json({status: true, message: "Successful", data: books})
    } catch (error) {
        res.status(404).json({status: false, message: "Accommodation Not Found",})
    }
}

export const getAccommodationBooking = async(req, res) => {
    const id = req.params.id
    try {
        const book = await AccommodationBooking.findById(id)

        res.status(200).json({status: true, message: "Successful", data: book})
    } catch (error) {
        res.status(500).json({status: false, message: "Internal Server Error",})
    }
}

export const getUserAccoBooking = async (req, res) => {
    // const { userId, status } = req.query;

    // try {
    //     // Query to find accommodations matching userID and status
    //     const bookings = await AccommodationBooking.find({
    //         userId: userId,
    //         status: status,
    //     });
    const { userId, status } = req.query;

    try {
        const query = {};

        if (userId) query.userId = userId;
        if (status) query.status = status;

        const bookings = await AccommodationBooking.findOne(query);

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

export const deleteUserAccoBooking = async (req, res) => {
    // const { userId, status } = req.query;

    // try {
    //     // Query to find accommodations matching userID and status
    //     const bookings = await AccommodationBooking.find({
    //         userId: userId,
    //         status: status,
    //     });
    const { userId, status } = req.query;

    try {
        const query = {};

        if (userId) query.userId = userId;
        if (status) query.userId = userId;

        const bookings = await AccommodationBooking.findOneAndDelete(query);


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

export const deleteAccoBooking = async (req, res) => {
    const id = req.params.id;
    try {
        await AccommodationBooking.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully deleted"}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to delete. Try again"});
    }
};

export const updateAccoBooking = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedAccoBooking = await AccommodationBooking.findByIdAndUpdate(id, {$set: req.body}, {new:true});
        res.status(200).json({success: true, message: "Successfully updated", data: updatedAccoBooking,}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to update. Try again"});
    }
};

export const updateUserAccoBooking = async (req, res) => {
    // const { userId } = req.query;
    // try {
    //     const query = {};
    //     if (userId) query.userId = userId;
    //     const updatedAccoBooking = await AccommodationBooking.findOneAndUpdate({userId: userId}, {$set: req.body}, {new:true});
    //     res.status(200).json({success: true, message: "Successfully updated", data: updatedAccoBooking,}); 
    // } catch(error){
    //     res.status(500).json({success: false, message: "Failed to update. Try again"});
    // }

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
        const updatedAccoBooking = await AccommodationBooking.findOneAndUpdate(
            query, // Query to find the booking
            { $set: req.body }, // Update data
            { new: true } // Return the updated document
        );

        if (!updatedAccoBooking) {
            return res.status(404).json({
                success: false,
                message: "No booking found for the given userId.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successfully updated the booking.",
            data: updatedAccoBooking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update the booking. Try again.",
        });
    }
};