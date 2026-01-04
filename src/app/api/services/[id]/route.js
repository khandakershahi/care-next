import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const servicesCollection = await dbConnect("services");

    const service = await servicesCollection.findOne({ _id: id });

    if (!service) {
      return Response.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: service
    });
  } catch (error) {
    console.error("Service detail error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
