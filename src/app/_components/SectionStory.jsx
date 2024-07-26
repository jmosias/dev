import { useState, useEffect } from "react";
import { ExternalLink, Volume2, VolumeX } from "lucide-react";
import { Howl } from "howler";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

export default function SectionStory({ scenes, credits, metadata }) {
  const maxScenes = scenes.length - 1;
  const [activeScene, setActiveScene] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [bgMusic, setBgMusic] = useState(null);
  const [musicMuted, setMusicMuted] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bgMusic) {
      bgMusic.on("play", () => {
        setMusicMuted(false);
      });
    }
  }, [bgMusic]);

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
          img.onload = resolve;
        })
    );

    const music = new Howl({
      src: [metadata.music_loop_src],
      loop: true,
      volume: 0,
    });

    Promise.all(imagePromises).then(() => {
      setBgMusic(music);
      music.play();
      music.fade(0, 0.3, 1000);
      setLoading(false);
      setHasStarted(true);
      setSceneProgress(1);
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
        style={{ left: 0, marginLeft: "6vw", width: "64vw", height: "36vw" }}
      >
        {hasStarted && (
          // Audio Controller
          <div className="absolute top-0 right-0 flex flex-col items-center p-2 z-20 bg-background-start border-l border-b border-background-end rounded-bl-2xl hover:text-primary">
            <button
              className="uppercase text-sm tracking-widest"
              onClick={toggleMusic}
            >
              {musicMuted ? <VolumeX /> : <Volume2 />}
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

        {loading && (
          // Loading Screen
          <div className="absolute w-full h-full bg-background-start z-20"></div>
        )}

        {hasStarted === false && hasEnded === false && !loading && (
          // Main Menu
          <div className="absolute w-full h-full">
            <Image
              src={metadata.bg_main_menu.image}
              alt={metadata.bg_main_menu.description}
              width={1600}
              height={900}
              style={{ filter: "brightness(35%)" }}
            ></Image>
            <div className="absolute w-full h-full top-0 flex flex-col justify-center items-center text-foreground">
              <div className="text-center pb-8">
                <h3 className="font-special text-7xl uppercase tracking-special pl-8">
                  {metadata.title}
                </h3>
                <p className="uppercase tracking-widest font-extralight">
                  {metadata.subtitle}
                </p>
              </div>
              <div className="absolute bottom-3 right-0 w-1/6 h-1/6 bg-background-start p-2 flex justify-center items-center border-t border-l border-background-end rounded-tl-2xl">
                <button
                  className="cursor-pointer uppercase tracking-widest text-2xl font-extralight hover:text-primary pl-1"
                  onClick={() => handleStart()}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}

        {hasStarted === true && hasEnded === false && !loading && (
          // Story Scenes
          <>
            <div
              className="cursor-pointer absolute w-full h-full"
              onClick={() => handleNextScene()}
            >
              <Image
                src={scenes[activeScene].image}
                alt={scenes[activeScene].description}
                width={1600}
                height={900}
              ></Image>
              <div className="absolute top-0 w-full h-full flex justify-center">
                <div className="absolute bottom-3 w-4/6 h-1/6 bg-background-start-tp px-12 py-4 flex items-center rounded-tl-2xl">
                  <p>{scenes[activeScene].script}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 right-0 w-1/6 h-1/6 bg-background-start p-2 flex flex-col justify-around items-center tracking-widest text-sm font-extralight">
              <button
                className="uppercase hover:text-primary"
                onClick={() => handlePreviousScene()}
              >
                Previous
              </button>
              <button
                className="uppercase hover:text-primary"
                onClick={() => handleNextScene()}
              >
                Next
              </button>
              <button
                className="uppercase hover:text-primary"
                onClick={() => handleMenu()}
              >
                Main Menu
              </button>
            </div>
          </>
        )}

        {hasEnded === true && (
          // Credits
          <div className="absolute top-0 w-full h-full bg-background-start">
            <Image
              src={metadata.bg_credits.image}
              alt={metadata.bg_credits.description}
              width={1600}
              height={900}
              style={{ filter: "brightness(35%)" }}
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
                          className="select-none"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-3 right-0 w-1/6 h-1/6 bg-background-start p-2 flex justify-center items-center border-t border-l border-background-end rounded-tl-2xl">
              <button
                className="cursor-pointer uppercase tracking-widest text-2xl font-extralight hover:text-primary pl-1"
                onClick={() => handleMenu()}
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
