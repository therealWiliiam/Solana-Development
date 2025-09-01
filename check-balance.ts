// Import Solana Web3.js dependencies
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

// Establish a connection to the Solana Devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Define the public key (account address) to check balance
const address = new PublicKey("Your public key");

try {
    // Fetch the account balance (in lamports)
    const balance = await connection.getBalance(address);

    // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    // Log results
    console.log("✅ Connected to Solana Devnet");
    console.log(`🔑 Account: ${address.toBase58()}`);
    console.log(`💰 Balance: ${balanceInSol} SOL`);
} catch (error) {
    console.error("❌ Error fetching balance:", error);
}
