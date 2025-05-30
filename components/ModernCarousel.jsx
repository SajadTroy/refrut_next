"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import "@/public/css/carousel.css";

const carouselItems = [
  {
    videoUrl: "/video/carousel/one.mp4",
    poster: "/video/carousel/poster/one.png",
    heading: "Connect with Piecom's Laser Beam Technology",
    paragraph:
      "Experience internet without cables through Piecom's innovative beam technology. Our wireless optical system delivers fast, reliable connectivity to homes and businesses, even in remote or disaster-prone areas, without the need for costly infrastructure.",
  },
  {
    videoUrl: "/video/carousel/two.mp4",
    poster: "/video/carousel/poster/two.png",
    heading: "Affordable Internet for All",
    paragraph:
      "Piecom makes high-speed internet accessible with budget-friendly plans. Say goodbye to expensive cable installations and enjoy seamless connectivity that fits your wallet, perfect for households and small businesses looking to stay connected affordably.",
  },
  {
    videoUrl: "/video/carousel/three.mp4",
    poster: "/video/carousel/poster/three.png",
    heading: "Reliable in Disaster Zones",
    paragraph:
      "When disaster strikes, Piecom keeps you connected. Our beam-based internet is quickly deployable in areas affected by hurricanes, earthquakes, or floods, ensuring communities stay online for critical communication and recovery efforts.",
  },
  {
    videoUrl: "/video/carousel/four.mp4",
    poster: "/video/carousel/poster/four.png",
    heading: "Scalable Solutions for Any Need",
    paragraph:
      "From rural homes to urban hubs, Piecom's wireless beam technology scales effortlessly. Our flexible solutions provide fiber-like speeds without cables, empowering you to work, stream, and connect wherever you are, even in challenging environments.",
  },
  {
    videoUrl: "/video/carousel/five.mp4",
    poster: "/video/carousel/poster/five.png",
    heading: "Empower Communities with Piecom",
    paragraph:
      "Join thousands who trust Piecom for resilient, budget-friendly internet. Our beam technology bridges the digital divide, delivering fast, secure connectivity to disaster areas and underserved regions, fostering innovation and community resilience.",
  },
];

const ModernCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const videoRefs = useRef([]);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Pause non-active videos
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === currentIndex) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Handle touch start
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const swipeDistance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          setCurrentIndex((prevIndex) =>
            prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
          );
        } else {
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
          );
        }
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={carouselItems[0].videoUrl}
          as="video"
          type="video/mp4"
        />
      </Head>
      <div
        className="carousel-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="carousel-wrapper">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? "active" : ""}`}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="carousel-video"
                autoPlay={index === currentIndex}
                loop
                muted
                playsInline
                poster={item.poster}
                loading={index === currentIndex ? "eager" : "lazy"}
              >
                <source src={item.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="carousel-overlay"></div>
              <div className="carousel-text">
                <h2>
                  {item.heading}
                </h2>
                {/* <p>{item.paragraph}</p> */}
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-indicators">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModernCarousel;