import { app, BrowserWindow, Menu } from 'electron';
const url = require("url");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== 'production';

// global reference to mainWindow
// (necessary to prevent window from being garbage collected)
let mainWindow: BrowserWindow | null = null;

function createMainWindow(): BrowserWindow {
    const window = new BrowserWindow();
    window.setAutoHideMenuBar(true);
    window.setTitle("AutoRune");
    window.setMinimumSize(1200, 600);
    if (isDevelopment) {
        window.webContents.openDevTools({mode: 'undocked'});
        window.loadURL(
            `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
    } else {
        window.loadURL(url.format({
            pathname: path.join(__dirname, 'HTML/index.html'),
            protocol: 'file',
            slashes: true,
        }));
    }

    window.on('closed', () => {
        mainWindow = null;
    });



    window.webContents.on('devtools-opened', () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    return window;
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
     app.quit();
});

app.on('activate', () => {
    // On macOS it is common to re-create a window even after all windows have
    // been closed.
    if (mainWindow === null) {
        mainWindow = createMainWindow();
    }
});

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    mainWindow = createMainWindow();
    const mainMenuTemplate: Electron.MenuItemConstructorOptions[] = [];
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

