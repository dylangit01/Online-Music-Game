# DROP THE BEAT

DROP THE BEAT is a simple but competitive live multiplayer “name that song” game. Two players can join host's chat room and guess the songs' title simultaneously.

Deployed version: https://drop-the-beat.netlify.app/

![Home page](https://github.com/dylangit01/DROP-THE-BEAT/blob/main/client/gifs/home-page.gif?raw=true "Optional title")
![Select playlist](https://github.com/dylangit01/DROP-THE-BEAT/blob/main/client/gifs/select-playlist.gif?raw=true "Optional title")
![Invite players](https://github.com/dylangit01/DROP-THE-BEAT/blob/main/client/gifs/invite-players.gif?raw=true "Optional title")
![Play game]![image](https://github.com/dylangit01/DROP-THE-BEAT/blob/main/client/gifs/play-game.gif?raw=true "Optional title")

# Features
Host can:
- select a playlist; 
- invite players to guess the songs in that playlist just by listening to a short clip of the tunes;
- control the gameflow by clicking "next song" at any moment;
- cheer up players or give them hints in the live chat.

Players can:
- change their name upon arrival;
- compete with other players by typing the correct song title (case  insensitive) in the live chat;
- get a score for the correct answer and see it live updated on the top of the chat board.

The song album cover reveals as soon as it's guessed or when the time runs out (30 seconds default). 
When the playlist runs out of songs, the result page reveals and congratulates the winner.

# Tech Stack
```PERN STACK```
-	Database: PostgreSQL 
- Client Side: React
- Server Side: NodeJS & Express
- Live Chat: Socket.io
- Styles: Material UI
- HTTP Request tool: Axios
- State Management tool: ContextAPI

# Usage

Install dependencies with `npm install`.

# Contributors

Ruby Zhuang: https://github.com/Ruby-Zhuang/

Dylan Du: https://github.com/dylangit01

Nelli Butenko: https://github.com/NelliBtn
