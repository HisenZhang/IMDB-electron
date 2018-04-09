const ROOT_DIR = 'https://www.1304f.com';
const VIDEO_INFO_API = 'http://192.168.2.170:9000/video/';
const DL_LINK_API = 'http://192.168.2.170:9000/download/';

var rsp;
var xhr;
var dl;

function append_list() {
    for (var i = 0; i < rsp.length; i++) {
        item = document.createElement('li');
        item.innerHTML = "<a id=\"" + rsp[i].movie_id + "\"onclick=\"fetch_by_id_content(" + rsp[i].movie_id + ")\">" + rsp[i].title + "</a>";
        video_list = document.getElementById('video_list');
        video_list.appendChild(item);
    }
}

function xhr_handler() {
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function(e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
}

function templating() {
    rsp = eval(xhr.response);
    document.getElementById('title').innerHTML = rsp[0].title;
    document.getElementById('theme').innerHTML = 'Theme: ' + rsp[0].theme;
    document.getElementById('date').innerHTML = 'Update: ' + rsp[0].date;
    document.getElementById('movie_id').innerHTML = 'Video ID: ' + rsp[0].movie_id;
    document.getElementById('image').src = rsp[0].img_link;
    document.getElementById('dl_link').innerHTML = 'Click on image and get download link.'

    append_list();
}

function fetch_random_content() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", VIDEO_INFO_API + '?movie_id=0', false);
    xhr_handler();
    templating();
}


function fetch_by_input_content() {
    movie_id = document.getElementById('movie_id_input').value
    xhr = new XMLHttpRequest();
    xhr.open("GET", VIDEO_INFO_API + '?movie_id=' + movie_id, false);
    xhr_handler();
    templating();
}


function fetch_by_id_content(list_id) {
    xhr = new XMLHttpRequest();
    xhr.open("GET", VIDEO_INFO_API + '?movie_id=' + list_id, false);
    xhr_handler();
    templating();
}

function get_dl_link() {
    xhr = new XMLHttpRequest();
    xhr.open("GET", DL_LINK_API + '?dl_url=' + ROOT_DIR + rsp[0].pg_link, false);
    xhr_handler();
    document.getElementById('dl_link').innerHTML = xhr.responseText
    window.open(xhr.responseText, 'Video', channelmode = 1);
}