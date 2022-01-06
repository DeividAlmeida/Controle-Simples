const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
var fs = require('fs');
const adapter = new FileSync('banco.json')
const db = low(adapter)

db.defaults({ modulos: [], atual: [], atualizacao: [] }).write()  

ipcMain.on('synchronous-message', (event, arg) => {
    eval(arg)
    event.returnValue = JSON.parse(fs.readFileSync('banco.json', 'utf8'));
}) 


function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
})


  win.loadFile('index.html')
 
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => { 
    
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

