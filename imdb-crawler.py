# -*- coding:utf-8 -*-
from bs4 import BeautifulSoup
from configure.conf import *
import requests
import sqlite3

def init_db():
	conn = sqlite3.connect('main.db')
	db_cursor = conn.cursor()
	db_cursor.execute('''CREATE TABLE IF NOT EXISTS movie
	       (id           INTEGER PRIMARY KEY   AUTOINCREMENT,
	       title         TEXT    NOT NULL,
	       theme         TEXT    ,
	       _date         TEXT    ,
	       img_link      TEXT    ,
	       pg_link       TEXT	   ,
	       dl_link       TEXT     );''')
	conn.commit()
	return conn,db_cursor

conn,db_cursor = init_db()

for k,v in directory.items():
	r = requests.get(url = '%s%sindex.html'%(ROOT_URL,v))
	bsOBJ = BeautifulSoup(r.content,'lxml')
	for pg_num in bsOBJ.find_all('strong'):
		pg_str = pg_num.get_text()
		total_pg_num = int(pg_str[pg_str.index('/')+1:])
	for i in range(1,total_pg_num+1):
		print(k+' - '+str(i)+' / '+pg_str[pg_str.index('/')+1:])
		if i > 1:
			r = requests.get(url = '%s%sindex-%d.html'%(ROOT_URL,v,i))
		bsOBJ = BeautifulSoup(r.content,'lxml')

		date = [date.get_text() for date in bsOBJ.find_all('span')[1:-1]]
		if k in DATE_EXCEPTION:
			date = [None]*len(date)
		else:
			for p in date:
				if p < LAST_UPDATE:
					continue
		title = [title.get_text() for title in bsOBJ.find_all('h3')]
		theme = k
		img_link = [img.attrs['src'] for img in bsOBJ.find_all('img')]
		pg_link = [pg.attrs['href'] for pg in bsOBJ.find_all('a')[2:-6]]
		dl_link = [None]*len(date)
		# print(len(date))
		# print(len(date))
		# print(len(theme))
		# print(len(img_link))
		# print(len(pg_link))
		# print(len(dl_link))

		for p in range(0,len(date)):
			try:
				db_interface = (title[p],theme,date[p],img_link[p],pg_link[p],dl_link[p])
				print(db_interface)
				db_cursor.execute("INSERT INTO movie VALUES ( null,?, ?, ?, ?, ?, ?);",db_interface)
			except IndexError:
				continue
		conn.commit()

db_cursor.close()
conn.close()
