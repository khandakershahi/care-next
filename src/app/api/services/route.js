import { dbConnect } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const db = await dbConnect();
    const servicesCollection = db.collection("services");

    // Check if services exist, if not seed them
    const count = await servicesCollection.countDocuments();
    
    if (count === 0) {
      const seedServices = [
        {
          _id: "baby-care-001",
          name: "Baby Care",
          description: "Professional and caring babysitters for your little ones. 24/7 available with verified credentials and background checks.",
          price: 15,
          duration: 60,
          image: "https://images.unsplash.com/photo-1503454537688-e6ba6cab7ee8?w=600&h=400&fit=crop",
          isFeatured: true,
          isDeleted: false,
          features: ["Verified Caregivers", "24/7 Availability", "Emergency Support", "First Aid Certified"],
          rating: 4.8,
          reviews: 250
        },
        {
          _id: "elderly-care-001",
          name: "Elderly Care",
          description: "Compassionate care for seniors. Assistance with daily activities, medication management, and companionship for peace of mind.",
          price: 18,
          duration: 60,
          image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&h=400&fit=crop",
          isFeatured: true,
          isDeleted: false,
          features: ["Trained Professionals", "Medical Assistance", "Companion Care", "Daily Living Help"],
          rating: 4.9,
          reviews: 180
        },
        {
          _id: "sick-care-001",
          name: "Sick People Care",
          description: "Specialized care for individuals recovering from illness. Professional medical support and monitoring at home.",
          price: 20,
          duration: 60,
          image: "https://images.unsplash.com/photo-1579154204601-01d1bf01d437?w=600&h=400&fit=crop",
          isFeatured: false,
          isDeleted: false,
          features: ["Medical Expertise", "Home Healthcare", "Recovery Support", "24/7 Monitoring"],
          rating: 4.7,
          reviews: 150
        }
      ];

      await servicesCollection.insertMany(seedServices);
    }

    const services = await servicesCollection.find({}).toArray();
    
    return Response.json({
      success: true,
      data: services,
      meta: {
        total: services.length
      }
    });
  } catch (error) {
    console.error("Services API error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// Create new service
export async function POST(req) {
  try {
    const serviceData = await req.json();
    const db = await dbConnect();
    const servicesCollection = db.collection("services");

    // Add default fields
    const newService = {
      ...serviceData,
      _id: undefined,
      isFeatured: false,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await servicesCollection.insertOne(newService);

    return Response.json({
      success: true,
      message: "Service created successfully",
      data: { ...newService, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Create service error:", error);
    return Response.json(
      { success: false, message: "Failed to create service" },
      { status: 500 }
    );
  }
}
