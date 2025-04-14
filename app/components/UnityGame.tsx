import React, { useEffect, useState  } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

declare global {
  interface Window {
    onUnityMessage: (jsonString: string) => void;
  }
}

export function UnityGame() {
  const { unityProvider, sendMessage, isLoaded } = useUnityContext({
    loaderUrl: "Build/SwarmUI.loader.js",
    dataUrl: "Build/SwarmUI.data",
    frameworkUrl: "Build/SwarmUI.framework.js",
    codeUrl: "Build/SwarmUI.wasm",
  });
  const [jsonData, setJsonData] = useState<string | null>(null);
  const [receivedFromUnity, setReceivedFromUnity] = useState<any>(null); // new

  useEffect(() => {
    window.onUnityMessage = function (jsonString) {
      const parsed = JSON.parse(jsonString);
      console.log("From Unity:", parsed.config);
      console.log("From Unity:", parsed.indoor);
    };
  }, []);
  // Fetch the JSON data from the public folder
  useEffect(() => {
    fetch("/Config.json")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(JSON.stringify(data)); // Set the JSON data to the state
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
  

  useEffect(() => {
    if (isLoaded && jsonData) {
      console.log("Sending message to Unity with JSON:", jsonData);
      sendMessage("ConfigManager", "ReceiveJson", jsonData);
    }
  }, [isLoaded, jsonData]);
  
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
