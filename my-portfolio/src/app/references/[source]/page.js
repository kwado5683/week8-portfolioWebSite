import { db } from "@/app/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function References({ params }) {
  const source = await params.source; 


  const validSources = ["coursemates", "colleagues", "fandf","business"];
  if (!validSources.includes(source)) {
    return <p className="text-red-500">Invalid reference type.</p>;
  }


  const query = await db.query(`SELECT * FROM ${source} ORDER BY ${source}_id DESC`);
  const userentry = query.rows;


  async function handleSubmit(formData) {
    "use server";
  
    const name = formData.get("name");
    const comment = formData.get("comment");
  

    const result = await db.query(
      `INSERT INTO ${source} (name, comment) VALUES ($1, $2) RETURNING ${source}_id`,
      [name, comment]
    );
    const source_id = result.rows[0][`${source}_id`];
  

    let insertQuery = "";
    let insertValue = [];
  
    if (source === "coursemates") {
      insertQuery = `INSERT INTO all_ref (name, comment, source, coursemates_id) VALUES ($1, $2, $3, $4)`;
      insertValue = [name, comment, source, source_id];
    } else if (source === "colleagues") {
      insertQuery = `INSERT INTO all_ref (name, comment, source, colleagues_id) VALUES ($1, $2, $3, $4)`;
      insertValue = [name, comment, source, source_id];
    } else if (source === "fandf") {
      insertQuery = `INSERT INTO all_ref (name, comment, source, fandf_id) VALUES ($1, $2, $3, $4)`;
      insertValue = [name, comment, source, source_id];
    } else if (source === "business") {
      insertQuery = `INSERT INTO all_ref (name, comment, source, fandf_id) VALUES ($1, $2, $3, $4)`;
      insertValue = [name, comment, source, source_id];
    }
  

    await db.query(insertQuery, insertValue);
  
    revalidatePath(`/references/${source}`);
    redirect(`/references/${source}`);
  }

  async function deleteComment(id) {
    "use server";

    await db.query(`DELETE FROM ${source} WHERE ${source}_id = $1`, [id]);
    await db.query(`DELETE FROM all_ref WHERE reference_id = $1 AND source = $2`, [id, source]);

    revalidatePath(`/references/${source}`);
    redirect(`/references/${source}`);
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <form action={handleSubmit} className="space-y-4">
        <fieldset>
          <legend className="text-lg font-bold mb-2">
            Leave a Reference ({source})
          </legend>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            required
            className="border w-full p-2 rounded"
          />

          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            name="comment"
            required
            className="border w-full p-2 rounded"
          />
        </fieldset>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </form>

      <Link href="/" className="underline text-blue-500">
        ← Back to Home
      </Link>

      <h2 className="text-xl font-semibold mt-6 mb-2">All References</h2>

      {userentry.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        userentry.map((user) => (
          <div key={user[`${source}_id`]} className="border p-3 rounded mb-4">
            <h3 className="font-bold">{user.name}</h3>
            <p>{user.comment}</p>
            {user.time && (
              <p className="text-sm text-gray-500">
                {new Date(user.time).toDateString()}
              </p>
            )}
            <div>
              {/* <form action={deleteComment.bind(null, user[`${source}_id`])}>
                <button
                  type="submit"
                  className="text-red-600 mt-2 underline hover:text-red-800"
                >
                  Delete
                </button>
              </form> */}
            </div>
          </div>
        ))
      )}
    </main>
  );
}
