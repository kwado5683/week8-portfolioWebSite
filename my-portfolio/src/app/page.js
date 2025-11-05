import Image from "next/image";
import Btn from "@/Components/Btn";
import Img from "@/Components/Img";
import { db } from "@/app/utils/dbConnection";
import Nav from "@/Components/Nav";
import us from "@/../public/images/us.jpeg";
import family from "@/../public/images/family.jpeg";
import dalu from "@/../public/images/dalu.jpeg";

export const dynamic = 'force-dynamic'; // Force dynamic rendering to always fetch fresh data

export default async function Home() {
  let allrefs = [];
  
  try {
    const query = await db.query(`SELECT * FROM all_ref ORDER BY reference_id DESC`);
    allrefs = query.rows;
  } catch (error) {
    console.error('Database query error:', error);
    // Handle specific error types
    if (error.code === 'ENOTFOUND' || error.message?.includes('getaddrinfo')) {
      throw new Error(
        'Database connection failed: Could not resolve database hostname. ' +
        'Please check your NEXT_DATABASE_URL in .env.local file. ' +
        'The database hostname may be incorrect or the Supabase project may have been paused/deleted.'
      );
    }
    if (error.code === 'ECONNREFUSED') {
      throw new Error(
        'Database connection refused. Please check your NEXT_DATABASE_URL and ensure the database is running.'
      );
    }
    // Re-throw other errors
    throw error;
  }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md">
          <Image
            src={us}
            alt="I and wifey"
            fill
            placeholder="blur"
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md">
          <Image
            src={family}
            alt="dalu and I"
            fill
            placeholder="blur"
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md">
          <Image
            src={dalu}
            alt="my family"
            fill
            placeholder="blur"
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
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
              {refs.created_at && (
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(refs.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
