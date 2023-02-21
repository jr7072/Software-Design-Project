// this will be our landing page 

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Fuel Quote</title>
        <meta name="description" content="Fuel quotes made easy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
          <div className={styles.backdrop} >
            <div className={styles.gradientContainer}>
            
            </div>
          </div>
      </main>
    </>
  )
}
