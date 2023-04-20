import axios from 'axios';
const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMmU1ZTcyZC05OTIxLTQwYTctODQ2Ny05YzQyNjhjMjIwYzYiLCJlbWFpbCI6Im5odGRmb3J3b3JrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlYWI3NTRhYjlkYWNjYjkyZmRjZSIsInNjb3BlZEtleVNlY3JldCI6IjI1ZDE1ZDY0MGIyNGNkYzY1M2ZjMzFhOThmNWIzMWEyZmUxNmM0YzA1Mzg1MGJjNjIyZDY1MjQxYTNjNjZjZDkiLCJpYXQiOjE2Nzg4MTAxNDJ9.cRVnN0R5l-i1wPNK3z_f6zu2enMrQ5n4hkeWU4U72CI"
const JWT = `Bearer ${PINATA_JWT}`

const pinFileToIPFS = async (...filelist) => {
    const formData = new FormData();
    filelist.map((file,index)=>{
        formData.append('file',file);
    })

    const options = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: JWT
            }
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
export default pinFileToIPFS