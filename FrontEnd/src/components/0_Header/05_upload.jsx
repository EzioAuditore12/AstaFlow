import React from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

function Upload() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      toast.error('Please login to upload videos');
    }
  };

  return (
    <div 
      onClick={handleUploadClick} 
      className="cursor-pointer hover:text-blue-500 transition-colors"
    >
      <FiUploadCloud className='h-[30px] w-[30px]'/>
    </div>
  )
}

export default Upload;
