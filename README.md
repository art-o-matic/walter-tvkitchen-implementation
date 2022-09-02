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
`yarn start:kafka`

wait a few moments

`yarn start`


# Info from /home/dschultz/README.md
## (on local machine in Austin)
TVKitchen location: /var/bin/walter

It is running in Supervisor (`supervisorctl`)

Kafka is running directly.
You can restart it by typing:

sudo systemctl start kafka

And check status by:

sudo journalctl -u kafka
