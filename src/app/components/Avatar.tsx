import Image from "next/image";

interface AvatarProps {
    src?: string | ""
    alt: string | "Avatar"
    width?: number | 46
    height?: number | 46
    fallbackLetters: string
}

// Template image
// https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/apple-touch-icon-256x256.png

export default function Avatar({src, alt, width, height, fallbackLetters}: AvatarProps) {

    return (
        <>
            <div className="avatar w-full h-full rounded-full">
                {src &&
                <Image
                    className={"w-full h-full rounded-full hover:cursor-pointer"}
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                />
                }
                {!src &&
                    <div className="avatar w-full h-full rounded-full bg-foreground text-accent flex justify-center items-center">
                        <span className={"font-extrabold text-sm"}>
                            {fallbackLetters}
                        </span>
                    </div>
                }
            </div>
        </>
    )
}