import Image from "next/image";
import Btn from "@/Components/Btn";
import Img from "@/Components/Img";
import { db } from "@/app/utils/dbConnection";
import Nav from "@/Components/Nav";
import us from "@/../public/images/us.jpeg";
import family from "@/../public/images/family.jpeg";
import dalu from "@/../public/images/dalu.jpeg";

export default async function Home() {
  const query = await db.query(`SELECT * FROM all_ref ORDER BY reference_id DESC`);
  const allrefs = query.rows;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-4 sm:px-8">
      <Nav />

      <p className="p-5 my-6 bg-white/5 border border-gray-700 rounded-lg shadow-lg leading-relaxed text-sm sm:text-base">
        Coming from a decade-long career in safety management and transitioning into full-stack development was no easy feat.
        It required determination, teamwork, continuous learning, and a genuine passion for problem-solving.
        <br /><br />
        I take pride in being innovative, adaptable, and always eager to learn something new.
        <br /><br />
        If the goal is building impactful, meaningful products that solve real problems, then I am excited to contribute and grow alongside a team that shares the same drive.
      </p>

      {/* Responsive Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Image
          src={us}
          alt="I and wifey"
          width={400}
          height={250}
          placeholder="blur"
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />
        <Image
          src={dalu}
          alt="dalu and I"
          width={400}
          height={250}
          placeholder="blur"
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />
        <Image
          src={family}
          alt="my family"
          width={400}
          height={250}
          placeholder="blur"
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />
      </div>

      {/* <Img /> */}

      <h2 className="text-lg sm:text-xl font-semibold mt-12 mb-4 text-red-400">Please Leave a Reference...</h2>
      <Btn />

      {/* References */}
      <div className="space-y-4 mt-6">
        {allrefs.length === 0 ? (
          <p className="text-gray-400">No comments yet.</p>
        ) : (
          allrefs.map((refs) => (
            <div
              key={refs.reference_id}
              className="bg-white/5 border border-gray-700 rounded-lg p-4 shadow-md"
            >
              <h3 className="font-bold text-lime-300">{refs.name}</h3>
              <h5 className="text-xs text-gray-400">{refs.source}</h5>
              <p className="mt-2 text-sm sm:text-base">{refs.comment}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
