declare module 'react-range-slider-input' {
  import * as React from 'react';

  export interface RangeSliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: [number, number];
    disabled?: boolean;
    onInput?: (value: [number, number]) => void;
    onRangeDragEnd?: (value: [number, number]) => void;
    className?: string;
    title?: string;
  }

  const RangeSlider: React.FC<RangeSliderProps>;

  export default RangeSlider;
}