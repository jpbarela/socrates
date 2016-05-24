#!/bin/sh

# Find the process running on port 5000 and kill it
kill $(lsof -i :5000 | awk 'NR>1 {print $2}')