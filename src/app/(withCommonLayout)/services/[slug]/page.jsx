import Image from "next/image";
import { Clock, Star, CheckCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import { getSingleService } from "@/services/services.service";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const serviceRes = await getSingleService(slug);
  const service = serviceRes?.data;

  return {
    title: service?.name || "Service Details | Care.xyz",
    description: service?.description || "Service details",
  };
}

const ServiceDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const serviceRes = await getSingleService(slug);
  const service = serviceRes?.data;

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Service not found</h2>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image */}
            <div className="relative h-[420px] overflow-hidden rounded-3xl">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                priority
              />

              {service.isFeatured && (
                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                  <Star size={16} className="text-yellow-400" />
                  Featured Service
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {service.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{service.rating}</span>
                  </div>
                  <span className="text-gray-600">({service.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  {service.duration} minutes
                </div>

                <div className="text-lg font-semibold text-gray-900">
                  ${service.price.toLocaleString()}/hour
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {service.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
              <div>
                <p className="text-sm text-gray-500">Service Price</p>
                <p className="text-4xl font-bold text-gray-900">
                  ${service.price}
                </p>
                <p className="text-sm text-gray-600">per hour</p>
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{service.duration} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    {service.rating}
                  </span>
                </div>
              </div>

              <Link href={`/booking/${service._id}`}>
                <button className="w-full rounded-xl bg-blue-600 py-4 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Book This Service
                </button>
              </Link>

              <p className="text-xs text-center text-gray-500">
                Book now and confirm with your preferred caregiver
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceDetailsPage;
