import TourBooking from "../Models/TourBooking.js";

export const createTourBooking = async(req, res) => {
    const newTourBooking = new TourBooking(req.body);
    try {
        const saveTourBooking = await newTourBooking.save();
        res.status(200).json({status: true, message: "Your tour is booked!", data: saveTourBooking})
    } catch (error) {
        res.status(500).json({status: true, message: "Internal Server is Error"})
    }
}