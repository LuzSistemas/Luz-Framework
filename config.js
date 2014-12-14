/**
 * Created by Pedro Luz on 24/08/2014.
 */
module.exports = {
    connectionString: "mongodb://pedroluz:pedro55@ds045087.mongolab.com:45087/IncaDb",
    dbEnabled: true,
	adminTemplate: 'brackets',
    portalTemplate: 'lifeline',
    appDir: __dirname,
    mail:
    {
        azureStorageAccount: 'incastorage',
        azureStorageKey: 'uaeIeLOhb48d46xgb7wdGzXtSm3VAuudCGoTGgbZBrYq/Vy2TkAiHVreyALSYNoQKM+yDgkWfuxRUTmoLiVf8g==',
        defaults:
        {
            pageSize: 50
        }
    }
};