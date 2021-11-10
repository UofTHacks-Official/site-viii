# UofTHacks VIII
The Official Site Repo for UofTHacks VIII

## Installation
Prequisite: npm

Clone the repository and change to the directory you cloned it into.

Checkout branch (e.g. "develop"): `git checkout develop`

Install required npm packages: `npm install`

Start the server (plain): `npm start`

Start the server (managed by pm2): `pm2 start npm --name "placeholder-site" --watch -- start`

Server runs on `localhost:$PORT` (3000 by default)
