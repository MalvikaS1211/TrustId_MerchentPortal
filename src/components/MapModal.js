import React, { useState, useEffect } from "react";

export default function MapModal() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });

  // Get user's current location
  useEffect(() => {
    if (open) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to access your location.");
        }
      );
    }
  }, [open]);

  const mapSrc = location.lat
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
    : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600  px-4 py-2 rounded"
      >
        Show My Location
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-black font-bold"
            >
              ✕
            </button>

            {mapSrc ? (
              <iframe
                src={mapSrc}
                width="100%"
                height="400"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            ) : (
              <div className="text-center text-gray-600">Loading map...</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
