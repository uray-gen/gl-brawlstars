const ClientError = require('./Errors');
const Client = require('./Client');

const ClubFromTag = require('./Managers/ClubFromTag');

/**
 * A Brawl Stars player.
 */
class Player {
    /**
     * @param {Client} client The client that this player was fetched from
     * @param {Object} res Api response
     */
    constructor (client, res) {

        if (!client) return new ClientError('ClassMissingClient', 'Player');
        //if (typeof client !== Client) return new ClientError('ClassInvalidClient', 'Player');
        if (!res) return new ClientError('ClassMissingResponse', 'Player');
        if (!res['tag']) return new ClientError('ClassInvalidResponse', 'Player');

        /**
         * This class's api response.
         * @type {Object}
         */
        this.apiResponse = res;
        
        /**
         * This player's in-game tag
         * @type {TagResolvable}
         */
        this.tag = res?.tag;

        /**
         * This player's in-game name
         * @type {string}
         */
        this.name = res?.name;

        /**
         * A player's name color object.
         * @typedef {Object} PlayerNameColor
         * @property {string} android Player's name color in android color code.
         * @property {string} hex Player's name color hex code.
         */

        /**
         * This player's name color object.
         * @type {PlayerNameColor}
         */
        this.nameColor = { android: res?.nameColor, hex: res?.nameColor ? `#${res?.nameColor.slice(4)}` : '#ffffff' };

        /**
         * This player's icon id.
         * @type {number}
         */
        this.icon = res?.icon?.id;

        /**
         * This player's current trophy count.
         * @type {number}  
         */
        this.trophies = res?.trophies;

        /**
         * This player's highest trophy count of all time.
         * @type {number}
         */
        this.highestTrophies = res?.highestTrophies;

        /**
         * A player's experience object.
         * @typedef {Object} PlayerExperience
         * @property {number} level Player's experience level.
         * @property {number} points Player's all time total experience points.
         */

        /**
         * This player's experience object.
         * * Note: This data does not update anymore.
         * @type {PlayerExperience}
         */
        this.experience = { level: res?.expLevel, points: res?.expPoints };

        /**
         * This player's championship challange qualification
         * @type {boolean}
         */
        this.qualifiedChampionshipChallange = res?.isQualifiedFromChampionshipChallenge

        /**
         * A player's victories' object.
         * @typedef {Object} PlayerVictories
         * @property {number} solo Player's solo showdown victory count
         * @property {number} duo Player's duo showdown victory count
         * @property {number} trio Player's 3v3 team modes' victory count 
         */

        /**
         * This player's victories' object.
         * @type {PlayerVictories}
         */
        this.victories = { solo: res?.soloVictories, duo: res?.duoVictories, trio: res['3vs3Victories'] };

        /**
         * A player's best special event level of all time.
         * @typedef {Object} PlayerBestSpecialEventLevel
         * @property {string} level The best level this player have beat in this special event
         * @property {number} id The id of the level, which is the number api provides
         * @property {?number} insane The insane level the player have beat, if they ever beat an insane level
         * @property {number} levelsLeft The number of levels left to beat insane 16 on this special event
         */

        /**
         * This player's best robo rumble level of all time.
         * @type {PlayerBestSpecialEventLevel}
         */
        this.bestRoboRumble = specialEventLevel(res?.bestRoboRumbleTime)

        /**
         * This player's club fetching shortcut.
         * @type {ClubFromTag}
         */
        this.club = new ClubFromTag(client, res?.club?.tag)

        /**
         * A player's brawler's unlocked gear object.
         * @typedef {Object} PlayerBrawlerGear
         * @property {number} id This gear's id on the api
         * @property {string} name This gear's name
         * @property {number} level This gear's level (it's 3 for all)
         */

        /**
         * A player's brawler object.
         * @typedef {Object} PlayerBrawler
         * @property {number} id This brawler's id on the api
         * @property {string} name This brawler's name
         * @property {number} power This brawler's power level on this player
         * @property {number} rank This brawler's trophy rank on this player
         * @property {number} trophies This brawler's current trophies on this player
         * @property {number} highestTrophies This brawler's highest trophies on this player
         * @property {Array<?PlayerBrawlerGear>} gears This brawler's unlocked gears on this player
         * @property {Array<?BrawlerStarPower>} starPowers This brawler's unlocked star powers on this player
         * @property {Array<?BrawlerGadget>} gadgets This brawler's unlocked gadgets on this player
         */

        /**
         * This player's brawlers array.
         * @type {Array<PlayerBrawler>}
         */
        this.brawlers = res?.brawlers

        /**
         * A player's season reset data.
         * @typedef {Object} PlayerSeasonReset
         * @property {number} trophies This player's resetted trophy count at the season reset
         * @property {number} starPoints This player's star point reward at the season reset
         */

        /**
         * This player's season reset data.
         * @type {PlayerSeasonReset}
         */
        this.seasonReset = { trophies: seasonResetTrophies(this), starPoints: seasonResetStarPoints(this) }

        /**
         * A player's brawler's total ability counts.
         * @typedef {Object} PlayerAbilityCount
         * @property {number} gears This player's gear count
         * @property {number} starPowers This player's star power count
         * @property {number} gadgets This player's gadget count
         */

        /**
         * This player's brawler's total ability counts.
         * @type {PlayerAbilityCount}
         */
        this.abilityCount = { gears: res?.brawlers?.map(value => value.gears).flat().length, starPowers: res?.brawlers?.map(value => value.starPowers).flat().length, gadgets: res?.brawlers?.map(value => value.gadgets).flat().length, }
    }
}

/**
 * Calculates the end of season star point rewards for this player.
 * @param {Player} player The player to calculate
 * @returns {number}
 */
function seasonResetStarPoints(player) {
    let starPoints = 0;

    player.brawlers.forEach(brawler => {
        if (brawler.trophies >= 501 && brawler.trophies < 525) starPoints = starPoints + 20
        if (brawler.trophies >= 525 && brawler.trophies < 550) starPoints = starPoints + 50
        if (brawler.trophies >= 550 && brawler.trophies < 575) starPoints = starPoints + 70
        if (brawler.trophies >= 575 && brawler.trophies < 600) starPoints = starPoints + 80
        if (brawler.trophies >= 600 && brawler.trophies < 625) starPoints = starPoints + 90
        if (brawler.trophies >= 625 && brawler.trophies < 650) starPoints = starPoints + 100
        if (brawler.trophies >= 650 && brawler.trophies < 675) starPoints = starPoints + 110
        if (brawler.trophies >= 675 && brawler.trophies < 700) starPoints = starPoints + 120
        if (brawler.trophies >= 700 && brawler.trophies < 725) starPoints = starPoints + 130
        if (brawler.trophies >= 725 && brawler.trophies < 750) starPoints = starPoints + 140
        if (brawler.trophies >= 750 && brawler.trophies < 775) starPoints = starPoints + 150
        if (brawler.trophies >= 775 && brawler.trophies < 800) starPoints = starPoints + 160
        if (brawler.trophies >= 800 && brawler.trophies < 825) starPoints = starPoints + 170
        if (brawler.trophies >= 825 && brawler.trophies < 850) starPoints = starPoints + 180
        if (brawler.trophies >= 850 && brawler.trophies < 875) starPoints = starPoints + 190
        if (brawler.trophies >= 875 && brawler.trophies < 900) starPoints = starPoints + 200
        if (brawler.trophies >= 900 && brawler.trophies < 925) starPoints = starPoints + 210
        if (brawler.trophies >= 925 && brawler.trophies < 950) starPoints = starPoints + 220
        if (brawler.trophies >= 950 && brawler.trophies < 975) starPoints = starPoints + 230
        if (brawler.trophies >= 975 && brawler.trophies < 1000) starPoints = starPoints + 240
        if (brawler.trophies >= 1000 && brawler.trophies < 1050) starPoints = starPoints + 250
        if (brawler.trophies >= 1050 && brawler.trophies < 1100) starPoints = starPoints + 260
        if (brawler.trophies >= 1100 && brawler.trophies < 1150) starPoints = starPoints + 270
        if (brawler.trophies >= 1150 && brawler.trophies < 1200) starPoints = starPoints + 280
        if (brawler.trophies >= 1200 && brawler.trophies < 1250) starPoints = starPoints + 290
        if (brawler.trophies >= 1250 && brawler.trophies < 1300) starPoints = starPoints + 300
        if (brawler.trophies >= 1300 && brawler.trophies < 1350) starPoints = starPoints + 310
        if (brawler.trophies >= 1350 && brawler.trophies < 1400) starPoints = starPoints + 320
        if (brawler.trophies >= 1400 && brawler.trophies < 1450) starPoints = starPoints + 330
        if (brawler.trophies >= 1450 && brawler.trophies < 1500) starPoints = starPoints + 340
        if (brawler.trophies >= 1500) starPoints = starPoints + 350
    });


    return starPoints;
}

/**
 * Calculates the end of season trophies for this player.
 * @param {Player} player The player to calculate
 * @returns {number}
 */
function seasonResetTrophies(player) {
    let minus = 0;

    player.brawlers.forEach(brawler => {
        if (brawler.trophies >= 501 && brawler.trophies < 525) minus = minus + (brawler.trophies - 500)
        if (brawler.trophies >= 525 && brawler.trophies < 550) minus = minus + (brawler.trophies - 524)
        if (brawler.trophies >= 550 && brawler.trophies < 575) minus = minus + (brawler.trophies - 549)
        if (brawler.trophies >= 575 && brawler.trophies < 600) minus = minus + (brawler.trophies - 574)
        if (brawler.trophies >= 600 && brawler.trophies < 625) minus = minus + (brawler.trophies - 599)
        if (brawler.trophies >= 625 && brawler.trophies < 650) minus = minus + (brawler.trophies - 624)
        if (brawler.trophies >= 650 && brawler.trophies < 675) minus = minus + (brawler.trophies - 649)
        if (brawler.trophies >= 675 && brawler.trophies < 700) minus = minus + (brawler.trophies - 674)
        if (brawler.trophies >= 700 && brawler.trophies < 725) minus = minus + (brawler.trophies - 699)
        if (brawler.trophies >= 725 && brawler.trophies < 750) minus = minus + (brawler.trophies - 724)
        if (brawler.trophies >= 750 && brawler.trophies < 775) minus = minus + (brawler.trophies - 749)
        if (brawler.trophies >= 775 && brawler.trophies < 800) minus = minus + (brawler.trophies - 774)
        if (brawler.trophies >= 800 && brawler.trophies < 825) minus = minus + (brawler.trophies - 799)
        if (brawler.trophies >= 825 && brawler.trophies < 850) minus = minus + (brawler.trophies - 824)
        if (brawler.trophies >= 850 && brawler.trophies < 875) minus = minus + (brawler.trophies - 849)
        if (brawler.trophies >= 875 && brawler.trophies < 900) minus = minus + (brawler.trophies - 874)
        if (brawler.trophies >= 900 && brawler.trophies < 925) minus = minus + (brawler.trophies - 885)
        if (brawler.trophies >= 925 && brawler.trophies < 950) minus = minus + (brawler.trophies - 900)
        if (brawler.trophies >= 950 && brawler.trophies < 975) minus = minus + (brawler.trophies - 920)
        if (brawler.trophies >= 975 && brawler.trophies < 1000) minus = minus + (brawler.trophies - 940)
        if (brawler.trophies >= 1000 && brawler.trophies < 1050) minus = minus + (brawler.trophies - 960)
        if (brawler.trophies >= 1050 && brawler.trophies < 1100) minus = minus + (brawler.trophies - 980)
        if (brawler.trophies >= 1100 && brawler.trophies < 1150) minus = minus + (brawler.trophies - 1000)
        if (brawler.trophies >= 1150 && brawler.trophies < 1200) minus = minus + (brawler.trophies - 1020)
        if (brawler.trophies >= 1200 && brawler.trophies < 1250) minus = minus + (brawler.trophies - 1040)
        if (brawler.trophies >= 1250 && brawler.trophies < 1300) minus = minus + (brawler.trophies - 1060)
        if (brawler.trophies >= 1300 && brawler.trophies < 1350) minus = minus + (brawler.trophies - 1080)
        if (brawler.trophies >= 1350 && brawler.trophies < 1400) minus = minus + (brawler.trophies - 1100)
        if (brawler.trophies >= 1400 && brawler.trophies < 1450) minus = minus + (brawler.trophies - 1120)
        if (brawler.trophies >= 1450 && brawler.trophies < 1500) minus = minus + (brawler.trophies - 1140)
        if (brawler.trophies >= 1500) minus = minus + (brawler.trophies - 1150)
    });

    return player.trophies - minus;
}

/**
 * Calculates the special event level for a number.
 * @param {number} level The special event level from the api
 * @returns {PlayerBestSpecialEventLevel}
 */
function specialEventLevel(level) {
  if (level === 0) return { level: "None", id: level, insane: false, levelsLeft: 20-level };
  if (level === 1) return { level: "Normal", id: level, insane: false, levelsLeft: 20-level };
  if (level === 2) return { level: "Hard", id: level, insane: false, levelsLeft: 20-level };
  if (level === 3) return { level: "Expert", id: level, insane: false, levelsLeft: 20-level };
  if (level === 4) return { level: "Master", id: level, insane: false, levelsLeft: 20-level };
  if (level === 5) return { level: "Insane", id: level, insane: 1, levelsLeft: 20-level };
  if (level === 6) return { level: "Insane II", id: level, insane: 2, levelsLeft: 20-level };
  if (level === 7) return { level: "Insane III", id: level, insane: 3, levelsLeft: 20-level };
  if (level === 8) return { level: "Insane IV", id: level, insane: 4, levelsLeft: 20-level };
  if (level === 9) return { level: "Insane V", id: level, insane: 5, levelsLeft: 20-level };
  if (level === 10) return { level: "Insane VI", id: level, insane: 6, levelsLeft: 20-level };
  if (level === 11) return { level: "Insane VII", id: level, insane: 7, levelsLeft: 20-level };
  if (level === 12) return { level: "Insane VIII", id: level, insane: 8, levelsLeft: 20-level };
  if (level === 13) return { level: "Insane IX", id: level, insane: 9, levelsLeft: 20-level };
  if (level === 14) return { level: "Insane X", id: level, insane: 10, levelsLeft: 20-level };
  if (level === 15) return { level: "Insane XI", id: level, insane: 11, levelsLeft: 20-level };
  if (level === 16) return { level: "Insane XII", id: level, insane: 12, levelsLeft: 20-level };
  if (level === 17) return { level: "Insane XIII", id: level, insane: 13, levelsLeft: 20-level };
  if (level === 18) return { level: "Insane XIV", id: level, insane: 14, levelsLeft: 20-level };
  if (level === 19) return { level: "Insane XV", id: level, insane: 15, levelsLeft: 20-level };
  if (level === 20) return { level: "Insane XVI", id: level, insane: 16, levelsLeft: 20-level };

  return { level: "None", id: level, insane: false, levelsLeft: 20 };
}

module.exports = Player;