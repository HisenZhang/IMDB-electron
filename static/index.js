var ROOT_DIR = 'https://www.1304f.com';
var HOST = 'http://127.0.0.1:9000';
var VIDEO_INFO_API = HOST + '/video/';
var DL_LINK_API = HOST + '/download/';

var rsp;
var dl;
var xhr = new XMLHttpRequest();
var video_id_list = new Array();


function append_list() {
    video_list = document.getElementById('video_list');
    for (var i = 0; i < rsp.length; i++) {
        if (video_id_list.includes(rsp[i].movie_id)) {
            continue
        } else {
            item = document.createElement('li');
            item.innerHTML += "<a id=\"" + rsp[i].movie_id + "\"onclick=\"fetch_by_id_content(" + rsp[i].movie_id + ")\">" + rsp[i].title + "</a>";
            video_list.appendChild(item);
            video_id_list.push(rsp[i].movie_id);
        }
    }
}

function xhr_handler() {
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                templating();
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
    xhr.onreadystatechange = function() {
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
    document.getElementById('dl_link').innerHTML = xhr.responseText
    window.open(xhr.responseText, 'Video', channelmode = 1);
}

function change_host() {
    HOST = document.getElementById('host').value;
}