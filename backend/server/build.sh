# Adjust paths to point to backend/server
pip install --upgrade pip
pip install -r backend/server/requirements.txt
python backend/server/manage.py migrate --noinput
python backend/server/manage.py collectstatic --noinput
python backend/server/manage.py runserver 0.0.0.0:8000
