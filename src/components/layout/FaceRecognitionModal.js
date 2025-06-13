import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { registerFace } from "../Helper/ApiFunction";
import scan from "../../assets/images/GRID CORNERS.png";
import { MdOutlineClose } from "react-icons/md";

const FaceRecognitionModal = ({ isOpen, onClose }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const intervalId = useRef(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [showPermissionHelp, setShowPermissionHelp] = useState(false);

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useEffect(() => {
    if (!isOpen) {
      stopVideo();
      setPermissionGranted(false);
      return;
    }

    if (isMobile) {
      setPermissionGranted(true);
      startVideo();
    }

    return () => {
      stopVideo();
    };
  }, [isOpen]);

  const handleAllowCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support camera access.");
        return;
      }

      if (navigator.permissions && navigator.permissions.query) {
        const permission = await navigator.permissions.query({
          name: "camera",
        });

        if (permission.state === "granted") {
          setPermissionGranted(true);
          startVideo();
        } else if (permission.state === "prompt") {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.onloadedmetadata = () => {
                videoRef.current.play();
                loadModels();
              };
              setPermissionGranted(true);
            }
          } catch (err) {
            console.warn("User denied camera on prompt:", err);
            setShowPermissionHelp(true);
          }
        } else if (permission.state === "denied") {
          console.warn("Camera permission is blocked.");
          setShowPermissionHelp(true);
        }
      } else {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play();
              loadModels();
            };
            setPermissionGranted(true);
          }
        } catch (error) {
          setShowPermissionHelp(true);
        }
      }
    } catch (err) {
      console.error("Camera permission handling failed:", err);
      setShowPermissionHelp(true);
    }
  };

  const handleDoNotAllow = () => {
    alert("You denied camera access. Face ID login is not possible.");
    onClose();
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          loadModels();
        };
      })
      .catch((err) => {
        console.error("❌ Webcam error:", err);
      });
  };

  const stopVideo = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    clearInterval(intervalId.current);
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
      faceMyDetect();
    } catch (err) {
      console.error("❌ Model loading error:", err);
    }
  };

  const faceMyDetect = () => {
    const canvas = faceapi.createCanvasFromMedia(videoRef.current);
    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(canvas);

    const displaySize = { width: 940, height: 650 };
    faceapi.matchDimensions(canvas, displaySize);

    intervalId.current = setInterval(async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors();

        if (detections[0]) {
          const descriptor = Array.from(detections[0].descriptor);
          const userId = localStorage.getItem("UserId");
          const res = await registerFace(userId, descriptor);
          console.log("✅ Face registered:", res);
        }

        const resized = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, displaySize.width, displaySize.height);

        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);
        faceapi.draw.drawFaceExpressions(canvas, resized);
      } catch (err) {
        console.error("❌ Detection failed:", err);
      }
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-transparent rounded-xl w-[90%] md:w-[70%] p-4 relative">
        {!permissionGranted && !isMobile && !showPermissionHelp && (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl">
            <p className="mb-4">
              We need your permission to access the camera.
            </p>
            <div className="md:px-6 px-4 py-4 flex gap-10">
              <button
                className="btn btn-outline-secondary w-full"
                onClick={handleDoNotAllow}
              >
                No
              </button>
              <button
                className="btn btn-outline-secondary w-full"
                onClick={handleAllowCamera}
              >
                Yes
              </button>
            </div>
          </div>
        )}

        {showPermissionHelp && (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl p-4">
            <p className="mb-4 text-red-600 font-medium">
              Camera access is blocked. Please enable it in your browser
              settings.
            </p>
            <ul className="text-sm text-gray-700 list-disc text-left mb-4">
              <li>Click the lock icon near the address bar.</li>
              <li>Go to Permissions → Allow Camera.</li>
              <li>Then reload the page.</li>
            </ul>
            <a
              href="chrome://settings/content/camera"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              Open Chrome Camera Settings
            </a>
            <button
              className="mt-4 btn btn-outline-secondary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        )}

        {permissionGranted && (
          <>
            <button
              className="absolute right-4 text-2xl font-bold text-white"
              onClick={onClose}
            >
              <MdOutlineClose />
            </button>

            <div className="text-center text-xl font-semibold mb-4 text-white">
              Log In with Face ID
            </div>
            <div className="relative face-scanner">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              />
              <img
                src={scan}
                alt="Scan"
                className="absolute top-[8%] w-[100%] left-[0.5%]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognitionModal;
