import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const getTripList= async(req,res)=>{
    try {
        const {userId} = req.params;

        const trips = await Booking.find({userId}).populate("customerId hostId listingId")

        if(!trips)
        {
            return res.status(404).json({message:"booking not found"});
        }
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json(error)
    }
    
}

export const addListingToWishList = async(req,res)=>{
    try {
        const {userId,listingId} = req.params;

        const user = await User.findById(userId);

        if(!user)
        {
            return res.status(404).json({message:"user not found"});
        }
        const listing = await Listing.find(listingId).populate("creator");

        if(!listing)
        {
            return res.status(404).json({message:"listing not found"});
        }
        const favouriteListing = user.wishList.find((item)=>item._id.toString() ===listingId)

        if(favouriteListing)
        {
            user.wishList.filter((item)=>item._id.toString()!==listingId)

            await user.save();
            res.status(200).json({message: "Listing is removed from wishlist", wishList: user.wishList,})
        }
        else
        {
            user.wishList.push(listing)
            await user.save();
            res.status(200).json({
                message: "Listing is added to wishlist",
                wishList: user.wishList,
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getPropertyList = async(req,res)=>{
    try {
        const {userId} = req.params;
        const properties = await Listing.find({creator:userId}).populate("creator");

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getReservationList = async(req,res)=>{
    try {
        const {userId} = req.params;

        const reservations = await Booking.find({hostId:userId}).populate("customerId hostId listingId");
        res.status(200).json(reservations)
    } catch (error) {
        res.status(500).json(error);
    }
}