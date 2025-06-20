import Link from "next/link";


export default function Btn() {
    return(
        <ul className="flex items-center justify-between">   
             <Link href={"/colleagues"} className="mx-5">Work Colleague</Link>
             <Link href={"/Coursemates"} className="mx-5">Coursemate</Link>
             <Link href={"/FandF"} className="mx-5">FamilynFreiend</Link>
               
        </ul>
    )
}