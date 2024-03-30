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

# EDIT THE PROGRAM SCHEDULE HERE (on local machine):
/var/bin/walter/walter-tvkitchen-implementation/config/sources.json 
(see below for sample schedule)

# EDIT THE DROPBOX CONFIG HERE (on local machine):
/var/bin/walter/walter-tvkitchen-implementation/config/dropbox.json 
```
{
  "accessToken": "y05SBA6JfykA_______redacted________jf2BNYfFnn",
  "transcriptsLocation": "/transcripts"
}
```

# Configure kafka logging
To prevent kafka from filling up the host's disk space with log files, edit this file:
```
/home/kafka/kafka/config/log4j.properties
```
so that it conforms to the example in this repo (in the kafka-config-sample/ directory)

# Info from /home/dschultz/README.md
## (on local machine in Austin)
TVKitchen location: /var/bin/walter

It is running in Supervisor (`supervisorctl`)

Kafka is running directly. You can restart it by typing:

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

If TVKitchen then needs to be RESTARTED:

	sudo supervisorctl restart tvkitchen

To view log file: 

	sudo vi /var/log/supervisor/tvkitchen-stdout---supervisor-ujwsomvt.log

----------------

# To restart machine: 

After restart (sudo reboot), kafka, zookeeper, and TVKitchen will autostart.

----------------

temoprrary notes:

Edited a local config file so that we could test the -teletype option for ccextractor. This is a temporary change that will be overwritten the next time we update tvkitchen. 

For the record, we edited this file:

	/var/bin/walter/walter-tvkitchen-implementation/node_modules/@tvkitchen/appliance-video-caption-extractor/lib/VideoCaptionExtractorAppliance.js

and after this line:
    
	'-customtxt', '1100100', // start time, end time, use relative timestamp
 
we added this line:

    '-teletext',


# SAMPLE SCHEDULE FILE (sources.json)
```
{
  "tunerDevices": [
    {
      "url": "http://10.157.173.252:5004",
      "tunerCount": 4
    }
  ],
  "stations": [
    {
      "name": "ABC",
      "channel": "24.1",
      "programs": [
        {
          "startMs": 32400000,
          "durationMs": 3600000,
          "schedule": ["Su"],
          "data": {
            "title": "This_Week"
          }
        },
        {
          "startMs": 63000000,
          "durationMs": 3600000,
          "schedule": ["M","T","W","Th","F"],
          "data": {
            "title": "ABC_World_News_Tonight"
          }
        }
      ]
    },
    {
      "name": "NBC",
      "channel": "36.1",
      "programs": [
        {
          "startMs": 32400000,
          "durationMs": 3600000,
          "schedule": ["Su"],
          "data": {
            "title": "Meet_the_Press"
          }
        },
        {
          "startMs": 63000000,
          "durationMs": 1800000,
          "schedule": ["M","T","W","Th","F"],
          "data": {
            "title": "NBC_Nightly_News"
          }
        }
      ]
    },
    {
      "name": "CBS",
      "channel": "42.1",
      "programs": [
        {
          "startMs": 34200000,
          "durationMs": 1800000,
          "schedule": ["Su"],
          "data": {
            "title": "Face_the_Nation"
          }
        },
        {
          "startMs": 63000000,
          "durationMs": 1800000,
          "schedule": ["S"],
          "data": {
            "title": "CBS_Weekend_News"
          }
        },
        {
          "startMs": 63000000,
          "durationMs": 1800000,
          "schedule": ["M","T","W","Th","F"],
          "data": {
            "title": "CBS_Evening_News"
          }
        }
      ]
    },
    {
      "name": "PBS",
      "channel": "18.1",
      "programs": [
        {
          "startMs": 61200000,
          "durationMs": 1800000,
          "schedule": ["M","T","W","Th","F"],
          "data": {
            "title": "BBC_World_News_Outside_Source"
          }
        },
        {
          "startMs": 63000000,
          "durationMs": 1800000,
          "schedule": ["M","T","W","Th","F"],
          "data": {
            "title": "BBC_World_News_America"
          }
        },
        {
          "startMs": 64800000,
          "durationMs": 3600000,
          "schedule": ["M","T","W","Th","F"],
          "data": {
            "title": "PBS_NewsHour"
          }
        },
        {
          "startMs": 68400000,
          "durationMs": 1800000,
          "schedule": ["F"],
          "data": {
            "title": "Washington_Week"
          }
        },
        {
          "startMs": 70200000,
          "durationMs": 1800000,
          "schedule": ["S","Su"],
          "data": {
            "title": "PBS_News_Weekend"
          }
        }
      ]
    }
  ]
}
```
