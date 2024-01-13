import React from "react";
import { CountdownRenderProps } from "react-countdown";

/**
 * A responsive parallax for the hero section.
 * On smaller heights, the list of projects sometimes catches up to the website title, so the best solution is to start
 * with the parallax being faster, and then slow it down as the screen size increases
 * @param children {React.JSX.Element[]} The elements that should go inside the Parallax
 * @constructor
 */
export default function CountdownRenderer(props: CountdownRenderProps): React.ReactElement {
  return (
    <div className={`flex flex-row items-center ${props.props.className}`}>
      <span>{props.formatted.days}</span>
      <span className={`mb-2 md:mb-3 lg:mb-5`}>-</span>
      <span>{props.formatted.hours}</span>
      <span className={`mb-2 md:mb-3 lg:mb-5`}>:</span>
      <span>{props.formatted.minutes}</span>
      <span className={`mb-2 md:mb-3 lg:mb-5`}>:</span>
      <span>{props.formatted.seconds}</span>
    </div>
  );
}
