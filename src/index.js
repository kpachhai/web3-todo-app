import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

/* 
  We import the RainbowKit styles, The RainbowKitProvider and other functions which
  we will use to configure our chains and we also import WagmiConfig
*/
import '@rainbow-me/rainbowkit/styles.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, hardhat, mainnet } from 'wagmi/chains'
// You can support more chains like arbitrum, polygon, optimism
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

/*
  We then configure the chains we want to support. 
  The configureChains function allows you to configure your chains with providers such as: Alchemy, Infura, or something else. This means you don't need to worry about defining RPC URLs and chain configuration in your connector or provider. This is managed internally by wagmi.

  We’re basically supporting the mainnet of Ethereum, Goerli testnet and local Hardhat network here.
  RainbowKit lets us specify our own JSON RPC URLs or Alchemy or Infura URLs for our API providers. Since we have an alchemy node, we’re gonna support Alchemy here.
  The publicProvider ensures that your chains always have an RPC URL to fall back on (in case Alchemy does not support the chain).
*/
const { chains, provider } = configureChains(
  [hardhat, goerli, mainnet],
  // If you want to use Infura, you could do something like:
  // infuraProvider({ infuraId }),
  [alchemyProvider({ apiKey: process.env.ALCHEMY_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Todo Dapp',
  chains,
})

/*
  Next, we create our wagmiClient passing in the autoconnect and setting it to true. This will automatically reconnect to the last used connector this way
  
  If a user has their wallet connected to a chain that is unsupported by your app, the provider will use the first chain listed in the chains array.
*/
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const root = ReactDOM.createRoot(document.getElementById('root'))

// We then wrap our application with WagmiConfig and RainbowkitProvider
root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
