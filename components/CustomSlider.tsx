import * as Slider from "@radix-ui/react-slider";
import React from "react";

interface CustomSliderProps {
  value: number;
  onChange: (value: number) => void;
}
const CustomSlider: React.FC<CustomSliderProps> = ({ value, onChange }) => {
  return (
    <Slider.Root
      className="
        relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      max={1}
      step={0.1}
      aria-aria-label="Volume"
      onValueChange={(value) => onChange(value[0])}
    >
      <Slider.Track
        className="
            bg-neutral-600
            relative
            grow
            rounded-full h-[3px]
            cursor-pointer"
      >
        <Slider.Range
          className="
                absolute bg-white rounded-full h-full"
        />
      </Slider.Track>
    </Slider.Root>
  );
};
export default CustomSlider;
