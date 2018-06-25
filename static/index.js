var ROOT_DIR = 'https://www.1304f.com';
var HOST = 'http://0.0.0.0:9000';
var VIDEO_INFO_API = HOST + '/video/';
var DL_LINK_API = HOST + '/download/';
var client_version = [0, 4, 1];
var client_newest_version;

var rsp;
var dl;
var xhr = new XMLHttpRequest();
var video_id_list = new Array();
var video_list_len = 0;


function append_list() {
    video_list = document.getElementById('video_list');
    for (var i = 0; i < rsp.length; i++) {
        if (video_id_list.includes(rsp[i].movie_id)) {
            continue
        } else {
            item = document.createElement('li');
            item.innerHTML += "<a id=\"" + rsp[i].movie_id + "\"onclick=\"fetch_by_id_content(" + rsp[i].movie_id + ")\">" + rsp[i].title + "</a>";
            video_list.appendChild(item);
            video_list_len += 1;
            video_id_list.push(rsp[i].movie_id);
        }
    }
    show_video_list_len();
}

function xhr_handler(need_templating, need_errorhandler) {
    if (need_templating === undefined) {
        need_templating = true;
    }
    if (need_errorhandler === undefined) {
        need_errorhandler = true;
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                if (need_templating) {
                    templating();
                }
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    if (need_errorhandler) {
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
            alert('Failed to connect to the specified host.');
        }
    }
    xhr.send(null);
}

function templating() {
    rsp = JSON.parse(xhr.response);
    document.getElementById('title').innerHTML = rsp[0].title;
    document.getElementById('theme').innerHTML = 'Theme: ' + rsp[0].theme;
    document.getElementById('date').innerHTML = 'Update: ' + rsp[0].date;
    document.getElementById('movie_id').innerHTML = 'Video ID: ' + rsp[0].movie_id;
    document.getElementById('image').src = rsp[0].img_link;
    document.getElementById('dl_link').innerHTML = 'Click on image and get download link.'

    append_list();
}

function fetch_meta() {
    xhr.open("GET", HOST + '/meta/', false);
    xhr_handler(false);
    rsp = JSON.parse(xhr.responseText);
    client_newest_version = rsp.client_newest_version;
    ROOT_DIR = rsp.root_url;
}

function fetch_random_content() {
    xhr.open("GET", VIDEO_INFO_API + '?movie_id=0', true);
    xhr_handler();
}


function fetch_by_input_content() {
    movie_id = document.getElementById('movie_id_input').value
    if (movie_id != '') {
        xhr.open("GET", VIDEO_INFO_API + '?movie_id=' + movie_id, true);
        xhr_handler();
    }
}


function fetch_by_id_content(list_id) {
    xhr.open("GET", VIDEO_INFO_API + '?movie_id=' + list_id, true);
    xhr_handler();
}

function get_dl_link() {
    xhr.open("GET", DL_LINK_API + '?dl_url=' + ROOT_DIR + rsp[0].pg_link, false);
    xhr_handler(false);
    document.getElementById('dl_link').innerHTML = xhr.responseText;
    alert(xhr.responseText);
    // window.open(xhr.responseText, 'Video', channelmode = 1);
}

function change_host() {
    HOST = document.getElementById('host').value;
    VIDEO_INFO_API = HOST + '/video/';
    DL_LINK_API = HOST + '/download/';
    fetch_meta();
}

function show_video_list_len() {
    document.getElementById("video_list_len").innerHTML = video_list_len;
}