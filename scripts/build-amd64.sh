#!/bin/bash
docker buildx build --platform linux/amd64 -t csust-planet-share -o type=docker,dest=./csust-planet-share-amd64.tar .
