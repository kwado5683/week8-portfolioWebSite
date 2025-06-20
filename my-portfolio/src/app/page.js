import Image from "next/image";
import Btn from "@/Components/Btn";
import Img from "@/Components/Img"
import { db } from "@/app/utils/dbConnection";
import Nav from "@/Components/Nav";
import us from "@/../public/images/us.jpeg";
import family from "@/../public/images/family.jpeg";
import dalu from "@/../public/images/dalu.jpeg";



export default async function Home() {


  const query = await db.query(`SELECT * FROM all_ref ORDER BY id DESC`);
  const allrefs = query.rows;


  


  return (
          <main>
            <Nav />
            <p className="border-8 my-5 border-gray-300 shadow-lg">coming from a decade long career in safety management and now working as a full-stack developer was no easy fit.
                it took determination, working in a team, continuos learning and a genuine passion for problem solving.
                Along the way, I have built and deployed real-world applications using modern technologies.
                I am exceptionally innovative and keen to learn new things.
                if building practical, user-focused solutions with real impact is the goal, then I am excited to contribute and grow with a team that shares the same drive

                I am a husband, father and friend!

            </p>
            <div className="grid grid-cols-3">
              <Image
                src={us}
                alt="I and wifey"
                width={400}
                height={250}
                placeholder="blur"
              />
              <Image
                src={dalu}
                alt="dalu and I"
                width={400}
                height={50}
                placeholder="blur"
              />
              <Image
                src={family}
                alt="my family"
                width={400}
                height={100}
                placeholder="blur"
              />

            </div>
            <Img />
            
            <h2 className="text-xl font-semibold mb-4">Please Leave a References..</h2>
            <Btn />
          
          
                {allrefs.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  allrefs.map((refs) => (
                    <div key={refs.id} className="border p-3 rounded mb-4">
                      <h3 className="font-bold">{refs.name}</h3>
                      <h5>{refs.source}</h5>
                      <p>{refs.comment}</p>
                    </div>
            ))
            )}
            
          </main>
  );
}
  
