import { ChangeEvent, useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { SearchBar } from "@/components/search";

import bgImage from "@/assets/images/landscape.jpg";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ articles = [] }: { articles: any[] }) {
  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    if (query.length < 3) {
      setFilteredArticles(articles);
      return;
    }
    const results = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(results);
  }, [articles, query]);

  return (
    <>
      <Head>
        <title>The State Persistence Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="container py-12 px-8 mx-auto">
          <div>
            <h1 className="text-2xl mb-3">The Challenge: State Persistence</h1>
            <Link href="/solution" className="text-lg block underline mb-3">
              See Solution <span>-&gt;</span>
            </Link>
          </div>
          <div
            className="w-full min-h-[200px] px-12 flex flex-col items-center justify-center rounded-md"
            style={{
              backgroundImage: `url(${bgImage.src})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            <SearchBar onChange={handleChange} value={query} />
          </div>

          <div
            className={`mt-20 mb-4 inline-block p-2 rounded-md border border-gray-600 text-xl ${styles.code}`}
          >
            codenameone Articles
          </div>
          {filteredArticles.length < 1 && (
            <div className="text-center my-10 text-3xl">No articles found!</div>
          )}
          <div className="mt-4 grid grid-cols-1 grid-flow-row md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={article.url}
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={inter.className}>
                  {article.title} <span>-&gt;</span>
                </h2>
                <p className={inter.className}>{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "https://dev.to/api/articles?username=codenameone"
  );

  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
};
