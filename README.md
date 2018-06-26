# IMDB
This project is a model of MVC structure. 
The front-end is written with Javascript, which is easy to generate desktop version by using electron.
The back-end, suppoerted with Python Flask framework, provide the application with API. 
Three modules are used:
1. `api` for connection to the front-end
2. `logic` for abstract layer between api and database
3. `database` for operation with database

## API
### Overview
| API     | Method | Description                         |
| ------- | ------ | ----------------------------------- | 
| /       | [GET]  | Providing static page.               |
| /meta/  | [GET]  | Meta info such as root_url, etc.    |
| /video/ | [GET]  | The main API for movie information. |
|/download/| [GET]  | Fetch download link of the video. |
| /help/  | [GET]  | The help JSON for API.          |

### /video/
#### Method
`GET`
#### Parameter
`movie_id`

1. `movie_id`
    If the parameter is an integer, then the API will return a film with id the the integer. 

    Note that if the integer is `0`, then the API returns a random record. If the value is greater than total number of records in the database, API will return an error message.

    If the parameter is string, API will search the whole database and fetch the results based on text similarity. Multi keyword search is also supported, where the string contains several keywords joined by space. The logic between multi keywords are AND. 

    Returns a list of jsons.

    **Sample request**

    ```
    GET /video/?movie_id=0 HTTP/1.1" 200 -
    ```

    **Sample response**

    ```
    [
        {
            'img_link': '/roman_holiday.jpg', 
            'theme': 'Love', 
            'date': '2017-01-04', 
            'title': 'Roman Holiday', 
            'pg_link': '/video/roman_holiday.html', 'movie_id': 13520
        }
    ]
    ```

    **Fields**

    `img_link`: string, the link to preview image

    `theme`: string, the theme of the film

    `date`: date, since the last update

    `title`: string, title of the film

    `movie_id`: integer, unique id of the film

    `pg_link`: string, the link to film webpage

### /meta/
#### Method
`GET`
#### Parameter
`None`

1. `None`
    Send back client_newest_version

    **Sample request**

    ```
    GET /meta/ HTTP/1.1" 200 -
    ```

    **Sample response**

    ```
    {
    "client_newest_version": [0, 4, 1], 
    "root_url": "https://www.1304b.com"
    }
    ```

### /download/
#### Method
`GET`
#### Parameter
`dl_url`

1. `dl_url`
    This link points to the webpage which contains the movie. This API serves to extract the download link from the given link.

    **Sample request**

    ```
    GET /download/?dl_url=https://www.1304f.com/Html/112/13537.html HTTP/1.1" 200 -
    ```

    **Sample response**
    ```
    https://d1.xia12345.com/201608/13/1382016143.mp4
    ```
    



### /help/
#### Method
`GET`
#### Parameter
`None`

1. `None`
    Show the API's Help.

    **Sample request**
    ```
    GET /help/ HTTP/1.1" 200 -
    ```
    **Sample response**

    ```
    {
        "/download/": "[GET] Fetch video download link", 
        "/help/": "[GET] Show this help", 
        "/meta/": "[GET] Meta info", 
        "/video/": "[GET] Fetch video (by id / keywords)"
    }
    ```
