import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { setDocuments, setLoading, setError } from '../store/slices/documentSlice';
import { uploadDocument } from '../services/api';
import { FileUp, LogIn, UserPlus, FileText } from 'lucide-react';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      if (!isAuthenticated) {
        alert('Please log in to upload documents.');
        navigate('/login');
        return;
      }

      dispatch(setLoading(true));
      try {
        await uploadDocument(file);
        dispatch(setDocuments([])); // Clear documents to force a refresh
        setFile(null);
        navigate('/documents');
      } catch (err) {
        dispatch(setError('Failed to upload document'));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <FileText className="inline-block text-indigo-600 w-16 h-16 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Document Management App</h1>
          <p className="text-xl text-gray-600">Securely store and manage your important files</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-full w-full object-cover md:w-48" src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Documents" />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Get Started</div>
                <h2 className="block mt-1 text-lg leading-tight font-medium text-black">Upload Your First Document</h2>
                <p className="mt-2 text-gray-500">Start managing your documents by uploading your first file. It's quick, easy, and secure.</p>
                <div className="mt-4">
                  <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} />
                  <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <FileUp className="mr-2 -ml-1 h-5 w-5" />
                    Choose File
                  </label>
                  {file && <span className="ml-3 text-sm text-gray-500">{file.name}</span>}
                </div>
                <button 
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleUpload}
                  disabled={!file}
                >
                  <FileUp className="mr-2 -ml-1 h-5 w-5" />
                  Upload Document
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <LogIn className="mr-2 -ml-1 h-5 w-5" />
                  Login
                </Link>
                <Link to="/signup" className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <UserPlus className="mr-2 -ml-1 h-5 w-5" />
                  Sign Up
                </Link>
              </>
            ) : (
              <Link to="/documents" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                View My Documents
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;