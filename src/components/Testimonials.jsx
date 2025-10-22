import { useState, useEffect } from 'react';
import { Quote, User } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Patel',
    batch: 'B.Tech 2019',
    role: 'Software Engineer at Infosys',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'GSV gave me the foundation for my tech career. AlumniVerse helped me stay connected with my professors and batchmates. The coding workshops and placement guidance were game-changers!',
  },
  {
    name: 'Sneha Gupta',
    batch: 'B.Tech 2020',
    role: 'Civil Engineer at L&T',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The infrastructure projects at GSV prepared me for real-world challenges. Through AlumniVerse, I mentor current civil engineering students and share industry insights from my work on metro rail projects.',
  },
  {
    name: 'Rohit Kumar',
    batch: 'B.Tech 2018',
    role: 'Data Scientist at TCS',
     image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'GSV\'s mathematics and computer science curriculum built my analytical foundation. AlumniVerse connected me with alumni working in AI/ML, and now I contribute to the data science mentorship program.',
  },
  {
    name: 'Kavita Singh',
    batch: 'B.Tech 2017',
    role: 'Electrical Engineer at BHEL',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The hands-on electrical engineering labs at GSV were incredible. AlumniVerse helped me find my current role in renewable energy projects, and I regularly participate in technical webinars for current students.',
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
            Hear what Gati Shakti Vishwavidyalaya alumni have to say about their journey and GSVConnect experience
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
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-4 border-slate-400 shadow-medium flex items-center justify-center">
                        <User className="w-10 h-10 text-slate-600" />
                      </div>
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
