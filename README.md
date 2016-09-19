# league-table-widget

Displays the league teams with statistics, with data from statistics api

## Configuration example:

__`client-widgets.js`__

```json

...
{
    "order": 1,
    "widgetId": "League widget",
    "args": {
        "filter": "/football/england/premier_league/",
        "criterionId": 1001221607,
        "updatedTime": "08:00 GMT",
        "style": "padding-top: 12px;",
        "headerDefaultTitle": "Premier League 2015/16"
    }
},
...

```

### The widget accepts the following arguments/s:
1. `filter` - string - __REQUIRED__ - The league filter
2. `criterionId` - number - __REQUIRED__ - Criterion identifier for bet offers to be matched against
3. -- not implemented yet -- `updatedTime` - string - defaults to '08:00 GMT' - The timestamp to show when the last update was made
4. -- not implemented yet -- `style` - string - defaults to '' - Additional style to apply to the <body> element of the widget
5. `title` - string - Forces title of the widget
6. `widgetTrackingName` - string - defaults to 'gm-league-table-widget' - tracking name for analytics purposes


### To add specific locale strings to be compiled add the following to the buildparameters.json.
Each array object must contain key/value pairs, where key is the Label of the string used in template, and the value
represents the object pointing to Kambi locale.js

```json
"localeStrings": [
      {
         "Draw": "mostpopular.outcomeLabel.draw"
      }
   ]
```

# Other tools

For setting up sass maps, follow this tutorial https://www.hackmonkey.com/2014/sep/configuring-css-source-maps-compass

To use Scss Lint, run "gem install scss_lint"

# Changelog

changelog can be found [here](CHANGELOG.md)
