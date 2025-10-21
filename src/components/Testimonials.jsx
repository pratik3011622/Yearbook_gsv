import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    batch: 'Class of 2015',
    role: 'Software Engineer at Google',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'AlumniVerse helped me reconnect with my batch mates after years. The mentorship program has been invaluable in giving back to current students.',
  },
  {
    name: 'Rahul Verma',
    batch: 'Class of 2012',
    role: 'Entrepreneur & Startup Founder',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'This platform has become the bridge between our college memories and professional networking. I found my co-founder through AlumniVerse!',
  },
  {
    name: 'Anjali Mehta',
    batch: 'Class of 2018',
    role: 'Marketing Manager at Microsoft',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The job board feature helped me find amazing opportunities. Now I regularly post openings from my company to help fellow alumni.',
  },
  {
    name: 'Vikram Singh',
    batch: 'Class of 2010',
    role: 'Investment Banker',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'Attending the annual reunion organized through this platform was a dream come true. The nostalgia and connections are priceless.',
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Voices of Our Community
          </h2>
          <p className="text-xl text-neutral-600">
            Hear what alumni have to say about their AlumniVerse experience
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-full'
                }`}
              >
                <div className="card-elevated p-8 md:p-12 relative">
                  <div className="absolute top-8 left-8 text-primary-500/10">
                    <Quote className="w-24 h-24" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-6 mb-8">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-primary-500 shadow-medium"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-primary-600 font-medium">
                          {testimonial.batch}
                        </p>
                        <p className="text-neutral-600 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-xl text-neutral-700 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-12 bg-primary-600'
                    : 'w-3 bg-neutral-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
