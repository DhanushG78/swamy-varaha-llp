const Hero = () => {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-[1.1] tracking-tight">
          Find Your Dream <span className="text-gray-300">Luxury</span> Home
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl font-light">
          Experience the pinnacle of refined living with our curated collection of world-class estates.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="/search">
            <button className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 hover:bg-gray-100 transition-all duration-300 shadow-2xl w-full sm:w-auto">
              Explore Properties
            </button>
          </a>
          <a href="/agents">
            <button className="bg-transparent border-2 border-white/30 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 w-full sm:w-auto">
              Meet Agents
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
