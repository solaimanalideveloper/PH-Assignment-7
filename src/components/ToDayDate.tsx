"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const TodayDate = ({
  className = "my-2 text-lg font-semibold text-[#05893E] sm:text-2xl",
}: {
  className?: string;
}) => {
  const date = useSyncExternalStore(
    subscribe,
    () => new Date().toLocaleDateString("bn-BD", { dateStyle: "full" }),
    () => "",
  );

  return <p className={className}>{date}</p>;
};

export default TodayDate;
