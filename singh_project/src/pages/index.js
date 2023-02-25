// this will be our landing page 

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import NavBar from '@/components/NavBar.js'
import Login from '@/Forms/login.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Fuel Quote</title>
        <meta name="description" content="Fuel quotes made easy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap" rel="stylesheet"></link>
      </Head>
      <main className={styles.main}>
          <div className={styles.navWrapper}>
            <NavBar />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.backdrop} >
              <div className={styles.gradientContainer}>
              </div>
            </div>
            <div className={styles.overlay}>
              <div className={styles.container}>
                <div className={styles.bodyWrapper}>
                  <div className={styles.textWrapper}>
                    <h1 className={styles.headerText}>Fuel Quotes Made Easy</h1>
                    <p className={styles.subText}>Join the millions of businesses that use fuel quote today!</p>
                  </div>
                  <div className={styles.formWrapper}>
                    <Login />
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  )
}
