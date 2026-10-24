# Playing NFS Underground 2 in the browser

The game runs in Google Chrome and in Firefox. One server hosts it: it keeps the game files, serves the game to the
browsers and connects players for free roam. On a Mac it serves that Mac; for other PCs it goes behind HTTPS, usually
on a VPS ([VPS.md](VPS.md)). Nothing is installed on the players' PCs, and no file is picked by hand.

## 1. Start it (on the Mac)

```sh
web/start.sh            # or: cd web && npm start
```

- The first start takes longer: it installs the page's tools and builds what is missing (the game module, the page
  and the server; the server needs Rust, from https://rustup.rs). Later starts go straight to the server, unless
  the code changed.
- It looks for the game in `~/projects/nsfu2/Need for Speed - Underground 2`. If the game is somewhere else, start
  once with `web/start.sh --data "/path/to/the folder with SPEED2.EXE"`. The folder is remembered.
- The game folder is only read, never changed.
- It prints the address to open. `Ctrl-C` stops the server.

| Option | What it does |
|---|---|
| `--open` | Also opens the game in Chrome on this Mac. |
| `--http-port 8080` | Use another port, if this one is taken. |
| `--no-build` | Serve what is there, without checking the build. |

On the Mac itself, open **http://localhost:8080/** and press **Play** (or Enter).

The start page shows the download, then **Ready**. Play is on once the game module has loaded, which takes a second
or two. The page shows a problem only when there is one, with what to do about it.

## 2. Other PCs

The browser runs the game only on a secure page (`https://`, or `localhost` on the machine itself), so friends play
from a server behind HTTPS: a certificate on the server, or a proxy or tunnel in front of it. [VPS.md](VPS.md) has
the ways to set that up. Each player then opens that `https://` address in the latest **Google Chrome** or
**Firefox** and presses **Play**.

The first start on a PC downloads about 7 MB of game code and, while playing, the game data it needs, compressed on
the way. That PC keeps the data, so later starts are quick. To load it up front, press **Preload the game data** in
Game data on this PC, at the bottom of the start page: 2 GB (all but the movies), about 1.4 GB over the network.
After that no loading screen waits on the network, which matters on a slow line to a remote server. The movies
stream from the server as they play; with Movies off (Settings, Game) the game never asks for them.

**Offline:** a PC that has opened the page once also starts the game when the server cannot be reached (no
network, or the server is down): the page keeps its own copy of itself and of the game code, updated each time the
server answers. The start page then says **Offline**, and the game runs from the game data on that PC, so download
it first. The movies are off for such a game unless every one of them is on the PC already. Free roam and Online
need the server; your saves are in the browser either way.

**Phones and tablets** (Chrome on Android): a tap is a click, so the game's menus work by touch. The ☰ button opens the
page menu. On a phone the game goes full screen when you press Play and renders at 75% resolution scale (Settings,
Display changes both). Held sideways, the game fills the screen with the touch controls over it; held upright, it shows
in a 4:5 picture at the top with the ☰ button and the touch controls below it. The screen stays on while the game
runs. Chrome's menu, **Add to Home screen** (or **Install app**), puts the game on the home screen as an app that opens
full screen; on a PC the same makes it an app with its own window.

**Touch controls** show on the game while you drive (races and free roam) and step aside for menus, the pause menu
and cutscenes:

- **Right thumb:** Gas, Brake (and reverse), Nitro and the handbrake. A finger slides from Gas to Brake.
- **Steering**, switched with the button in the top right corner and kept in this browser: **buttons** (◀ ▶, as the
  arrow keys; the default), a **thumb stick** that appears where the left thumb lands, or **tilt**, the phone held like
  a wheel. With tilt, Brake and the handbrake move under the left thumb, and the button beside the switch sets
  straight ahead.
- **Small buttons** along the top: pause, camera, look back, reset; in free roam also the map, messages, horn, and
  Start (an event, or an outrun).
- A keyboard or a controller sends them away until you touch the game again. Android phones buzz on crashes.

## 3. Controls

| Key or button | What it does |
|---|---|
| Arrows or W A S D | Throttle, brake and reverse, steer |
| Alt | Nitrous |
| Space | Handbrake |
| Shift, Ctrl | Gear up, gear down (manual gearbox) |
| C, B | Camera, look back |
| R | Respawn |
| H, J | Hydraulics, with the Hydraulics part (Car Specialties): hold H to pressurize or J to bounce, then the arrows pick the corners; under 10 mph |
| N | Horn (free roam and races with other players) |
| M, Tab | Map, messages |
| Esc or P | Pause; Esc also goes back in menus |
| Enter | Choose (menus); in free roam, start an event at its marker or take an outrun |
| F12 | Screenshot (PNG), kept with your saves and shown in Saves on the start page |
| **F8** | Frame-rate counter: off, on, detailed |
| **F9** | The page menu: when the game last saved, full screen, counter, controls, log, **Quit game**; on a controller Home, or both sticks pressed in; on a touch screen the ☰ button |
| **Hold Esc** | Leave full screen (a short press still goes to the game) |

The start page shows these keys under **Controls**, and F9, Controls shows them while you play.

- **Change the keys:** in the game, Options, Controls. The horn stays on N (the game has no horn of its own).
- **Mouse:** works in the menus. **Touch:** a tap is a click there.
- **Controller:** an Xbox or PlayStation pad works through the browser. The browser shows a pad to the page only
  after a button is pressed on it. The triggers are throttle and brake, the left stick steers, LB is nitrous, RB the
  handbrake, A and X shift, Y and B are camera and look back, View respawns, Start pauses; D-pad up starts an event
  or takes an outrun, left and right are the map and messages. A click of the left stick is the horn, unless your
  car has hydraulics: then the stick clicks are the game's hydraulics (left: pressurize, right: bounce).
- **The page menu on a controller:** Home, or both sticks pressed in, opens it (where the browser passes Home on; on
  Windows the Game Bar may take it). The D-pad or left stick moves in it, A picks, B closes it; meanwhile the game
  gets no controller input.
- **Rumble:** a controller that can rumble in Chrome (Xbox, DualSense and others) shakes when you crash, scrape a
  wall or land hard. Settings, Controller, Rumble turns it off. Firefox has no rumble.
- **Sound** starts with the Play click. If the browser still keeps it off, a note says so, and a click on the game or
  a key press turns it on. A controller button cannot: the browser does not count it.
- **Firefox:** Esc leaves full screen at once (Firefox has no keyboard lock); in full screen, pause with P.
- **Quit** from the game's main menu, or with F9, Quit game. Both let the game save and close. If a loading screen
  ignores the request, the same menu item then reads "Close the game now". As a last resort it reads "Stop the
  game". Closing the tab asks first, because a save in progress could be cut short.

## 4. Settings

**Online** (under Saves) and **Settings** on the start page hold this browser's `settings.ini`, the same file and
keys as the Mac app. Each change is saved at once and applies the next time you press Play.

| Group | Settings |
|---|---|
| Online | its own section under Saves: how many play on this server now, free roam with others, your name (in free roam and online), room, the game's Online mode (on by default); more: solid cars and the free-roam network |
| Game | language, movies, autosave; more: startup movies (skippable, original or off), sound, pause or keep running in the background, sound output latency |
| Display | full screen on Play (off: the game plays in the browser window; on by default on phones), resolution scale (phones start at 75%), frame rate (auto follows the screen: 120 on a 120 Hz display, 240 on a 240 Hz one; 60, 120 or 240; Online and LAN races at most 120); more: HUD layout, movie framing, cutscene bars, other cars' headlights (players, all cars, off), frame-rate counter |
| Controller | rumble; more: controller on or off, menu buttons, dead zones |

- **Language:** English, French, German, Italian, Spanish, Dutch, Swedish, Danish, Korean, Chinese, Japanese, Russian,
  Thai or Portuguese (Brazil), for the menus and all the game's text, and the movies' subtitles in all but English,
  French, German, Italian and Spanish. Where the server has the [language packs](VPS.md#languages), French, German, Italian, Spanish, Japanese and Russian also play with their dubbed voices and movies,
  Chinese, Japanese and Thai with their full text, and Portuguese with its text at all (without the packs it plays
  in English, with English voices). Your browser fetches only your language's files: the dubbed
  voices are about 50 MB (Russian 94 MB), and the dubbed movies are smaller than the English ones they replace.
- **More settings:** each group's "More … settings" has the less common ones, and says how many of them you
  changed. **Reset** next to a changed setting puts its default back.
- **Edit the file:** "Edit settings.ini as text" opens the file itself. A line the game would ignore is shown with
  the reason. A line that sets a runtime variable by its own name (`NFSU2_ROAM = 1`) shows on the row it belongs to,
  and every such line is listed under "Other variables in this file". Lines that would name a file of your saves or
  drive the game by itself (`NFSU2_REGFILE`, `NFSU2_INPUT_SCRIPT`, ...) are ignored: only the page sets those.
- **Links:** settings in a page address (`?env=...`) work only on a development server (one started with `--dev`).
  On yours a link cannot change your game; the start page says so when an address carries them.
- **The look:** the game looks as it did originally. Any graphics enhancement will be a separate setting, off
  unless you turn it on.
- **Two tabs:** one browser runs one game at a time. A second tab shows "Open elsewhere" and its Settings are
  read only. It takes over when the first tab closes.

## 5. Saves

- **Where they are:** your profiles and career are saved **in this browser, on this PC** (the site storage for
  the server's address). They are not on the server, unless you use cloud saves (below). Each address keeps its own
  save store, so stick to one.
- **Cloud saves:** Make keyphrase (in Saves, beside Cloud saves) keeps your saves on the server too, under a
  keyphrase only you have: `nfsu2-xyz-` and 8 words. In another browser (another PC, a phone), enter it in the box
  and press Load: any case, with or without `nfsu2-xyz`. There is no account and no email.
  - The page locks the saves with the keyphrase before they leave the browser: the server keeps bytes it cannot
    read, under a code made from the keyphrase. Keep the keyphrase safe, in a password manager say: it is the only
    way back to these saves, and nobody can look it up for you. The box shows its first 3 characters; the eye shows
    all of it and copies it, the arrow downloads it as a file.
  - From then on that browser syncs by itself: its saves go to the server after the game saves and when it closes,
    and a newer save from your other browser comes in when the page opens and when you press Play. If both browsers
    changed them since they last synced, the page asks which to keep. A browser with no profiles never sends its
    empty saves by itself: it offers the cloud's instead.
  - The profiles, their DVD and magazine covers, the game's options and `settings.ini` go; F12 screenshots stay in
    each browser.
  - The server keeps the copy of an earlier day too: "Go back to ..." brings it back when a day went wrong.
  - Stop syncing leaves the saves where they are; Delete from cloud deletes them on the server (your browsers keep
    theirs). A keyphrase nobody used for two years is deleted from the server.
- **Autosave:** the game saves your progress by itself after races, purchases and changed options. The game starts
  every profile on Save = Prompt, whose "save?" question opens on No, so Enter through the results skips the save;
  the page sets each profile to Autosave once (the game's Options, Gameplay, Save), at the first Play after the
  profile was saved. Pick Prompt or Off there and it stays. Settings, Game, Autosave off leaves the game's own setting
  alone.
- **When it saved:** "Progress saved" shows over the game each time it saves your profile, F9 shows the last save, and
  after the game closes the start page says when it last saved (or that nothing was saved during that game).
- **Rename:** Rename next to a profile in Saves gives it another name: letters and digits, up to 7, as the game's
  own name field takes them. Its career, cars and DVD and magazine covers go with it. Quit the game first. When
  "Your name" is empty, the other players see the new name.
- **Screenshots:** F12 while playing saves the picture as a PNG beside your saves. Saves on the start page shows
  them, newest first; click one to see it large, page through with the arrow keys, download or delete it.
- **Backup:** Saves, Download a backup gives one zip with your profiles, the game's options (`registry.txt`),
  `settings.ini` and F12 screenshots.
- **Restore:** Saves, Restore a backup puts a zip back, on this PC or on another one. It replaces what this browser
  has, after showing what is in the zip, including what its `settings.ini` would change on the network (free roam
  on, the name others see). A very large backup keeps every save and settings file. Only screenshots past 512 MB
  are left out. Restore only backups you made yourself or trust.
- **Profiles from the PC game:** Restore a backup takes them too. Zip the folder `%LOCALAPPDATA%\NFS Underground 2`
  (type that in Explorer's address bar), or pick one profile's own file in it (`<NAME>\<NAME>`, no extension). They
  are added beside the profiles in this browser, with their DVD and magazine covers; one of the same name is
  replaced, after asking. A profile saved by another version is left out, as the game would not load it. One
  changed by a save editor is restored with a warning: a value the game would not make itself may crash it or break
  the career. One with cars a mod added is restored with a warning too: this game does not have those cars, and may
  crash or show them wrong.
- **Backups are your safety net.** When the disk is nearly full, the browser may clear a site's storage unless it
  promised to keep it. Chrome decides that by itself, and the page cannot see how full the disk is, so it does not warn.
  Firefox asks by the address bar (the Saves section says so while it asks): allow it. Make a backup now and then,
  or use cloud saves.
- **Preloading the game data:** "Preload the game data" in Game data on this PC fetches the game folder but the
  movies into this browser, compressed on the way, with its progress and the time left. You can play meanwhile:
  preloading pauses while the game runs and goes on when it ends. Stop it whenever you like; what came is kept, and
  "Preload the rest" goes on from there, also after a reload. It needs about 2 GB of free disk space. The page says
  so before it starts when the browser has less room.
- **Game data on this PC:** "Delete the game data on this PC" frees disk space on this PC. Your saves stay; the game
  loads the data from the server again when it needs it.

## 6. Free roam with other players

Free roam is shared with **everyone** on the server who turns it on. Use a Room to keep to a group.

1. Each player turns on **Online, Free roam with others** on the start page. The first Play asks too (Turn on or
   Not now, and Esc is Not now); it asks once, and the switch changes the answer later. While the server's free
   roam is busy (it gives each player fewer than 24 cars) it doesn't ask, and asks at a later Play instead.
   **Online, Your name** is the name the others see (empty: your profile name); the question shows it once there
   is one, to change.
2. Everyone plays from the same server's address.
3. Each player starts or loads a career and drives in free roam. Players find each other by themselves, and their
   cars appear in your city with their names over them, as in the game's own LAN races.

Good to know:

- **How many:** up to 4000 players on a server set up as VPS.md describes (2000 with the older Node server), 128 on
  one started by hand (its owner can change that). Only free roam and the LAN and Online screens take a place; single-player takes none. When it is full,
  the game says so and lets you in by itself when a place frees up. The server pairs each player with the 32 players
  nearest to them, and your game shows all 32 of their cars at once. Their names show over the cars within 100 m, and
  each gets an arrow on the minimap when it is near and a marker on the world map (M), as the game's own opponents
  do; the world map shows where they were when you opened it. A player in a race, a shop or the menus is not in your
  free roam: no car, no arrow, no marker until they are back. A player farther than 300 m sends
  you their car 5 times a second instead of 20 (past 1 km, twice), which saves traffic and doesn't show at that
  distance. When many players arrive at once, their cars load one after another, about two a second.
- **Solid cars:** you collide with the other players' cars (Online, More online settings,
  Solid cars; off: you drive through them, and they through yours). A car that appears on top of yours, at a garage or
  after a jump, lets you through until you are apart. Each player's own game moves their car: a car you hit is pushed
  in its owner's game, and moves on your screen as it does there. A hit is shared between the two cars by their
  models' weight (0.96 t for the Peugeot 106 to 2.9 t for the Hummer): driving into a standing car of your weight,
  you go on at about half your speed and it leaves at about the other half, where you used to stop dead and it flew
  off faster than you came; driving a 240SX into a standing Hummer, you keep about a quarter of your speed and it
  leaves at about a third of it. You also drive through a car whose player is paused (or you are), one that has stood
  still for a minute (or yours has), and any car within 20 m of a shop's, the garage's or the car lot's door, so a
  crowd can't wall off an entrance. The same goes for the start of an event
  that is open in your career (a race, or one of the stage's other events): within 20 m of it you drive through every
  car, and every car through yours, so nobody blocks it; for players who don't have that event it is an ordinary
  spot. A player on an older version doesn't know about your events or your Solid cars setting, and collides with
  you there as before.
- **Names over the cars** follow the game's own player-names option, as in its LAN races. A player who paused shows
  as "paused" there.
- **Horn:** hold N (or click the controller's left stick) to honk. The others hear it from your car: louder the nearer
  they are, from the side your car is on, and lower in pitch as you drive away from them. Each player's horn has its
  own pitch, so you can tell who honks. It sounds while the game runs, not in the pause menu or on the map. It works
  in Online and LAN races too.
- **Hydraulics and nitrous:** the others see your car lift, tilt and bounce on its hydraulics, with its wheels on the
  road, and your nitrous as the game draws it on any car: the light trails behind it. They hear them from your car
  with the game's own sounds, as you hear your own: the nitrous going on and off, letting it out while standing or
  off the throttle, each wheel's pump and valve and a landing, louder the nearer they are. A player on an older
  version sees the body move but not the wheels, and no nitrous, and hears none of it.
- **Tyre smoke:** when you slide, spin your wheels or do a burnout, the others see the smoke from your tyres, as the
  game draws it for any car. Between players on different versions, neither sees the other's.
- **Headlights:** the other players' headlights light the road in front of their cars, as yours do, a little dimmer
  and in their own colour; in Online and LAN races too. Display, more: Other cars' headlights (All cars: AI racers and
  traffic too; Off: only yours, as in the original game). The Windows plugin draws only your own.
- **Outruns:** stay within about 25 m of another player for 4 seconds, away from the shops' and the garage's doors
  and from either player's open events (20 m), and the game offers an outrun, as it does with
  its own tuners: the outrun icon lights up and the top of the screen says "Press Enter to challenge ... to an
  outrun" (on a controller, D-pad up, the game's Engage). The other player sees "... challenges you to an outrun" and
  takes it with Enter as well, or lets it go: a challenge lapses after 15 seconds, or when you are more than 60 m
  apart. Then both games run the game's own outrun against each other's car: its "Feet" meter, and whoever gets
  1,000 feet (300 m) ahead of the other wins, and the bank pays or charges as in an outrun against a tuner. Leaving it
  (back to the menus, quitting, losing the connection) loses it. The other players' cars stay, and they see the two
  drive. Players on the Windows plugin are not offered outruns.
- **Races with other players:** a race of your career can be raced with the players around you, as the game's own LAN
  race on its track, in your career car. That takes a car of your own: in a new career's prologue (the 350Z you
  start in) you cannot join or open a lobby, and the panel says so; from your first car on you can.
  - **An open race** (its marker in the street): its card asks Accept or Decline as always, and Accept asks once more:
    **Solo** (the career race, as before) or **Multiplayer**.
  - **A race that is not open** in your career has no marker of the game's. Within about 50 m its start shows
    "Circuit (multiplayer)" or the like, and at the start a panel on the right (under Bank) says it is multiplayer
    only there and why (you won it in your career, your sponsor's contract has no place for it, a URL race before
    its wins, an SUV race without an SUV, not open yet), and that Enter opens a lobby. A spot offers the race of your
    stage there, else the last one you won there: never one of a stage you have not reached. None in the prologue,
    none while a story task runs.
  - **Multiplayer opens a lobby** at the start: the panel shows it, its race, track and laps and its six places (drag
    4, 3 on the three-lane track) with the players in them, the host first and yours marked. The players near see
    "Thom's circuit (1/6)" over the start (from about 250 m); everyone in free roam sees its race's icon on the world
    map (M), and the nearest four lobbies their words beside it ("Circuit 1/6"). They join at the start: within 15 m
    of it the panel shows the lobby and Enter joins (at an open race: its card's Accept, then **Join**). Up to 6
    players; at a full one the panel says so, and Enter starts another. Drive more than 40 m from the start to leave
    a lobby; the host leaving calls it off, and a lobby nobody joins closes after 5 minutes. A lobby is within your Room, as everything in free roam. At a race's
    start Enter is for the race: no outrun is offered there.
  - **The host presses Enter** to start once another player is in. After a 5-second countdown every game in the lobby
    goes to the race by itself, behind a screen with the lobby on it and where the trip is ("Loading the race"): out
    of free roam and through the LAN menus (your keys and controller do nothing meanwhile) to the race on the career
    race's track, direction and laps (a URL event: its first race; a LAN race takes at least 2 laps, drift and Street
    X 4), with no traffic and no AI racers. You drive the race. After the results every game goes back by itself,
    behind the same screen, through the main menu and your crib, to where it left free roam, and the panel says your
    place and prize: about a minute for the way out and back.
  - **Your career is not touched:** the race does not count in it, is neither won nor lost there and opens nothing.
    Only your bank changes: 1st $400, 2nd $300, 3rd $200, 4th $100, nothing for 5th, 6th or a race you left. It goes in
    at the crib on the way back, and the crib's autosave saves it with your profile (with the game's Save option at
    Prompt or Off it waits for your next save, as any change in the crib does).
  - A race that cannot come together (the host's game gone, nobody else in the game in time) ends the trip: every game
    goes back to free roam by itself and says why. Players on an older version or the Windows plugin see no lobbies.
- **Rooms:** set the same "Room" to see only some of the players' cars. A room is a filter between players, not
  privacy: every browser on the server still sees your name ("Your name", or the profile name), whether you are in
  the menus or driving, and the room, and someone with their own tools could join it. Play on a server only with
  people you would show your name and car to.
- **Who sees what:** with free roam off (the default), the game does not join the server's network at all. With it
  on, everyone on the server sees your name and status, and players in free roam with you see your car and where it
  is. The server reads where your car is, to pick the players near you, and keeps nothing of it. Nobody sees your
  real address: the server gives each player a virtual one (`10.77.x.x`).
- **A tab in the background** (or another window in front) pauses your game. The others see you as paused: your car stays where you stopped, with "paused" after your name, until you come back.
- **Closing the tab:** the others see your car disappear after a few seconds.
- **Messages over the game** say when a player joins free roam, goes into a race, is back in free roam after it,
  starts a multiplayer race nearby, or leaves. The menus and the shops are not announced.
- **The game's own LAN races** (its LAN menu) work between players on the same server too, with free roam on or off.

## 7. The game's Online mode

The game's own **Online** menu works again, against this server instead of EA's long-gone one: everyone who plays
from the same server address can meet there.

1. Main menu, **Online**. You go straight to the Online Main Menu under your name: **Online, Your name** on the
   start page, or your profile name when that is empty. There are no EA accounts, so the game's EA Login screens are
   skipped.
2. **Lobby** shows the games. **Create Game** (race type, track, options; Game Type Unranked), or **Refresh** and
   **Join Game**. In the game room, chat, press **Ready**; the creator presses **Start Race**. When only some
   players are ready, Start Race counts down 10 seconds: whoever is still not ready then is removed from the game,
   and the race starts without them.

Good to know:

- **Your name online** keeps letters, digits, `-` and `_` (at most 15): `Thom K.` plays as `Thom_K`. A changed name
  applies the next time you press Play.
- **A name that reads as a slur** is not taken: Settings does not save it as **Your name**, the Online mode
  refuses it, and in free roam the other players see `Player` over your car. Digits or signs for letters (`1` for
  `i`), gaps and repeated letters read as the word they spell; a number (a year, two digits at the end) is a number
  (`Hakan1995` and `Dani99` are names).
- **Your name is yours while you are online**, and while you race. Someone else can use it when you are not; the
  rankings and your EA Messenger friends list follow the name, so whoever plays under it while you are away sees your
  friends list and can change it. If another player is online under it, you play under it with four digits in place
  of its end (`NAME` becomes `NAME4821`), usually the same digits when you come back. Set **Online, Your name** to
  keep your own.
- **No name and no profile:** the game's own EA Login screens come instead. **Use Existing EA Account**, any name
  (3 to 15 letters, digits, `-` or `_`) and any password, **Continue**; **No** to "create a profile"; your persona.
  Nothing is checked and nothing is kept: there are no accounts. Type a password you use nowhere else: the game
  sends it to the server only lightly scrambled (the server never reads it).
- **Kept on the server:** only race results per name (Rankings) and your EA Messenger friends list (names). Never
  your password: the server does not read it. Players you block stay blocked while you are online; the block is not
  kept after that.
- **Game passwords:** the game asks for the password of a game created with one, and only the same password joins
  it. The server keeps no copy of it, only a check value for that game while it is open, and never shows or logs it.
- **Others see** your name, your game, your chat and your results, never your real address.
- **Every track is open** when you create a game, either direction, whatever your career has unlocked, and a new
  game starts at **2 laps** (the game's own default was 3; Options, Laps changes it). The same goes for the game's
  LAN races. The career and Quick Race keep their unlocks.
- **Up to 6 players** race in one game (Options, Max Players; the game's own most was 4, and 6 only in URL races).
  Drag keeps one car per lane: 4, or 3 on the track with three lanes.
- **Horn:** N (or the controller's left stick click) honks in a race too, as in free roam: the others hear it from your
  car. The same in the game's LAN races.
- **The Lobby lists every open game**, whatever its race type and options (Collision Detection, Race Breaker, Car
  Performance Restrictions, Ranked). The lobby's **Filter** only puts the games it asks for first; in the original
  game it hid all others, so a game made with Collision Detection off was seen by no one. A game with **Private
  Room** on is not listed, as in the original game.
- **Ranked games** need three players at least. Ranked wins give ranking points.
- **A race counts** in Rankings once two of its players' games sent the same result (every game sends its own at
  the results screen), so a race that only one player finished does not count. Each player races from their own
  browser.
- **EA Messenger:** Search finds players on this server; Send Message works. To become friends, both send a
  friend request (the other's request shows the asker in your list: open them, Send Friend Request).
- **Not yet:** the points table after a ranked race stays empty (the race still counts in Rankings).
- **Who is on:** Online on the start page shows how many play on this server now, and how many of them are in Online
  mode (in its menus or racing). Only the two numbers: no names.
- Turning it off: Online, Online mode on the start page (the game then cannot connect).

## 8. When something is wrong

| What you see | What to do |
|---|---|
| "Secure, isolated page" on another PC | Open the server's `https://` address, not `http`. Only `localhost` works without HTTPS. |
| "WebGPU" | Update the browser; look at `chrome://gpu` in Chrome, about:support (Graphics) in Firefox. The game needs WebGPU. Firefox has it on Windows and macOS; where it is off, Chrome plays. |
| "WebGPU" in Chrome on Linux, while `chrome://gpu` says WebGPU is hardware accelerated | Most likely the Vulkan driver is missing: Chrome runs WebGPU on Vulkan there (the rest of Chrome on OpenGL). `ls /usr/share/vulkan/icd.d/` lists the installed ones (`intel_icd` for Intel, `radeon_icd` for AMD). Install it with `sudo apt install mesa-vulkan-drivers` on Debian and Ubuntu, `sudo dnf install mesa-vulkan-drivers` on Fedora, `vulkan-intel` or `vulkan-radeon` on Arch, then quit Chrome completely and start it again. If the driver is there, the Dawn Info section further down `chrome://gpu` lists each adapter WebGPU sees and why one is blocked. |
| "WebGPU" in Chrome on Windows | Chrome runs WebGPU on Direct3D 12 there, and older graphics have no Direct3D 12 driver (Intel HD 4000 and older, for one): the game cannot run on that computer. The Dawn Info section further down `chrome://gpu` lists each adapter WebGPU sees and why it is blocked; when it lists only "D3D11 backend" adapters, "Blocklisted - D3D11 backend not fully implemented", the graphics have no Direct3D 12. On newer graphics, update the graphics driver from Intel, AMD or NVIDIA, then quit Chrome completely and start it again. |
| "WebGPU" with a note about compressed textures | Nothing to do: the game plays. This GPU (in many phones, Pixels among them) cannot read the game's compressed textures, so the page unpacks them as the game loads: about 200 MB more memory, and loading screens may pause for a moment. |
| "Game module" | The game did not load, or the server is not reachable. The page tries again by itself, or press **Retry**. If the module is missing, start the server with `web/start.sh`, which builds it. |
| "A new version of the game is on the server" | Press **Reload** or **Play**: the page loads the new version, and your saves and settings stay. The log is cleared by the reload, so download it first if you want to keep it. Before any game the page reloads by itself; during a game it says so over the game, and the start page offers it when you quit. |
| "Open elsewhere" | The game runs in another tab of this browser. Switch to it, or close it. |
| No sound | Click the game or press a key. Check the sound setting and the output latency (try "Robust"). |
| Stuck on a loading screen | F9, Quit game; then "Close the game now"; then "Stop the game". When the log ends in `[data]` lines, the game was waiting for its data from the server: it goes on when the data comes. |
| Anything odd | F9, Download log (or "Download log" on the start page after the game ended) and keep the file. It has the game's own log. Before you post it anywhere: it names your browser, its version and your system, your graphics chip, your time zone, and the names and virtual addresses of the players you met (not the server's address: only whether it was this machine, on the LAN or remote). |
| `Port 8080 is in use` when starting | The server already runs; open its address. Or start on another port: `web/start.sh --http-port 9080`. |
| Full screen | The game plays in the browser window. F9, Full screen goes full screen, and holding Esc leaves it (in Firefox, a press). "Full screen on Play" in Settings starts every game full screen. |
