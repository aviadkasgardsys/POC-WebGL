# Unity WebGL Integration with React

This project demonstrates how to integrate a Unity WebGL build into a React application using the `react-unity-webgl` package.

## Prerequisites

- A Unity project set up to build for WebGL.
- Node.js and npm (or yarn) installed.
- A React project (this setup assumes you are using [Create React App](https://create-react-app.dev/) or a similar setup).

## Setup Instructions

### 1. Build the Unity Project

1. Open your Unity project.
2. Go to **File > Build Settings...** and select **WebGL** as the platform.
3. Click **Build** and choose an output folder (e.g., `Build`).

### 2. Extract the GZ Files

The Unity WebGL build output folder may contain several `.gz` files. These gzipped files are automatically handled by your web server if properly configured. However, if you need to extract these files manually:

1. Locate the `.gz` files inside your `Build` folder.
2. Use an extraction tool (e.g., 7-Zip on Windows or the built-in tools on macOS/Linux) to unzip these files.
3. Verify that you now have the extracted `.data`, `.js`, and `.wasm` files.

### 3. Copy the Build Folder into the Public Directory

1. In your React project, locate the `public` folder.
2. Copy the entire `Build` folder (with the extracted files) into your React app’s `public` directory. The structure should look like this:

```tsx
your-react-app/
├── public/
│ └── Build/
│ ├── FirstWebGL.loader.js
│ ├── FirstWebGL.data
│ ├── FirstWebGL.framework.js
│ └── FirstWebGL.wasm
└── app/
└── components/
└── UnityGame.tsx
```

### 4. Modify the UnityGame Component

Make sure your `UnityGame.tsx` file (located in `app/components`) points to the correct Unity WebGL build files. Below is an example implementation:

````tsx
import React, { useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export function UnityGame() {
// Ensure rendering only happens in the browser.
const [isClient, setIsClient] = useState(false);

useEffect(() => {
 setIsClient(true);
}, []);

// Update paths to match the copied build folder.
const { unityProvider } = useUnityContext({
 loaderUrl: "Build/FirstWebGL.loader.js",
 dataUrl: "Build/FirstWebGL.data",
 frameworkUrl: "Build/FirstWebGL.framework.js",
 codeUrl: "Build/FirstWebGL.wasm",
});

if (!isClient) {
 return null;
}

return (
 <div style={{ width: "100%", height: "1000px" }}>
   <Unity unityProvider={unityProvider} />
 </div>
);
}

5. Run the Application


	1. In the root directory of your React project, install the dependencies if you haven’t already:
        ```bash
        npm install
        ```




	2. Start the development server:

npm run dev


	3. Open your web browser and navigate to http://localhost:5173. You should see your Unity WebGL content rendered within your React application.

Project Structure Example

Below is an example of what your project structure might look like with the updated location for the UnityGame component:

your-react-app/
├── public/
│   ├── index.html
│   └── Build/
│       ├── FirstWebGL.loader.js
│       ├── FirstWebGL.data
│       ├── FirstWebGL.framework.js
│       └── FirstWebGL.wasm
├── app/
│   └── components/
│       └── UnityGame.tsx
├── src/
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
.
````
