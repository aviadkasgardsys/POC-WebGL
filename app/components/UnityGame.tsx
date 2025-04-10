import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
export function UnityGame() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/FirstWebGL.loader.js",
    dataUrl: "Build/FirstWebGL.data",
    frameworkUrl: "Build/FirstWebGL.framework.js",
    codeUrl: "Build/FirstWebGL.wasm",
  });
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Unity
        unityProvider={unityProvider}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}
