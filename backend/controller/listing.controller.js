import Listing from '../models/listing.model.js'

export const createListing = async(req,res)=>{
    try {
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            state,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            price,
        } = req.body;

        const listingPhotos = req.files;
        if(!listingPhotos)
        {
            return res.status(400).json({message:"No files upload"});
        }
        const listingPhotoPaths = listingPhotos.map((file)=>file.path);

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            state,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            price,
        })

        await newListing.save()
        return res.status(201).json(newListing)
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getListings=async(req,res)=>{
    const qCategory = req.query.category;

    try {
        let listings;
        if(qCategory)
        {
            listings = await Listing.find({category:qCategory}).populate("creator")
        }
        else
        {
            listings = await Listing.find().populate("creator")
        }
        return res.status(200).json(listings)
    } catch (error) {
        return res.status(500).json(error);
    }
}

export const getListingDetails = async(req,res)=>{
    try {
        const {listingId}  = req.params;
        
        const listings = await Listing.findById(listingId).populate("creator")
        
        return res.status(200).json(listings)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getListingsBySearch = async(req,res)=>{
    const {search} = req.params;

    try {
        let listings = [];
        if(search==='all')
        {
            listings = await Listing.find().populate("creator")
        }
        else
        {
            listing = await Listing.find({
                $or:[
                    {category:{$regex:search,$options:"i"}},
                    {title: {$regex:search, $options:"i"}},
                ],
            }).populate("creator")
        }
        return res.status(200).json(listing)
    } catch (error) {
        return res.status(500).json(error)

    }
}