import React from "react";

export default function CentredMain({
  innerComponent,
}: {
  innerComponent: React.ReactNode;
}): React.ReactElement {
  return (
    <main className="flex items-center justify-center min-h-screen min-w-full">
      {innerComponent}
    </main>
  );
}
