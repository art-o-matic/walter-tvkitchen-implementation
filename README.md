# walter-tvkitchen-implementation
![lint](https://github.com/art-o-matic/walter-tvkitchen-implementation/actions/workflows/lint.yml/badge.svg)

A TV Kitchen implementation to support the walter project.

The implementation generates SRT files for specific programs aired on several stations, and uploads those SRT files to Dropbox.

## Installation

1. Install the following prerequisites:

- Node 14+
- `ffmpeg`
- `CCExtractor`
- `Docker`

2. Set up configuration:

```
$> cp config/dropbox.example.json config/dropbox.json
$> $EDITOR config/dropbox.json
$> cp config/sources.example.json config/sources.json
$> $EDITOR config/sources.json
```

## Running
OLD:  `yarn start:kafka` [ DEPRECATED ] 
OLD: wait a few moments  [ DEPRECATED ] 
OLD: `yarn start`  [ DEPRECATED ] 


# Info from /home/dschultz/README.md
## (on local machine in Austin)
TVKitchen location: /var/bin/walter

It is running in Supervisor (`supervisorctl`)

Kafka is running directly.
You can restart it by typing:

sudo systemctl start kafka

And check status by:

sudo journalctl -u kafka
--------------------------------------------------
# Ben's cheatsheet notes from July 21, 2023
--------------------------------------------------

systemctl runs zookeeper and kafka:

	sudo systemctl start kafka
	sudo systemctl stop kafka
 	sudo systemctl status kafka
 	sudo journalctl -u kafka
 	 (same for zookeeper)

supervisorctl runs tvkitchen:

	sudo supervisorctl start tvkitchen
	sudo supervisorctl stop tvkitchen
	sudo supervisorctl status tvkitchen
	sudo supervisorctl tail -f tvkitchen

To view log file: 
sudo vi /var/log/supervisor/tvkitchen-stdout---supervisor-ujwsomvt.log

----------------

To restart machine: 
When rbooting (sudo reboot), kafka and zookeeper will autostart, 
but TVKitchen then needs to be RESTARTED:
sudo supervisorctl restart tvkitchen

----------------

temoprrary notes:

Edited this file to add the -teletext option to the ccextractor call:
/var/bin/walter/walter-tvkitchen-implementation/node_modules/@tvkitchen/appliance-video-caption-extractor/lib/VideoCaptionExtractorAppliance.js

after this line:
      '-customtxt', '1100100', // start time, end time, use relative timestamp
added this line:
      '-teletext',

