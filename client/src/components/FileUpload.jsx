import React, { useState } from 'react'

const FileUpload = () => {

    const [file, setFile] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
    };

  return (
    <div className='text-3xl w-[50%] mx-auto flex justify-center h-[500px] items-center'>
        <form onSubmit={handleUpload}>
            {file ? <img src={URL.createObjectURL(file)} className='h-[200px]' alt={file.name} /> : 'No file uploaded'}
            <input type="file" name="file" id="file" onChange={(e) => {setFile(e.target.files[0])
                console.log(e.target.files[0])
            }}/>
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Submit</button>
        </form>
    </div>
  )
}

export default FileUpload