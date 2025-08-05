import Link from "next/link";


export default function Btn() {
    return(
        <ul className="flex justify-center">   
             <Link href={"/references/colleagues"} className=" mt-4 m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Work Colleague</Link>
             <Link href={"/references/coursemates"} className=" mt-4 m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Coursemate</Link>
             <Link href={"/references/fandf"} className=" mt-4 m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Family&Friend</Link>
             <Link href={"/references/business"} className=" mt-4 m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Business/Other</Link>
               
        </ul>
    )
}