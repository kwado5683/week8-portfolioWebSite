import Link from "next/link";


export default function Nav() {

    return(
        <nav className="flex items-center justify-between">
            <h1>Chikwado Valentine Ani</h1>
            <ul className="flex items-center " >
                <Link href={"/colleagues"} className="mx-5">Colleague's Ref</Link>
                <Link href={"/Coursemates"} className="mx-5">Coursemate's Ref</Link>
                <Link href={"/FandF"} className="mx-5">Family&Freiend's Ref</Link>
               
            </ul>
            
        </nav>
    )
}