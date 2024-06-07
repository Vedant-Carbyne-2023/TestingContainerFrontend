import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DropBox.module.css"; // Import the CSS module
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import {userId,role} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";
function DropBox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]); // Store the selected file
  }, []);

  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  const [documentName, setDocumentName] = useState('')
  const [documents, setDocuments] = useState([])

  const handleFetch = async () =>{
    let result = api.post('/listDocuments', {userId,role})
    result = await errorHandler(result)
    setDocuments(result.data.data)
    console.log(result)
  }


  const copyImageUrl = (imageUrl) => {
    // Copy the URL to the clipboard (browser API)
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        Swal.fire({
          title:'Image URL copied to clipboard',
          timer:500
        })
      })
      .catch((error) => {
        console.error('Error copying URL:', error);
      });
  };

  const handleUpload = async() => {
    // Handle the file upload logic here, e.g., send it to the backend
    console.log("Uploading file:", selectedFile);
    // Reset the selected file

    if(!documentName){
      Swal.fire({
        title:"Please Enter Document Name First",
        timer:2000
      })
      return;
    }
    const formData = new FormData();
        formData.append('file', selectedFile);
        
        formData.append('documentName', documentName);
        
        let result =  api.post('/dropbox', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
  }})
        result = await errorHandler(result)
        Swal.fire({
          title:result.data.message,
          timer:2000
        })
    clearSelectedFile();
  };

  const maxSize = 107748576;

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    accept: 'image/*,.pdf', // Accept specific file types
    minSize: 0,
    maxSize,
  });

  const isFileTooLarge = rejectedFiles && rejectedFiles.length > 0 && rejectedFiles[0].size > 1048576;

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className={`container text-center mt-5 ${styles.dropzone}`}>
            <div className="row"></div>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "active" : ""}`}>
              <input {...getInputProps()} />
              {!isDragActive && !selectedFile && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
            </div>
            {selectedFile && (
              <div className="mt-3">
                <p>Selected File: {selectedFile.name}</p>
              
                <div className="mb-4">
                <label>Name Of Document</label>
                <input required className="form-control" onChange={(e)=>setDocumentName(e.target.value)} type="text"/>
                </div>
                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
                <button className="btn btn-secondary ml-2" onClick={clearSelectedFile}>
                  Clear
                </button>
              </div>
            )}
            <ul className="list-group mt-2">
              {acceptedFiles.length > 0 &&
                acceptedFiles.map((acceptedFile) => (
                  <li className="list-group-item list-group-item-success" key={acceptedFile.path}>
                    {acceptedFile.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="container mt-5">
            <button className="btn btn-primary mb-3" onClick={()=>handleFetch()}>Click To Fetch Documents</button>
            {documents &&
              documents.map(document => (
                <div key={document.documentLink} className="mb-3">
                  <label>{document.documentName}</label>
                  <a href={document.documentLink} className="btn btn-secondary ml-2">Download Document</a>
                  <button className="btn ml-3" onClick={() => copyImageUrl(document.documentLink)}>
                    
                  <i class="fa-regular fa-paste"></i>
                  </button>

                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default DropBox;


      // const onDrop = async (acceptedFiles) => {
      //   const file = acceptedFiles[0];
      //   setUploadedFile(file);
      //   const formData = new FormData();
      //   formData.append('file', file);
      //   formData.append('userName', localStorage.getItem('user_Name'));
      //   formData.append('userId', localStorage.getItem('user_Id'));
        
      //   await api.post('/dropbox/file', formData).then((response) => {
      //     console.log('File uploaded to S3:', response.data);
      //     // Handle success (e.g., show a success message)
      //   }).catch((error) => {
      //     console.error('Error uploading file to S3:', error);
      //     // Handle error (e.g., show an error message)
      //   });
      //   };