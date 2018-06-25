# flask
# HOST = '127.0.0.1'
HOST = '0.0.0.0'
PORT = 9000
DEBUG_MODE = 0
API_HELP = {
	'/help/':u'[GET] Show this help',
	'/meta/':u'[GET] Meta info',
	'/video/':u'[GET] Fetch video (by id / keywords)',
	'/download/':u'[GET] Fetch video download link',
}

# meta
ROOT_URL = 'https://www.1304b.com'
CLIENT_NEWEST_VERSION = (0,4,1)
META = {
    'client_newest_version': CLIENT_NEWEST_VERSION,
	'root_url':ROOT_URL
}

# database
ALL_RECORD_NUM = 16587
LAST_UPDATE = '2018-04-07'

# crawler
DATE_EXCEPTION = ['苍井空','宇都宮紫苑','泷泽萝拉']
directory = {
	'国产精品':'/Html/60/',
	'亚洲无码':'/Html/110/',
	'欧美性爱':'/Html/62/',
	'VR虚拟现实':'/Html/86/',
	'成人动漫':'/Html/101/',
	#'自拍图片':'/Html/63/',
	'自拍偷拍':'/Html/89/',
	'夫妻同房':'/Html/87/',
	'开放90后':'/Html/93/',
	'换妻游戏':'/Html/90/',
	'网红主播':'/Html/91/',
	'手机小视频':'/Html/88/',
	'明星艳照门':'/Html/92/',
	'经典三级':'/Html/109/',
	'S级女优':'/Html/100/',
	'波多野结衣':'/Html/94/',
	'吉泽明步':'/Html/95/',
	'苍井空':'/Html/96/',
	'宇都宮紫苑':'/Html/128/',
	'天海翼':'/Html/98/',
	'水菜麗':'/Html/127/',
	'泷泽萝拉':'/Html/123/',
	'无码在线':'/Html/110/',
	'熟女人妻':'/Html/111/',
	'美颜巨乳':'/Html/112/',
	'颜射吃精':'/Html/113/',
	'丝袜制服':'/Html/114/',
	'高清无码':'/Html/130/',
	'中字有码':'/Html/131/'
}
