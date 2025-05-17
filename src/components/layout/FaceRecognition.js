import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      // Add more models as needed
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error(err));
    };

    const detectFaces = async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptors();

        // Clear canvas
        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, {
          width: videoRef.current.width,
          height: videoRef.current.height,
        });

        // Resize detections to match canvas
        const resizedDetections = faceapi.resizeResults(detections, {
          width: videoRef.current.width,
          height: videoRef.current.height,
        });

        // Draw detections
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }
      requestAnimationFrame(detectFaces);
    };

    loadModels().then(() => {
      startVideo();
      videoRef.current.onplay = () => {
        detectFaces();
      };
    });

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        width="720"
        height="560"
        autoPlay
        muted
        style={{ position: "absolute" }}
      />
      <canvas
        ref={canvasRef}
        width="720"
        height="560"
        style={{ position: "absolute" }}
      />
    </div>
  );
};

export default FaceRecognition;
