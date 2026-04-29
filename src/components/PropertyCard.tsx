import Link from "next/link";

type Props = {
  title: string;
  price: string;
  image: string;
  location: string;
  slug: string;
  beds?: string | number;
  baths?: string | number;
};

const PropertyCard = ({
  title,
  price,
  image,
  location,
  slug,
  beds,
  baths,
}: Props) => {
  return (
    <Link href={`/properties/${slug}`} className="block group">
      <div className="bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="img-zoom relative">
          <img
            src={image}
            alt={title}
            className="w-full h-56 object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <p className="text-sm font-medium mb-2" style={{ color: "#e63946" }}>
            {price}
          </p>

          {/* Address / Title */}
          <h3 className="text-base font-medium mb-1" style={{ color: "#343a40" }}>
            {title}
          </h3>
          <p className="text-xs mb-3" style={{ color: "#6c757d" }}>
            {location}
          </p>

          {/* Meta */}
          {(beds || baths) && (
            <p className="text-xs mb-3" style={{ color: "#6c757d" }}>
              {beds && <span>{beds} beds</span>}
              {beds && baths && <span> &middot; </span>}
              {baths && <span>{baths} baths</span>}
            </p>
          )}

          {/* CTA */}
          <span
            className="inline-block text-sm font-medium group-hover:underline transition-colors duration-200"
            style={{ color: "#e63946" }}
          >
            See details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
