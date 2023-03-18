const Client = require('./src//Client');

const BattleLogEndpoint = require('./src//Managers/BattleLogEndpoint');
const BrawlerRankingsEndpoint = require('./src//Managers/BrawlerRankingsEndpoint');
const BrawlerEndpoints = require('./src//Managers/BrawlersEnpoints');
const ClubEndpoint = require('./src//Managers/ClubEndpoint');
const ClubFromTag = require('./src//Managers/ClubFromTag');
const ClubRankingsEndpoint = require('./src//Managers/ClubRankingsEndpoint');
const PlayerFromTag = require('./src//Managers/PlayerFromTag');
const PlayerRankingsEndpoint = require('./src//Managers/PlayerRankingsEndpoint');
const PlayersEndpoints = require('./src//Managers/PlayersEndpoints');
const RankingsEndpoints = require('./src//Managers/RankingsEndpoints');
const RotationEndpoint = require('./src//Managers/RotationEndpoint');

const BattleLog = require('./src//BattleLog');
const Brawler = require('./src//Brawler');
const Club = require('./src//Club');
const Player = require('./src//Player');
const RankedClub = require('./src//RankedClub');
const RankedPlayer = require('./src//RankedPlayer');
const RotatingEvent = require('./src//RotatingEvent');


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

    // 
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