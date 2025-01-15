import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex w-screen h-screen">
            <div className="flex flex-col w-full h-full items-center justify-center">
                <h2 className="text-3xl md:text-[4rem] lg:text-[8rem] font-extrabold text-neutral-200 md:mb-6 lg:mb-12">Not Found</h2>
                <p className="text-lg md:text-xl lg:text-[1.5rem] text-neutral-500">Could not find requested resource</p>
                <Link className="md:text-lg lg:text-[1.2rem] font-bold tracking-wide hover:underline text-neutral-300 mt-4 md:mt-2" href="/">Return Home</Link>
            </div>
        </div>
    )
}