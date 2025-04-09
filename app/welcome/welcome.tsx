import React from "react";
import { UnityGame } from "../components/UnityGame"; // Make sure this path is correct

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <UnityGame />
    </main>
  );
}
