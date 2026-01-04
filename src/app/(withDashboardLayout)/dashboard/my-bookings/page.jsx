"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, Eye, Clock, MapPin, DollarSign } from "lucide-react";
import Container from "@/components/shared/Container";

export default function MyBookings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/bookings?email=${session.user.email}`
      );
      const result = await response.json();

      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Pending: "badge badge-warning",
      Confirmed: "badge badge-success",
      Completed: "badge badge-info",
      Cancelled: "badge badge-error",
    };
    return statusStyles[status] || "badge";
  };

  const handleCancel = async (bookingId) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled" }),
        });

        const result = await response.json();
        if (result.success) {
          fetchBookings();
          alert("Booking cancelled successfully!");
        }
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking");
      }
    }
  };

  if (status === "loading" || loading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">Loading bookings...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-base-200 rounded-lg p-8 text-center">
            <p className="text-lg text-gray-600 mb-4">
              No bookings found. Start booking a service!
            </p>
            <button
              onClick={() => router.push("/services")}
              className="btn btn-primary"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-base-100 rounded-lg shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-primary to-primary-focus p-4 text-white">
                  <h2 className="text-xl font-bold">{booking.serviceName}</h2>
                  <div className={`mt-2 ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Duration */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{booking.duration} hour(s)</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold">
                        {booking.location?.area}, {booking.location?.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.location?.district},{" "}
                        {booking.location?.division}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-sm font-medium">{booking.address}</p>
                  </div>

                  {/* Total Cost */}
                  <div className="flex items-center gap-3 bg-base-200 p-3 rounded">
                    <DollarSign className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="text-lg font-bold text-success">
                        ${booking.totalCost}
                      </p>
                    </div>
                  </div>

                  {/* Booking Date */}
                  <div>
                    <p className="text-sm text-gray-600">Booked on</p>
                    <p className="text-sm font-medium">
                      {new Date(booking.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-base-200 px-4 py-3 flex gap-2 justify-between">
                  <button
                    onClick={() => router.push(`/booking/${booking.serviceId}`)}
                    className="btn btn-sm btn-outline btn-primary flex-1 gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Details
                  </button>
                  {booking.status !== "Cancelled" &&
                    booking.status !== "Completed" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-sm btn-outline btn-error gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
