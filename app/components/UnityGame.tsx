import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
export function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/SwarmUI.loader.js",
    dataUrl: "Build/SwarmUI.data",
    frameworkUrl: "Build/SwarmUI.framework.js",
    codeUrl: "Build/SwarmUI.wasm",
  });
  return (
    <Unity
      unityProvider={unityProvider}
      style={{
        width: "80vw",
        height: "80vh",
      }}
    />
  );
}
