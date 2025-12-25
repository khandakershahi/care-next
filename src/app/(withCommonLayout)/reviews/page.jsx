import Container from "@/components/shared/Container";
import { getAllReviews } from "@/services/reviews.service";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.588 9.38c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.953z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewsPage = async () => {
  const reviewsData = await getAllReviews();
  const reviews = reviewsData.reviews || [];

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          {totalReviews > 0 ? (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-3xl font-semibold text-gray-900">
                  {averageRating}
                </span>
              </div>
              <p className="text-lg text-gray-600">
                Based on {totalReviews}{" "}
                {totalReviews === 1 ? "review" : "reviews"}
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-600">No reviews yet.</p>
          )}
        </div>

        <Link
          href={"/reviews/create-review"}
          className="bg-purple-500 py-2 px-4 rounded-md shadow-md font-bold cursor-pointer inline-block mb-8"
        >
          Create a Review
        </Link>
        {/* Reviews Grid */}
        {totalReviews != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {review.name}
                    </h3>
                  </div>
                </div>

                <StarRating rating={review.rating} />

                <p className="mt-4 text-gray-700 flex-grow">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">
              Be the first to leave a review!
            </p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ReviewsPage;
