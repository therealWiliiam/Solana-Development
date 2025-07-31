//importing the keypair generation functionality from the Solana web3.js library
// This code generates a new keypair and prints the public key and secret key to the console
import { Keypair } from "@solana/web3.js";

// Generating a new keypair
// The Keypair.generate() method creates a new keypair with a public and private key
const keypair = Keypair.generate();

// Printing the public key and secret key to the console
console.log('Public Key:}',keypair.publicKey.toBase58());
console.log('Secret/Private Key:',keypair.secretKey);