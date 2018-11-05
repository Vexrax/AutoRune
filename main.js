//const LCU = require("JavaScript/LCU");
const electron = require("electron");
const url = require("url");
const path = require("path");

const {app, BrowserWindow, Menu} = electron;

let mainWindow;


app.on('ready', function ()
{

    mainWindow = new BrowserWindow();

    mainWindow.setMaximumSize(1200, 800);
    mainWindow.setMinimumSize(1200, 800);
    //mainWindow.setResizable(false);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'HTML', 'mainWindow.html'),
        protocol: 'file:',
        slashes:true,
        frame: false,

    }));
    mainWindow.on('closed', function(){
        app.quit();
    });


    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});


const mainMenuTemplate = [];

if(process.env.NODE_ENV !== 'production')
{
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'

            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}






