import Link from "next/link";


export default function Nav() {

    return(
        <nav className="flex items-center justify-between">
            <h1 className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600 p-5">Chikwado <br/>Valentine <br/>Ani</h1>
            <ul className="flex items-center " >
                <Link href={"/references/colleagues"} className="w-full m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Colleague&apos;s Ref</Link>
                <Link href={"/references/coursemates"} className="w-full m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Coursemate&apos;s Ref</Link>
                <Link href={"/references/fandf"} className="w-full m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Family&Freiend&apos;s Ref</Link>
                <Link href={"/references/business"} className="w-full m-4 border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded" >Business/Others</Link>
               
            </ul>
            
        </nav>
    )
}