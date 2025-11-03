import pg from "pg";

if (!process.env.NEXT_DATABASE_URL) {
    throw new Error("NEXT_DATABASE_URL environment variable is not set. Please add it to your .env.local file.");
}

// Validate connection string format
const connectionString = process.env.NEXT_DATABASE_URL;
if (!connectionString.startsWith('postgresql://') && !connectionString.startsWith('postgres://')) {
    throw new Error("NEXT_DATABASE_URL must be a valid PostgreSQL connection string starting with 'postgresql://' or 'postgres://'");
}

export const db = new pg.Pool({
    connectionString: connectionString,
    ssl: connectionString.includes('supabase') || connectionString.includes('sslmode=require') 
        ? { rejectUnauthorized: false } 
        : undefined,
});

// Handle pool errors
db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});