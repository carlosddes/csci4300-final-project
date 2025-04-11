import Card from "./card";
import Image from "next/image"

type ImageCardProps = {
    imageSrc: string;
    imageAlt: string;
    imageBackground: string;
    children: React.ReactNode;
  };

export default function ImageCard({ imageSrc, imageAlt, imageBackground, children }: ImageCardProps) {
    return(
        <div>
            <Card>
                <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center ${imageBackground} w-12 h-12 rounded-md`}>
                        <Image
                        src={imageSrc}
                        alt={imageAlt}
                        width={24}
                        height={24}
                        className="rounded-md"
                        />
                    </div>
                    <div className="font-sans">
                        {children}
                    </div>
                </div>
            </Card>
        </div>
    );
};