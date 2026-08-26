# Water Tracker

Track your daily water intake. The count is stored on the watch and resets at
the start of each new day.

## Features
- +1 / -1 glass buttons
- Reset day
- Configurable daily goal and glass size (Settings)
- Live total in ml

## Build & install
Requires Node ≥ 14 and the Zeus CLI (`npm i -g @zeppos/zeus-cli`).

```
npm install
zeus build
```

Sideload `dist/*.zab` via Developer Mode, or use `zeus dev` with a connected watch.

## Configuration
In the app's Settings page:
- **Daily goal** — number of glasses (default 8)
- **Glass size** — ml per glass (default 250)
