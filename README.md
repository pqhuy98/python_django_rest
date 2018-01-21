# python_django_rest

An ultra simple marketplace database for the course Database and Open Interface.  

This database contains 4 object types : user, group, item and comment.  
User and group are django's provided models.  
Item objects are item that are sold in the marketplace.  
Comment objects are comments made by a specific user about a specific item.  
  
See [tutorial/quickstart/models.py](https://github.com/pqhuy98/python_django_rest/blob/e1601124/tutorial/quickstart/models.py) for more details.  
  
Play with it : [API](https://pqhuy98.hopto.org/SilkRoad/api/) and [webpage](https://pqhuy98.hopto.org/SilkRoad/page/).

To run the database, you must provide database's info as system variables.
```
Linux :
MYSQL_DATABASE=??? \
MYSQL_USER=??? \
MYSQL_PASSWORD=??? \
MYSQL_HOST=??? \
HTTPS="false" \
python -B manage.py runserver 0.0.0.0:8000
```

Windows CMD :
```
set "MYSQL_DATABASE=???" && ^
set "MYSQL_USER=???" && ^
set "MYSQL_PASSWORD=???" && ^
set "MYSQL_HOST=???" && ^
set "HTTPS=false" && ^
python -B manage.py runserver 0.0.0.0:8001
```

Set `HTTPS` to `true` if you want to enable HTTPS (certificate required).