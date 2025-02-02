"use client"

import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import Peer from "peerjs";
import {DateTime} from "luxon";
import {Rnd} from "react-rnd";
import {useChatStore} from '@/app/stores/chat'


function Call({updateCall, updateCallConMic, updateCallConVideo, updateCallConScreenShare, updateCallConConnected, updateCallVisibility}) {

    const [peerId, setPeerId] = useState("");

    const [callConnected, setCallConnected] = useState<boolean>(false);

    const [micMuted, setMicMuted] = useState<boolean>(false);
    const [micFound, setMicFound] = useState<boolean>(false);

    const [videoOn, setVideoOn] = useState<boolean>(false);
    const [videoFound, setVideoFound] = useState<boolean>(false);

    const [screenShare, setScreenShare] = useState<boolean>(false);
    const [screenShareAccepted, setscreenShareAccepted] = useState<boolean>(false);

    const [conMicMuted, setConMicMuted] = useState<boolean>(false);
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
        clearInterval(callTimer);
        callTimer = null;
    }

    function toggleMic() {
        if(micFound) {
            setMicMuted(!micFound);
        }
    }
    function toggleVideo() {
        if(videoFound) {
            setVideoOn(!videoOn);
        }
    }

    function hideCall() {
        return updateCallVisibility(false);
    }

    return (
        <div className={`w-screen md:w-full h-screen md:h-[600px] flex flex-col`}>
            <div className="container hidden md:flex md:h-8 md:bg-neutral-900 px-4">
                <button onClick={hideCall} className={"h-4 ms-auto"}>
                    <Icon icon="fluent:line-horizontal-1-28-regular" width="28" height="28" />
                </button>
            </div>
                <div
                    className={`container call h-full w-full flex flex-col bg-gradient-to-b ${conMicMuted || !callConnected ? 'from-cyan-400 to-blue-300' : 'from-emerald-300 to-green-400'}`}>
                    <header className="call-header flex flex-col py-4">
                        <div className="slider flex md:hidden">
                            <div className="container bg-neutral-100/90 h-1 rounded-full w-1/2 mx-auto mb-4"></div>
                        </div>
                        <div className="avatar w-24 h-24 flex mx-auto">
                            <div className="container avatar-container">
                                <img className="w-full h-full rounded-full"
                                     src="https://i.pinimg.com/736x/44/4c/8d/444c8d4580a228de682255aa1c5b775e.jpg"/>
                            </div>
                        </div>
                        <div className="content flex flex-col text-center mt-3">
                            <span className="username text-lg font-bold text-neutral-100">
                                Username
                            </span>
                            {callConnected ? (
                                <span className="call-timer text-lg font-medium text-neutral-100 mt-2">
                                    {callTime ? callTime : "0:00"}
                                </span>
                            ) : (
                                <span
                                    className="connecting-text text-lg font-medium text-neutral-100 mt-2">Calling...</span>
                            )}
                            <div className={`con-status flex flex-col mx-auto mt-3 gap-2`}>
                                <div
                                    className={`mic-status gap-1 h-6 mx-auto text-neutral-100 ${conMicMuted ? 'flex' : 'hidden'}`}>
                                    <span className={"my-auto"}>
                                        <Icon icon="fluent:mic-off-48-filled" width="21" height="21"/>
                                    </span>
                                    <span className={"my-auto"}>Usernames's microphone is turned off.</span>
                                </div>
                                <div
                                    className={`video-status gap-1 h-6 mx-auto text-neutral-100 ${conVideoMuted && videoOn ? 'flex' : 'hidden'}`}>
                                    <span className={"my-auto"}>
                                        <Icon icon="fluent:video-off-48-regular" width="21" height="21"/>
                                    </span>
                                    <span className={"my-auto"}>Usernames's video is turned off.</span>
                                </div>
                            </div>
                        </div>
                    </header>
                    <footer className="call-footer flex w-full absolute bottom-4 py-4">
                        <div
                            className="container call-footer_container w-3/4 md:w-2/4 flex gap-4 mx-auto md:justify-center justify-around">
                            <button onClick={toggleMic}
                                    className={`btn btn-mute w-12 h-12 rounded-full ${!micFound ? 'disabled bg-neutral-300' : 'bg-neutral-100'}`}>
                                {/*UnMuted*/}
                                <Icon
                                    className={`text-black mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'hidden' : 'flex'}`}
                                    icon="fluent:mic-48-regular" width="27" height="27"/>
                                {/*Muted*/}
                                <Icon
                                    className={`text-black mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'flex' : 'hidden'}`}
                                    icon="fluent:mic-off-48-regular" width="27" height="27"/>
                                {/*Not Found*/}
                                <Icon
                                    className={`text-neutral-700 mx-auto ${!micFound ? 'flex cursor-no-drop' : 'hidden'}`}
                                    icon="fluent:mic-prohibited-48-regular" width="27" height="27"/>
                            </button>
                            <button onClick={toggleVideo}
                                    className="btn btn-video bg-neutral-300 w-12 h-12 rounded-full">
                                {/*UnMuted*/}
                                <Icon
                                    className={`text-black hidden mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'hidden' : 'flex'}`}
                                    icon="fluent:video-48-regular" width="27" height="27"/>
                                {/*Muted*/}
                                <Icon
                                    className={`text-black hidden mx-auto ${micFound ? 'flex' : 'hidden'} ${micMuted ? 'flex' : 'hidden'}`}
                                    icon="fluent:video-off-48-regular" width="27" height="27"/>
                                {/*Not Found*/}
                                <Icon
                                    className={`text-neutral-700 flex mx-auto ${!micFound ? 'flex cursor-no-drop' : 'hidden'}`}
                                    icon="fluent:video-prohibited-28-regular" width="27" height="27"/>
                            </button>
                            <button
                                className={`btn btn-screenshare  w-12 h-12 rounded-full ${!screenShareAccepted ? 'disabled bg-green-600/60 cursor-no-drop' : 'bg-emerald-400'}`}>
                                {/*Start*/}
                                <Icon className={`text-neutral-100 mx-auto ${screenShare ? 'flex' : 'hidden'}`}
                                      icon="fluent:share-screen-start-48-regular" width="32" height="32"/>
                                {/*Stop*/}
                                <Icon className={`text-neutral-100 mx-auto ${!screenShare ? 'flex' : 'hidden'}`}
                                      icon="fluent:share-screen-stop-48-regular" width="32" height="32"/>
                            </button>
                            <button onClick={endCall} className="btn btn-endcall bg-red-400 w-12 h-12 rounded-full">
                                <Icon class="text-neutral-100 flex mx-auto" icon="fluent:call-end-48-regular" width="28"
                                      height="28"/>
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
    )
}

export default function ChatProvider({ChatId}) {
    const [callHidden, setCallHidden] = useState<boolean>(true);
    const [call, setCall] = useState<boolean>(false);
    const [conMicMuted, setConMicMuted] = useState<boolean>(false);
    const [conVideoMuted, setConVideoMuted] = useState<boolean>(true);
    const [conScreenShare, setConScreenShare] = useState<boolean>(false);
    const [conConnected, setConConnected] = useState<boolean>(false);
    const chatid: number = ChatId;

    function startCall() {
        setCall(true);
    }

    function endCall() {
        setCall(false);
    }

    let touchstartY = 0
    let touchendY = 0

    function checkDirection() {
        if (touchendY < touchstartY) {
            if (touchstartY - touchendY >= 50) {
                console.log('hide call')
                setCallHidden(true)

            }
        }
        if (touchendY > touchstartY) {
            if (touchendY - touchstartY >= 50) {
                console.log('hide call')
                setCallHidden(true)
            }
        }
    }

    function handleShowCall() {
        if (callHidden && call) {
            setCallHidden(false);
        }
    }

    function startCall() {
        setCall(true);
        setCallHidden(false);
    }

    useEffect(() => {
        const callElement = document.querySelector('.calls');
        if (callElement) {
            const handleTouchStart = (e: TouchEvent) => {
                touchstartY = e.changedTouches[0].screenY;
            };
            const handleTouchEnd = (e: TouchEvent) => {
                touchendY = e.changedTouches[0].screenY;
                checkDirection();
            };

            callElement.addEventListener('touchstart', handleTouchStart);
            callElement.addEventListener('touchend', handleTouchEnd);

            return () => {
                callElement.removeEventListener('touchstart', handleTouchStart);
                callElement.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, []);

    function updateCall(value: boolean) {
        console.log(value);
        if (!value) {
            setCallHidden(true);
        }
        return setCall(value);
    }
    function updateCallVisibility(value: boolean) {
        return setCallHidden(value);
    }
    function updateCallConMic(value: boolean) {
        return setConMicMuted(value);
    }
    function updateCallConVideo(value: boolean) {
        return setConVideoMuted(value);
    }
    function updateCallConScreenShare(value: boolean) {
        return setConScreenShare(value);
    }
    function updateCallConConnected(value: boolean) {
        return setConConnected(value);
    }

    function closeChat() {
        return useChatStore.getState().closeChat();
    }

    return (
        <>
            <div
                className={`calls w-screen h-screen md:max-w-[600px] md:max-h-[600px] absolute -translate-x-1/2 -translate-y-1/2 z-[999] left-1/2 top-1/2 ${callHidden ? 'hidden' : 'flex'}`}>
                <div className="container calls-container">
                    <Call
                        updateCall={updateCall}
                        updateCallConMic={updateCallConMic}
                        updateCallConVideo={updateCallConVideo}
                        updateCallConConnected={updateCallConConnected}
                        updateCallConScreenShare={updateCallConScreenShare}
                        updateCallVisibility={updateCallVisibility}
                    />
                </div>
            </div>
            <div className="chat w-full sm:w-3/4 flex relative h-full">
                <div className="chat-container container flex flex-col cursor-default relative h-full">
                    <div onClick={handleShowCall}
                         className={`chat-header  px-2 py-2 h-16 absolute top-0 left-0 w-full backdrop-blur-sm ${callHidden && call ? 'bg-gradient-to-b from-emerald-300/70 to-green-400/70' : 'bg-neutral-900/20'}`}>
                        <div className="container flex md:gap-4 my-auto w-full mx-auto">
                            <div className="back flex me-2 min-w-12">
                                <div className="back-container container h-12 my-auto flex gap-1">
                                    <button onClick={closeChat}
                                        className="icon w-8 h-8 my-auto flex hover:bg-neutral-300/10 rounded-full text-neutral-400 hover:text-white">
                                        <Icon className="my-auto mx-auto" icon="fluent:arrow-left-48-filled" width="24"
                                              height="24"/>
                                    </button>
                                    <div className="badge bg-blue-500 font-sm flex my-auto h-4 rounded-full">
                                        <div className="badge-container flex px-1">
                                            <span className="unreaded-chats text-[12px]">123</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="avatar flex order-last md:order-none min-w-12 md:ms-0 my-auto">
                                <div
                                    className="avatar-container mx-auto bg-slate-500 flex w-10 h-10 my-auto rounded-full hover:cursor-pointer">
                                    <img src="https://i.pinimg.com/736x/44/4c/8d/444c8d4580a228de682255aa1c5b775e.jpg"
                                         className="w-full h-full rounded-full bg-center bg-no-repeat bg-cover"/>
                                </div>
                            </div>
                            <div className="user flex mx-auto md:mx-0 w-fit md:w-auto">
                                <div className="user-container container flex flex-col">
                                    <div className="username mx-auto md:mx-0 font-bold mt-auto">
                                        <span className="username-holder flex text-sm">Username</span>
                                    </div>
                                    <div className="status mb-auto mx-auto">
                                        <span
                                            className="status-holder flex text-xs text-neutral-400">last seen just now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="interactions hidden md:flex ms-auto my-auto w-fit">
                                <div className="interactions-container container flex justify-between gap-1">
                                    <button onClick={startCall}
                                            className="btn videocall flex w-10 h-10 my-auto hover:bg-neutral-300/10 rounded-md">
                                        <div className="videocall-container flex mx-auto my-auto">
                                            <Icon className="mx-auto" icon="fluent:video-28-regular" width="24" height="24"/>
                                        </div>
                                    </button>
                                    <button onClick={startCall} className="btn voicecall flex w-10 h-10 hover:bg-neutral-300/10 rounded-md">
                                        <div className="voicecall-container flex mx-auto my-auto">
                                            <Icon className="mx-auto" icon="fluent:call-28-regular" width="24" height="24"/>
                                        </div>
                                    </button>
                                    <button className="btn search flex w-10 h-10 hover:bg-neutral-300/10 rounded-md">
                                        <div className="search-container flex mx-auto my-auto">
                                            <Icon className="mx-auto" icon="fluent:search-28-regular" width="24" height="24"/>
                                        </div>
                                    </button>
                                    <button className="btn more flex w-10 h-10 hover:bg-neutral-300/10 rounded-md">
                                        <div className="more-container flex mx-auto my-auto">
                                            <Icon className="mx-auto" icon="fluent:more-horizontal-28-regular" width="24"
                                                  height="24"/>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="chat-messages">
                        <div className="container messages flex flex-col">
                            <div className="message">

                            </div>
                        </div>
                    </div>
                    <div className="chat-controls flex bg-neutral-900/20 backdrop-blur-sm h-16 w-full absolute bottom-0">
                        <div className="container flex px-2 py-2 gap-2">
                            <div className="attachment my-auto">
                                <button className="btn attachment-btn text-neutral-400 h-12">
                                    <Icon icon="fluent:attach-48-regular" width="24" height="24"/>
                                </button>
                            </div>
                            <div className="input message-input my-auto w-full relative flex">
                                <div className="container message-input_container w-full my-auto">
                                    <input type="text" placeholder="Message"
                                           className="input-message bg-neutral-900 w-full py-2 px-2 text-sm outline-none rounded-full"/>
                                </div>
                                <button
                                    className="btn stickers my-auto mx-auto w-4 h-4 md:w-12 md:h-12 text-neutral-400 absolute right-5 top-0 translate-x-1/2 translate-y-1/2 md:relative md:right-auto md:top-auto md:translate-x-0 md:translate-y-0">
                                    <Icon icon="fluent:note-48-regular" className="h-6 w-6 md:h-7 md:w-7 mx-auto my-auto"/>
                                </button>
                            </div>
                            <div className="media media-message flex text-neutral-400">
                                <div className="container media-message_container flex">
                                    <div className="audio-message my-auto">
                                        <div className="container flex my-auto">
                                            <Icon className="my-auto h-6 w-6 md:h-7 md:w-7 mx-auto" icon="fluent:mic-48-regular"
                                                  width="24" height="24"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="send send-message flex">
                                <div className="container send-message_container flex">
                                    <button
                                        className="btn send-btn bg-blue-500 h-8 md:h-9 w-8 md:w-9 my-auto mx-auto rounded-full">
                                        <Icon className="my-auto h-6 w-6 md:h-7 md:w-7 mx-auto flex md:hidden"
                                              icon="fluent:arrow-up-48-regular" width="24" height="24"/>
                                        <Icon className="my-auto h-5 w-5 md:h-6 md:w-6 mx-auto hidden md:flex"
                                              icon="fluent:send-48-regular" width="24" height="24"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}