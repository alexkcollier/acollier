#!/usr/bin/env bash

ffmpeg -i "$PWD/$1"  -b:v 0 -crf 30 -pass 1 -an -f webm /dev/null
ffmpeg -i "$PWD/$1" -b:v 0 -crf 30 -pass 2 "$PWD/$2"
