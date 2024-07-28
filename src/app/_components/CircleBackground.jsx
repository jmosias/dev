export default function CircleBackground() {
  const mainCircleSize = "90vh";
  const innerCircleSize = "87vh";

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground rounded-full opacity-5"
      style={{ width: mainCircleSize, height: mainCircleSize }}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-foreground rounded-full"
        style={{ width: innerCircleSize, height: innerCircleSize }}
      ></div>
    </div>
  );
}
