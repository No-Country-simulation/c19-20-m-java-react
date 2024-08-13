#!/bin/bash
JENKINS_NODE_COOKIE=dontKillMe nohup java -jar ./target/admin-server.jar > /dev/null 2>&1 &
