# angular2-universal-wordpress

Starter for Angular 2 Universal + WordPress REST API use.

## Prequisities

The projects needs that you have the following things installed:

- [Heroku Toolbelt](https://toolbelt.heroku.com/) (latest)
- [NodeJS](https://nodejs.org/) (version 6 or greater, tested with 6.9.1)

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

## Local development

If you have installed `dotenv`, you can automate reading of your `.env` file by adding `dotenv` on top of your command, like `dotenv npm run dev` (loads `.env` and then starts development).

### Basic tasks

- `npm install` = install dependencies
- `npm prune` = removes `npm` -packages not in `package.json`
- `npm run clean` = Clean `target` -directory

### Production builds

- `npm run build` = alias for `npm run build:prod`
- `npm run build:prod` = do production build
- `npm start` = alias for `npm run server`
- `npm run server` = alias for `npm run server:prod`
- `npm run server:prod` = runs production server

### Development builds

- `npm run dev` = alias for `npm run dev:frontend`
- `npm run dev:frontend` = *Frontend Development*: does cleanup (`npm run clean`), and then runs WebPack development server (`npm run clean`)
- `npm run dev:backend` = *Backend Development*: does cleanup (`npm run clean`), makes development build (`npm run build:dev`) and starts 
- `npm run build:dev` = make development build
- `npm run server:dev` = alias for `npm run server:dev:fullstack`
- `npm run server:dev:frontend` = WebPack development server with LiveReload (does not run backend at all)
- `npm run server:dev:backend` = Nodemon, reloads backend automatically.
- `npm run watch` = create continuous builds (for both frontend and backend, when code changes)

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

### Add buildpacks

```
heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nodejs
heroku buildpacks:add https://github.com/stomita/heroku-buildpack-phantomjs
```

### Deploy

```
git push heroku master
```

### Open Heroku app in browser

```
heroku open
```

## WordPress

You could start your WordPress installation by grabbing [angular2-universal-wordpress-wp-test](https://github.com/jussikinnula/angular2-universal-wordpress-wp-test) (forked from [bedrock-on-heroku](https://github.com/frc/bedrock-on-heroku)).

### Dependencies

The WordPress setup has been tested with the following dependencies:

- [WordPress](https://wordpress.org/) (version 4.7.0 or later, tested with version 4.7.2)
- [WP API Menus](https://wordpress.org/plugins/wp-api-menus/) (tested with 1.3.1)
- [WP API REST filter](https://github.com/WP-API/rest-filter) (tested with version 0.1)
- Optional: [ACF](https://www.advancedcustomfields.com/) (tested with 4.4.2)
- Optional: [ACF PRO](https://www.advancedcustomfields.com/pro/) (tested with 5.4.1)
- Optional: [ACF to REST API](https://wordpress.org/plugins/acf-to-rest-api/) (tested with 2.2.1)

### Composer

You can add the dependencies to the `composer.json` file (remember to `composer update` after adding).

These packages are already added to [angular2-universal-wordpress-wp-test](https://github.com/jussikinnula/angular2-universal-wordpress-wp-test) starter, but if you wish to extend existing site you could copy & paste the following to your *composer.json*.

```
  ...
  "require": {
    ...
    "wpackagist-plugin/wp-api-menus": "~1.3.1",
    "jussikinnula/wp-rest-filter": "0.1",
    "ycms/advanced-custom-fields": "dev-master",
    "wpackagist-plugin/acf-to-rest-api": "~2.2.1"
  },
  ...
```

Note! If you wish to use ACF PRO, you need to purchase it! For simple website/blog use the non-Pro version should satisfy just fine.

### Setup

Setup WordPress regularly (instructions can be read from [angular2-universal-wordpress-wp-test](https://github.com/jussikinnula/angular2-universal-wordpress-wp-test)). Remember to set permalink settings (under "Settings" / "Permalinks") to "Post name" (http://localhost:5001/sample-post/), otherwise WP-API won't work.

Enable the plugins you need, but remember that this repository depends on having *WP API Menus* and *WP API REST filter* plugins. The latter one is just increasing the speed greatly, as otherwise slug finding is too heavy operation for larger site (e.g. download all pages JSON, to resolve slug).

Note! Custom WP-API end points would help on creating end points which support slugs for post finding, and even parsing some of the content on the WP server side.

## Local Development

Start two terminals, and do the following...

### Launch Angular 2 app

```
cd ~/Devel/angular2-universal-wordpress
npm install # this is only needed the first time
npm run dev
```

If you wish to test server side rendering locally you can also run `npm run dev:backend`.

You can launch http://localhost:5000 to see the app in action. When code changes, `npm run dev` mode automatically reloads the page using LiveReload.

### Launch local WP

```
cd ~/Devel/angular2-universal-wordpress-wp-test
composer install # this is only needed the first time
PORT=5001 heroku local
```

First time do regular WP installation at http://localhost:5001, later just log-in at http://localhost:5001/wp/wp-login.php.