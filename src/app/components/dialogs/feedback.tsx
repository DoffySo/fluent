import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { Switch } from "@/components/ui/switch"
import {useState} from "react";



export default function FeedbackDialog() {
    const [anonymous, setAnonymous] = useState<boolean>(true);


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={`text-blue-400 hover:underline hover:underline-offset-1 ps-1 pe-0 hover:cursor-pointer text-xs md:text-sm`} variant={"link"}>this form</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Website feedback</DialogTitle>
                        <DialogDescription>
                            We will check your feedback as soon as possible!
                        </DialogDescription>
                    </DialogHeader>
                    <div className={`flex flex-col gap-1`}>
                        <div className={`flex items-center space-x-2`}>
                            <Switch onCheckedChange={(e) => {
                                setAnonymous(e)
                            }} checked={anonymous} id={"send-anonymous"} />
                            <label htmlFor={"send-anonymous"}>Send as anonymous</label>
                        </div>
                        {
                            !anonymous &&
                            <div className={`flex flex-col gap-1`}>
                                <label htmlFor="name" className={`text-muted-foreground`}>Your name</label>
                                <input id={"name"} placeholder={""}
                                                  className={"outline-none w-full border px-2 py-2 rounded text-sm"}/>
                            </div>
                        }

                        <div className={`flex flex-col gap-1`}>
                            <label htmlFor="feedback" className={`text-muted-foreground`}>Feedback</label>
                            <TextareaAutosize id={"feedback"} placeholder={""} rows={3} maxRows={12}
                                              className={"resize-none outline-none w-full border px-2 py-2 rounded text-sm"}/>
                            {anonymous && <span className={`text-xs text-muted-foreground`}>Your feedback will be anonymous.</span>}
                        </div>
                        <Button disabled={true} className={`mt-4`}>Send</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}