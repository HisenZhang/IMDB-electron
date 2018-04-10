from flask import Flask, request, jsonify
from controller.db_ops import *
from controller.logic import *
from configure.conf import *
import requests


db = Database()
app = Flask(__name__,static_url_path='')

@app.route('/')
def index():
	return app.send_static_file('index.html')

@app.route('/help/')
def get_help():
	return jsonify(API_HELP)

@app.route('/video/')
def get_video():
	movie_id = request.args.get('movie_id').strip()
	result = get_video_arg_process(db,movie_id)
	result_json = create_result_json(result)
	print(result_json)
	return jsonify(result_json) if result_json else 'N/A'

@app.route('/download/')
def get_dl_addr():
	dl_url = request.args.get('dl_url')
	dl_link = fetch_dl_link(dl_url)
	return dl_link if dl_link else 'N/A'

if __name__ == '__main__':
	app.run(host=HOST,port=PORT,debug=DEBUG_MODE)
	
