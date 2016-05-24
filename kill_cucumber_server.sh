#!/bin/sh

kill $(lsof -i :5000 | awk 'NR>1 {print $2}')