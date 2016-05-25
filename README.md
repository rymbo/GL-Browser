# GLICER Browser

[![Build Status](https://travis-ci.org/emmanuelroecker/GL-Browser.svg?branch=master)](https://travis-ci.org/emmanuelroecker/GL-Browser)
[![Build status](https://ci.appveyor.com/api/projects/status/pi6uyjyf5dptrnwr/branch/master?svg=true)](https://ci.appveyor.com/project/emmanuelroecker/gl-browser/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/emmanuelroecker/GL-Browser/badge.svg?branch=master)](https://coveralls.io/github/emmanuelroecker/GL-Browser?branch=master)

## Features

### Password Manager & Autologin

![Autologin](https://raw.githubusercontent.com/emmanuelroecker/GL-Browser/article8/doc/autologin.gif)

### Customize the way a web page displays or behaves

Inject files component/customize/{name}/customize.css and component/customize/{name}/customize.js
in URL which matches with patterns configured in file component/customize/customize.yml.

![Tabs](https://raw.githubusercontent.com/emmanuelroecker/GL-Browser/article8/doc/tabs.gif)

### Requests blocker

Block all requests which match with URL patterns in component/block/block.yml.

### Favorites

![Favorites](https://raw.githubusercontent.com/emmanuelroecker/GL-Browser/article8/doc/favorites.gif)

## Architecture

![Architecture](https://raw.githubusercontent.com/emmanuelroecker/GL-Browser/article8/doc/scheme_en.png)

## Install & Start Browser

[node.js](https://nodejs.org/) must be installed.

```console
npm install
npm start
```
## License GPL-2.0

GNU General Public License v2.0  
Please see the LICENSE file distributed with this source code for further information regarding copyright and licensing.

## Contact

Authors : Emmanuel ROECKER & Rym BOUCHAGOUR

[Web Development Blog - http://dev.glicer.com](http://dev.glicer.com)
