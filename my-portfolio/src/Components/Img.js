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
            <h3 className="text-center mt-24 w-full border bg-purple-500 text-white py-2">My Stack</h3>

            <div className="grid grid-cols-5 mt-10 p-10 pl-5">
                <Image
                src={js}
                alt="javascript"
                width={300}
                height={70}
                placeholder="blur"
                className="w-32 h-32 rounded-full m-10"/>
                <Image
                src={rt}
                alt="react"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full object-cover m-10"

                />
                <Image
                src={njs}
                alt="nextjs"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full object-cover m-10"
                />
                <Image
                src={nd}
                alt="nextjs"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full m-10"
                />
                <Image
                src={dt}
                alt="data"
                width={300}
                height={300}
                placeholder="blur"
                className="w-32 h-32 rounded-full m-10"
                
                />
            </div>
        </div>

    )
}