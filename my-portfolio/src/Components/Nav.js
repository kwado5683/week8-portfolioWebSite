import Link from "next/link";


export default function Nav() {

    return(
        <nav className="flex items-center justify-between">
            <h1 className="text-glow text-foreground">Chikwado Valentine Ani</h1>
            <ul className="flex items-center " >
                <Link href={"/references/colleagues"} className="mx-5">Colleague&apos;s Ref</Link>
                <Link href={"/references/coursemates"} className="mx-5">Coursemate&apos;s Ref</Link>
                <Link href={"/references/fandf"} className="mx-5">Family&Freiend&apos;s Ref</Link>
               
            </ul>
            
        </nav>
    )
}