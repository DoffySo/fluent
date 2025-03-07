import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function SourceSection() {
    return (
        <>
            <div className="source mt-32 mb-12">
                <div
                    className="source-container flex flex-col items-center px-4 sm:px-2 lg:px-0 w-full sm:w-1/2 lg:w-1/3 mx-auto gap-1">
                    <Icon icon="mdi:github" width="96" height="96"/>
                    <h2 className={`boston text-4xl font-bold`}>
                        Source-Available
                    </h2>
                    <p className={`boston text-center text-sm text-muted-foreground`}>
                        Our entire codebase is available on GitHub with a source-available license. Anyone can
                        view and contribute.
                    </p>
                    <Button className={`p-0 hover:cursor-pointer font-medium boston text-md font-semibold mt-4`}>
                        <Link className={`px-4`} href={"https://github.com/DoffySo/fluent"}>Contribute</Link>
                    </Button>
                </div>
            </div>
        </>
    )
}