import Image from "next/image";
import Btn from "@/Components/Btn";
import Img from "@/Components/Img"
import { db } from "@/app/utils/dbConnection";
import Nav from "@/Components/Nav";
import us from "@/../public/images/us.jpeg";
import family from "@/../public/images/family.jpeg";
import dalu from "@/../public/images/dalu.jpeg";



export default async function Home() {


  const query = await db.query(`SELECT * FROM all_ref ORDER BY reference_id DESC`);
  const allrefs = query.rows;


  


  return (
          <main>
            <Nav />
            <p className="border-8 my-5 border-gray-300 shadow-lg">Coming from a decade-long career in safety management and transitioning into full-stack development was no easy feat.
It required determination, teamwork, continuous learning, and a genuine passion for problem-solving.

Along the way, I have built and deployed real-world applications using modern technologies, always striving to create practical, user-focused solutions. I take pride in being innovative, adaptable, and always eager to learn something new.

If the goal is building impactful, meaningful products that solve real problems, then I am excited to contribute and grow alongside a team that shares the same drive.

Beyond tech, I am a husband, a father, and a friend.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Image
                src={us}
                alt="I and wifey"
                width={400}
                height={250}
                placeholder="blur"
                className="w-100 h-100 object-contain  rounded-lg"

              />
              <Image
                src={dalu}
                alt="dalu and I"
                width={400}
                height={50}
                placeholder="blur"
                className="w-100 h-100 object-contain  rounded-lg"

              />
              <Image
                src={family}
                alt="my family"
                width={400}
                height={100}
                placeholder="blur"
                className="w-100 h-100 object-contain  rounded-lg"
              />

            </div>
            <Img />
            
            <h2 className="text-xl font-semibold mb-4">Please Leave a Reference..</h2>
            <Btn />
          
          
                {allrefs.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  allrefs.map((refs) => (
                    <div key={refs.reference_id} className="border p-3 rounded mb-4">
                      <h3 className="font-bold">{refs.name}</h3>
                      <h5>{refs.source}</h5>
                      <p>{refs.comment}</p>
                    </div>
            ))
            )}
            
          </main>
  );
}
  
