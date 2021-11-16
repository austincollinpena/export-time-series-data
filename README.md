# Export Google Ads To Time Series Data

Export any query defined by [Adwords Query Language](https://developers.google.com/adwords/api/docs/guides/awql) into time series data.

[Here's a handy generator for Adwords Queries.](https://scriptninja.de/en/blog/awql)

## How To Customize

This script takes in **four** diferrent inputs.

#### One: Write Your Query

To make this as readable as possible, I seperated out each clause from the query into multiple lines.

The ```during``` line is the date. Add your date ranges like so, with the older date in the past:

```YYYYMMDD```,```YYYYMMDD```

```js
        {
            "select": "SELECT CampaignName, Clicks, Ctr, AverageCpc, CampaignId, CostPerConversion, AllConversionValue, InvalidClicks, SearchClickShare, TopImpressionPercentage, AbsoluteTopImpressionPercentage, Date, Impressions, Cost",
            "from": "FROM CAMPAIGN_PERFORMANCE_REPORT",
            "where": "WHERE Impressions > 0",
            "during": "DURING 20210501,20211107",
        ...
```

#### Two: Your Target Google Sheet

To get the sheet integration to work, you should update two variables: ```url``` and ```tabname```.

```js
            ...
            "url": "enter-sheet-url-here",
            "tabName": "enter-tabname-here",
        },
```

#### Three: If You Should Clear The Sheet

Big queries over long periods of time tend to run past the 30 minute timeout window.

You can run the script multiple times over different time periods to get your data.

Keep these two variables ```false``` in order to just keep writing data.

```js
var THE_SCRIPT_CLEAR_THE_CONTENTS_OF_THE_SHEET_CONTENTS = false;

var ADD_COLUMN_HEADERS = false;
```

#### Four: Have an MCC?

The ```export-data-account-view.js``` file is built for you. Be sure to add the ```ACCOUNT_IDS``` to this section. To have multiple, it looks like so:

```js
var ACCOUNT_IDS = ["123-456-7890", "543-210-9876"];

```

## Feature Request?

Drop into the issues tab and let me know if you want the script improved or something added.