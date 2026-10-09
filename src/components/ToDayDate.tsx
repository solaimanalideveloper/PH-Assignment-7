"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const TodayDate = () => {
  const date = useSyncExternalStore(
    subscribe,
    () => new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }),
    () => "",
  );

  return <p>{date}</p>;
};

export default TodayDate;
