import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { supabase, type Joke } from "@/lib/supabase";
import styles from "./jokes.module.css";

export const metadata: Metadata = {
  title: "Jokes",
  description: "Jokes stored in Supabase, rendered for Assignment 2 of the Humor Project.",
};

export default async function JokesPage() {
  // Render on every request so new rows in Supabase show up without a redeploy.
  await connection();

  const { data: jokes, error } = await supabase
    .from("jokes")
    .select("id, setup, punchline, category, created_at")
    .order("id", { ascending: true })
    .returns<Joke[]>();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>
          ← Home
        </Link>
        <p className={styles.eyebrow}>Humor Project · Assignment 2</p>
        <h1 className={styles.title}>Jokes from Supabase</h1>
        {jokes && (
          <p className={styles.count}>
            {jokes.length} {jokes.length === 1 ? "row" : "rows"} from the <code>jokes</code> table
          </p>
        )}
      </header>

      {error ? (
        <p className={styles.message}>Couldn&apos;t load jokes: {error.message}</p>
      ) : jokes.length === 0 ? (
        <p className={styles.message}>The jokes table is empty.</p>
      ) : (
        <ol className={styles.list}>
          {jokes.map((joke) => (
            <li key={joke.id} className={styles.card}>
              <div className={styles.meta}>
                <span>#{joke.id}</span>
                {joke.category && <span className={styles.tag}>{joke.category}</span>}
              </div>
              <p className={styles.setup}>{joke.setup}</p>
              <p className={styles.punchline}>{joke.punchline}</p>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
