#!/bin/sh
cd /home/seaking
nohup /usr/local/bin/redis-server /etc/redis/redis.conf > /dev/null 2>&1 &