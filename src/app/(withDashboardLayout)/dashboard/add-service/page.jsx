"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload, Plus, X, Image as ImageIcon } from "lucide-react";

export default function AddServicePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [features, setFeatures] = useState([""]);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setImageUrl(data.data.display_url);
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const serviceData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      duration: formData.get("duration"),
      category: formData.get("category"),
      image: imageUrl || formData.get("image"),
      features: features.filter((f) => f.trim() !== ""),
      rating: 5,
      reviews: 0,
      createdBy: session?.user?.email,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Service added successfully!");
        router.push("/dashboard");
      } else {
        alert("Failed to add service: " + result.message);
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("An error occurred while adding the service");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add New Service</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details to create a new service offering
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Container */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Service Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Service Image</span>
                <span className="label-text-alt">Upload or provide URL</span>
              </label>
              <div className="flex flex-col gap-4">
                {imageUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-base-300">
                    <img
                      src={imageUrl}
                      alt="Service preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                      }}
                    />
                  </div>
                )}
                
                {/* File Upload */}
                <div className="flex gap-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <div className={`btn btn-outline w-full gap-2 ${isUploading ? 'loading' : ''}`}>
                      {isUploading ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4" />
                          Upload Image
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Divider */}
                <div className="divider my-0">OR</div>

                {/* URL Input */}
                <input
                  type="url"
                  name="image"
                  placeholder="Paste image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="divider"></div>

            {/* Service Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Service Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., Baby Care Service"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe your service in detail..."
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>

            {/* Price and Duration Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price ($/hr)</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="15.00"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Duration</span>
                </label>
                <select
                  name="duration"
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="Half day">Half day</option>
                  <option value="Full day">Full day</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Baby Care">Baby Care</option>
                  <option value="Elderly Care">Elderly Care</option>
                  <option value="Sick Care">Sick Care</option>
                  <option value="House Care">House Care</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="divider"></div>

            {/* Features */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Service Features</span>
                <span className="label-text-alt">Add key features of your service</span>
              </label>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="input input-bordered w-full"
                    />
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="btn btn-square btn-outline btn-error"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="btn btn-outline btn-sm gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-outline"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Adding Service...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Add Service
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
