from configure.conf import *
from bs4 import BeautifulSoup
import requests, random

def get_random_id():
	return random.randint(0,ALL_RECORD_NUM+1)

def get_video_arg_process(db,movie_id):
	try:
		movie_id = int(movie_id)
		if movie_id == 0:
			movie_id = get_random_id()
		if movie_id > ALL_RECORD_NUM:
			result = [None,'Video #{} not found'.format(movie_id),None,None,None,None]
		return db.select_by_id(movie_id)
	except ValueError:
		multi_kw_query = create_multi_kw_query(movie_id)
		return db.select_by_kw(multi_kw_query)
		
def create_result_json(result):
	result_json = []
	for i in range(0,len(result)):
		result_json += [{
			'movie_id':result[i][0],
			'title':result[i][1],
			'theme':result[i][2],
			'date':result[i][3],
			'img_link':result[i][4],
			'pg_link':result[i][5]
		}]
	return result_json

def fetch_dl_link(dl_url):
	r = requests.get(url=dl_url)
	bsOBJ = BeautifulSoup(r.content,'lxml')
	dl_link = bsOBJ.find_all("font")[1].get_text()
	return dl_link

def create_multi_kw_query(kw):
	kw_list = kw.split(' ')
	sql_query = list(map(lambda x: 'title LIKE \'%{}%\''.format(x),kw_list))
	return ' AND '.join(sql_query)