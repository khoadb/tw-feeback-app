# tw-feedback-app
Electron based desktop app for getting customers satisfaction feedback


To use Electron and node-hid (i.e for connecting to RFID desktop reader) there are some important conditions need to meet:
 
* Install Nodejs on Raspberry Pi
* Run Npm init (to initiate and create a package.json file)
* Define necessary package names in package.json, electron-prebuilt AND electron rebuild 
* Run npm install (to install the packages defined in package.json
* Run the electron rebuild script in ./node_modules/.bin/electron-rebuild (this is very important to make node-hid runs with electron and the nodejs version within electron.)
* Run the electron app with sudo, i.e sudo npm start (very important, otherwise the node-hid will not run correctly due to insufficient privilege.

Bower
- use bower install in app directory to install all packages defined in bower.json (navigate to the app directory where bowser.json is located. if bower is not installed then issue command: npm install bower, this will intall locally in node_module. to use bower, run ./node_modules/.bin/bower install.)
- issue command "npm run bower" (note: script must be defined in package.json)
 
Sqlite3 specific

- issue command "npm run rebuild" (note: script must be defined in package.json, i.e. electron-rebuild -f -w sqlite3) 
- verify if new binding has been created, i.e  ls -l node_modules/sqlite3/lib/binding/ (electron-v1.6-linux-arm
should exist)

Autostart in Raspberry Pi
 
Edit file ~/.config/lxsession/LSDE-pi/autostart
Add line @sh /home/pi/development/tw-feedback-app/tools/launcher.sh (note, the launcher.sh needs to be created and edited first.


Keyboard Emulator via retrogame by Adafruit

ref: https://github.com/adafruit/Adafruit-Retrogame

- Download the zip file and extract to a folder.
- An example file 'retrogame.cfg' is included in the 'configs' directory, copy this file to the /boot directory so retrogame can find it
- run the executeable file: sudo ./retrogame (this can be run in background &)


GPIO information & config

Ref: https://hackaday.io/project/2090/instructions





