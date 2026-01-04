import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// Update booking status
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const { status } = await req.json();
    const db = await dbConnect();
    const bookingsCollection = db.collection("bookings");

    const result = await bookingsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Booking updated successfully",
    });
  } catch (error) {
    console.error("Update booking error:", error);
    return Response.json(
      { success: false, message: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// Get single booking
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const db = await dbConnect();
    const bookingsCollection = db.collection("bookings");

    const booking = await bookingsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!booking) {
      return Response.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Get booking error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
