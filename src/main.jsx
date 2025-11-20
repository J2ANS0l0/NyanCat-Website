import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Canvas } from "@react-three/fiber";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Canvas 
    shadows
    gl={{ 
      clearColor: "#000011",
      alpha: false
    }}
  >
    <color attach="background" args={["#000011"]} />
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </Canvas>
);
