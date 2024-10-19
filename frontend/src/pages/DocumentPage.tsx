import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { setDocuments, setLoading, setError } from '../store/slices/documentSlice';
import { fetchDocuments, uploadDocument } from '../services/api';
import { FileUp, FileDown, LogOut, Home } from 'lucide-react';
import { clearToken } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const DocumentPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents, loading, error } = useSelector((state: RootState) => state.documents);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      dispatch(setLoading(true));
      try {
        const docs = await fetchDocuments();
        dispatch(setDocuments(docs));
      } catch (err) {
        dispatch(setError('Failed to fetch documents'));
      }
    };
    loadDocuments();
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      dispatch(setLoading(true));
      try {
        await uploadDocument(file);
        const updatedDocs = await fetchDocuments();
        dispatch(setDocuments(updatedDocs));
        setFile(null);
      } catch (err) {
        dispatch(setError('Failed to upload document'));
      }
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Documents</h2>
        <div>
          <Link to="/" className="btn btn-outline-primary me-2">
            <Home className="me-2" />
            Home
          </Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <LogOut className="me-2" />
            Logout
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input type="file" className="form-control" onChange={handleFileChange} />
        <button className="btn btn-primary mt-2" onClick={handleUpload} disabled={!file}>
          <FileUp className="me-2" />
          Upload Document
        </button>
      </div>
      <ul className="list-group">
        {documents.map((doc) => (
          <li key={doc.id} className="list-group-item d-flex justify-content-between align-items-center">
            {doc.name}
            <a href={`http://localhost:8000${doc.file}`} className="btn btn-outline-primary btn-sm" download>
              <FileDown className="me-1" />
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentPage;