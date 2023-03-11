import {
    Client,
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
    BattleLog,
    Club,
    Player,
    RankedClub,
    RankedPlayer,
    RotatingEvent,
    TagResolver,
    PlayerFunctions
} from '../index';

export class Client {
    public constructor(options: ClientOptions);
    public options: ClientOptions;

    public players: PlayersEndpoints;
    public clubs: ClubEndpoint;
    public rankings: RankingsEndpoints;
    public brawlers: BrawlersEndpoints;
    public rotation: RotationEndpoint;

    protected fetchAPI(apiUrl: string): Promise<T> | null;
}


export class BattleLogEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(tag: TagResolvable): BattleLog | null;
}

export class BrawlerRankingsEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(country: string, brawler: number): Array<RankedPlayer> | null;
}

export class BrawlerEndpoints {
    public constructor(client: Client);
    public client: Client;

    public find(id: TagResolvable): Brawler | null;
    public fetch(): Array<Brawler> | null;
}

export class ClubEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(tag: TagResolvable): Club | null;
}

export class ClubFromTag {
    public constructor(client: Client, tag: TagResolvable);
    public client: Client;
    public tag: TagResolvable;

    public fetch(): Club | null;
}

export class ClubRankingsEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(country: string): Array<RankedClub> | null;
}

export class PlayerFromTag {
    public constructor(client: Client, tag: TagResolvable);
    public client: Client;
    public tag: TagResolvable;

    public fetch(): Player | null;
}

export class PlayerRankingsEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(country: string): Array<RankedPlayer> | null;
}

export class PlayerEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(tag: TagResolvable): Player | null;
}

export class RankingsEndpoints {
    public constructor(client: Client);
    public client: Client;
    public clubs: ClubRankingsEndpoint;
    public brawlers: BrawlerRankingsEndpoint;
    public players: PlayerRankingsEndpoint;
}

export class RotationEndpoint {
    public constructor(client: Client);
    public client: Client;

    public fetch(): RotatingEvent | null;
}

export class BattleLog {
    public constructor(client: Client, res: Object);
    public apiResponse: Object;
    public array: Array<BattleLogMatch>;
}

export class Brawler {
    public constructor(client: Client, res: Object);
    public apiResponse: Object;
    public id: number;
    public name: string;
    public starPowers: Array<BrawlerStarPower | null>;
    public gadgets: Array<BrawlerGadget | null>;
}

export class Club {
    public constructor(client: Client, res: Object);
    public apiResponse: Object;
    public tag: TagResolvable;
    public name: string;
    public description: string;
    public entrance: ClubEntrance;
    public badge: number;
    public trophies: number;
    public members: Array<ClubMember>;
    public memberCount: number;
    public isFull: boolean;
}

export class Player {
    public constructor(client: Client, res: Object);
    public apiResponse: Object;
    public tag: TagResolvable;
    public name: string;
    public nameColor: PlayerNameColor;
    public icon: number;
    public trophies: number;
    public highestTrophies: number;
    public experience: PlayerExperience;
    public qualifiedChampionshipChallange: boolean;
    public victories: PlayerVictories;
    public bestRoboRumble: PlayerBestSpecialEventLevel;
    public club: ClubFromTag;
    public brawlers: Array<PlayerBrawler>;
    public seasonReset: PlayerSeasonReset;
    public abilityCount: PlayerAbilityCount;
}

export class RankedClub {
    public constructor(client: Client, res: Object);
    public apiResponse: Object;
    public club: ClubFromTag;
    public rank: number;
}

export class RankedPlayer {
    public constructor(client: Client, res: Object);
    public apiResponse: Object;
    public player: ClubFromTag;
    public brawlerTrophies: number | null;
    public rank: number;
}

export class RotatingEvent {
    public constructor(res: Object);
    public apiResponse: Object;
    public id: number;
    public mode: string;
    public map: string;
    public modifiers: Array<EventModifier> | EventModifier | null;
    public startTime: EventDate;
    public endTime: EventDate;
    public slot: number;
}

export interface ClientOptions {
    public token: string;
}

export interface BattleLogMatchEvent {
    public id: number;
    public mode: string;
    public map: string;
}

export type BattleResult = string;

export interface BattlePlayerBrawler {
    public id: number;
    public name: string;
    public power: number;
    public trophies: number;
}

export interface BattleStarPlayer {
    public tag: string;
    public name: string;
    public brawler: BattlePlayerBrawler;
}

export interface BattleLogMatchBattleInfo {
    public mode: string;
    public type: string;
    public result: BattleResult;
    public duration: number;
    public trophyChange: number;
    public starPlayer: BattleStarPlayer;
    public teams: Array<BattleTeam> | null;
    public players: Array<BattlePlayer> | null;
}

export interface BattleLogMatch {
    public battleTime: string;
    public event: BattleLogMatchEvent;
    public battle: BattleLogMatchBattleInfo;
}

export interface BrawlerStarPower {
    public id: number;
    public name: string;
}

export interface BrawlerGadget {
    public id: number;
    public name: string;
}

export type ClubEntrace = string;

export interface ClubTrophyObject {
    public required: number;
    public total: number;
}

export type ClubRole = string;

export interface ClubMember {
    public player: PlayerFromTag;
    public role: ClubRole;
}

export interface PlayerNameColor {
    public android: string;
    public hex: string;
}

export interface PlayerExperience {
    public level: number;
    public points: number;
}

export interface PlayerVictories {
    public solo: number;
    public duo: number;
    public trio: number;
}

export interface PlayerBestSpecialEventLevel {
    public level: string;
    public id: number;
    public insane: number | null;
    public levelsLeft: number;
}

export interface PlayerBrawlerGear {
    public id: number;
    public name: string;
    public level: number;
}

export interface PlayerBrawler {
    public id: number;
    public name: string;
    public power: number;
    public rank: number;
    public trophies: number;
    public highestTrophies: number;
    public gears: Array<PlayerBrawlerGear | null>;
    public starPowers: Array<BrawlerStarPower | null>;
    public gadgets: Array<BrawlerGadget | null>;
}

export interface PlayerSeasonReset {
    public trophies: number;
    public starPoints: number;
}

export interface PlayerAbilityCount {
    public gears: number;
    public starPowers: number;
    public gadgets: number;
}

export type EventModifier = string;

export interface EventDate {
    public iso: string;
    public date: Date;
}

export type TagResolvable = string;

export type URLTagResolvable = string;