import Head from 'next/head'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import styles from '../styles/App.module.css'

const DataStore = () => {
    const [error, setError] = useState('')
    const [address, setAddress] = useState(null)
    const [web3, setWeb3] = useState(null)


    const connectWalletHandler = async () => {
      /* check if MetaMask is installed */
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          try {
            /* request wallet connect */
            await window.ethereum.request({ method: "eth_requestAccounts" })
            /* create web3 instance and set to state var */
            const web3 = new Web3(window.ethereum)
            /* set web3 instance */
            setWeb3(web3)
            /* get list of accounts */
            const accounts = await web3.eth.getAccounts()
            /* set Account 1 to React state var */
            setAddress(accounts[0])
            
          } catch(err) {
            setError(err.message)
          }
      } else {
          // meta mask is not installed
          console.log("Please install MetaMask")
      }
    }

    return (
        <div className={styles.main}>
          <Head>
            <title>Blockchain App</title>
            <meta name="description" content="A blockchain  Dapp" />
          </Head>
          <nav className="navbar mt-4 mb-4">
            <div className="container">
                <div className="navbar-brand">
                  <h1>MyNFT</h1>
                </div>
                <div className="navbar-end">
                    <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
                </div>
            </div>
          </nav>
          <section>
              <div className="container has-text-danger">
                  <p>{error}</p>
              </div>
          </section>
        </div>
    )
}

export default DataStore