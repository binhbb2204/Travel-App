import { query } from "express";
import Transaction from "../Models/Transaction.js";

export const createTransaction = async (req,res) => {
    const newTrans = new Transaction(req.body);
    try {
        const savedTrans = await newTrans.save();
        res.status(200).json({success: true, message: "Successfully created", data: savedTrans,}); 
    } catch (error) {
        res.status(500).json({success: false, message: "Failed to create. Try again"});
    }

};

export const deleteTransaction = async (req, res) => {
    const id = req.params.id;
    try {
        await Transaction.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Successfully deleted"}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to delete. Try again"});
    }
};

export const getSingleTransaction = async (req, res) => {
    // console.log("Tried get single");
    const id = req.params.id;
    try {
        const trans = await Transaction.findById(id);
        res.status(200).json({success: true, message: "Successfully found", data: trans,}); 
    } catch(error){
        res.status(500).json({success: false, message: "Failed to find. Try again"});
    }
};

export const getAllTransaction = async (req, res) => {
    try {
        const trans = await Transaction.find({});
        res.status(200).json({success: true, countr: trans.length, message: "Successfully get", data: trans,}); 
        console.log("Tried");
    } catch(error){
        res.status(500).json({success: false, message: "Failed to get. Try again"});
    }
};

export const getUserTransaction = async (req, res) => {
    const { userId } = req.query;

    try {
        const query = {};

        if (userId) query.userId = userId;

        const trans = await Transaction.find(query);

        if (trans.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for the given user and status.",
            });
        }
        res.status(200).json({
            success: true,
            message: "Successfully retrieved bookings",
            data: trans,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings. Try again.",
            error: error.message,

        });
        console.log("Query:", query);

    }
};
