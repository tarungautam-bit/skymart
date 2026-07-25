import React from "react";

const AboutPage = () => {
  const features = [
    {
      title: "Wide Product Selection",
      description:
        "Browse thousands of quality products across multiple categories including electronics, fashion, groceries, furniture, beauty, and more.",
      icon: "🛍️",
    },
    {
      title: "Fast Delivery",
      description:
        "Get your favorite products delivered quickly with our trusted delivery partners and real-time order tracking.",
      icon: "🚚",
    },
    {
      title: "Secure Payments",
      description:
        "Shop confidently using secure payment methods including Cards, UPI, Net Banking, and Cash on Delivery.",
      icon: "🔒",
    },
    {
      title: "24/7 Support",
      description:
        "Our customer support team is always ready to help you with orders, returns, refunds, and product inquiries.",
      icon: "💬",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-lime-400 text-black font-semibold text-sm mb-5">
              About Our Store
            </span>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Shopping Made
              <span className="text-lime-400"> Simple</span> &
              <span className="text-lime-400"> Secure</span>
            </h1>

            <p className="text-gray-400 mt-6 text-lg leading-8">
              We are committed to providing high-quality products at affordable
              prices while delivering an exceptional shopping experience. From
              the latest gadgets to everyday essentials, everything you need is
              available in one place.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">
              <div>
                <h2 className="text-4xl font-bold text-lime-400">50K+</h2>
                <p className="text-gray-400 mt-2">Happy Customers</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-lime-400">500+</h2>
                <p className="text-gray-400 mt-2">Premium Products</p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-lime-400">99%</h2>
                <p className="text-gray-400 mt-2">Customer Satisfaction</p>
              </div>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
              alt="Shopping"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-lime-400">Us?</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We focus on quality products, secure shopping, and excellent
            customer service to make every purchase enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:border-lime-400 transition"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>

              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>

              <p className="text-gray-400 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#111] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold">
            Our <span className="text-lime-400">Mission</span>
          </h2>

          <p className="text-gray-400 text-lg mt-8 leading-8">
            Our mission is to make online shopping fast, secure, and affordable
            for everyone. We continuously improve our platform to provide
            quality products, competitive pricing, and outstanding customer
            support while building long-term trust with every customer.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;