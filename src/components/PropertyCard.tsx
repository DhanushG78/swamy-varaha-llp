import Link from "next/link";

type Props = {
  title: string;
  price: string;
  image: string;
  location: string;
  slug: string;
};

const PropertyCard = ({
  title,
  price,
  image,
  location,
  slug,
}: Props) => {
  return (
    <Link href={`/properties/${slug}`}>
      <div className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer">
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{location}</p>
          <p className="mt-2 font-medium">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
