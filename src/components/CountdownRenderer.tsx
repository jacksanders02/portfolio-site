import React from "react";
import { CountdownRenderProps } from "react-countdown";

/**
 * A custom renderer for react-countdown (Changes format from DD:HH:MM:SS to DD-HH:MM:SS, which is more readable)
 * @constructor
 * @param props
 */
export default function CountdownRenderer(props: CountdownRenderProps): React.ReactElement {
  return (
    <div className={`flex flex-row items-center ${props.props.className}`}>
      <span>{props.formatted.days}</span>
      -
      <span>{props.formatted.hours}</span>
      <span className={`mb-1 md:mb-3 lg:mb-4`}>:</span>
      <span>{props.formatted.minutes}</span>
      <span className={`mb-1 md:mb-3 lg:mb-4`}>:</span>
      <span>{props.formatted.seconds}</span>
    </div>
  );
}
