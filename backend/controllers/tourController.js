import Tour from "../Models/Tour.js";

export const createTour = async(req, res) => {
    const newTour = new Tour(req.body);

    try {
        const savedTour = await newTour.save();

        res.status(200).json({success:true, data:savedTour})
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
          });
    }
}

export const updateTour = async(req, res) => {
    const id = req.params.id
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})
        res.status(200).json({success:true, data: updatedTour})
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}


export const getSingleTour = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const getAllTour = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

export const deleteTour = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}


