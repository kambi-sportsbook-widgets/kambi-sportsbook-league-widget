/**
 * @typedef {{
 *    color: string,
 *    description: string,
 *    from: number,
 *    to: number
 * }} LeaguePositionConfig
 */

/**
 * @typedef {{
 *    color: string,
 *    description: string
 * }} LeaguePositionLegendItem
 */

/**
 * Position color configuration for leagues
 * @type {Object<String, LeaguePositionConfig[]>}
 */
const CONFIG = {
   '/football/england/premier_league': [
      { from: 1, to: 3, color: 'green', description: 'UEFA Champions League' },
      { from: 4, to: 4, color: 'light-green', description: 'UEFA Champions League Qualifiers' },
      { from: 5, to: 5, color: 'orange', description: 'Europa League' },
      { from: 18, to: 20, color: 'red', description: 'Relegation' }
   ],
   '/football/germany/bundesliga': [
      { from: 1, to: 3, color: 'green', description: 'UEFA Champions League' },
      { from: 4, to: 4, color: 'light-green', description: 'UEFA Champions League Qualifiers' },
      { from: 5, to: 6, color: 'orange', description: 'Europa League' },
      { from: 16, to: 16, color: 'light-red', description: 'Relegation Play-off' },
      { from: 17, to: 18, color: 'red', description: 'Relegation' }
   ],
   '/football/spain/laliga': [
      { from: 1, to: 3, color: 'green', description: 'UEFA Champions League' },
      { from: 4, to: 4, color: 'light-green', description: 'UEFA Champions League Qualifiers' },
      { from: 5, to: 6, color: 'orange', description: 'Europa League' },
      { from: 18, to: 20, color: 'red', description: 'Relegation' }
   ],
   '/football/italy/serie_a': [
      { from: 1, to: 2, color: 'green', description: 'UEFA Champions League' },
      { from: 3, to: 3, color: 'light-green', description: 'UEFA Champions League Qualifiers' },
      { from: 4, to: 5, color: 'orange', description: 'Europa League' },
      { from: 18, to: 20, color: 'red', description: 'Relegation' }
   ],
   '/football/france/ligue_1': [
      { from: 1, to: 2, color: 'green', description: 'UEFA Champions League' },
      { from: 3, to: 3, color: 'light-green', description: 'UEFA Champions League Qualifiers' },
      { from: 4, to: 4, color: 'orange', description: 'Europa League' },
      { from: 18, to: 18, color: 'light-red', description: 'Relegation Play-off' },
      { from: 19, to: 20, color: 'red', description: 'Relegation' }
   ],
   '/football/netherlands/eredivisie': [
      { from: 1, to: 1, color: 'green', description: 'UEFA Champions League' },
      { from: 2, to: 2, color: 'light-green', description: 'UEFA Champions League Qualifiers' },
      { from: 3, to: 3, color: 'orange', description: 'Europa League' },
      { from: 4, to: 7, color: 'light-orange', description: 'Europa League Play-off' },
      { from: 16, to: 17, color: 'light-red', description: 'Relegation Play-off' },
      { from: 18, to: 18, color: 'red', description: 'Relegation' }
   ]
};

/**
 * Returns league position configs for given filter.
 * @param {string} filter League filter
 * @returns {LeaguePositionConfig[]}
 */
const find = function(filter) {
   // strip all following "/all"'s
   const matches = filter.match(/(\/all)*\/?$/),
      sanitized = filter.substring(0, filter.length - (matches ? matches[0].length : 0));

   return CONFIG.hasOwnProperty(sanitized) ? CONFIG[sanitized]
      : [];
};

/**
 * Returns position legend items for given league.
 * @param {string} filter League filter
 * @returns {Promise.<LeaguePositionLegendItem[]>}
 */
const getLegend = function(filter) {
   const config = find(filter);

   if (!config) {
      return Promise.resolve([]);
   }

   // Promise returned as there will (?) be API for colors in the future
   return Promise.resolve(
      config.map(({ color, description }) => ({ color, description }))
   );
};

/**
 * Returns a closure which will map position to color.
 * @param {string} filter League filter
 * @returns {Promise.<function(number):string>}
 */
const getColorMatcher = function(filter) {
   const config = find(filter);

   const matcher = (position) => {
      const item = config.find(item => item.from <= position && item.to >= position);
      return item ? item.color : null;
   };

   // Promise returned as there will (?) be API for colors in the future
   return Promise.resolve(matcher);
};

export default { getLegend, getColorMatcher };
