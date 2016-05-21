# Makefiles come from a time when most programs were compiled(turned into machine language) like C or iOS programs. The
# make utility exists on any unix system, including Macs, so its a portable way to run tasks on most developer and
# production systems.
#
# They've been making a bit of a comeback in web circles as more systems rely on smaller components each of which may
# be written in a different language (microservices). By wrapping the common tasks in a Make task, like make test, you
# can standardize how to bring up the system even if you don't know much about the language or without digging around in
# the code too much.
run:

cucumber:
# Use the local copy of cucumber to make sure there is no error from different versions on different machines
	@node_modules/.bin/cucumber.js

install:
# Install all of dependencies listed in the package.json file
	@npm install