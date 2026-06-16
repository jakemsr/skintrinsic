"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar"


export default function Testing() {

  enum Inputs {
    name,
    location
  }

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState('');
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [showProceed, setShowProceed] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const validateName = (): boolean => {
    const tempName = name.trim();
    const nameRegex = /^\p{L}+(?:[-' ]\p{L}+)*$/u;
    if (!nameRegex.test(tempName)) {
      setError('Please enter a name without numbers or special characters');
      return false;
    }

    setError("");
    setName(tempName);
    setShowSecondInput(true);
    return true;
  };

  const validateLocation = (): boolean => {
    const tempLocation = location.trim();
    const locationRegex = /^\p{L}+(?:[-' ]\p{L}+)*$/u;
    if (!locationRegex.test(tempLocation)) {
      setError('Please enter a location without numbers or special characters');
      return false;
    }

    setError("");
    setLocation(tempLocation);
    handleCreateUser();
    return true;
  };

  const handleKeyDown = (event: React.KeyboardEvent, input: Inputs) => {
    setError("");
    if (event.key === 'Enter') {
      if (input === Inputs.name) {
        validateName();
      } else if (input === Inputs.location) {
        validateLocation();
      }
    }
  }

  const handleCreateUser = async () => {
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          location: location,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        console.error('Error:', data.error);
        return;
      }

      if (data.success === true) {
        setShowProceed(true);
      } else {
        setError(data.message);
        console.error("Error", data);
      }
    } catch (error) {
      setError('Network error. Please try again later.');
      console.error('Network error:', error);
    }
    setSubmitting(false);
  };


  return (
    <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
      <NavBar code={false} />

      <div className="w-56.75 h-6 uppercase font-semibold text-base leading-6 ml-8 mt-4">
        to start analysis
      </div>

      <div className="absolute inset-0 w-full flex items-center justify-center">

        <div className="relative w-190.5 h-190.5">
          <img src="/testing-inner-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_70s_linear_infinite]" />
          <img src="/testing-mid-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite]"/>
          <img src="/testing-outer-rect.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_50s_linear_infinite]" />

          {submitting ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <div className="text-2xl mb-4">
                Processing submission
              </div>
              <div>
                ...
              </div>
            </div>
          ) : (
            <>
              {showProceed ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                  <div className="text-2xl mb-4">
                    Thank you!
                  </div>
                  <div className="text-lg opacity-80">
                    Proceed for the next step
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-80 left-1/2 -translate-x-1/2 text-center w-full">
                    <span className="text-sm leading-6 font-normal uppercase opacity-40">click to type</span>
                    {error && <p className="text-sm text-red-600 w-full">{error}</p>}
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-6xl font-normal tracking-[-7%] w-105 h-16">
                    {!showSecondInput ? (
                      <input
                        type="text"
                        placeholder="Introduce Yourself"
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, Inputs.name)}
                        autoFocus
                        value={name}
                        size={13}
                        className="border-0 border-b focus:outline-none text-center placeholder:text-[#1a1b1c] placeholder:opacity-100"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder="Where are you From?"
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, Inputs.location)}
                        autoFocus
                        value={location}
                        size={16}
                        className="border-0 border-b focus:outline-none text-center placeholder:text-[#1a1b1c] placeholder:opacity-100"
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}

        </div>

      </div>

      <div className="absolute left-8 bottom-8">
        <Link href="/">
          <img src="/back.svg" alt="" />
        </Link>
      </div>

      {showProceed && (
        <div className="absolute right-8 bottom-8">
          <Link href="/result">
            <img src="/proceed.svg" alt="" />
          </Link>
        </div>
      )}

    </div>
  );
}
