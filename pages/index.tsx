import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {WalletButton} from "../components/WalletButton";
import {CollectionHolderProfile} from "../components/CollectionHolderProfile";
import {CollectionHolderButton} from "../components/CollectHolderButton";

const Home: NextPage = () => {
  return (
      <div className={styles.container}>
        <Head>
          <title>Ethereum collabrated Collection</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Ethereum cloneX Collection
          </h1>
          <CollectionHolderButton>connect your wallet to see if you are a holder of collabrated collections</CollectionHolderButton>
          <CollectionHolderProfile/>
        </main>

      </div>
  )
}

export default Home
