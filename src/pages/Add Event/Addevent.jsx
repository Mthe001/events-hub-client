import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { imageUpload } from "@/api/Utils"; // Assuming you have this function for uploading images
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import eventAnimation from '../../assets/add-articles.json'; // Import Lottie animation

const Addevent = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        location: '',
        image: null,
        tags: [],
        description: ''
    });

    const navigate = useNavigate();

    // Updated event type tags
    const tagOptions = [
        { value: 'Concert', label: 'Concert' },
        { value: 'Workshop', label: 'Workshop' },
        { value: 'Seminar', label: 'Seminar' },
        { value: 'Conference', label: 'Conference' },
        { value: 'Festival', label: 'Festival' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Exhibition', label: 'Exhibition' },
        { value: 'Webinar', label: 'Webinar' },
        { value: 'Networking', label: 'Networking' },
        { value: 'Charity', label: 'Charity' },
        { value: 'Meetup', label: 'Meetup' },
        { value: 'Party', label: 'Party' },
    ];

    const { data: publishers = [] } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-publishers"); // Assuming the same publisher endpoint
            return data;
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleTagsChange = (selectedOptions) => {
        setFormData({ ...formData, tags: selectedOptions });
    };

    const onSubmit = async (data) => {
        try {
            const imageURL = await imageUpload(formData.image); // Assuming you have this function for uploading images
            const newData = {
                ...formData,
                image: imageURL,
                status: 'pending',
                postedDate: Date.now(),
                tags: formData.tags.map(tag => tag.value) // Save tags as values
            };

            // Post data to your server (example: axiosSecure)
            await axiosSecure.post("/add-event", newData); // Add event endpoint
            toast.success("Event added successfully!", { duration: 5000 });
            setFormData({
                eventName: '',
                eventDate: '',
                location: '',
                image: null,
                tags: [],
                description: ''
            });
            navigate("/events");
        } catch (error) {
            toast.error("Error occurred while adding event.");
        }
    };

    return (
        <div className="flex items-center justify-center my-20 px-4 lg:px-16">
            <div className="md:w-11/12 lg:w-10/12 flex flex-col md:flex-row bg-background border-2 p-5 shadow-lg rounded-lg overflow-hidden">
                {/* Lottie Animation Section */}
                <div className="md:w-1/2 p-6 rounded-l-lg flex justify-center items-center shadow-lg">
                    <Lottie animationData={eventAnimation} loop={true} /> {/* Lottie with the animation */}
                </div>

                {/* Form Section */}
                <div className="md:w-1/2 p-6 space-y-6 bg-background border-2 rounded-r-lg shadow-xl">
                    <h2 className="text-3xl font-semibold dark:text-blue-500 text-foreground mb-4">Add New Event</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Event Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="eventName" className="text-lg text-gray-600">Event Name</label>
                            <input
                                type="text"
                                id="eventName"
                                name="eventName"
                                {...register('eventName', { required: 'Event name is required' })}
                                value={formData.eventName}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 bg-background rounded-lg focus:outline-none"
                            />
                            {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message}</p>}
                        </div>

                        {/* Event Date */}
                        <div className="space-y-2">
                            <label htmlFor="eventDate" className="text-lg text-gray-600">Event Date</label>
                            <input
                                type="date"
                                id="eventDate"
                                name="eventDate"
                                {...register('eventDate', { required: 'Event date is required' })}
                                value={formData.eventDate}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 bg-background rounded-lg focus:outline-none"
                            />
                            {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate.message}</p>}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="text-lg text-gray-600">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                {...register('location', { required: 'Location is required' })}
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 bg-background rounded-lg focus:outline-none"
                            />
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label htmlFor="image" className="text-lg text-gray-600">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                className="w-full p-4 border border-gray-300 bg-background rounded-lg focus:outline-none"
                            />
                        </div>

                        {/* Tags Multi-Select */}
                        <div className="space-y-2">
                            <label htmlFor="tags" className="text-lg text-gray-600">Event Type</label>
                            <Select
                                id="tags"
                                name="tags"
                                isMulti
                                options={tagOptions}
                                value={formData.tags}
                                onChange={handleTagsChange}
                                className="w-full bg-background text-cyan-500"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-blg text-gray-600">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                {...register('description', { required: 'Description is required' })}
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full p-4 bg-background border-2 rounded-lg"
                            />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg"
                        >
                            Submit Event
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addevent;
