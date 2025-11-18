"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Portland, OR",
      text: "The Classic Victorian door transformed our home's entrance. Beautiful craftsmanship and excellent customer service throughout the process.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      location: "Seattle, WA",
      text: "We love our Modern Minimalist door. It's exactly what we were looking for - sleek, durable, and perfectly installed. Highly recommend!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      location: "San Francisco, CA",
      text: "Pora Door exceeded our expectations. The Craftsman Heritage door adds so much character to our home. Quality is outstanding!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="w-[85%] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Don't just take our word for it - hear from satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 shadow-lg"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-secondary mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div>
                <p className="font-semibold text-primary">{testimonial.name}</p>
                <p className="text-sm text-secondary">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

