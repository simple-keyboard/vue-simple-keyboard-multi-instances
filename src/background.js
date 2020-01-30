'use strict';
/* global __static */

import { app, protocol, BrowserWindow } from 'electron';
const isDevelopment = process.env.NODE_ENV !== 'production';

let appWin;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([ { scheme: 'app', privileges: { secure: true, standard: true } } ]);

function createAppWindow(devPath, prodPath) {
	// Create the browser window.
	appWin = new BrowserWindow({
		width: 1920,
		height: 1080,
		center: true,
		frame: isDevelopment,
		show: false,
		webPreferences: {
			webSecurity: false, // to work with local files
			nodeIntegration: true
		}
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		appWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
		if (!process.env.IS_TEST) appWin.webContents.openDevTools();
	} else {
		// Load the index.html when not in development
		appWin.loadURL(`app://./${prodPath}`);
	}
	appWin.once('ready-to-show', () => {
		appWin.show();
		appWin.setFullScreen(true);
	});
	appWin.once('show', () => {
		appWin.webContents.send('ready communicate');
	});
	appWin.on('closed', () => {
		appWin = null;
	});
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (appWin === null) {
		createAppWindow('', 'index.html');
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
	createAppWindow('', 'index.html');
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === 'win32') {
		process.on('message', (data) => {
			if (data === 'graceful-exit') {
				app.quit();
			}
		});
	} else {
		process.on('SIGTERM', () => {
			app.quit();
		});
	}
}
