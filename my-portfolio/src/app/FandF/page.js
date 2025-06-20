
import { db } from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"; 
import Link from "next/link";

export default async function FandF() {
  async function handleSubmit(formData) {
    "use server";

    const name = formData.get("name");
    const comment = formData.get("comment"); 
    const source = "Family/Friend";

    await db.query(
      `INSERT INTO fandf (name, comment) VALUES ($1, $2)`,
      [name, comment]
    );
    await db.query(
      `INSERT INTO all_ref (name, comment, source) VALUES ($1, $2, $3)`,
      [name, comment, source]
    );

    // Optional: revalidatePath("/favorites"); or redirect to see updates
    revalidatePath("/FandF");
    redirect("/FandF")
  }

//   To show the comment and name to the user


    const query = await db.query(`SELECT * FROM fandf`);
    const userentry = query.rows;




    return (
        <main className="max-w-xl mx-auto p-6">
          <form action={handleSubmit} className="forms space-y-4">
            <fieldset>
              <legend className="text-lg font-bold mb-2">Leave a Reference</legend>
    
              <label htmlFor="name">Name</label>
              <input type="text" name="name" required className="border w-full p-2 rounded" />
    
              <label htmlFor="comment">Comment</label>
              <input type="text" name="comment" required className="border w-full p-2 rounded" />
            </fieldset>
    
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Post
            </button>
          </form>
          <Link href={"/"} className="">Back to Profile</Link>
    
          {/* <hr className="my-6" /> */}
    
          <h2 className="text-xl font-semibold mb-4">References</h2>
    
          {userentry.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            userentry.map((user) => (
              <div key={user.id} className="border p-3 rounded mb-4">
                <h3 className="font-bold">{user.name}</h3>
                <p>{user.comment}</p>
              </div>
            ))
          )}
        </main>
      );
    }
