import Link from "next/link";
import { Clock, Star } from "lucide-react";
import Image from "next/image";

export default function ServiceCard({ service }) {
  const { _id, name, description, price, image, duration, isFeatured, isDeleted, rating, reviews } = service || {};

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl ${isDeleted ? "opacity-50 grayscale" : ""}`}>
      {/* Featured Badge */}
      {isFeatured && !isDeleted && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
          <Star size={14} className="text-yellow-400" />
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 w-full">
        <Image src={image} alt={name} fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">
            {description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-gray-500">({reviews} reviews)</span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={16} />
            {duration} mins
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Starting at</p>
            <p className="text-2xl font-bold text-gray-900">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* CTA */}
        {!isDeleted ? (
          <Link href={`/services/${_id}`}>
            <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              View Details
            </button>
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-gray-200 py-3 text-sm font-medium text-gray-600">
            Service Unavailable
          </div>
        )}
      </div>
    </div>
  );
}
