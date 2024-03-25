import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/calm.module.css";
import { Typography } from "@mui/material"
import Audio from "/components/audio";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [bpm, setBpm] = useState(110)

  useEffect(() => {
    setTimeout(() => {
      if (bpm >= 90) setBpm(bpm => bpm - Math.floor(Math.random() * 5))
    }, 2000)
  }, [bpm])

  return (
    <>
      <Head>
        <title>AI Meditation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* <p className={styles.title}>Now Playing</p> */}
        <img className={styles.coverimage} src="/logo.png" alt="calm" width={350} height={350}/>
        <Typography variant="h5" className={styles.songtitle}>
            Calm your Mind
        </Typography>
        <Typography variant="body1" sx={{marginBottom: '40px'}}>
            Current heart-rate: <span style={{color: bpm > 90 ? 'red' : 'green', fontWeight: 'bold'}}>{bpm} bpm</span>
        </Typography>
        <Audio />
      </main>
    </>
  );
}