import React, { useState,useEffect } from "react";
import axios from "axios";

const EventCard = ({ event, onClick }: { event: { title: string; description: string; src?: string }; onClick: () => void }) => {
  return (
    <div
    className="relative group bg-white dark:bg-neutral-900 shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between"
    onClick={onClick}
  >
    {/* Title moved outside the card */}
    <div className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-neutral-200 text-center p-4">
      {event.title}
    </div>
  
    {event.src && (
      <img
        src={event.src}
        alt={event.title}
        className="w-full h-full object-cover"
      />
    )}
  
    {/* Card Content without the title */}
   
  </div>
  
  );
};

// Popup component to show event details
const Popup = ({ event, onClose }: { event: { title: string; description: string; price: string; imgSrc: string }; onClose: () => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-800 p-10 rounded-3xl shadow-lg w-4/5 md:w-3/4 lg:w-2/3 flex relative">
       
        <button
          className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>

      
        <img
          src={event.imgSrc}
          alt={`${event.title} image`}
          className="w-1/3 h-auto object-contain mr-10"
        />

       
        <div className="flex flex-col justify-start flex-1">
          <h2 className="text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
            {event.title}
          </h2>
          <p className="text-green-600 font-semibold text-md">{event.price}</p>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
            {event.description}
          </p>

          {/* Register Button */}
          
          <button
          className="mt-4 border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-white px-4 rounded-full"
          onClick={handleRegisterClick}
        >
          <span>Register</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
        </button>
           
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
const Modal = ({ isOpen, onClose }) => {
  const handleBackdropClick = (event) => {
    
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50" // Changed items-center to items-start
      >
        <div
          className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/3 mt-80" // Added mt-20 for vertical spacing
        >
          <h2 className="text-lg text-black font-bold">Coming Soon</h2>
          <p className="mt-2 text-black">This event will be available for registration soon!</p>
          <button
            className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

// Main EventsPage Component
const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<{ title: string; description: string; price: string; imgSrc: string } | null>(null);
/*  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getallevents');
        const events = response.data.eventswithimageurls;
  
      
        const formattedData = events.map(event => ({
          category: "SRMIST",
          title: event.event_name,
          price: `${event.event_price}`, 
          src: event.event_image,
          description: event.event_description,
        }));
  
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
  fetchEvents();},[])*/
  const handleEventClick = (event: { title: string; description: string; price: string; imgSrc: string }) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="bg-black min-h-screen">
      <button
    className="absolute top-4 left-4 bg-slate-50 text-black px-4 py-2 rounded-full hover:bg-slate-300 transition-transform duration-300"
    onClick={() => window.location.href = '/'} // Adjust path as necessary
  >
   MainMenu
  </button>
      <div className="min-h-screen gradient-bg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onClick={() => handleEventClick({ ...event, imgSrc: event.src })}
            />
          ))}
        </div>
        {selectedEvent && (
          <Popup event={selectedEvent} onClose={handleClosePopup} />
        )}
      </div>

      {/* Adding CSS directly here for convenience */}
      <style>{`
  /* Apple-like card styles */
  .apple-card {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 100%; /* Makes the height 100% of the width */
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1); /* Soft shadow for a floating effect */
    transition: all 0.3s ease;
  }

  .apple-card:hover {
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15); /* Hover shadow for more depth */
    transform: scale(1.05);
  }

  .apple-card-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px); /* Blurring the background inside the card */
    background-color: rgba(255, 255, 255, 0.1); /* Transparent overlay */
    color: #333;
    padding: 1rem;
  }

  /* Gradient background with image */
  .gradient-bg {
    background: url('https://your-image-url.com/background-image.jpg') center center / cover no-repeat; /* Use your image URL here */
    background-size: cover; /* Ensures the image covers the entire background */
    background-position: center;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  /* Global styles for dark theme */
  body {
    background-color: #000000;
    color: #fff;
  }
`}</style>

    </div>
  );
};

// Sample data for events
export const data = [
  {
    category: "SRMIST",
    title: "Crypt-o-Track",
    price: "$20",
    description: "A crime investigation event on the AI (Artificial intelligence) platform with clues based on images, QR codes, coding, and algorithms. A case file will be provided with formats. The winner will depend on the report submitted.",
    src: "https://www.knowafest.com/files/uploads/WhatsApp%20Image%202022-11-02%20at%2018.38.17-2022110203.jpg",
  },
  {
    category: "SRMIST",
    title: "Reverse Engineering",
    price: "$15",
    description: "Reverse engineering is the process of analyzing software in order to understand how it works. This involves taking a program apart, examining the individual components, and identifying the logic of the underlying algorithms.",
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/66aced86518357.5d9c37a10c838.jpg",
  },
  {
    category: "SRMIST",
    title: "Tech Spectrum",
    price: "$25",
    description: "Tech Spectrum is a technology festival that brings together tech enthusiasts from different backgrounds to showcase their innovative projects, learn from industry leaders, and network with like-minded individuals.",
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5e92ff86518357.5d9c37a10c838.jpg",
  },,
  {
    category: "SRMIST",
    title: "Reverse Engineering",
    price: "$15",
    description: "Reverse engineering is the process of analyzing software in order to understand how it works. This involves taking a program apart, examining the individual components, and identifying the logic of the underlying algorithms.",
    src: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/66aced86518357.5d9c37a10c838.jpg",
  }
  
];

export default EventsPage;
