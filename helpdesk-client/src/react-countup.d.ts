declare module "react-countup" {
  import * as React from "react";

  export interface CountUpProps {
    start?: number;
    end: number;
    duration?: number;
    delay?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
    separator?: string;
    decimal?: string;
    className?: string;
  }

  export default class CountUp extends React.Component<CountUpProps> {}
}
