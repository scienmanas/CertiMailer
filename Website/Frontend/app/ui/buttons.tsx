interface GlowingButtonProps {
  text: string;
}

export function GlowingButton(props: GlowingButtonProps): JSX.Element {
  const { text } = props;

  return (
    <button className="bubble-element glow-button px-5 py-3 border-[3px] border-gray-600 w-fit h-fit rounded-[10px] active:scale-95 duration-150">
      <span className="text-white">{text}</span>
    </button>
  );
}
