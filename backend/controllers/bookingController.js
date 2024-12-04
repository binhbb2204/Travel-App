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