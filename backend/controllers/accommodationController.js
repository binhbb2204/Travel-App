import Accommodation from "../Models/Accommodation.js";

export const createAccommodation = async (req,res) => {

    const newAcco = new Accommodation(req.body);

    try {
        const savedAcco = await newAcco.save();
        res.status(200).json({success: true, message: "Successfully created", data: savedAcco,}); 
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to create. Try again"});
    }

};