"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

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
      <div className="flex flex-col w-md bg-[#f3f3f4] border-t border-solid border-[#1a1b1c]">
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
            <div className="capitalize">{item.key}</div>
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

    const radius = 130;
    const circumference = radius * 2 * Math.PI;
    const removed = circumference - (circumference * percent);

    return (
      <div className="flex items-center justify-end">
        <div className="relative flex items-center justify-center">
          <svg className="w-70 h-70 -rotate-90">
            <circle
              cx="140" cy="140" r={radius}
              className="stroke-[#c1c2c3] fill-none stroke-3"
            />
            <circle
              cx="140" cy="140" r={radius}
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
      setTrueRace(race[0].key)

      let age = [];
      for (const [key, value] of Object.entries(data.age)) {
        age.push({ key, value: value as number });
      }
      const sortedAge = [
        ...age.sort((a, b) => (b.value) - (a.value))
      ];
      setAge(sortedAge);
      setTrueAge(age[0].key)

      let gender = [];
      for (const [key, value] of Object.entries(data.gender)) {
        gender.push({ key, value: value as number });
      }
      const sortedGender = [
        ...gender.sort((a, b) => (b.value) - (a.value))
      ];
      setGender(sortedGender);
      setTrueGender(gender[0].key)
    }
  }, []);

  return (
    <div className="relative flex flex-col h-screen max-h-240 w-screen max-w-[1920px] overflow-x-hidden overflow-y-hidden bg-[#fcfcfc] text-[#1a1b1c]">
      <NavBar code={false} location="analysis" />

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

        <div className="mt-8 flex gap-4">
          <div className="flex flex-col w-50 gap-1 uppercase text-semibold tracking-[-2%]">

            <DisplayCategoryBlock category={Display.race} />
            <DisplayCategoryBlock category={Display.age} />
            <DisplayCategoryBlock category={Display.gender} />

          </div>

          <div className="w-[-webkit-fill-available] bg-[#f3f3f4] border-t border-solid border-[#1a1b1c]">

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
  );
}
