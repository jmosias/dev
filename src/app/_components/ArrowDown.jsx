import Image from "next/image";

export default function ArrowDown() {
  return (
    <Image
      src="/arrow_down.svg"
      alt="Arrow Down"
      className="dark:invert absolute bottom-12 right-12 opacity-15 z-10"
      width={16}
      height={16}
      priority
    />
  );
}
