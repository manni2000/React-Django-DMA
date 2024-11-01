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

**Back-End (Django):**
- **Serializers**: Validates and sanitizes input data.
- **Models**: Defines structures for user data and document paths.
- **Class-Based Views (CBVs)**: Simplifies endpoint creation.
- **Django REST Framework**: Facilitates API development.
- **JWT Authentication**: Secures routes using Django Simple JWT.
- **Document Listing**: Provides a CBV endpoint for document retrieval.
- **File Storage**: Manages documents within the Django project directory.

This repository combines React for a responsive front-end with Django REST API on the backend, integrating JWT authentication and file handling for document management.

To set up the **React-Django Document Management Application** locally, follow these steps:

### Prerequisites
- **Python 3.8+**
- **Node.js** (Latest LTS version recommended)
- **npm** or **yarn**
- **Git** (to clone the repository)

### 1. Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/manni2000/React-Django-DMA.git
cd React-Django-DMA
```

### 2. Backend Setup (Django)

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Create and Activate a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Create a Superuser (Optional)**:
   Create a superuser account to access the Django admin dashboard.
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the Django Development Server**:
   ```bash
   python manage.py runserver
   ```
   The backend server will start on `http://127.0.0.1:8000`.

### 3. Frontend Setup (React)

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install JavaScript Dependencies**:
   Using `npm`:
   ```bash
   npm install
   ```
   Or using `yarn`:
   ```bash
   yarn install
   ```

3. **Set the API Base URL**:
   In the `src/config.ts` file, ensure the `API_URL` is set to your backend URL (usually `http://localhost:8000`):
   ```javascript
   export const API_URL = 'http://localhost:8000';
   ```

4. **Run the React Development Server**:
   ```bash
   npm start
   ```
   Or with `yarn`:
   ```bash
   yarn start
   ```
   The frontend server will start on `http://localhost:3000`.

### 4. Testing the Setup

- **Access the Backend API**:
  Visit `http://127.0.0.1:8000/api/` in your browser to see the Django API endpoints.

- **Access the Frontend Application**:
  Open `http://localhost:3000` in your browser to access the React frontend interface.

This setup should now allow you to use the **Document Management Application** locally.

This repository demonstrates a full-stack application that combines React’s rich frontend capabilities with Django’s robust backend API services for a comprehensive document management system.
