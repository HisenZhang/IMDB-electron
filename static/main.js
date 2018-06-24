const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

console.log('main.js is running...')

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 950,
        minHeight: 600,
        // frame: false,
        // transparent: true
    });
    // win.setMenu(null);
    win.loadURL(`file://${__dirname}/index.html`);
    win.on("closed", function() {
        win = null;
    });

}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on("activate", function() {
    if (win === null) {
        createWindow();
    }
});