"use client";
import Cells from "@/components/home/Cells";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import { useEffect, useRef, useState } from "react";
import NET from "vanta/dist/vanta.net.min"

const page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef<any>(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: myRef.current,
        mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  backgroundColor: "#01071c",
  color: "#0addf0",
  maxDistance: 19.00,
  spacing: 20.00
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div
      ref={myRef}
      className="w-full flex flex-col min-h-[80vh] items-center justify-center gap-10  overflow-hidden"
    >
      <Hero />
     <Featured />
     <Cells />
    </div>
  );
};

export default page;
