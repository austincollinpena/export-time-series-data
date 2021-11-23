// Export account spend from a start date all the way to when the script is run.

// This is the start date for the report in YYYYMMDD format
var startDate = "20211101"

// The end date is defined as "Today" or whenever the script runs
var endDate = new Date()


function main() {
    var timeZone = AdsApp.currentAccount().getTimeZone();
    var properlyFormattedTodayDate = Utilities.formatDate(endDate, timeZone, 'YYYYMMdd');
    var QUERIES = [
        {
            "select": "SELECT CampaignName, Cost, Date",
            "from": "FROM CAMPAIGN_PERFORMANCE_REPORT",
            "where": "WHERE Impressions > 0",
            "during": "DURING " + startDate + "," + properlyFormattedTodayDate,
            "url": "enter-sheet-url-here", // Add your URL Here
            "tabName": "enter-tabname-here", // Add your tab name here
        },
    ];

    for (var i in QUERIES) {
        var queryObject = QUERIES[i];
        var query = queryObject.select + " " + queryObject.from + " " + queryObject.where + " " + queryObject.during;
        var spreadsheet = SpreadsheetApp.openByUrl(queryObject.url);
        var sheet = spreadsheet.getSheetByName(queryObject.tabName);
        var report = AdWordsApp.report(query);
        // This bit of code grabs the SELECT line and pulls out the variables,
        // allowing you to ONLY write your variables on the select line and auto add them to the report in the right place
        var columnNamesAsString = queryObject.select.replace("SELECT ", "");
        var columnNamesAsArray = columnNamesAsString.split(", ");
        report.exportToSheet(sheet);
    }
}