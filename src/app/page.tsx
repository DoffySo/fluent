"use client"
import Header from "@/app/components/Header";

import {Icon} from '@iconify/react'

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useEffect, useRef} from "react";
import {io} from "socket.io-client";

export default function Index() {

    const container = useRef();
    // const {contextSafe} = useGSAP({scope: container});
    //
    useGSAP(() => {

    }, {scope: container});
    useEffect(() => {
        const socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);
  return (
      <div ref={container} className="wrapper flex flex-col items-center w-full bg-neutral-950 h-screen">
          <Header />
      </div>
  );
}
