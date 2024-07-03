import Image from "next/image";

export default function ArrowUp() {
  return (
    <Image
      src="/arrow_up.svg"
      alt="Arrow Up"
      className="dark:invert absolute top-12 left-12 opacity-15 z-10"
      width={16}
      height={16}
      priority
    />
  );
}
