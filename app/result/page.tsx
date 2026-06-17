"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";


export default function Result() {

  const Spinners = () => {
    return (
      <>
        <img src="/result-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_70s_linear_infinite]" />
        <img src="/result-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]" />
        <img src="/result-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />
      </>
    );
  }

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [base64Image, setBase64Image] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

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
        alert("Image successfully analysed!");
        router.push("/select");
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
    if (!base64Image) {
      return;
    }
    submitImage();
  }, [base64Image]);


  return (
    <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
      <NavBar code={false} location="intro" />

      <div className="w-56.75 h-6 uppercase font-semibold text-base leading-6 ml-8 mt-4">
        to start analysis
      </div>

      <div className="absolute inset-0 w-full flex items-center justify-between">

        <div className="relative w-130 h-120.5 ml-8">
          <Spinners />

          <img src="/camera-icon.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <img src="/camera-pointer.svg" alt="" className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-25" />
          <div className="absolute top-31 left-93 text-sm leading-6 uppercase w-42 h-12">
            Allow A.I. <br />to Scan Your Face
          </div>
        </div>

        <div className="relative w-130 h-120.5 ml-8">
          <Spinners />

          <div onClick={handleGalleryIconClick}>
          <img
            src="/gallery-icon.svg"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          </div>
          <img
            src="/gallery-pointer.svg"
            alt=""
            className="absolute top-1/2 left-1/2 -translate-x-26 translate-y-11"
          />
          <div className="absolute top-82 -left-5 text-sm leading-6 uppercase text-right w-42 h-12">
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

      <div className="absolute left-8 bottom-8">
        <Link href="/testing">
          <img src="/back.svg" alt="" />
        </Link>
      </div>

    </div>
  );
}