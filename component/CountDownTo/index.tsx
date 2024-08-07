"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CountDownToProps {
  count?: number;
  to: string;
}

const CountDownTo: React.FC<CountDownToProps> = ({ count, to }) => {
  const [seconds, setSeconds] = useState(count || 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          redirect(to);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>Redirecting in {seconds} seconds...</span>;
};

export default CountDownTo;
