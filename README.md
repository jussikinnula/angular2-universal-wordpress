# angular2-universal-wordpress

Starter for Angular 2 Universal + WordPress REST API use.

## Prequisities

The projects needs that you have the following things installed:

- [NodeJS](https://nodejs.org/) (version 6 or greater, tested with 6.9.1)
- [Heroku Toolbelt](https://toolbelt.heroku.com/) (latest)

All of the prequisities are available on Linux, Windows and Mac OS X systems with their own installers (just go to links above and download package).

### Installing prequisities on Mac OS X

You might wish to install the prequisities with Homebrew, so here're quick guide to do that.

#### Install Homebrew

You can install [Homebrew](http://brew.sh/) with this command:

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### NodeJS

You can install NodeJS simply by giving command:

```
brew install node
```

#### Node Version Manager (recommended)

If you wish to run multiple NodeJS versions you should install [NVM](https://github.com/creationix/nvm) (Node Version Manager) for managing multiple NodeJS versions.

NVM can be installed by the following command:

```
brew install nvm
```

Note! Follow the instructions after installing NVM, so that you'll get the shell extended (basically adding stuff to your `.bash_profile`).

Then you can just install and use specific NodeJS version like:

```
nvm install v6.9.1
nvm use v6.9.1
```

### Installing prequisities on Windows

You should install installer packages of [NodeJS](https://nodejs.org/en/download/current/) and [Heroku Toolbelt](https://toolbelt.heroku.com/windows), either 32bit or 64bit depending on your system.

#### Install some Node modules globally

Windows doesn't add everything to global path, so you might want to install some packages globally (`npm install -g <package>`):

```
npm install -g dotenv
npm install -g webpack
```

#### Other notes

On Windows installations, it will ease the task if you use PowerShell and add all the necessary paths to utilities to Windows environment path. To do so, you can right-click the *Start* -button, select *Advanced System Settings* and finally select *Environment Variables*. You need to restart the PowerShell (or possibly logout and login) to get the environment variables going.

## Installation

### Install node modules and type definitions

```
npm install
```

## Local development

### Production builds

If you want to make production build, you can do that locally with `npm run build:prod` (or just `npm run build`). A build is also done automatically when installing npm packages (`npm install`), to automate build process.

You can run a production server by giving command `npm run server:prod` (or just `npm run server` or `npm start`).

### Development builds

For development, WebPack can be started in *watch mode*, accompanied with *LiveReload* and *Nodemon* - the development process automatically respawns the server and reloads client assets on code changes.

You can run the development builds by giving command `npm run dev`, which first compiles a development build (`npm run build:dev`) and starts two concurrent tasks: *Nodemon* (`npm run server:dev`) and WebPack in watch mode (`npm run watch`).

You can use the separate tasks in two terminals if you want (e.g. first do `npm run dev` to make a fresh development build, then start WebPack in watch mode `npm run watch` and finally start development server `npm run server:dev`).

### Open local app in browser

[http://localhost:5000/](http://localhost:5000/)

## Configuration

- `WP_HOME=http://mywpserver.local:12345` URL to your WordPress installation, by default this is http://localhost:5001 (without any path or trailing slash `/`). Note that HTTPS URLs are preferred.
- `NODE_ENV=production` Node environment, either *production* or *development*

For local development, you can save the environment to `.env` -file on project root:

```
WP_HOME=https://some-wp-server-in.herokuapp.com
```

## Heroku

### Create a Heroku app first (if you don't have already one)

```
heroku create --region eu myuniversalapp
```

### Deploy

```
git push heroku master
```

### Open Heroku app in browser

```
heroku open
```

