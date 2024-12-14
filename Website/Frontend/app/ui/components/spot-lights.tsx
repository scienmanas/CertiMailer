import clsx from "clsx";

interface SpotLightProps {
  height: number;
  width: number;
  opacity: number;
  top: number;
  left?: number;
  right?: number;
}

export function SpotLight({
  height,
  width,
  opacity,
  top,
  left,
  right,
}: SpotLightProps): JSX.Element {
  return (
    <div
      className={clsx("absolute -z-10")}
      style={{
        opacity: opacity,
        top: top,
        left: left,
        width: width,
        height: height,
        right: right,
      }} // Apply opacity directly as inline style
    >
      <div className="w-full h-full dark:bg-[#151c25]">
        <div className="w-full h-full bg-gradient-to-r from-orange-300 via-purple-500 to-transparent rounded-full blur-xl"></div>
      </div>
    </div>
  );
}
