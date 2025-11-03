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


  let userentry = [];
  
  try {
    const query = await db.query(`SELECT * FROM ${source} ORDER BY ${source}_id DESC`);
    userentry = query.rows;
  } catch (error) {
    console.error('Database query error:', error);
    // Handle specific error types
    if (error.code === 'ENOTFOUND' || error.message?.includes('getaddrinfo')) {
      return (
        <main className="max-w-xl mx-auto p-6 space-y-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold mb-2">Database Connection Error</h2>
            <p>Could not connect to the database. Please check your NEXT_DATABASE_URL in .env.local file.</p>
            <p className="mt-2 text-sm">Error: {error.message}</p>
          </div>
          <Link href="/" className="underline text-blue-500">← Back to Home</Link>
        </main>
      );
    }
    throw error;
  }


  async function handleSubmit(formData) {
    "use server";
  
    const name = formData.get("name");
    const comment = formData.get("comment");
  
    try {
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
        insertQuery = `INSERT INTO all_ref (name, comment, source, business_id) VALUES ($1, $2, $3, $4)`;
        insertValue = [name, comment, source, source_id];
      }
    
      await db.query(insertQuery, insertValue);
    } catch (error) {
      console.error('Database insert error:', error);
      throw new Error(`Failed to save reference: ${error.message}`);
    }
    
    // Perform redirect and revalidation outside try-catch
    // so redirect() errors can propagate naturally
    revalidatePath(`/references/${source}`);
    redirect(`/references/${source}`);
  }

  async function deleteComment(id) {
    "use server";

    try {
      await db.query(`DELETE FROM ${source} WHERE ${source}_id = $1`, [id]);
      
      // Delete from all_ref using the appropriate foreign key
      // Note: With CASCADE DELETE, this may be redundant, but kept for explicit control
      let deleteQuery = "";
      if (source === "coursemates") {
        deleteQuery = `DELETE FROM all_ref WHERE coursemates_id = $1`;
      } else if (source === "colleagues") {
        deleteQuery = `DELETE FROM all_ref WHERE colleagues_id = $1`;
      } else if (source === "fandf") {
        deleteQuery = `DELETE FROM all_ref WHERE fandf_id = $1`;
      } else if (source === "business") {
        deleteQuery = `DELETE FROM all_ref WHERE business_id = $1`;
      }
      
      await db.query(deleteQuery, [id]);
    } catch (error) {
      console.error('Database delete error:', error);
      throw new Error(`Failed to delete reference: ${error.message}`);
    }
    
    // Perform redirect and revalidation outside try-catch
    // so redirect() errors can propagate naturally
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
              <form action={deleteComment.bind(null, user[`${source}_id`])}>
                <button
                  type="submit"
                  className="text-red-600 mt-2 underline hover:text-red-800"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
