"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const TodayDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    () => new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }),
    () => "",
  );

  return <p className="my-2 text-2xl font-semibold text-[#05893E]">{date}</p>;
};

export default TodayDate;
