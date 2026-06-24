"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import LeftButton from "@/components/LeftButton";

export default function Summary() {

  interface CategoryData {
    key: string;
    value: number;
  }

  enum Display {
    race = "race",
    age = "age",
    gender = "sex"
  }

  const setTrueValue = (category: Display, value: string) => {
    switch (category) {
      case Display.race:
        setTrueRace(value);
        break;
      case Display.age:
        setTrueAge(value);
        break;
      case Display.gender:
        setTrueGender(value);
        break;
    }
  }

  interface DisplayCategoryProps {
    display: Display;
  }

  const DisplayCategory = ({ display }: DisplayCategoryProps) => {
    let category: CategoryData[] = [];
    let trueValue = "";
    switch (display) {
      case Display.race:
        category = race;
        trueValue = trueRace;
        break;
      case Display.age:
        category = age;
        trueValue = trueAge;
        break;
      case Display.gender:
        category = gender;
        trueValue = trueGender;
        break;
    }
    return (
      <div className="flex flex-col h-92 w-full max-w-80 bg-[#f3f3f4] border-t border-solid border-[#1a1b1c]">
        <div className="flex justify-between items-center h-9 text-base font-medium tracking-[-2%] uppercase px-2">
          <div>
            {display}
          </div>
          <div>a.i. confidence</div>
        </div>

        {category && category.length > 0 && category.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center h-9 text-base font-normal tracking-[-2%] px-2 cursor-pointer ${trueValue === item.key ? 'bg-[#1a1b1c] text-[#fcfcfc]' : 'bg-[#f3f3f4] hover:bg-[#e1e1e2]'} `}
            onClick={() => setTrueValue(display, item.key)}
          >
            <div className="flex items-center capitalize gap-2">
              <div className="w-2 h-2 border rotate-45"></div>
              {item.key}
            </div>
            <div>{(item.value * 100).toFixed(2)}%</div>
          </div>)
        )}

      </div>
    )
  }

  interface DisplayCategoryBlockProps {
    category: Display;
  }

  const DisplayCategoryBlock = ({ category }: DisplayCategoryBlockProps) => {

    let trueValue = "";
    switch (category) {
      case Display.race:
        trueValue = trueRace;
        break;
      case Display.age:
        trueValue = trueAge;
        break;
      case Display.gender:
        trueValue = trueGender;
        break;
    }

    return (
      <div
        className={`flex flex-col p-2 justify-between h-20 border-t border-solid border-[#1a1b1c] cursor-pointer ${display === category ? 'bg-[#1a1b1c] text-[#fcfcfc]' : 'bg-[#f3f3f4] hover:bg-[#e1e1e2]'}`}
        onClick={() => setDisplay(category)}
      >
        <div>
          {trueValue}
        </div>
        <div>
          {category}
        </div>
      </div>
    )
  }


  const Circle = () => {

    let percent: number = 0;

    switch (display) {
      case Display.race:
        percent = race.find(item => item.key === trueRace)?.value || 0;
        break;
      case Display.age:
        percent = age.find(item => item.key === trueAge)?.value || 0;
        break;
      case Display.gender:
        percent = gender.find(item => item.key === trueGender)?.value || 0;
        break;
    }

    const radius = 150;
    const circumference = radius * 2 * Math.PI;
    const removed = circumference - (circumference * percent);

    return (
      <div className="relative flex justify-end">
        <div className="relative flex items-center justify-center">
          <svg className="w-80 h-80 -rotate-90">
            <circle
              cx="160" cy="160" r={radius}
              className="stroke-[#c1c2c3] fill-none stroke-3"
            />
            <circle
              cx="160" cy="160" r={radius}
              className="stroke-[#1a1b1c] fill-none stroke-3"
              strokeDasharray={circumference}
              strokeDashoffset={removed}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute text-[40px] leading-10 tracking-[-5%]">
            {(percent * 100).toFixed(2)}
            <div className="text-[24px] -translate-y-1/2 inline-block">%</div>
          </div>
        </div>
      </div>
    )
  }

  const resetTrueValues = () => {
    setTrueRace(race[0].key);
    setTrueAge(age[0].key);
    setTrueGender(gender[0].key);
  }

  const [display, setDisplay] = useState<Display>(Display.race);

  const [race, setRace] = useState<CategoryData[]>([]);
  const [age, setAge] = useState<CategoryData[]>([]);
  const [gender, setGender] = useState<CategoryData[]>([]);

  const [trueRace, setTrueRace] = useState("");
  const [trueAge, setTrueAge] = useState("");
  const [trueGender, setTrueGender] = useState("");


  useEffect(() => {
    const analysis = localStorage.getItem('image_analysis');
    if (!analysis) {
      console.error("Couldn't get image analysis from local storage!");
      return;
    } else {
      const data = JSON.parse(analysis);
      console.log(data);

      let race = [];
      for (const [key, value] of Object.entries(data.race)) {
        race.push({ key, value: value as number });
      }
      const sortedRace = [
        ...race.sort((a, b) => (b.value) - (a.value))
      ];
      setRace(sortedRace);
      setTrueRace(sortedRace[0].key)

      let age = [];
      for (const [key, value] of Object.entries(data.age)) {
        age.push({ key, value: value as number });
      }
      const sortedAge = [
        ...age.sort((a, b) => (b.value) - (a.value))
      ];
      setAge(sortedAge);
      setTrueAge(sortedAge[0].key)

      let gender = [];
      for (const [key, value] of Object.entries(data.gender)) {
        gender.push({ key, value: value as number });
      }
      const sortedGender = [
        ...gender.sort((a, b) => (b.value) - (a.value))
      ];
      setGender(sortedGender);
      setTrueGender(sortedGender[0].key)
    }
  }, []);

  return (
    <div className="relative flex flex-col max-h-240 h-screen w-screen max-w-[1920px] overflow-y-auto bg-[#fcfcfc] text-[#1a1b1c] overflow-x-hidden">
      <div>
        <NavBar code={false} location="analysis" />
      </div>

      <div className="mx-8 mt-4">

        <div className="w-56.75 h-6 uppercase font-semibold text-base leading-6 tracking-[-2%]">
          A.I. analysis
        </div>
        <div className="uppercase text-7xl leading-17 tracking-[-6%]">
          demographics
        </div>
        <div className="uppercase text-sm leading-6">
          Predicted Race & Age
        </div>

        <div className="mt-16 flex flex-row items-start gap-4 w-full">
          <div className="flex flex-col w-50 gap-1 uppercase text-semibold tracking-[-2%]">

            <DisplayCategoryBlock category={Display.race} />
            <DisplayCategoryBlock category={Display.age} />
            <DisplayCategoryBlock category={Display.gender} />

          </div>

          <div className="flex flex-col-reverse md:flex md:flex-row gap-4 w-full">

          <div className="w-80 md:w-[-webkit-fill-available] h-92 bg-[#f3f3f4] border-t border-solid border-[#1a1b1c]">

            <div className="ml-2 mt-2 text-[40px] leading-10 tracking-[-5%] capitalize">
              {display === Display.race && trueRace}
              {display === Display.age && trueAge}
              {display === Display.gender && trueGender}
            </div>

            <Circle />

          </div>

          <DisplayCategory display={display} />

          </div>

        </div>

      </div>

      <div className="flex h-24 mb-2 p-8 justify-between items-center">

        <div className="">
          <Link href="/select">
            <LeftButton selfHover={true} text="back" />
          </Link>
        </div>

        <div className="tracking-[-2%] text-[#A0A4Ab]">
          If A.I. estimate is wrong, select the correct one.
        </div>

        <div className="flex gap-4">
          <div
            className="flex items-center justify-center border w-18 h-9 uppercase cursor-pointer"
            onClick={resetTrueValues}
          >
            reset
          </div>
          <div className="flex items-center justify-center bg-[#1a1b1c] w-22 h-9 text-[#fcfcfc] uppercase cursor-pointer">
            confirm
          </div>
        </div>

      </div>

    </div>
  );
}
