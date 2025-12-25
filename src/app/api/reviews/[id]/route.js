import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const reviewsRes = await dbConnect("reviews");

export async function GET(request, { params }) {
  const { id } = await params;

  if (id.length != 24) {
    return Response.json(
      {
        message: "Invalid review ID",
      },
      { status: 400 }
    );
  }

  const review = await reviewsRes.findOne({ _id: new ObjectId(id) });
  return Response.json({
    review,
    message: "Single review retrieved successfully!",
  });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const data = await request.json();

  if (id.length != 24) {
    return Response.json(
      {
        message: "Invalid review ID",
      },
      { status: 400 }
    );
  }

  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
    $set: data,
  };

  const review = await reviewsRes.updateOne(filter, updateDoc);
  return Response.json({
    review,
    message: "Review updated successfully!",
  });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const data = await request.json();

  if (id.length != 24) {
    return Response.json(
      {
        message: "Invalid review ID",
      },
      { status: 400 }
    );
  }

  const filter = { _id: new ObjectId(id) };

  const review = await reviewsRes.deleteOne(filter);
  return Response.json({
    review,
    message: "Review deleted successfully!",
  });
}
