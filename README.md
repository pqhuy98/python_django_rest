# python_django_rest

An ultra simple marketplace database for the course Database and Open Interface.  

This database contains 4 object types : user, group, item and comment.  
User and group are django's provided models.  
Item objects are item that are sold in the marketplace.  
Comment objects are comments made by a specific user about a specific item.  
  
See [models.py](https://github.com/pqhuy98/python_django_rest/blob/e1601124/tutorial/quickstart/models.py), [views.py](https://github.com/pqhuy98/python_django_rest/blob/e1601124/tutorial/quickstart/views.py) and [permissions.py](https://github.com/pqhuy98/python_django_rest/blob/e1601124/tutorial/quickstart/permissions.py) for more details.  
  
Play with it : [API](https://pqhuy98.hopto.org/SilkRoad/api/) and [webpage](https://pqhuy98.hopto.org/SilkRoad/page/).

To run the database, you must install package `corsheaders` and provide database's info as system variables.  

Package `corsheaders` : run `pip install django-cors-headers` (Python 2.x.x) or `pip install corsheaders` (python 3.x.x).  

Provide database's info as system variables (substitude `???`s with your credential) :  
Linux :  
```
export MYSQL_DATABASE=???
export MYSQL_USER=???
export MYSQL_PASSWORD=???
export MYSQL_HOST=???
export HTTPS="false"
python -B manage.py makemigrations
python -B manage.py migrate
python -B manage.py runserver 0.0.0.0:8000
```

Windows CMD :
```
set "MYSQL_DATABASE=???"
set "MYSQL_USER=???"
set "MYSQL_PASSWORD=???"
set "MYSQL_HOST=???"
set "HTTPS=false"
python -B manage.py makemigrations
python -B manage.py migrate
python -B manage.py runserver 0.0.0.0:8000
```

Set `HTTPS` to `true` if you want to enable HTTPS (certificate required).  
Then visit [localhost:8000/SilkRoad/api/](localhost:8000/SilkRoad/api/) to access the API.  

To build the GUI (React + Redux), go to `html/ui/`, run `npm install` then `npm start`.