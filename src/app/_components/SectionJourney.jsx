import { useState } from "react";
import { Howl } from "howler";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

export default function SectionJourney({ scenes, credits, metadata }) {
  const maxScenes = scenes.length - 1;
  const [activeScene, setActiveScene] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [bgMusic, setBgMusic] = useState(null);
  const [musicMuted, setMusicMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState({});

  const handleMenu = () => {
    setHasEnded(false);
    setHasStarted(false);
    setActiveScene(0);
    setSceneProgress(0);
    if (bgMusic) {
      bgMusic.fade(bgMusic.volume(), 0, 1000);
    }
  };

  const handleCredits = () => {
    setHasEnded(true);
    setActiveScene(0);
    setSceneProgress(0);
  };

  const handleStart = () => {
    setLoading(true);

    const imagesToLoad = [
      metadata.bg_credits.image,
      ...scenes.map((scene) => scene.image),
    ];

    const imagePromises = imagesToLoad.map(
      (src) =>
        new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            setPreloadedImages((prev) => ({
              ...prev,
              [src]: img,
            }));
            resolve();
          };
        })
    );

    const minimumLoadingTime = new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    const music = new Howl({
      src: [metadata.music_loop_src],
      loop: true,
      volume: 0,
    });

    Promise.all([Promise.all(imagePromises), minimumLoadingTime]).then(() => {
      setBgMusic(music);
      music.play();
      music.fade(0, 0.3, 1000);
      setHasStarted(true);
      setSceneProgress(1);
      setLoading(false);
    });
  };

  const handleNextScene = () => {
    if (activeScene === maxScenes) {
      handleCredits();
    } else {
      setActiveScene(activeScene + 1);
      setSceneProgress(sceneProgress + 1);
    }
  };

  const handlePreviousScene = () => {
    if (activeScene !== 0) {
      setActiveScene(activeScene - 1);
      setSceneProgress(sceneProgress - 1);
    }
  };

  const toggleMusic = () => {
    setMusicMuted(!musicMuted);
    if (bgMusic) {
      if (musicMuted) {
        bgMusic.mute(false);
      } else {
        bgMusic.mute(true);
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div
        className="select-none absolute bg-background-start rounded-2xl overflow-hidden"
        style={{ width: "64vw", height: "36vw", marginBottom: "12vh" }}
      >
        {/* Audio Controller */}
        {hasStarted && (
          <div
            className="cursor-pointer absolute top-0 right-0 flex flex-col items-center p-2 z-20 bg-background-start border-l border-b border-background-end rounded-bl-2xl transition-colors hover:text-primary"
            onClick={toggleMusic}
          >
            <button className="uppercase text-sm tracking-widest w-6 h-6">
              {musicMuted ? (
                <i className="fa-solid fa-volume-xmark"></i>
              ) : (
                <i className="fa-solid fa-volume-high"></i>
              )}
            </button>
          </div>
        )}

        {/* Scene Progress Bar */}
        <div className="absolute bottom-0 w-5/6 h-3 bg-background-start z-10">
          <ProgressBar
            current={sceneProgress}
            max={maxScenes + 1}
            rgbaColor="rgba(226, 88, 34, 1)"
            animator={sceneProgress}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-1/6 h-3 bg-background-start z-10"></div>

        {/* Loading Screen */}
        <div
          className={`absolute w-full h-full bg-background-start transition-opacity duration-1000 ${
            loading ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="absolute bottom-8 right-12">Loading...</p>
        </div>

        {/* Main Menu */}
        {hasStarted === false && hasEnded === false && !loading && (
          <div className="absolute w-full h-full">
            <Image
              src={metadata.bg_main_menu.image}
              alt={metadata.bg_main_menu.description}
              style={{ filter: "brightness(35%)" }}
              priority
              fill
            />

            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-foreground">
              <div className="text-center pb-8">
                <h3 className="font-special text-7xl uppercase tracking-special pl-8">
                  {metadata.title}
                </h3>
                <p className="uppercase tracking-widest font-extralight">
                  {metadata.subtitle}
                </p>
              </div>
              <div
                className="cursor-pointer absolute bottom-3 right-0 w-1/6 h-1/6 bg-background-start p-2 flex justify-center items-center border-t border-l border-background-end rounded-tl-2xl transition-colors hover:text-primary"
                onClick={() => handleStart()}
              >
                <button className="flex flex-col gap-1 justify-center items-center">
                  <i className="fa-2xl fa-solid fa-play my-4"></i>
                  <p className="uppercase tracking-widest text-xs font-extralight">
                    Start
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Story Scenes */}
        {hasStarted === true && hasEnded === false && !loading && (
          <>
            <div
              className="cursor-pointer absolute w-full h-full"
              onClick={() => handleNextScene()}
            >
              {preloadedImages[scenes[activeScene].image] && (
                <Image
                  src={scenes[activeScene].image}
                  alt={scenes[activeScene].description}
                  fill
                />
              )}
              <div className="absolute top-0 w-full h-full flex justify-center">
                <div className="absolute bottom-3 w-4/6 h-1/6 bg-background-start-tp px-12 py-4 flex items-center rounded-tl-2xl">
                  <p>{scenes[activeScene].script}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 right-0 w-1/6 h-1/6 bg-background-start p-2 flex flex-col justify-around items-center tracking-widest text-sm font-extralight">
              <button
                className="uppercase transition-colors hover:text-primary"
                onClick={() => handlePreviousScene()}
              >
                Previous
              </button>
              <button
                className="uppercase transition-colors hover:text-primary"
                onClick={() => handleNextScene()}
              >
                Next
              </button>
              <button
                className="uppercase transition-colors hover:text-primary"
                onClick={() => handleMenu()}
              >
                Main Menu
              </button>
            </div>
          </>
        )}

        {/* Credit Scene */}
        {hasEnded === true && (
          <div className="absolute top-0 w-full h-full bg-background-start">
            <Image
              src={metadata.bg_credits.image}
              alt={metadata.bg_credits.description}
              style={{ filter: "brightness(35%)" }}
              fill
            ></Image>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center gap-8">
              <p className="uppercase font-special tracking-special text-2xl pl-4">
                Credits
              </p>
              <ul className="w-full flex flex-col gap-2">
                {credits.map((credit) => (
                  <li className="flex items-center gap-8" key={credit.id}>
                    <span className="flex-1 text-sm font-extralight text-right">
                      {credit.role}
                    </span>
                    <span className="flex-1 flex gap-2">
                      <p className="select-text text-lg">{credit.name}</p>
                      {credit.link && (
                        <a
                          href={credit.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="select-none transition-colors hover:text-primary"
                        >
                          <i className="fa-sm fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="cursor-pointer absolute bottom-3 right-0 w-1/6 h-1/6 bg-background-start p-2 flex justify-center items-center border-t border-l border-background-end rounded-tl-2xl transition-colors hover:text-primary"
              onClick={() => handleMenu()}
            >
              <button className="flex flex-col gap-1 justify-center items-center">
                <i className="fa-2xl fa-solid fa-arrow-right-from-bracket my-4"></i>
                <p className="uppercase tracking-widest text-xs font-extralight">
                  Exit
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
