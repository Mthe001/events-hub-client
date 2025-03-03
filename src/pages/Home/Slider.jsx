import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { TextAnimate } from "@/components/magicui/text-animate";

// Static JSON data
const events = [
    {
        "_id": "1",
        "eventName": "Legendary Event 1",
        "eventDate": "2029-11-11",
        "location": "Central Park, New York, NY",
        "image": "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "description": "This is a legendary event happening in Central Park!",
        
    },
    {
        "_id": "2",
        "eventName": "Legendary Event 2",
        "eventDate": "2029-11-12",
        "location": "Times Square, New York, NY",
        "image": "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "description": "Join us for an amazing concert in the heart of Times Square!",
       
    },
    {
        "_id": "3",
        "eventName": "Legendary Event 3",
        "eventDate": "2029-11-13",
        "location": "Brooklyn Bridge, New York, NY",
        "image": "https://images.pexels.com/photos/2306277/pexels-photo-2306277.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "description": "A massive music festival at the iconic Brooklyn Bridge.",
        
    },
    {
        "_id": "4",
        "eventName": "Legendary Event 4",
        "eventDate": "2029-11-14",
        "location": "Madison Square Garden, New York, NY",
        "image": "https://images.pexels.com/photos/16408/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200",
        "description": "Catch the biggest sports event of the year at Madison Square Garden!",
        
    },
    {
        "_id": "5",
        "eventName": "Legendary Event 5",
        "eventDate": "2029-11-15",
        "location": "Central Park, New York, NY",
        "image": "https://images.pexels.com/photos/919734/pexels-photo-919734.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "description": "A sunset celebration with live performances in Central Park.",
       
    },
    {
        "_id": "6",
        "eventName": "Legendary Event 6",
        "eventDate": "2029-11-16",
        "location": "The Bronx, New York, NY",
        "image": "https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "description": "A grand art expo in the heart of The Bronx showcasing local artists.",
        
    }
];

const SwiperSlider = () => {
    // Sort events by views in descending order and limit to top 6
    const filteredEvents = events
        .sort((a, b) => b.views - a.views) // Sort by views in descending order
        .slice(0, 6); // Limit to the top 6 events

    return (
        <div className="relative w-full max-w-screen-xl mt-10 mx-auto">
            {/* Title/Heading */}
            <TextAnimate className="mb-10 lg:text-5xl md:text-4xl text-3xl text-center font-semibold text-foreground" animation="blurInUp" by="character">
                Top Events by: Events Hub
            </TextAnimate>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1} // Reduce to 1 if you have only a few slides
                slidesPerGroup={1} // Set this to 1 as well for better navigation
                loop={filteredEvents.length > 2} // Only enable loop if there are enough slides
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation
                className="h-[300px] sm:h-[400px] lg:h-[600px]"
            >
                {filteredEvents.length === 0 ? (
                    <div>No events available</div>
                ) : (
                    filteredEvents.map((event, index) => (
                        <SwiperSlide key={index} className="relative flex items-center justify-center">
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={event.image}
                                    alt={event.eventName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                        {event.eventName}
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-300 mt-2 line-clamp-2">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;

