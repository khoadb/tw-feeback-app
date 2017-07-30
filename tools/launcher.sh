#!/bin/sh
# launcher.sh
# navigate to home directory, then to this directory, then execute python script, then back home


cd /
#cd /home/pi/development/tw-feedback-app
#sudo npm start &

#copy retrogame script to a directory etc. /etc/ or /home/pi/tw-feedback-app
#run retrogame keyboard emulator in backround as daemon
#sudo /etc/adafruit/retrogame &

#CD to app directory, otherwise the sqlite3 DB file will not be found and loaded
cd /home/pi/development/tw-feedback-app
sudo /home/pi/development/tw-feedback-app/node_modules/.bin/electron /home/pi/development/tw-feedback-app/main.js
#cd /
