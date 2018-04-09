# IMDB
This project is a model of MVC structure. 
The front-end is written with Javascript, which is easy to generate desktop version by using electron.
The back-end, suppoerted with Python Flask framework, provide the application with API. 
Three modules are used:
1. `api` for connection to the front-end
2. `logic` for abstract layer between api and database
3. `database` for operation with database

## API
| API     | Method | Description                         | Usage                                    |
| ------- | ------ | ----------------------------------- | ---------------------------------------- |
| /       | [GET]  | Providing static page               | View from browser                        |
| /video/ | [GET]  | The main API for movie information. | 1. By ID:`?movie_id=<int>` <br> 2. By Keyword:`?movie_id=<str>` |
| /help/  | [GET]  | The help JSON for IMDB API          | [GET]                                    |
