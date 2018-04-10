from configure.conf import *
import sqlite3

class Database(object):
	def __init__(self, *args):
		super(Database, self).__init__(*args)
		self.conn,self.cursor = self.connect_db()

	def connect_db(self):
		try:
			conn = sqlite3.connect('./database/main.db')
			cursor = conn.cursor()
			print('Database connected.')
		except BaseException:
			print('Database connection failed.')
		return conn,cursor
		
	def select_by_id(self,movie_id):
		self.cursor.execute('''SELECT * FROM movie WHERE id = ?;''',(movie_id,))
		return self.cursor.fetchall()

	def select_by_kw(self,multi_kw_query):
		self.cursor.execute('''SELECT * FROM movie WHERE {};'''.format(multi_kw_query))
		return self.cursor.fetchall()	