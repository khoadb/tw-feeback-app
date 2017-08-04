# tw-feedback-app
Electron based desktop app for getting customers satisfaction feedback


To use Electron and node-hid (i.e for connecting to RFID desktop reader) there are some important conditions need to meet:
 
* Install Nodejs on Raspberry Pi
* Run Npm init (to initiate and create a package.json file)
* Define necessary package names in package.json, electron-prebuilt AND electron rebuild 
* Run npm install (to install the packages defined in package.json
* Run the electron rebuild script in ./node_modules/.bin/electron-rebuild (this is very important to make node-hid runs with electron and the nodejs version within electron.)
* Run the electron app with sudo, i.e sudo npm start (very important, otherwise the node-hid will not run correctly due to insufficient privilege.
* Note: make sure libusb is installed in order to compile the source(sudo apt install libusb-1.0-0 libusb-1.0-0-dev)

Bower
- use bower install in app directory to install all packages defined in bower.json (navigate to the app directory where bowser.json is located. if bower is not installed then issue command: npm install bower, this will intall locally in node_module. to use bower, run ./node_modules/.bin/bower install.)
- issue command "npm run bower" (note: script must be defined in package.json)
 
Sqlite3 specific

- issue command "npm run rebuild" (note: script must be defined in package.json, i.e. electron-rebuild -f -w sqlite3) 
- verify if new binding has been created, i.e  ls -l node_modules/sqlite3/lib/binding/ (electron-v1.6-linux-arm
should exist)
- verify that the directory named "db" exists, if not issue command "mkdir db", this directory contains the sqlite3 database file.

Autostart in Raspberry Pi
 
Edit file ~/.config/lxsession/LSDE-pi/autostart
Add line @sh /home/pi/development/tw-feedback-app/tools/launcher.sh (note, the launcher.sh needs to be created and edited first.


Keyboard Emulator via retrogame by Adafruit

ref: https://github.com/adafruit/Adafruit-Retrogame

- Download the zip file and extract to a folder.
- An example file 'retrogame.cfg' is included in the 'configs' directory, copy this file to the /boot directory so retrogame can find it
- run the executeable file: sudo ./retrogame (this can be run in background &)

!retrogame.cfg for tw-feedback-app

LEFT      25  # Joypad left
RIGHT      9  # Joypad right
UP        10  # Joypad up
DOWN      17  # Joypad down
ENTER     23  # 'Start' button


 we’ll then set up the system to launch this automatically in the background at startup.
- sudo nano /etc/rc.local

Before the final “exit 0” line, insert this line:
/home/pi/Adafruit-Retrogame/retrogame &


Autostart keyboard emulator in Pi:

- sudo nano /etc/rc.local
- Before the final “exit 0” line, insert this line: /home/pi/Adafruit-Retrogame/retrogame &


GPIO information & config

Ref: https://hackaday.io/project/2090/instructions


NO SCREENSAVER - Disabling the blank screen once 

Ref: http://www.geeks3d.com/hacklab/20160108/how-to-disable-the-blank-screen-on-raspberry-pi-raspbian/

If you want to disable the blank screen at every startup, just update the /etc/lightdm/lightdm.conf file and add in the [SeatDefaults] section the following command:

[SeatDefaults]
xserver-command=X -s 0 -dpms


SYNC SQLite DB file

(flow: run cronjob to export to CSV, run cronjob to sync files to remote host)

Ref: http://www.thegeekstuff.com/2011/07/rsync-over-ssh-without-password

Using rsync tool to sync the SQLite database to a remove server running rsync daemon,
this server will receive all database files from all feedback devices. NOTE: should add center_code as prefix to sqlite db file name, i.e. tw-feedback_tw014.db

- rsync command on feedback device: xxxx
- Edit crontab to set cronjob schedule, i.e. sync every hour.
- issue command crontab -e
- add a line i.e:  */3 * * * * rsync -azP /home/pi/development/db/ [path on remote host] 
- i.e: */3 * * * * rsync -azP -e ssh /home/pi/development/db/ root1@192.168.8.55:/home/root1/feedback-db

in case we want to export to CSV and sync it too:

- i.e: */3 * * * * sqlite3 -header -csv /home/pi/development/db/tw-feedback.db "select rowid, * from feedbacks;" > /home/pi/development/tw-feedback-app/db/feedback_tw014.csv





!BONUS! 

customizing splash screen in RaspBerry Pi 3:
(ref: https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=162652)

So it's simply a matter of putting a 'splash.png' file in the right place (/usr/share/plymouth/themes/pix/)






