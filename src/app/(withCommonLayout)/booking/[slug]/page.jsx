"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getSingleService } from "@/services/services.service";
import Container from "@/components/shared/Container";
import { MapPin, Clock, DollarSign } from "lucide-react";

const BookingPage = ({ params }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    duration: 1,
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  // Location data
  const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
  const districtsByDivision = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Manikganj"],
    Chittagong: ["Chittagong", "Cox's Bazar", "Rangamati", "Khagrachari"],
    Rajshahi: ["Rajshahi", "Bogra", "Naogaon", "Natore"],
    Khulna: ["Khulna", "Satkhira", "Bagerhat", "Jhenaidah"],
    Barisal: ["Barisal", "Patuakhali", "Bhola", "Pirojpur"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj"],
    Rangpur: ["Rangpur", "Dinajpur", "Kurigram"],
    Mymensingh: ["Mymensingh", "Jamalpur", "Sherpur"],
  };

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      const fetchService = async () => {
        const { slug } = await params;
        const res = await getSingleService(slug);
        setService(res?.data);
        setLoading(false);
      };

      fetchService();
    }
  }, [status, router, params]);

  // Calculate total cost
  useEffect(() => {
    if (service) {
      const cost = service.price * formData.duration;
      setTotalCost(cost);
    }
  }, [service, formData.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent fields
      ...(name === "division" && { district: "", city: "", area: "" }),
      ...(name === "district" && { city: "", area: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.division || !formData.district || !formData.city || !formData.area || !formData.address) {
      alert("Please fill in all location fields");
      return;
    }

    const bookingData = {
      serviceId: service._id,
      serviceName: service.name,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      duration: formData.duration,
      location: {
        division: formData.division,
        district: formData.district,
        city: formData.city,
        area: formData.area,
      },
      address: formData.address,
      totalCost: totalCost,
      status: "Pending",
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();
      if (result.success) {
        alert("Booking confirmed! Status: Pending");
        router.push("/dashboard/my-bookings");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (status === "loading" || loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!service) {
    return <div className="py-20 text-center">Service not found</div>;
  }

  const currentDistricts = districtsByDivision[formData.division] || [];

  return (
    <section className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book {service.name}</h1>
          <p className="text-gray-600 mb-8">Complete the form below to book this service</p>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border p-8 space-y-6">
                {/* Duration */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                    <Clock size={20} />
                    Select Duration
                  </label>
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    max="24"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-600 mt-2">{formData.duration} hour(s)</p>
                </div>

                {/* Location */}
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                    <MapPin size={20} />
                    Select Location
                  </label>

                  {/* Division */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Division</label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Division</option>
                      {divisions.map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  {formData.division && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select District</option>
                        {currentDistricts.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* City */}
                  {formData.district && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Enter city name"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Area */}
                  {formData.city && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                      <input
                        type="text"
                        name="area"
                        placeholder="Enter area/zone name"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {/* Address */}
                  {formData.area && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Address</label>
                      <textarea
                        name="address"
                        placeholder="Enter your full address"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Confirm Booking
                </button>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl border p-6 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Booking Summary</h3>

                <div className="border-t pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span className="font-semibold">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">{formData.duration} hour(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate</span>
                    <span className="font-semibold">${service.price}/hour</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Cost</span>
                    <span className="text-3xl font-bold text-blue-600">${totalCost}</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                  <p className="font-semibold mb-2">Booking Status</p>
                  <p>Your booking will be created with <span className="font-semibold text-yellow-600">Pending</span> status and will be confirmed by the caregiver.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BookingPage;
