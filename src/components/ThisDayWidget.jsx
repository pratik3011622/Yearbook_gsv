import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const historicalEvents = [
  {
    year: 2018,
    month: 'March',
    day: 15,
    title: 'Annual Tech Fest Inauguration',
    description: 'The 10th edition of our flagship tech fest kicked off with record participation.',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    year: 2019,
    month: 'October',
    day: 20,
    title: 'Graduation Ceremony 2019',
    description: 'Over 500 students received their degrees in a memorable ceremony.',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    year: 2020,
    month: 'February',
    day: 14,
    title: 'Sports Day Championship',
    description: 'Inter-college sports meet saw fierce competition and school spirit.',
    image: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    year: 2021,
    month: 'September',
    day: 5,
    title: 'Alumni Reunion Weekend',
    description: 'Alumni from 15 different batches reunited for a weekend of nostalgia.',
    image: 'https://images.pexels.com/photos/1543895/pexels-photo-1543895.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export const ThisDayWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % historicalEvents.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextEvent = () => {
    setCurrentIndex((prev) => (prev + 1) % historicalEvents.length);
  };

  const prevEvent = () => {
    setCurrentIndex((prev) => (prev - 1 + historicalEvents.length) % historicalEvents.length);
  };

  const event = historicalEvents[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-10 bg-cover bg-center"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-6 shadow-soft">
            <Calendar className="w-5 h-5 text-accent-400" />
            <span className="font-medium">This Day in College History</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Walk Down Memory Lane
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-strong">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-80 md:h-auto">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-xl font-bold">
                  {event.year}
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-accent-400 font-semibold text-sm mb-3">
                  {event.month} {event.day}
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  {event.title}
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={prevEvent}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/30 transition-all group"
            aria-label="Previous event"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextEvent}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/30 transition-all group"
            aria-label="Next event"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <div className="flex justify-center space-x-2 mt-6">
            {historicalEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-accent-400' : 'w-2 bg-white/40'
                }`}
                aria-label={`Go to event ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
