"use client";
import React from "react";

const MyBookings = () => {
  const bookings = [];

  return (
    <div>
      {bookings?.length == 0 ? (
        <h2 className="font-bold text-6xl text-purple-500">No bookings</h2>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Bookings will be displayed here */}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
