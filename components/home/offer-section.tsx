// app/offers/page.tsx
"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

const OfferBanner = () => {
  const offers = [
    {
      id: 1,
      image: "/offers/offer1.jpg",
      title: "50% OFF",
      subtitle: "Electronics Sale",
    },
    {
      id: 2,
      image: "/offers/offer2.jpg",
      title: "Flash Sale",
      subtitle: "24 Hours Only",
    },
    {
      id: 3,
      image: "/offers/offer3.jpg",
      title: "Limited Time",
      subtitle: "Premium Discounts",
    },
  ];

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-r from-[#e63d3d] to-[#f07c54] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-white">
            🔥 Special Offers 🔥
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Don't miss out on these incredible deals! Limited time offers available now.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
              <Card
                  key={offer.id}
                  className="group overflow-hidden p-0 m-0 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-[#e63d3d]/20 h-80"
              >
                  <div className="relative w-full h-full">
                      <Image
                          src={offer.image}
                          alt={offer.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-2xl font-bold">{offer.title}</h3>
                          <p className="text-sm opacity-90">{offer.subtitle}</p>
                      </div>
                  </div>
              </Card>

          ))}
        </div>
      </div>
    </section>
  );
};

export default function OffersPage() {
  return <OfferBanner />;
}
