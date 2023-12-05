import lighthouse from "@lighthouse-web3/sdk";


export async function syncUploads(apiKey){
  const response = await lighthouse.getUploads(apiKey);

  //console.log(response);
}