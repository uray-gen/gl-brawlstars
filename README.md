<a href="https://uray.gen.tr/?utm_source=npm&utm_medium=markdown_logo&utm_campaign=gl-brawlstars_package"><img src="https://avatars.githubusercontent.com/u/110389312?s=200&v=4" alt="Uray Gen" height="100"></a>

[The Game Lobby](https://gamelobby.uray.gen.tr/)'s Brawl Stars API wrapper!

<a href="https://npmjs.com/package/gl-brawlstars">
<img src="https://img.shields.io/npm/v/gl-brawlstars?style=plastic" alt="npm version">
</a>

<a href="https://npmjs.com/package/gl-brawlstars">
<img src="https://img.shields.io/npm/dt/gl-brawlstars?style=plastic" alt="npm downloads">
</a>

<a href="https://twitter.com/uray_gen?ref_src=twsrc%5Etfw">
<img src="https://img.shields.io/twitter/follow/uray_gen?style=social" alt="Follow uray_gen on Twitter">
</a>

- ✅ Easy to use
- ✅ Feature-rich
- ✅ [Has documentation avaible](https://gl-devdocs.uray.gen.tr/)

# How to install?

* Install node.js.
* Use `npm install gl-brawlstars` in your terminal.

- ✅ It's intalled!

# How to use?

* Create an api key on the [Brawl Stars API (click here)](https://developer.brawlstars.com/#/account)
* Check out [the documentation (click here)](https://gl-devdocs.uray.gen.tr/)

## Have some examples!

```js
const { Client } = require('gl-brawlstars');
const client = new Client({ token: 'your_token_here' });

client.players.get('#PLAYERTAG1').then(player => {
console.log(`1) This player's called: ${player.name}`)
});

client.clubs.get('#CLUBTAG2').then(club => {
console.log(`2) This club's called: ${club.name}`)
});

client.brawlers.find(16000000).then(brawler => {
console.log(`3) This brawler's called: ${brawler.name}`)
});
``` 
