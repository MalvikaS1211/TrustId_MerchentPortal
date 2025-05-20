import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { registerFace } from "../Helper/ApiFunction";
import scan from "../../assets/images/GRID CORNERS.png";
const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  const handleFaceLogin = async () => {
    const UserId = localStorage.getItem("UserId");
    const res = await registerFace(UserId);

    console.log(res, "handleFaceLogin");
  };
  useEffect(() => {
    // startVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("✅ Webcam stream started");
        videoRef.current.srcObject = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          loadModels();
        };
      })
      .catch((err) => {
        console.error("❌ Error accessing webcam:", err);
      });
  };

  const loadModels = async () => {
    console.log("⏳ Loading face-api models...");

    try {
      console.log("called modles");
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);

      console.log("✅ All face-api models loaded successfully.");
      faceMyDetect();
    } catch (err) {
      console.error("❌ Failed to load one or more models:", err);
    }
  };
  // const faceMyDetect = () => {
  //   console.log("🚀 Starting face detection loop...");

  //   if (!videoRef.current) {
  //     console.error("❌ videoRef is null");
  //     return;
  //   }

  //   const canvas = faceapi.createCanvasFromMedia(videoRef.current);
  //   canvasRef.current.innerHTML = "";
  //   canvasRef.current.appendChild(canvas);

  //   const displaySize = { width: 940, height: 650 };
  //   faceapi.matchDimensions(canvas, displaySize);

  //   setInterval(async () => {
  //     if (!videoRef.current || videoRef.current.readyState !== 4) {
  //       console.warn("⏳ Waiting for video to be ready...");
  //       return;
  //     }

  //     try {
  //       const detections = await faceapi
  //         .detectAllFaces(
  //           videoRef.current,
  //           new faceapi.TinyFaceDetectorOptions()
  //         )
  //         .withFaceLandmarks()
  //         .withFaceExpressions()
  //         .withFaceDescriptors();

  //       console.log("🧠 Detections:", detections);

  //       const resizedDetections = faceapi.resizeResults(
  //         detections,
  //         displaySize
  //       );

  //       const context = canvas.getContext("2d");
  //       context.clearRect(0, 0, displaySize.width, displaySize.height);

  //       faceapi.draw.drawDetections(canvas, resizedDetections);
  //       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  //       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  //     } catch (error) {
  //       console.error("❌ Detection error:", error);
  //     }
  //   }, 1000);
  // };

  const faceMyDetect = () => {
    console.log("🚀 Starting face detection loop...");

    if (!videoRef.current) {
      console.error("❌ videoRef is null");
      return;
    }

    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(canvas);

    const displaySize = { width: 940, height: 650 };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) {
        console.warn("⏳ Waiting for video to be ready...");
        return;
      }

      try {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        console.log("🧠 Detections:", detections);

        // if (detections.length > 0) {
        const descriptor = detections[0].descriptor;
        const descriptorArray = Array.from(descriptor);

        const userId = localStorage.getItem("UserId");
        const res = await registerFace(userId, descriptorArray);
        console.log(" registerFace result userId:", userId);
        console.log(" registerFace result descriptorArray:", descriptorArray);
        console.log(" registerFace result ", res);

        // }

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        const context = canvas.getContext("2d");
        context.clearRect(0, 0, displaySize.width, displaySize.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      } catch (error) {
        console.error("❌ Detection error:", error);
      }
    }, 1000);
  };

  // const faceMyDetect = () => {
  //   console.log("🚀 Starting face detection loop...");

  //   if (!videoRef.current) {
  //     console.error("❌ videoRef is null");
  //     return;
  //   }

  //   const canvas = faceapi.createCanvasFromMedia(videoRef.current);
  //   canvasRef.current.innerHTML = "";
  //   canvasRef.current.appendChild(canvas);

  //   const displaySize = { width: 940, height: 650 };
  //   faceapi.matchDimensions(canvas, displaySize);

  //   const intervalId = setInterval(async () => {
  //     if (!videoRef.current || videoRef.current.readyState !== 4) {
  //       console.warn("⏳ Waiting for video to be ready...");
  //       return;
  //     }

  //     try {
  //       const detections = await faceapi
  //         .detectAllFaces(
  //           videoRef.current,
  //           new faceapi.TinyFaceDetectorOptions()
  //         )
  //         .withFaceLandmarks()
  //         .withFaceExpressions()
  //         .withFaceDescriptors();

  //       console.log("🧠 Detections:", detections);

  //       const resizedDetections = faceapi.resizeResults(
  //         detections,
  //         displaySize
  //       );

  //       const context = canvas.getContext("2d");
  //       context.clearRect(0, 0, displaySize.width, displaySize.height);

  //       faceapi.draw.drawDetections(canvas, resizedDetections);
  //       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  //       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

  //       if (
  //         // !hasRegistered.current &&
  //         detections.length === 1 &&
  //         detections[0].detection.score > 0.8 &&
  //         detections[0].descriptor
  //       ) {
  //         const descriptor = detections[0].descriptor;
  //         const descriptorArray = Array.from(descriptor);
  //         const userId = localStorage.getItem("UserId");

  //         try {
  //           const res = await registerFace(userId, descriptorArray);

  //           console.log("✅ Face registered successfully:", res);
  //           alert("Face registered successfully!");
  //           // hasRegistered.current = true;

  //           // Stop detection loop
  //           clearInterval(intervalId);

  //           //  Stop camera stream
  //           if (videoRef.current && videoRef.current.srcObject) {
  //             videoRef.current.srcObject
  //               .getTracks()
  //               .forEach((track) => track.stop());
  //           }

  //           // 🧼 Clear canvas
  //           if (context) {
  //             context.clearRect(0, 0, canvas.width, canvas.height);
  //           }
  //         } catch (error) {
  //           console.error("❌ Failed to register face:", error);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("❌ Detection error:", error);
  //     }
  //   }, 1000);
  // };
  return (
    <>
      <div className="face-recognition-container">
        <div className="w-full mx-auto mb-6 mt-[10%] mb-[5%] text-center">
          <div className="text-2xl font-semibold">Log In with Face ID</div>
        </div>

        <div className="relative  face-scanner">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-[80%] h-full object-cover rounded-2xl camera-section"
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />

          <img src={scan} alt="Scan" className="absolute top-[-7%] w-[85%] " />
        </div>
      </div>
      <div className="face-recognition-container-mob block md:hidden">
        <div className="relative face-scanner">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-[80%] h-full object-cover rounded-2xl camera-section"
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />

          <img src={scan} alt="Scan" className="absolute top-[-7%] w-[85%]" />
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
