import { useEffect, useState, useRef, useCallback } from "react";

const ProgressBar = ({ current, max, rgbaColor, animator }) => {
  const [width, setWidth] = useState(0);
  const progressBarRef = useRef(null);

  const animateProgressBar = useCallback(() => {
    const percentage = (current / max) * 100;
    setWidth(percentage);
  }, [current, max]);

  useEffect(() => {
    const node = progressBarRef.current;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBar();
        } else {
          setWidth(0);
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [animateProgressBar]);

  useEffect(() => {
    animateProgressBar();
  }, [animator, animateProgressBar]);

  const gradient = `linear-gradient(to right, ${rgbaColor.replace(
    /[\d.]+\)$/g,
    "0.33)"
  )}, ${rgbaColor})`;

  return (
    <div className="w-full" ref={progressBarRef}>
      <div className="bg-background-end" style={{ height: "1px" }}>
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${width}%`,
            background: gradient,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
