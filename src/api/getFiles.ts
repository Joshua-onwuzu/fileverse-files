// src/utils/fetchData.ts
import axios from 'axios';

const url =
  'https://subgraph.satsuma-prod.com/3c76b4de84df/b3091e3f59457e838d81b3b921d467ff2cc04893951558e2b3e5db9a1caa7520/fileversePortalProd/version/v0.0.2-new-version/api';

const query = `{
  addedFiles(first: 20, where: {
    fileType: "0", 
  }, orderDirection: desc, orderBy: blockNumber) {
    metadataIPFSHash 
    contentIPFSHash 
    gateIPFSHash 
    portalAddress 
    fileId 
    fileType 
    blockNumber 
    transactionHash
  }
}`;

export const fetchFiles = async () => {
  const response = await axios.post(
    url,
    { query },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.data.addedFiles;
};
