import React from "react";

export const validateNaturalNumber: (e: React.FormEvent<HTMLInputElement>) => boolean = (e: React.FormEvent<HTMLInputElement>) => {
  const keycode = e.data.charCodeAt(0);
  if (keycode < 48 || keycode > 57) {
    e.stopPropagation()
    console.log(e.isPropagationStopped());
  }
}