# Library Management App
_Current version: v1.1_

This is a simple fullstack web app for library management, built using the MERN stack.

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#-prerequisites">Prerequisites</a></li>
        <li><a href="#-downloading">Downloading</a></li>
        <li><a href="#-installing-and-executing-dev">Installing and executing (dev)</a></li>
      </ul>
    </li>
    <li><a href="#-help">Help</a></li>
    <li><a href="#-authors">Authors</a></li>
    <li><a href="#-file-structure">File Structure</a></li>
    
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## 🔰 About the project

The system allows **Librarians** and **Members** to login to the web app (using accounts created by librarians)

Lbrarians can:
- Manage (CRUD)
  - Authors
  - Genres
  - Books
  - Borrowals
  - Users

Members can:
- View (R)
  - Authors
  - Genres
  - Books
  - Own borrowals
- Add (C)
  - Own borrowals
  
### Built with
<div style="display:inline-block">
<img alt="MongoDB"src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/databases/mongodb.svg" width="128"/>
<img alt="Node.js" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/frameworks/nodejs.svg" width="128"/>
<img alt="NPM" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/npm.svg" width="128"/>
<img alt="React" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/frameworks/react.svg" width="128"/>
<img alt="Git" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/git.svg" width="128"/>
<img alt="Github" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/cloud/github.svg" width="128"/>
<img alt="VS Code" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/text%20editors/vscode.svg" width="128"/>
<img alt="HTML" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/html.svg" width="128"/>
<img alt="CSS" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/css.svg" width="128"/>
<img alt="JS" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/programming%20languages/javascript.svg" width="128"/>

</div>

<!-- GETTING STARTED -->

## ⚡ Getting Started

### ❕ Prerequisites
You need a computing environment with an up to date version of Windows/Mac OS/Linux and a working internet connection

* Git
* Node.js
* NPM
* A web browser (Chrome/Edge recommended)

### 🔻 Downloading

* Clone the code repo using **HTTPS**, SSH or Github CLI
```
git clone https://github.com/Krishna8660/Library-Management-System.git
```

### 🚀 Installing and executing (dev)

### *You will need the .env file containing the environment variables in order to use the system, please contact the <a href="#-authors">authors</a>*

1. cd to project folder (LibraryManagement)
2. Run the following commands in terminal:
  - To install NPM packages
```
npm run install
```
  - To start both server and client applications
```
npm start
```

3. Use the following demo accounts to login
- Librarian
```
Email address: krishnapatil@gmail.com
Password: krishna17
```

- Member
```
Email address: sumitpatil@gmail.com
Password: sumit17
```

<!-- HELP -->

## ❓ Help

Contact authors if you need help or run into any issues

<!-- AUTHORS -->

## 👥 Authors

  - Krishna Patil

<!-- FILE STRUCTURE -->

###  📂 File Structure
```
.
├── client
│   ├── public
│   │   ├── assets
│   │   └── index.html
│   └── src
│       ├── hooks
│       ├── sections
│       │   ├── @dashboard
│       │   │   ├── app
│       │   │   ├── author
│       │   │   ├── book
│       │   │   ├── borrowal
│       │   │   ├── genre
│       │   │   └── user
|       │   └── auth
│       │       └── login
│       ├── utils
│       ├── App.jsx
│       ├── index.js
│       ├── constants.js
│       └── routes.js
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── index.js
│   └── passport-config.js
│
├── package.json
├── README.md
└── LICENSE.md
```
* Only the core files and directories are shown in the above tree

| No |       File Name      |             Details             |
|----|----------------------|---------------------------------|
| 1  | server/index.js      | Node.js server app entry point  |
| 2  | client/src/index.js  | Client react app entry point    |

