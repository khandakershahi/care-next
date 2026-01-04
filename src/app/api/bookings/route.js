import { dbConnect } from "@/lib/dbConnect";

// Create booking
export async function POST(req) {
  try {
    const bookingData = await req.json();
    const db = await dbConnect();
    const bookingsCollection = db.collection("bookings");

    const result = await bookingsCollection.insertOne({
      ...bookingData,
      _id: undefined,
      createdAt: new Date(),
    });

    return Response.json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return Response.json(
      { success: false, message: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// Get all bookings for user
export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const db = await dbConnect();
    const bookingsCollection = db.collection("bookings");

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const bookings = await bookingsCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    return Response.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
