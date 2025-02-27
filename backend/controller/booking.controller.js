import Booking from "../models/booking.model.js"

export const createBooking = async(req,res)=>{
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } =req.body
        const newBooking = new Booking({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice,
        })

        await newBooking.save()
        res.status(200).json(newBooking);
    } catch (error) {
        res.status(500).json(error)
    }
}