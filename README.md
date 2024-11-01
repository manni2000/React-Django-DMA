# Document Management Application

This repository hosts a Document Management Application (DMA) built with a React frontend and a Django backend. The application enables users to securely store, manage, and retrieve documents, with options for authentication and document upload/download functionality.

#### Functionality:
- **User Authentication**: Users can sign up, log in, and log out. JWT-based authentication is implemented on the backend to manage secure access to protected resources.
- **Document Management**: 
  - **Upload Documents**: Authenticated users can upload documents (e.g., PDFs, images) to the server.
  - **List Documents**: Users can view a list of their uploaded documents.
  - **Download Documents**: Users can download stored documents to their local system.
- **Role-Based Access**: The system ensures that only authenticated users can upload or access documents.
  
#### Technologies Used:

**Frontend** (React):
- **React**: For building the UI, managing the component structure, and handling state.
- **Redux**: Manages global state (auth and document management) across the application.
- **React Router**: Handles navigation between different views (login, signup, document list).
- **Axios**: For making API requests to the Django backend.
- **CSS/Bootstrap**: For styling components and ensuring a responsive, user-friendly UI.
- **Lucide Icons**: Provides icons for better visual representation (e.g., upload, download icons).

**Backend** (Django):
- **Django REST Framework (DRF)**: Implements API endpoints for handling user authentication and document CRUD operations.
- **SimpleJWT**: Provides JWT-based authentication for secure access to API resources.
- **SQLite**: The database used to store user information and document metadata.
- **File Handling**: Handles document uploads, stores them in the `media` directory, and manages download requests.

This repository demonstrates a full-stack application that combines React’s rich frontend capabilities with Django’s robust backend API services for a comprehensive document management system.
