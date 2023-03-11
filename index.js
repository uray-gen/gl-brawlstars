const Client = require('./src/Classes/Client');

const BattleLogEndpoint = require('./src/Classes/Managers/BattleLogEndpoint');
const BrawlerRankingsEndpoint = require('./src/Classes/Managers/BrawlerRankingsEndpoint');
const BrawlerEndpoints = require('./src/Classes/Managers/BrawlersEnpoints');
const ClubEndpoint = require('./src/Classes/Managers/ClubEndpoint');
const ClubFromTag = require('./src/Classes/Managers/ClubFromTag');
const ClubRankingsEndpoint = require('./src/Classes/Managers/ClubRankingsEndpoint');
const PlayerFromTag = require('./src/Classes/Managers/PlayerFromTag');
const PlayerRankingsEndpoint = require('./src/Classes/Managers/PlayerRankingsEndpoint');
const PlayersEndpoints = require('./src/Classes/Managers/PlayersEndpoints');
const RankingsEndpoints = require('./src/Classes/Managers/RankingsEndpoints');
const RotationEndpoint = require('./src/Classes/Managers/RotationEndpoint');

const BattleLog = require('./src/Classes/BattleLog');
const Brawler = require('./src/Classes/Brawler');
const Club = require('./src/Classes/Club');
const Player = require('./src/Classes/Player');
const RankedClub = require('./src/Classes/RankedClub');
const RankedPlayer = require('./src/Classes/RankedPlayer');
const RotatingEvent = require('./src/Classes/RotatingEvent');


const TagResolver = require('./src/Functions/TagResolver');

module.exports = {
    Client,

    // Managers
    BattleLogEndpoint,
    BrawlerRankingsEndpoint,
    BrawlerEndpoints,
    ClubEndpoint,
    ClubFromTag,
    ClubRankingsEndpoint,
    PlayerFromTag,
    PlayerRankingsEndpoint,
    PlayersEndpoints,
    RankingsEndpoints,
    RotationEndpoint,

    // Classes
    BattleLog,
    Brawler,
    Club,
    Player,
    RankedClub,
    RankedPlayer,
    RotatingEvent,

    //Functions
    TagResolver,
}