import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { WORKOUTS, SCHEMES } from "../utils/swoldier.js";
import Button from "./Button";

function Header(props) {
  const { index, title, description } = props;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

export default function Generator(props) {
  const [showModal, setShowModal] = useState(false);
  const {
    poison,
    setPoison,
    muscles,
    setMuscles,
    goal,
    setGoal,
    barPosition,
    setBarPosition,
    updatedWorkout,
  } = props;

  function toggleModal() {
    setShowModal(!showModal);
  }

  const handleClick = (scheme, index) => {
    setGoal(scheme);
    setBarPosition(index);
  };

  function updatedMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    if (muscles.length > 2) {
      return;
    }

    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false);
    }
  }
  return (
    <SectionWrapper
      id={"generate"}
      header={"generate your workout"}
      title={["It's", "Huge", "o'clock"]}
    >
      <Header
        index={"01"}
        title={"Pick Your Poison"}
        description={"select the workout you wish to endure"}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setMuscles([]);
                setPoison(type);
              }}
              className={
                "bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg " +
                (type === poison ? " border-blue-600" : " border-blue-400")
              }
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </button>
          );
        })}
      </div>
      {/* //second header */}
      <Header
        index={"02"}
        title={"Lock on targets"}
        description={"Select the muscles judged for annihilation."}
      />
      <div className="bg-slate-950  border border-blue-400 rounded-lg flex flex-col">
        <button
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center"
        >
          <p className="capitalize">
            {muscles.length === 0
              ? "Select the muscles groups"
              : muscles.join(" ")}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {showModal && (
          <div className="flex flex-col pb-3">
            {(poison === "individual"
              ? WORKOUTS[poison]
              : Object.keys(WORKOUTS[poison])
            ).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updatedMuscles(muscleGroup);
                  }}
                  key={muscleGroupIndex}
                  className={
                    "hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup) ? "text-blue-400" : "")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* third header */}

      <Header
        index={"03"}
        title={"Become Juggernaut"}
        description={"Select your ultimate objective."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {Object.keys(SCHEMES).map((scheme, index) => {
          return (
            <button
              onClick={() => {
                handleClick(scheme, index);
              }}
              className={
                "bg-slate-950 border  duration-200 hover:border-blue-600 py-3 rounded-lg px-4 focus:outline-none" +
                (scheme === goal ? " border-blue-600" : " text-white")
              }
              key={index}
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          );
        })}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-300"
          style={{
            width: `calc(100% / ${Object.keys(SCHEMES).length})`,
            transform: `translateX(${barPosition * 100}%)`,
          }}
        />
      </div>

      <Button func={updatedWorkout} text={"Formulate"}></Button>
    </SectionWrapper>
  );
}
