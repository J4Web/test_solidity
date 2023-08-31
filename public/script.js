

const btn=document.getElementById('metamask');
const btn1=document.getElementById('contractConnect');
const btn2=document.getElementById('getNum');
const btn3=document.getElementById('btn3');
console.log(btn)
let contract;

const connectToMetaMask= async function(){
    console.log("clicked");
    let addres="";
    if(typeof window.ethereum === 'undefined'){
        alert('Install Metamask');
        return;
    }
    try{
        //u only need to have metamask to connect to metamask nothing else
        //once u have metamask u have window.ethereum 

       await  window.ethereum.request({method:'eth_requestAccounts'});
        console.log("Connected to Metamask");

        //here we're creating the instance of ether web3 provider and connecting to metamask
        //then THIS PROVIDER can get you anything 
        //first we get the signer -> gives us and jsonrpc object which has methods to interact with the blockchain so provider.signer gives us this object

        const provider=new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider | ",provider);
        const signer =provider.getSigner();
        console.log("signer | ",signer)
        //then after we have the signer of the contract we just can get anything , i.e their address easily 
        const address=await signer.getAddress();
        console.log("Addresss",address);
        addres=address;

    }catch(err){
        console.error("Error occoured", err)
    }

    const add=document.getElementById('address');
    console.log(add)
    add.innerHTML=`<h1>Address is ${addres} </h1>`;
    btn.innerText='conneted';

} 

const connectToContract=async function (){
    const ABI=[
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const contractAddress='0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99';
    const provider=new ethers.providers.Web3Provider(window.ethereum);
    contract=new ethers.Contract(contractAddress,ABI,provider);
     const connectContract=document.getElementById('contract');
    connectContract.innerText="Connected to Contract"

}

const callStoreFunction=async function () {
    try {
        // Call the 'store' function with the value you want to store
        const transaction = await contract.store(42);
        await transaction.wait(); // Wait for the transaction to be mined
        console.log("Value stored successfully!");
    } catch (error) {
        console.error("Error calling store function:", error);
    }
}

const getDataFromSmartContract= async function (){
    console.log("Contract ",contract);
    const n=await contract.retrieve();
    console.log("WTF IS N ",n)
    // const data= document.getElementById('num');
    // data.innerText=`Data has become ${n}`;
}


 btn.addEventListener('click',connectToMetaMask);
 btn1.addEventListener('click',connectToContract);
btn2.addEventListener('click',getDataFromSmartContract);
btn3.addEventListener('click',callStoreFunction);

// console.log("even connected")