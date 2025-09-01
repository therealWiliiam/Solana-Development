// generate-keypair.ts
// ------------------------------------------------------------
// This script generates a new Solana keypair and prints the
// public key (Base58) and secret key to the console.
// ------------------------------------------------------------

import { Keypair } from "@solana/web3.js";

// Generate a new keypair
const keypair = Keypair.generate();

// Log the public and secret keys
console.log("Public Key:", keypair.publicKey.toBase58());
console.log("Secret/Private Key:", keypair.secretKey);

// ------------------------------------------------------------
// Next steps:
// 1. Create a `.env` file in your project root.
// 2. Store the secret key in it, e.g.:
//
//    SECRET_KEY=[your secret key here]
//
// 3. Load it in your code with `dotenv` and 
//    `getKeypairFromEnvironment` (example below).
// ------------------------------------------------------------

// Example for loading from .env:
//
// import "dotenv/config";
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";
//
// const keypairFromEnv = getKeypairFromEnvironment("SECRET_KEY");
// console.log("Public Key:", keypairFromEnv.publicKey.toBase58());
// console.log("Secret/Private Key:", keypairFromEnv.secretKey);
