// Require a distributor model
const Distributor = require('../models/distributorModel');

// Get all distributors
const getDistributors = async (req, res) => {
    try {
        const distributors = await Distributor.find();
        return res.status(200).json({
            status: 'success',
            data: distributors
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

// Create a new distributor
const createDistributor = async (req, res) => {
    try {
        const newDistributor = await Distributor(req.body);
        const savedDistributor = await newDistributor.save();
        return res.status(201).json({
            status: 'success',
            data: savedDistributor
        });
    } catch(error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const getDistributorById = async (req, res) => {
    try {
        const distributor = await Distributor.findById(req.params.id);
        return res.status(200).json({
            status: 'success',
            data: distributor
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

// Export a controller
module.exports = {
    getDistributors,
    createDistributor,
    getDistributorById
}