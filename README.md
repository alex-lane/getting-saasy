# getting-saasy

Starter SAAS application with a Django REST API secured by JWT and a React
TypeScript frontend styled with Material UI. Features include:

* User registration and JWT-based login
* Password reset via email token
* User profile update

## Development

### Backend

```bash
cd backend
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend development server proxies API requests to the Django backend.
