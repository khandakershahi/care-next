import { dbConnect } from "@/lib/dbConnect";

export const reviewsData = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Excellent service! Amazing experience.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Great job, very professional.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 3,
    comment: "Average experience, nothing special.",
  },
];

export async function POST(request) {
  const newReview = await request.json();
  const reviewsRes = await dbConnect("reviews");
  const res = await reviewsRes.insertOne(newReview);
  return Response.json({
    message: "Review added successfully!",
    review: res,
  });
}

export async function GET(request) {
  const reviewsRes = await dbConnect("reviews");
  const reviews = await reviewsRes.find({}).toArray();
  return Response.json({
    reviews,
    message: "Reviews retrieved successfully!",
  });
}
