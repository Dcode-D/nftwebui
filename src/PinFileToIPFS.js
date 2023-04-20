import React, { useState } from 'react';
import pinataUploadFiles from './Utils/pinataUploadFile';

function UploadToPinata() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [pinataHash, setPinataHash] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handlePinToIpfsClick = async () => {
        setIsLoading(true);
        try {
            const response = await pinataUploadFiles(selectedFile);
            setPinataHash('Success! IPFS Hash: https://cloudflare-ipfs.com/ipfs/' + response.IpfsHash);
            setError(null);
        } catch (error) {
            setError(error.message);
            setPinataHash(null);
        }
        setIsLoading(false);
    };

    return (
        <div className='container my-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='form-group'>
                                <label htmlFor='inputFile'>Select a file to upload</label>
                                <input
                                    type='file'
                                    className='form-control-file'
                                    id='inputFile'
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button
                                className='btn btn-primary'
                                onClick={handlePinToIpfsClick}
                                disabled={isLoading || !selectedFile}
                            >
                                Pin to IPFS
                            </button>

                            {isLoading && <p>Loading...</p>}
                            {error && (
                                <div className='alert alert-danger mt-3' role='alert'>
                                    Error: {error}
                                </div>
                            )}
                            {pinataHash && (
                                <div className='alert alert-success mt-3' role='alert'>
                                    IPFS Hash: {pinataHash}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadToPinata;
