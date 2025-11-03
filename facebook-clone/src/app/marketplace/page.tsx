'use client';

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Navbar } from "@/components/navbar";

const listings = [
  {
    id: "l:1",
    title: "Standing desk with cable management",
    price: "$320",
    location: "San Francisco · 2 km",
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800",
  },
  {
    id: "l:2",
    title: "Analog synth bundle",
    price: "$750",
    location: "Oakland · 9 km",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
  },
  {
    id: "l:3",
    title: "Cycling starter kit",
    price: "$480",
    location: "San Mateo · 24 km",
    image:
      "https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800",
  },
  {
    id: "l:4",
    title: "Retro arcade cabinet",
    price: "$1,150",
    location: "San Jose · 60 km",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
  },
];

export default function MarketplacePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-content">Marketplace</h1>
          <p className="text-sm text-subtle">
            Discover gear curated for builders, designers, and creators in your network.
          </p>
        </header>
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="card-border overflow-hidden rounded-3xl"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 px-4 py-3">
                <h2 className="text-sm font-semibold text-content">
                  {listing.title}
                </h2>
                <p className="text-sm text-accent">{listing.price}</p>
                <p className="text-xs text-subtle">{listing.location}</p>
                <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90">
                  <ShoppingCart className="h-4 w-4" />
                  Ask about availability
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
