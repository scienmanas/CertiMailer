"use client";

import { Marquee } from "@/app/ui/components/Marquee";
import { VscTools } from "react-icons/vsc";

export function Ribbon(): JSX.Element {

  return <Marquee text={"Open Source"} svg={VscTools } />;
}

