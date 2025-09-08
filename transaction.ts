// Importing Solana Web3.js essentials for working with transactions, accounts, and the blockchain
import {
    Connection,              // Handles connection to the Solana cluster
    PublicKey,               // Represents and validates public keys
    LAMPORTS_PER_SOL,        // Conversion constant: 1 SOL = 1,000,000,000 lamports
    Transaction,             // Used to build and send transactions
    SystemProgram,           // Provides built-in Solana instructions (e.g., transfer SOL)
    sendAndConfirmTransaction // Sends a transaction and waits for confirmation
} from "@solana/web3.js"

import "dotenv/config"; // Loads environment variables from a .env file

// Helper functions for keypair handling and funding
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";

// ---------------------- SETUP ---------------------- //

// Establish a connection to Solana's Devnet (test network)
// "confirmed" commitment ensures that the transaction is finalized in the ledger
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Load our wallet (keypair) from environment variable SECRET_KEY
// This ensures we have access to both public and private keys
const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

// Ensure the sender has enough SOL for the transaction by requesting an airdrop if balance is low
await airdropIfRequired(
    connection,
    senderKeypair.publicKey,
    1.5 * LAMPORTS_PER_SOL, // Desired balance (1.5 SOL)
    0.5 * LAMPORTS_PER_SOL, // Minimum balance (0.5 SOL)
);

console.log(`💧 Airdrop (if needed) completed for ${senderKeypair.publicKey.toBase58()}`);

// ---------------------- DESTINATION ACCOUNT ---------------------- //

// Hardcoded destination public key (recipient of SOL)
const suppliedToPubkey = "7J1JSvvnd2pLnMRqd1xy2cBAw7rNbUT4sRsShhwY2Qa1";

if (!suppliedToPubkey) {
    console.log("❌ Please provide a recipient public key");
    // process.exit(1); // Optional exit if no key provided
}

console.log(`📌 Destination public key provided: ${suppliedToPubkey}`);

// Create a PublicKey object from the recipient address string
const toPubkey = new PublicKey(suppliedToPubkey);

console.log("✅ Sender keypair, recipient key, and connection setup complete.");

// ---------------------- TRANSACTION ---------------------- //

// Create a new transaction object
const transaction = new Transaction();

// Define how much SOL (in lamports) to send
const LAMPORTS_TO_SEND = 5000; // This is 0.000005 SOL

// Create a transfer instruction (who sends, who receives, how much)
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey, // Sender
    toPubkey,                            // Recipient
    lamports: LAMPORTS_TO_SEND,          // Amount in lamports
});

// Add the transfer instruction to the transaction
transaction.add(sendSolInstruction);

// Send transaction and wait for confirmation
const signature = await sendAndConfirmTransaction(
    connection,        // Network connection
    transaction,       // The built transaction
    [senderKeypair],   // Signers (must sign with the sender’s private key)
);

// ---------------------- LOGGING ---------------------- //

console.log(
  `✅ Finished! Sent ${LAMPORTS_TO_SEND} lamports (${LAMPORTS_TO_SEND / LAMPORTS_PER_SOL} SOL) to ${toPubkey.toBase58()}.`
);
console.log(`🔗 Transaction signature: ${signature}`);
