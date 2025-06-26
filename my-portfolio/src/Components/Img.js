import Image from "next/image";
import dt from "@/../public/images/dt.jpg";
import js from "@/../public/images/js.png";
import rt from "@/../public/images/rt.png";
import nd from "@/../public/images/nd.png";
import njs from "@/../public/images/njs.webp";

"@/../public/images/rollercoaster.jpg";




export default function Img () {

    return(
        <div >
            <h3 className="text-center">My Stack</h3>
            <div className="grid grid-cols-5">
                <Image
                src={js}
                alt="javascript"
                width={300}
                height={70}
                placeholder="blur"
                className="w-32 h-32 rounded-full"/>
                <Image
                src={rt}
                alt="react"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full object-cover"

                />
                <Image
                src={njs}
                alt="nextjs"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full object-cover"
                />
                <Image
                src={nd}
                alt="nextjs"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full"
                />
                <Image
                src={dt}
                alt="data"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full"
                />
            </div>
        </div>

    )
}