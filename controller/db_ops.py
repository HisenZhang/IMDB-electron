from configure.conf import *
import sqlite3

def db_connect():
    print('Database connected.')
    return sqlite3.connect('./database/main.db')
	
def db_select_by_id(c,movie_id = 0):
	if movie_id == 0:
		c.execute('''SELECT * FROM movies;''')
	else:
		c.execute('''SELECT * FROM movie WHERE id = ?;''',(movie_id,))
	return c.fetchall()

# def db_select_by_kw(c,kw=''):
# 	if kw == '':
# 		c.execute('''SELECT * FROM movie LIMIT 10;''')
# 	else:
# 		c.execute('''SELECT * FROM movie where title like \'%{}%\';'''.format(kw))
# 	return c.fetchall()	