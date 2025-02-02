"use client"

import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import Peer from "peerjs";
import {DateTime} from "luxon";

export default function tt({updateCall, updateCallConMic, updateCallConVideo, updateCallConScreenShare, updateCallConConnected}) {

    const [peerId, setPeerId] = useState("");

    const [callConnected, setCallConnected] = useState<boolean>(false);

    const [micMuted, setMicMuted] = useState<boolean>(false);
    const [micFound, setMicFound] = useState<boolean>(false);

    const [videoOn, setVideoOn] = useState<boolean>(false);
    const [videoFound, setVideoFound] = useState<boolean>(false);

    const [screenShare, setScreenShare] = useState<boolean>(false);
    const [screenShareAccepted, setscreenShareAccepted] = useState<boolean>(false);

    const [conMicMuted, setConMicMuted] = useState<boolean>(true);
    const [conVideoMuted, setConVideoMuted] = useState<boolean>(true);
    const [conScreenShare, setConScreenShare] = useState<boolean>(false);

    const [call, setCall] = useState<boolean>(false);
    const [callTimeStart, setCallTimeStart] = useState<number>(0);
    const [callTime, setCallTime] = useState<string>("");

    function setCallStart() {
        return setCallTimeStart(Date.now());
    }

    function updateCallTime() {
        const timeNow: number = DateTime.now().toMillis();
        if(callTimeStart == 0) return;
        if(timeNow == 0) return;
        const diff: number = timeNow - callTimeStart;
        if(diff == 0) return;

        const ms: number = diff % 1000;
        const seconds: number = Math.floor((diff / 1000) % 60);
        const minutes: number = Math.floor((diff / (1000 * 60)) % 60);
        const hours: number = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));

        let elapsed = ``;
        if(days > 0) {
            elapsed += `${days}:`;
        }
        if(hours > 0) {
            if(minutes < 10) {
                elapsed += `0${hours}:`;
            } else {
                elapsed += `${hours}:`;
            }
        }
        if(minutes > 0) {
            if(minutes < 10) {
                elapsed += `0${minutes}:`;
            } else {
                elapsed += `${minutes}:`;
            }
        } else {
            elapsed += `0:`;
        }
        if(seconds > 0) {
            if(seconds < 10) {
                elapsed += `0${seconds}`;
            } else {
                elapsed += `${seconds}`;
            }
        } else {
            elapsed += `00`;
        }
        // console.log(elapsed);

        return setCallTime(elapsed);
    }

    let callTimer;

    function startCall() {
        setCall(true);
        updateCall(true);

        useEffect(() => {
            setCallStart();
        }, []);

        callTimer = setInterval(() => {
            setTimeout( () => {
                updateCallTime();
            })
        }, 1000)
    }
    function endCall() {
        setCall(false);
        updateCall(false);
        callTimer.stop();
    }

    function toggleMic() {
        if(micFound) {
            setMicMuted(!micFound);
        }
    }
    function toggleVideo() {
        if(videoFound) {
            setMicMuted(!videoOn);
        }
    }

    return (
        <div className={`w-screen md:w-full h-screen md:h-[600px] flex flex-col bg-gradient-to-b ${conMicMuted ? 'from-cyan-400 to-blue-300' : 'from-emerald-300 to-green-400'}`}>
            <div className="container call h-full w-full flex flex-col">
                <header className="call-header flex flex-col py-4">
                    <div className="slider flex md:hidden">
                        <div className="container bg-neutral-100/90 h-1 rounded-full w-1/2 mx-auto mb-4"></div>
                    </div>
                    <div className="avatar w-24 h-24 flex mx-auto">
                        <div className="container avatar-container">
                            <img className="w-full h-full rounded-full" src="https://i.pinimg.com/736x/44/4c/8d/444c8d4580a228de682255aa1c5b775e.jpg" />
                        </div>
                    </div>
                    <div className="content flex flex-col text-center mt-3">
                        <span className="username text-lg font-bold text-neutral-100">
                            Username
                        </span>
                        <span className="call-timer text-lg font-medium text-neutral-100 mt-2">
                            {callTime ? callTime : "0:00"}
                        </span>
                        <div className={`con-status flex flex-col mx-auto mt-3 gap-2`}>
                            <div className={`mic-status gap-1 h-6 mx-auto text-neutral-100 ${conMicMuted ? 'flex' : 'hidden'}`}>
                                <span className={"my-auto"}>
                                    <Icon icon="fluent:mic-off-48-filled" width="21" height="21" />
                                </span>
                                <span className={"my-auto"}>Usernames's microphone is turned off.</span>
                            </div>
                            <div className={`video-status gap-1 h-6 mx-auto text-neutral-100 ${conVideoMuted && videoOn ? 'flex' : 'hidden'}`}>
                                <span className={"my-auto"}>
                                    <Icon icon="fluent:video-off-48-regular" width="21" height="21" />
                                </span>
                                <span className={"my-auto"}>Usernames's video is turned off.</span>
                            </div>
                        </div>
                    </div>
                </header>
                <footer className="call-footer flex w-full absolute bottom-4 py-4">
                    <div
                        className="container call-footer_container w-3/4 md:w-2/4 flex gap-4 mx-auto md:justify-center justify-around">
                        <button onClick={toggleMic} className={`btn btn-mute w-12 h-12 rounded-full ${!micFound ? 'disabled bg-neutral-300' : 'bg-neutral-100'}`}>
                            {/*UnMuted*/}
                            <Icon className={`text-black mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'hidden' : 'flex'}`} icon="fluent:mic-48-regular" width="27" height="27" />
                            {/*Muted*/}
                            <Icon className={`text-black mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'flex' : 'hidden'}`} icon="fluent:mic-off-48-regular" width="27" height="27" />
                            {/*Not Found*/}
                            <Icon className={`text-neutral-700 mx-auto ${!micFound ? 'flex cursor-no-drop' : 'hidden'}`} icon="fluent:mic-prohibited-48-regular" width="27" height="27" />
                        </button>
                        <button {toggleVideo} className="btn btn-video bg-neutral-300 w-12 h-12 rounded-full">
                            {/*UnMuted*/}
                            <Icon className={`text-black hidden mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'hidden' : 'flex'}`} icon="fluent:video-48-regular" width="27" height="27" />
                            {/*Muted*/}
                            <Icon className={`text-black hidden mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'flex' : 'hidden'}`} icon="fluent:video-off-48-regular" width="27" height="27" />
                            {/*Not Found*/}
                            <Icon className={`text-neutral-700 flex mx-auto ${!micFound ? 'flex cursor-no-drop' : 'hidden'}`} icon="fluent:video-prohibited-28-regular" width="27" height="27" />
                        </button>
                        <button className={`btn btn-screenshare  w-12 h-12 rounded-full ${!screenShareAccepted ? 'disabled bg-green-600/60 cursor-no-drop' : 'bg-emerald-400'}`}>
                            {/*Start*/}
                            <Icon className={`text-neutral-100 mx-auto ${screenShare ? 'flex' : 'hidden'}`} icon="fluent:share-screen-start-48-regular" width="32" height="32" />
                            {/*Stop*/}
                            <Icon className={`text-neutral-100 mx-auto ${!screenShare ? 'flex' : 'hidden'}`} icon="fluent:share-screen-stop-48-regular" width="32" height="32" />
                        </button>
                        <button className="btn btn-endcall bg-red-400 w-12 h-12 rounded-full">
                            <Icon class="text-neutral-100 flex mx-auto" icon="fluent:call-end-48-regular" width="28" height="28" />
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    )
}