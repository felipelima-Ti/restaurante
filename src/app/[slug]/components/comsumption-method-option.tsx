import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ConsumptionMethodOptionProps {
    slug:string;
    imageUrl: string;
    imageAlt: string;
    buttonText: string;
   option: ConsumptionMethod;
   coverImageUrl:string
}

const ConsumptionMethodOption = ({ slug ,imageUrl, imageAlt, buttonText,option }: ConsumptionMethodOptionProps) => {
    return (
        <div className="card flex flex-col items-center gap-8 py-8">
            <div className="relative h-[80px] w-[80px]">
                <Image src={imageUrl} fill alt={imageAlt} className="object-contain" />
            </div>
            <Button className="mt-2 bg-red-700 text-white px-4 py-2 rounded-full hover:bg-gray-200 transition" asChild>
                <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
                {buttonText}
                </Link>
            </Button>
        </div>
    );
}

export default ConsumptionMethodOption;
