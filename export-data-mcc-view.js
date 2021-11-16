// Remember to use dashes :) 111-111-1111
var ACCOUNT_IDS = ["enter-your-id-here"];

// Want the old cells on the sheet deleted? Change this to true
var THE_SCRIPT_CLEAR_THE_CONTENTS_OF_THE_SHEET_CONTENTS = false;

// Should the script add the column headers (put true), or just the data (put: false)?
var ADD_COLUMN_HEADERS = true;

function main() {

    var accountSelector = AdsManagerApp.accounts()
        .withIds(ACCOUNT_IDS);

    var accountIterator = accountSelector.get();

    while (accountIterator.hasNext()) {
        var account = accountIterator.next();
        AdsManagerApp.select(account);
        var QUERIES = [
            {
                "select": "SELECT CampaignName, Clicks, Ctr, AverageCpc, CampaignId, CostPerConversion, AllConversionValue, InvalidClicks, SearchClickShare, TopImpressionPercentage, AbsoluteTopImpressionPercentage, Date, Impressions, Cost",
                "from": "FROM CAMPAIGN_PERFORMANCE_REPORT",
                "where": "WHERE Impressions > 0",
                "during": "DURING 20210501,20211107",
                "url": "enter-sheet-url-here",
                "tabName": "enter-tabname-here",
            },
            {
                "select": "SELECT AllConversions, ConversionTypeName, CampaignName, CampaignId, Date",
                "from": "FROM CAMPAIGN_PERFORMANCE_REPORT",
                "where": "WHERE AllConversions > 0",
                "during": "DURING 20210501,20211107",
                "url": "enter-sheet-url-here",
                "tabName": "enter-tabname-here",
            }
        ];

        for (var i in QUERIES) {
            var queryObject = QUERIES[i];
            var query = queryObject.select + " " + queryObject.from + " " + queryObject.where + " " + queryObject.during;
            var spreadsheet = SpreadsheetApp.openByUrl(queryObject.url);
            var sheet = spreadsheet.getSheetByName(queryObject.tabName);
            // If you don't want to clear
            if (THE_SCRIPT_CLEAR_THE_CONTENTS_OF_THE_SHEET_CONTENTS) {
                sheet.clear();
            }
            var report = AdWordsApp.report(query);
            // This bit of code grabs the SELECT line and pulls out the variables,
            // allowing you to ONLY write your variables on the select line and auto add them to the report in the right place
            var columnNamesAsString = queryObject.select.replace("SELECT ", "");
            var columnNamesAsArray = columnNamesAsString.split(", ");
            if (ADD_COLUMN_HEADERS) {
                sheet.appendRow(columnNamesAsArray);
            }
            var rows = report.rows();
            while (rows.hasNext()) {
                var currentRowArray = [];
                var row = rows.next();
                columnNamesAsArray.map(function (name) {
                    var currentColumn = row[name];
                    currentRowArray.push(currentColumn);
                });
                sheet.appendRow(currentRowArray);
            }
        }
    }
}