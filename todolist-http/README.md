# <img src="https://raw.githubusercontent.com/bfortunato/aj-framework/master/doc/images/aj.png" height="100" align="middle" /> Framework

## Todo List - HTTP
Todo List sample with REST services.
Server is build with nodejs + expressjs

## Prerequisites
Web application uses bower for dependency management and ReactJS for the UI, so bower and babel are required.

```bash
sudo npm install -g bower
sudo npm install -g babel-cli
```

## Running sample
1. Download sample from GitHub
     ```bash
     $ git clone https://github.com/bfortunato/aj-framework-todolist.git
     # output...
     ```
     
2. Build aj project files
     ```bash
     $ cd todolist-http
     $ aj build
     # output...
     ```
     
3. Update server node modules
     ```bash
     $ cd server
     $ npm update
     # output...
     ```
     
4. Update bower modules
     ```bash
     $ cd ../platforms/web
     $ bower update
     # output...
     ```
     
5. Build React scripts
     ```bash
     $ npm update
     $ babel --presets react,es2015 assets/js/src/ --out-dir assets/js/build
     # output...
     ```
     
6. Run server
     ```bash
     $ cd ../../server
     $ node server.js
     # Todo List app server listening at http://:::8000
     ```
     
     
To run on Android, open project located on todolist-http/platforms/android

To run on iOS, open project located on todolist-http/platforms/ios

To run on web browsers, navigate to http://yourip:8000/index.html
