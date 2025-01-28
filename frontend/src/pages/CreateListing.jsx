import React, { useState } from "react";
import { types, facilities, categories } from "../data.jsx";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"

const CreateListing = () => {
    const [category, setCategory] = useState("");
    const [guestCount, setGuestCount] = useState(0);
    const [bedCount, setBedCount] = useState(0);
    const [bedroomCount, setBedroomCount] = useState(0);
    const [bathroomCount, setBathroomCount] = useState(0);
    const [photos, setPhotos] = useState([]);

    const [formDescription, setFormDescription] = useState({
        title: "",
        description: "",
        price: "",
    });

    const [formLocation, setFormLocation] = useState({
        aptSuite: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
    });
    const [type, setType] = useState("");
    const [amenities, setAmenities] = useState([]);

    const handleChangeDescription = (e) => {
        const { name, value } = e.target;
        setFormDescription({ ...formDescription, [name]: value });
    };
    const handleCategory = (selected) => {
        setCategory(selected);
    };
    const handleSelectAmenities = (feature) => {
        if (amenities.includes(feature)) {
        setAmenities((prevAmenities) =>
            prevAmenities.filter((item) => item !== feature)
        );
        } else {
        setAmenities((prevAmenities) => [...prevAmenities, feature]);
        }
    };

    const handleChangeLocation = (e) => {
        const { name, value } = e.target;
        setFormLocation({ ...formLocation, [name]: value });
    };

    const handleImageUpload = (e) => {
        const newImage = Array.from(e.target.files);
        setPhotos((prevPhotos) => [...prevPhotos, ...newImage]);
    };
    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) =>
        prevPhotos.filter((_, index) => index !== indexToRemove)
        );
    };

    const creatorId = useSelector((state)=> state?.user?.user?._id)

    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            
            const listingForm = new FormData()

            listingForm.append("creator", creatorId)
            listingForm.append("category", category)
            listingForm.append("type", type)
            listingForm.append("streetAddress", formLocation.streetAddress)
            listingForm.append("aptSuite", formLocation.aptSuite)
            listingForm.append("city", formLocation.city)
            listingForm.append("state", formLocation.state)
            listingForm.append("country", formLocation.country)
            listingForm.append("guestCount", guestCount)
            listingForm.append("bedroomCount", bedroomCount)
            listingForm.append("bedCount", bedCount)
            listingForm.append("bathroomCount", bathroomCount)
            listingForm.append("amenities", amenities)
            listingForm.append("title", formDescription.title)
            listingForm.append("description", formDescription.description)
            listingForm.append("price", formDescription.price)

            photos.forEach((photo)=>{
                listingForm.append("listingPhotos",photo);
            })

            const res = await axios.post(
                "http://localhost:3000/api/listing/create",
                listingForm,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if(res.status === 200 || res.status === 201)
            {
                console.log("Data created successfully")
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Details */}
        <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">Create Your Listing</h1>
            <p className="text-gray-500 mt-2">Enter the details to get started</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
                type="text"
                placeholder="Enter the Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            </div>
            {/* Description */}
            <div>
            <label className="block text-gray-700 font-medium mb-1">
                Description
            </label>
            <textarea
                rows="4"
                name="description"
                value={formDescription.description}
                placeholder="Enter the description"
                onChange={handleChangeDescription}
                className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            </div>
            {/* Price */}
            <div>
            <label className="block text-gray-700 font-medium mb-1">
                Price per night
            </label>
            <input
                type="text"
                placeholder="Enter the Price"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="w-full border rounded-lg p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
            />
            </div>
            {/* Category */}

            <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                Select the Category
            </h2>
            <div className="grid grid-cols-3 gap-4">
            {categories.map((item, index) => (
            <div
                key={index}
                onClick={() => handleCategory(item.label)}
                className={`cursor-pointer border rounded-lg p-3 text-center ${
                    category === item.label ? "bg-blue-200" : ""
                } hover:bg-blue-100`}
            >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="text-gray-700">{item.label}</div>
        </div>
                ))}
            </div>
            </div>
            {/* Accommodation */}
            <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
                Enter the Type of Accommodation
            </h2>
            <div className="grid grid-cols-3 gap-4">
            {types?.map((item, index) => (
            <div
                key={index}
                onClick={() => setType(item.name)}
                className={`cursor-pointer border rounded-lg p-3 hover:bg-blue-100 ${
                    type === item.name ? "bg-blue-200" : ""
                }`}
            >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold text-gray-700">{item.name}</div>
                <div className="text-gray-500">{item.description}</div>
            </div>
            ))}

            </div>
            </div>
            {/* Address */}
            <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Address</h2>
            <div className="grid grid-cols-2 gap-4">
                <input
                type="text"
                placeholder="Apartment No."
                onChange={handleChangeLocation}
                name="aptSuite"
                value={formLocation.aptSuite}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                placeholder="Street"
                onChange={handleChangeLocation}
                name="streetAddress"
                value={formLocation.streetAddress}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                placeholder="City"
                onChange={handleChangeLocation}
                name="city"
                value={formLocation.city}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                placeholder="State"
                onChange={handleChangeLocation}
                name="state"
                value={formLocation.state}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                placeholder="Country"
                onChange={handleChangeLocation}
                name="country"
                value={formLocation.country}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            </div>
            {/* Amenities */}
            <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Room Features
            </h2>
            <div className="grid grid-cols-3 gap-4">
                {facilities.map((facility, index) => (
                <div
                    key={index}
                    onClick={() => handleSelectAmenities(facility.name)}
                    className={`cursor-pointer border rounded-lg p-3 hover:bg-blue-100 ${
                    amenities.includes(facility.name) ? "bg-blue-100" : ""
                    }`}
                >
                    <div className="text-2xl mb-2">{facility.icon}</div>
                    <div className="text-gray-700">{facility.name}</div>
                </div>
                ))}
            </div>
            </div>
            {/* Image Upload */}
            <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Upload Images</h2>
            <div className="flex items-center space-x-4">
                
                <label className="cursor-pointer border rounded-lg p-3 flex items-center space-x-2 text-gray-500 hover:bg-blue-100">
                    <IoIosImages className="text-2xl" />
                    <p>Upload from your device</p>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                    />
                </label>
                
                {photos.map((photo, index) => (
                <div key={index} className="relative">
                    <img
                    src={URL.createObjectURL(photo)}
                    alt="uploaded"
                    className="h-20 w-20 rounded-lg"
                    />
                    <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                    >
                    <BiTrash className="text-xl" />
                    </button>
                </div>
                ))}
            </div>
            </div>
            {/* Submit */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg">
            Submit Listing
            </button>
        </form>
        </div>
    );
};

export default CreateListing;
