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

  useEffect(() => {
    if (!isOpen) {
      stopVideo();
      setPermissionGranted(false);
    }

    return () => {
      stopVideo();
    };
  }, [isOpen]);

  const handleAllowCamera = () => {
    setPermissionGranted(true);
    startVideo();
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
        {!permissionGranted ? (
          <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-xl">
            <p className="mb-4">
              We need your permission to access the camera.
            </p>
            <div class="md:px-6 px-4 py-4 flex gap-10">
              <button
                class="btn btn-outline-secondary w-full"
                onClick={handleDoNotAllow}
              >
                No
              </button>
              <button
                class="btn btn-outline-secondary w-full"
                onClick={handleAllowCamera}
              >
                Yes
              </button>
            </div>
            {/* <button
              onClick={handleAllowCamera}
              className="btn bg-blue-500 hover:bg-blue-600  font-semibold px-4 py-2 rounded"
            >
              Yes, allow camera access
            </button> */}
          </div>
        ) : (
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
