# voting-dapp
Here, a de-centralized web application is built on Ganache local ethereum blockchain network using web3, and metamask.

# Requirements
1. Ganache Local Ethereum Blockchain Server
2. Metamask Wallet
3. Truffle 

# Steps
1. Launch Ganache Blockchain Server
2. Connect Metamask Wallet with Ganache through Custom RPC, and Private Key of 0th address
3. truffle compile
4. truffle migrate
5. npm run dev

# Procedure
When you click on vote button, dapp sends a request to metamask wallet for transaction. When you confirm the transaction, it sends a request to the smart contract which is deployed and then the vote would be casted if you click the button for the first time. Once you cast the vote, you can't caste the vote again through the same account. So, for demonstration use multiple accounts and the votes casted would be shown in the dapp.

# Step-By-Step-Procedure

Development:
1. Back-end (Smart Contracts)
2. Middlware (web3.js API)
3. Front-end (HTML)

#Back-end:

1. truffle init

2. Created our own Contract (castvote,viewvote)
cd contracts
sudo nano election.sol

3. Compiled it
truffle compile

4. Create a migration script
cd migrations
sudo nano 2_deploy_contract.js

5. Migrated the Contract
truffle migrate
