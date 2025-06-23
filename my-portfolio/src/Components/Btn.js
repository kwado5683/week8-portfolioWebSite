import Link from "next/link";


export default function Btn() {
    return(
        <ul className="flex items-center">   
             <Link href={"/references/colleagues"} className="mx-5">Work Colleague</Link>
             <Link href={"/references/coursemates"} className="mx-5">Coursemate</Link>
             <Link href={"/references/fandf"} className="mx-5">Family&Friend</Link>
               
        </ul>
    )
}