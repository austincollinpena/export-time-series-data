// Want the old cells on the sheet deleted? Change this to true
var THE_SCRIPT_CLEAR_THE_CONTENTS_OF_THE_SHEET_CONTENTS = false;

// Should the script add the column headers, or just the data?
var ADD_COLUMN_HEADERS = false;



function main() {
    var QUERIES = [
        {
            "select": "SELECT CampaignName, Cost",
            "from": "FROM CAMPAIGN_PERFORMANCE_REPORT",
            "where": "WHERE Impressions > 0",
            "during": "DURING TODAY",
            "url": "enter-sheet-url-here",
            "tabName": "enter-tabname-here",
        },
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
        report.exportToSheet(sheet);
    }
}