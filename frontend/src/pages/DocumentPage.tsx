import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';
import { RootState } from '../store';
import {
  setDocuments,
  setLoading,
  setError,
} from '../store/slices/documentSlice';
import { fetchDocuments, uploadDocument } from '../services/api';
import { FileUp, FileDown, LogOut, Home } from 'lucide-react';
import { clearToken } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const DocumentPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents, loading, error } = useSelector(
    (state: RootState) => state.documents
  );
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      dispatch(setLoading(true));
      try {
        const docs = await fetchDocuments();
        console.log(docs);  // Log to check the `file` path
        dispatch(setDocuments(docs));
      } catch (err: any) {
        dispatch(setError(err.message));
        if (err.message === 'Please login to view documents') {
          navigate('/login');
        }
      }
    };
    loadDocuments();
  }, [dispatch, navigate]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      dispatch(setLoading(true));
      setUploadError(null);
      try {
        await uploadDocument(file);
        const updatedDocs = await fetchDocuments();
        dispatch(setDocuments(updatedDocs));
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      } catch (err: any) {
        setUploadError(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading && !documents.length) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Upload New Document</h5>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={!file || loading}
          >
            <FileUp className="me-2" />
            {loading ? 'Uploading...' : 'Upload Document'}
          </button>
          {uploadError && (
            <div className="alert alert-danger mt-3">{uploadError}</div>
          )}
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {documents.length === 0 && !loading && !error ? (
        <div className="alert alert-info">
          No documents found. Upload your first document above!
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-3">Your Documents</h5>
            <ul className="list-group">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{doc.name}</span>
                  <a
                    href={doc.file.startsWith('http') ? doc.file : `${API_URL}${doc.file}`}
                    className="btn btn-outline-primary btn-sm"
                    download
                  >
                    <FileDown className="me-1" />
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;