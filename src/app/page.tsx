"use client";
import CentredMain from "@/global/centred-main";
import React from "react";
import { toggleDarkMode } from "@/global/global-functions";

export default function Home(): React.ReactNode {
  return (
    <CentredMain
      innerComponent={<h1 onClick={toggleDarkMode}>Home Page!</h1>}
    />
  );
}
