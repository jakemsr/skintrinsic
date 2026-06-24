"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Webcam from "react-webcam";
import NavBar from "@/components/NavBar";
import LeftButton from "@/components/LeftButton";
import RightButton from "@/components/RightButton";


export default function Result() {

  const PictureInstructions = () => {
    return (
      <div className="flex flex-col items-center justify-center w-130 sm:1-50 text-xs sm:text-sm leading-6 uppercase">
        <div className="mb-4">
          To get better results make sure to have
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 border rotate-45" />
            neutral expression
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 border rotate-45" />
            frontal pose
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 border rotate-45" />
            adequate lighting
          </div>
        </div>

      </div>
    )
  }


  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const [base64Image, setBase64Image] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const [displayAllowCamera, setDisplayAllowCamera] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cameraCapture, setCameraCapture] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const videoConstraints = {
    width: dimensions.width,
    height: dimensions.height,
    facingMode: "user"
  }

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  const submitImage = async () => {
    if (!base64Image) {
      return;
    }
    try {
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        console.error('Error:', data.error);
        setProcessing(false);
        return;
      }

      if (data.success === true) {
        localStorage.setItem('image_analysis', JSON.stringify(data.data));
        setComplete(true);
      } else {
        setError(data.message);
        console.error("Error", data);
        setProcessing(false);
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error('Network error:', error);
      setProcessing(false);
    }
  }

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        const result = fileReader.result;
        if (typeof result === 'string') {
          resolve(result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleGalleryIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProcessing(true);
      try {
        const base64String = await convertToBase64(file);
        if (base64String) {
          setBase64Image(base64String);
        } else {
          throw new Error("Error converting file, result is empty string.");
        }
      } catch (error) {
        setError(error as string);
        console.error("Error converting file:", error);
        setProcessing(false);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!base64Image) {
      return;
    }
    submitImage();
  }, [base64Image]);


  return (
    <>
      {processing ? (
        <div className="relative h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden flex items-center justify-center">

          <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_75s_linear_infinite]" />
          <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
          <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold uppercase tracking-[-2%]">
            {complete ? (
              <div className="text-center">
                Analysis complete!
                <br />
                Proceed for the next step
              </div>
            ) : 'Preparing your analysis ...'}
          </div>

          <div
            className={`absolute bottom-8 transition-all
              ${complete ? 'right-8 opacity-100 duration-1500' : 'right-1/4 opacity-0 duration-0 pointer-events-none'}`}
          >
            <Link href="/select">
              <RightButton selfHover={true} text="proceed" />
            </Link>
          </div>

        </div>
      ) : (
        cameraCapture ? (
          <>
            <div className="relative h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden flex items-center justify-center text-[#fcfcfc]">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={() => setCameraReady(true)}
              />

              {cameraReady ? (
                <>
                  <div className="absolute top-0 left-0">
                    <NavBar code={false} location="intro" light={true} />
                  </div>

                  <div
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-44 h-15.5 cursor-pointer"
                    onClick={capture}
                  >
                    <div className="relative w-full h-full">
                      <img src="/pic-inner-ring.svg" alt="" className="absolute right-0.75 top-0.75" />
                      <img src="/pic-outer-ring.svg" alt="" className="absolute right-0" />
                      <img src="/pic-icon.svg" alt="" className="absolute right-4.5 top-4.5" />
                      <div className="h-full flex items-center text-left uppercase">
                        Take picture
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <PictureInstructions />
                  </div>

                  <button
                    onClick={() => { setCameraCapture(false); setCameraReady(false) }}
                    className="absolute bottom-8 left-8 cursor-pointer"
                  >
                    <LeftButton selfHover={true} text="" light={true} />
                  </button>

                  {imgSrc && (
                    <>
                      <img
                        src={imgSrc}
                        className="absolute top-0 left-0"
                      />

                      <div
                        className="absolute left-1/2 -translate-x-1/2 top-1/4 uppercase"
                      >
                        Great shot!
                      </div>

                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        <PictureInstructions />
                      </div>

                      <div
                        className="absolute bottom-8 left-8 cursor-pointer"
                        onClick={() => setImgSrc("")}
                      >
                        <LeftButton selfHover={true} text="back" light={true} />
                      </div>

                    </>
                  )}
                </>
              ) : (
                <>
                  <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_75s_linear_infinite]" />
                  <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
                  <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />
                  <img src="/camera-icon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute top-1/2 left-1/2 translate-y-16 -translate-x-1/2 text-[#1a1b1c] uppercase font-semibold tracking-[-2%]">
                    Setting up camera ...
                  </div>

                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#1a1b1c]">
                    <PictureInstructions />
                  </div>

                </>
              )}
            </div>

            <div
              className={`absolute bottom-8 transition-all
                ${imgSrc ? 'right-8 opacity-100 duration-1500 cursor-pointer' : 'right-1/4 opacity-0 duration-0 pointer-events-none'}`}
            >
              <div onClick={() => { setProcessing(true); imgSrc && setBase64Image(imgSrc) }}>
                <RightButton selfHover={true} text="proceed" light={true} />
              </div>
            </div>

          </>
        ) : (

          <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
            <NavBar code={false} location="intro" />

            <div className="w-56.75 h-6 uppercase font-semibold text-base leading-6 ml-8 mt-4">
              to start analysis
            </div>

            <div className="absolute inset-0 w-full flex items-center justify-between">

              <div className="relative w-130 h-120.5 ml-8">
                <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_75s_linear_infinite]" />
                <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
                <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />

                <img
                  src="/camera-icon.svg"
                  alt=""
                  onClick={() => setDisplayAllowCamera(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-115 cursor-pointer"
                />
                <img
                  src="/camera-pointer.svg"
                  alt=""
                  className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-25"
                />
                <div className="absolute top-1/2 left-1/2 translate-x-28 -translate-y-32 text-sm leading-6 uppercase w-42 h-12">
                  Allow A.I. <br />to Scan Your Face
                </div>
              </div>

              <div className="relative w-130 h-120.5 ml-8">
                <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_75s_linear_infinite]" />
                <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
                <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />

                <img
                  src="/gallery-icon.svg"
                  alt=""
                  onClick={handleGalleryIconClick}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 hover:scale-115 cursor-pointer"
                />
                <img
                  src="/gallery-pointer.svg"
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-26 translate-y-11"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-69 translate-y-20 text-sm leading-6 uppercase text-right w-42 h-12">
                  Allow A.I. <br />Access Gallery
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

              </div>

            </div>

            {displayAllowCamera && (
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-88 h-34 font-semibold uppercase bg-[#1a1b1c] text-[#fcfcfc]">
                <div className="mt-2 mx-2">
                  Allow A.I. to access your camera
                </div>
                <div className="mt-17 flex h-8 px-2 items-center justify-end border-t border-[#fcfcfc]">
                  <button
                    className="uppercase mx-8 cursor-pointer"
                    onClick={() => setDisplayAllowCamera(false)}
                  >
                    deny
                  </button>
                  <button
                    className="uppercase mx-2 cursor-pointer"
                    onClick={() => { setCameraCapture(true); setDisplayAllowCamera(false) }}
                  >
                    allow
                  </button>
                </div>
              </div>
            )}

            <div className="absolute left-8 bottom-8">
              <Link href="/testing">
                <LeftButton selfHover={true} text="back" />
              </Link>
            </div>

          </div>
        )
      )}

    </>
  );
}