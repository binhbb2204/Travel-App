import AccommodationBooking from "../Models/AccommodationBooking.js";

export const createAccommodationBooking = async(req, res) => {
    const newAccommodationBooking = new AccommodationBooking(req.body);
    try {
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