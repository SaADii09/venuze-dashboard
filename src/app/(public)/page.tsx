"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  MapPinIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { VenueCard } from "@/components/ui/VenueCard";

const categories = [
  { name: "Celebration Venues", count: "37 Venues", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=500&fit=crop" },
  { name: "Private Party Venues", count: "37 Venues", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop" },
  { name: "Corporate Meetings", count: "37 Venues", image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=500&fit=crop" },
  { name: "Creative Studios", count: "37 Venues", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop" },
];

const venueTabs = ["ROOFTOP", "GALLERY", "RESTAURANT", "OUTDOOR", "STUDIO", "TERRACE", "BALLROOM"];

const featuredVenues = [
  { name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=500&fit=crop", people: "300+", sqft: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour" },
  { name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=500&fit=crop", people: "300+", sqft: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour" },
  { name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop", people: "300+", sqft: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour" },
  { name: "High-Spec Room in Trendy Home Clapham/ Stockwell", location: "London, SW1", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=500&fit=crop", people: "300+", sqft: "2,000 sq ft", parking: "Free parking", more: "+25 more", price: "$50/hour" },
];

const vendorCategories = [
  { name: "Caterers", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=500&fit=crop" },
  { name: "Decorators", image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400&h=500&fit=crop" },
  { name: "Photographers", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=500&fit=crop" },
  { name: "Entertainment", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=500&fit=crop" },
];

const steps = [
  { num: "1", title: "Search & filter", desc: "Browse our curated collection of venues and event professionals. Use smart filters to find exactly what fits your needs, style, and budget." },
  { num: "2", title: "Compare & message", desc: "Communicate directly with venue hosts and service providers. Compare options, ask questions, and refine every detail of your event with confidence." },
  { num: "3", title: "Book & add services", desc: "Secure your venue through our streamlined booking system, with clear agreements, secure payments, and ongoing support. You can move forward knowing everything is handled." },
];

const stats = [
  { value: "1,500+", label: "Venues Verified & Approved" },
  { value: "7,500+", label: "Events Successfully Hosted" },
  { value: "35+", label: "Cities Across the Region" },
  { value: "4.9", label: "Average Host Rating", suffix: "★" },
];

const testimonials = [
  { name: "Michael Carter", role: "by Ayesha M.", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  { name: "Michael Carter", role: "by Ayesha M.", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
];

const destinations = [
  { city: "New York, USA", venues: "348 venues", rating: "4.9", tag: "Popular Rooftop", price: "From $50 per hour", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&h=500&fit=crop" },
  { city: "London, UK", venues: "348 venues", rating: "4.9", tag: "Popular Rooftop", price: "From $50 per hour", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=500&fit=crop" },
  { city: "Dubai, UAE", venues: "348 venues", rating: "4.9", tag: "Popular Rooftop", price: "From $50 per hour", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=500&fit=crop" },
];

export default function HomePage() {
  const [activeVenueTab, setActiveVenueTab] = useState("GALLERY");
  const [activeCategoryTab, setActiveCategoryTab] = useState("Venue");

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1440&h=600&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-brown/70 via-dark-brown/50 to-dark-brown/70" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
            Celebrate in venues<br />big and small
          </h1>

          {/* Search Bar */}
          <div className="w-full max-w-3xl">
            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={() => setActiveCategoryTab("Venue")}
                className={`flex items-center gap-2 px-6 py-2 rounded-pill text-sm font-medium transition-colors ${
                  activeCategoryTab === "Venue"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-dark-brown"
                }`}
              >
                <MapPinIcon className="w-4 h-4" />
                Venue
              </button>
              <button
                onClick={() => setActiveCategoryTab("Vendors")}
                className={`flex items-center gap-2 px-6 py-2 rounded-pill text-sm font-medium transition-colors ${
                  activeCategoryTab === "Vendors"
                    ? "bg-primary-500 text-white"
                    : "bg-white text-dark-brown"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Vendors
              </button>
            </div>

            {/* Search Fields - Desktop */}
            <div className="hidden md:flex items-center bg-white rounded-button overflow-hidden shadow-lg">
              <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 flex-1">
                <MapPinIcon className="w-5 h-5 text-dark-brown/60" />
                <span className="text-dark-brown text-sm font-medium">Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 border-r border-gray-200 flex-1">
                <CalendarDaysIcon className="w-5 h-5 text-dark-brown/60" />
                <span className="text-dark-brown text-sm font-medium">Anytime</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 flex-1">
                <UserGroupIcon className="w-5 h-5 text-dark-brown/60" />
                <span className="text-dark-brown text-sm font-medium">10-20</span>
              </div>
              <button className="flex items-center justify-center w-12 h-12 bg-primary-500 hover:bg-primary-600 transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Search Fields - Mobile (Stacked) */}
            <div className="md:hidden bg-white rounded-button overflow-hidden shadow-lg p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div>
                  <p className="text-xs text-dark-brown/50 mb-1">Where</p>
                  <p className="text-sm font-medium text-dark-brown">Dubai</p>
                </div>
                <MapPinIcon className="w-5 h-5 text-dark-brown/40" />
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <div>
                  <p className="text-xs text-dark-brown/50 mb-1">When</p>
                  <p className="text-sm font-medium text-dark-brown">20-2025</p>
                </div>
                <CalendarDaysIcon className="w-5 h-5 text-dark-brown/40" />
              </div>
              <div className="flex items-center justify-between pb-1">
                <div>
                  <p className="text-xs text-dark-brown/50 mb-1">Guests</p>
                  <p className="text-sm font-medium text-dark-brown">10</p>
                </div>
                <UserGroupIcon className="w-5 h-5 text-dark-brown/40" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-3 rounded-button font-semibold hover:bg-primary-600 transition-colors">
                <MagnifyingGlassIcon className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-2 mt-6">
            <span className="w-8 h-2 bg-primary-500 rounded-full" />
            <span className="w-2 h-2 bg-white/50 rounded-full" />
            <span className="w-2 h-2 bg-white/50 rounded-full" />
            <span className="w-2 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Find The Best Venue For Any Occasion */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-brown mb-4">
              Find The Best Venue For Any Occasion
            </h2>
            <p className="text-dark-brown/60 max-w-2xl mx-auto text-sm md:text-base">
              Explore venues by category, from timeless ballrooms and rooftops with a view to modern studios and outdoor gardens, discover spaces designed to inspire unforgettable experiences.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  href="/venues"
                  className="group relative h-[200px] md:h-[300px] rounded-card overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-dark-brown/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{cat.name}</h3>
                    <span className="inline-block text-xs font-semibold text-white border border-white rounded-button px-3 py-1.5 hover:bg-white hover:text-dark-brown transition-colors">
                      View details
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" aria-label="Previous">
              <ChevronLeftIcon className="w-5 h-5 text-dark-brown" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" aria-label="Next">
              <ChevronRightIcon className="w-5 h-5 text-dark-brown" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-brown text-center mb-8">
            Featured Venues
          </h2>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto scrollbar-hide">
            {venueTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveVenueTab(tab)}
                className={`px-5 py-2 rounded-pill text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeVenueTab === tab
                    ? "bg-primary-500 text-white"
                    : "bg-light-gray text-dark-brown/70 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Venue Cards */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVenues.map((venue, i) => (
                <VenueCard
                  key={i}
                  name={venue.name}
                  location={venue.location}
                  capacity={venue.people}
                  size={venue.sqft}
                  parking={venue.parking}
                  more={venue.more}
                  price={venue.price}
                  verified={true}
                  images={[venue.image]}
                />
              ))}
            </div>
            {/* Navigation Arrows */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" aria-label="Previous">
              <ChevronLeftIcon className="w-5 h-5 text-dark-brown" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" aria-label="Next">
              <ChevronRightIcon className="w-5 h-5 text-dark-brown" />
            </button>
          </div>
        </div>
      </section>

      {/* Complete Your Event with our Trusted Vendors */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-brown mb-4">
              Complete Your Event with our Trusted Vendors
            </h2>
            <p className="text-dark-brown/60 max-w-2xl mx-auto text-sm md:text-base">
              Venues are just the beginning. Discover caterers, decorators, photographers, entertainment, and more all in one place, ready to bring your event project to life.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {vendorCategories.map((vendor) => (
                <Link
                  key={vendor.name}
                  href="/venues"
                  className="group relative h-[200px] md:h-[300px] rounded-card overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${vendor.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-dark-brown/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-semibold text-white mb-2">{vendor.name}</h3>
                    <span className="inline-block text-xs font-semibold text-white border border-white rounded-button px-3 py-1.5 hover:bg-white hover:text-dark-brown transition-colors">
                      View details
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" aria-label="Previous">
              <ChevronLeftIcon className="w-5 h-5 text-dark-brown" />
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors hidden lg:flex" aria-label="Next">
              <ChevronRightIcon className="w-5 h-5 text-dark-brown" />
            </button>
          </div>
        </div>
      </section>

      {/* Grow Your Business with Venuze */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-accent-orange via-primary-500 to-accent-coral rounded-card overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute bottom-4 right-20 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute top-10 right-40 w-16 h-16 bg-white/10 rounded-full" />
            </div>
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                  Grow Your Business with Venuze
                </h2>
                <p className="text-white/80 text-sm mb-6">
                  Showcase your services to thousands of event organizers and creators searching for talent like yours.
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-dark-brown text-white px-6 py-3 rounded-button text-sm font-semibold hover:bg-dark-brown/90 transition-colors"
                >
                  Join as a Vendor
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="w-48 h-32 bg-white/10 rounded-card" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Path to the Perfect Venue */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-brown mb-4">
              Your Path to the Perfect Venue
            </h2>
            <p className="text-dark-brown/60 max-w-2xl mx-auto text-sm md:text-base">
              Planning an event, production, or gathering shouldn&apos;t feel complicated. Our streamlined process connects you with the right venues and trusted professionals, taking the stress out of logistics so you can focus on what matters most — making it a success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-brown mb-2">{step.title}</h3>
                  <p className="text-sm text-dark-brown/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by Event Creators */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-brown mb-4">
              Trusted by Event Creators Who Demand Excellence
            </h2>
            <p className="text-dark-brown/60 max-w-2xl mx-auto text-sm md:text-base">
              Join thousands of planners and hosts who love our seamless discovery and booking experience.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-accent-beige rounded-card">
                <div className="text-2xl md:text-3xl font-bold text-primary-500 mb-1">
                  {stat.value}{stat.suffix && <span className="text-accent-orange">{stat.suffix}</span>}
                </div>
                <div className="text-xs text-dark-brown/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="flex gap-4 p-6 bg-light-gray rounded-card">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  unoptimized
                />
                <div>
                  <p className="text-sm text-dark-brown/70 mb-3">{t.text}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-dark-brown">{t.name}</span>
                    <span className="text-xs text-dark-brown/40">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Exceptional Destinations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-dark-brown mb-4">
              Discover Exceptional Destinations Across the Region
            </h2>
            <p className="text-dark-brown/60 max-w-2xl mx-auto text-sm md:text-base">
              From cosmopolitan cityscapes to cultural treasures, explore where celebrations come alive with local flavor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.city}
                href="/venues"
                className="group bg-white rounded-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${dest.image}')` }}
                  />
                  <div className="absolute top-3 left-3 bg-white/90 text-dark-brown text-xs font-semibold px-3 py-1 rounded-pill">
                    {dest.venues}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 text-dark-brown text-xs font-semibold px-2 py-1 rounded-pill flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-accent-orange fill-accent-orange" />
                    {dest.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-dark-brown mb-1">{dest.city}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-dark-brown/50">{dest.tag}</span>
                    <span className="text-xs text-dark-brown/70">{dest.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Turn Your Venue into a Destination */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative bg-dark-brown rounded-card overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-dark-brown via-dark-brown/90 to-primary-500/30" />
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-accent-orange rounded-full translate-y-1/2" />
            </div>
            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
                  Turn Your Venue into a Destination
                </h2>
                <p className="text-white/70 text-sm mb-6">
                  List your space on Venuze and unlock new revenue opportunities. Reach clients looking for venues just like yours.
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-primary-500 text-white px-6 py-3 rounded-button text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                  List Your Venue
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="w-48 h-32 bg-white/10 rounded-card" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
