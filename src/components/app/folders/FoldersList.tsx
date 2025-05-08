'use client'
import {Button} from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {Icon} from "@iconify/react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Plus, X} from 'lucide-react'
import {ScrollArea} from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {useState} from "react";
import {Badge} from "@/components/ui/badge";


export default function FoldersList() {
    const [selectedColor, setSelectedColor] = useState<string>("none");
    const [previewText, setPreviewText] = useState<string>("");
    return (
        <>
            <div className="folders">
                <div className="folders-container px-3">
                    <header className="folders-header ps-2">
                        <span className="label uppercase text-muted-foreground text-xs">
                            Folders
                        </span>
                    </header>
                    <div className="folders-list bg-muted rounded-lg h-fit py-1">
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button className={"w-full h-8 justify-start text-blue-500 dark:text-blue-400"} variant={"ghost"} size={"sm"}>Create a Folder</Button>
                            </DrawerTrigger>
                            <DrawerContent className={"min-h-12/12 px-3"}>
                                <ScrollArea>
                                    <DrawerHeader className={"px-0 py-2"}>
                                        <div className="w-full grid grid-cols-3">
                                            <div className={"flex items-center text-md font-bold justify-center"}>
                                                <DrawerClose asChild>
                                                    <Button variant={"link"}>Cancel</Button>
                                                </DrawerClose>
                                            </div>
                                            <div className={"flex items-center text-md font-bold justify-center"}>
                                                <span>New Folder</span>
                                            </div>
                                            <div className={"flex items-center text-md font-bold justify-center"}>
                                                <Button disabled variant={"link"}>
                                                    Create
                                                </Button>
                                            </div>
                                        </div>
                                    </DrawerHeader>
                                    <div className="content flex flex-col justify-center items-center">
                                        <div className="folder-icon flex w-28 h-28 mx-auto">
                                            <Icon icon="fa:folder-open" className={"w-full h-full"}/>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5 my-3 mb-6">
                                            <Label className={"uppercase text-xs text-muted-foreground"}
                                                   htmlFor="foldername">Folder Name</Label>
                                            <Input onChange={(e) => setPreviewText(e.target.value)} type="text" id="foldername" placeholder="Folder Name"/>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5 my-3 mb-6">
                                            <Label className={"uppercase text-xs text-muted-foreground"}>Included
                                                Chats</Label>
                                            <div className="bg-muted rounded-lg w-full h-10">
                                                <Button className={"px-2 justify-start font-thin h-10"} variant={"ghost"}>
                                                    <div className="w-8 h-8 flex items-center justify-center">
                                                        <Plus/>
                                                    </div>
                                                    <span>Add Chats</span>
                                                </Button>
                                            </div>
                                            <Label className={"text-xs font-thin text-muted-foreground"}>Choose chats or
                                                types of chats that will appear in this folder.</Label>
                                        </div>
                                        <div className="grid w-full max-w-sm items-center gap-1.5 my-3 mb-6">
                                            <div className="flex">
                                                <Label className={"uppercase text-xs text-muted-foreground"}>Folder Color</Label>

                                                {
                                                    selectedColor == "sky" ? (
                                                        <>
                                                            <Badge className={`preview mx-1 bg-sky-400/30 text-sky-500`} variant={"secondary"}>{previewText}</Badge>
                                                        </>
                                                    ) :
                                                    selectedColor == "green" ? (
                                                        <>
                                                            <Badge className={`preview mx-1 bg-green-400/30 text-green-500`} variant={"secondary"}>{previewText}</Badge>
                                                        </>
                                                    ):
                                                    selectedColor == "orange" ? (
                                                        <>
                                                            <Badge className={`preview mx-1 bg-orange-400/30 text-orange-500`} variant={"secondary"}>{previewText}</Badge>
                                                        </>
                                                    ):
                                                    selectedColor == "red" ? (
                                                            <>
                                                                <Badge className={`preview mx-1 bg-red-400/30 text-red-500`} variant={"secondary"}>{previewText}</Badge>
                                                            </>
                                                    ):
                                                    selectedColor == "indigo" ? (
                                                        <>
                                                            <Badge className={`preview mx-1 bg-indigo-400/30 text-indigo-500`} variant={"secondary"}>{previewText}</Badge>
                                                        </>
                                                    ):
                                                        selectedColor == "cyan" ? (
                                                        <>
                                                            <Badge className={`preview mx-1 bg-cyan-400/30 text-cyan-500`} variant={"secondary"}>{previewText}</Badge>
                                                        </>
                                                    ) :
                                                    selectedColor == "pink" ? (
                                                        <>
                                                            <Badge className={`preview mx-1 bg-pink-400/30 text-pink-500`} variant={"secondary"}>{previewText}</Badge>
                                                        </>
                                                    ) :
                                                    (
                                                        <>
                                                            <Label className={"ml-auto uppercase text-xs text-muted-foreground"}>NO TAG</Label>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className="bg-muted rounded-lg w-full h-10 px-2">
                                                <RadioGroup className={"flex items-center h-10 gap-x-5"}
                                                            defaultValue="none"
                                                            onValueChange={(e) => setSelectedColor(e)}
                                                >
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="sky" id="colorSky"/>
                                                        <Label htmlFor="colorSky"
                                                               className={`w-7 h-7 rounded-full bg-sky-400 ${selectedColor == "sky" ? "border-2 border-sky-600" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="green"
                                                                        id="colorGreen"/>
                                                        <Label htmlFor="colorGreen"
                                                               className={`w-7 h-7 rounded-full bg-green-400 ${selectedColor == "green" ? "border-2 border-green-700" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="orange"
                                                                        id="colorOrange"/>
                                                        <Label htmlFor="colorOrange"
                                                               className={`w-7 h-7 rounded-full bg-orange-400 ${selectedColor == "orange" ? "border-2 border-orange-500 dark:border-orange-600" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="red"
                                                                        id="colorRed"/>
                                                        <Label htmlFor="colorRed"
                                                               className={`w-7 h-7 rounded-full bg-red-400 ${selectedColor == "red" ? "border-2 border-red-500" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="indigo"
                                                                        id="colorIndigo"/>
                                                        <Label htmlFor="colorIndigo"
                                                               className={`w-7 h-7 rounded-full bg-indigo-400 ${selectedColor == "indigo" ? "border-2 border-indigo-600" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="cyan"
                                                                        id="colorCyan"/>
                                                        <Label htmlFor="colorCyan"
                                                               className={`w-7 h-7 rounded-full bg-cyan-400 ${selectedColor == "cyan" ? "border-2 border-cyan-700" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="pink"
                                                                        id="colorPink"/>
                                                        <Label htmlFor="colorPink"
                                                               className={`w-7 h-7 rounded-full bg-pink-400 ${selectedColor == "pink" ? "border-2 border-pink-600" : ""}`}/>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <RadioGroupItem className={"hidden"} value="none"
                                                                        id="colorNone"/>
                                                        <Label htmlFor="colorNone"
                                                               className={`justify-center w-7 h-7 rounded-full bg-zinc-600 text-foreground ${selectedColor == "none" ? "border-2 border-zinc-400" : ""}`}>
                                                            <X className={"w-4 h-4"} />
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>

                                <DrawerTitle className={"sr-only"}>New Folder</DrawerTitle>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>
            </div>
        </>
    )
}