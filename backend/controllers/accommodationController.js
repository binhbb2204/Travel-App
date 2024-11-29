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

export const getAccommodationBySearch = async (res,res) => {
    const city = new RegExp(req.query.city, 'i');
    const 
}