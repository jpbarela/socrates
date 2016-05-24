# Makefiles come from a time when most programs were compiled(turned into machine language) like C or iOS programs. The
# make utility exists on any unix system, including Macs, so its a portable way to run tasks on most developer and
# production systems.
#
# They've been making a bit of a comeback in web circles as more systems rely on smaller components each of which may
# be written in a different language (microservices). By wrapping the common tasks in a Make task, like make test, you
# can standardize how to bring up the system even if you don't know much about the language or without digging around in
# the code too much.
run:
	@node server.js

cucumber:
# Start a copy of the server then run the ruby cucumber tests on port 5000 not to interfere with a dev machine
	@PORT=5000 node server.js &
# Run the ruby cucumber program
	-cucumber
	test.sh

dev:
# nodemon automatically restarts the server as you make changes to code.
	@node_modules/.bin/nodemon server.js

install:
# Install all of dependencies listed in the package.json file
	@npm install

jest:
# Use jest for
	@node_modules/.bin/jest