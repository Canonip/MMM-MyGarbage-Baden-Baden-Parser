var ical = require('node-ical');
var fs = require('fs');
var moment = require("moment");
var colors = require("./colors");
var fileName = "Umweltkalender_Baden-Baden.ics"
var outFileName = "garbage_schedule.csv"


var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

//Read and parse ics file
fs.readFile(fileName, "utf8", function (err, rawData) {
    if (err) throw err;
    ical.parseICS(rawData, function (err, data) {
        if (err) console.log(err);
        var dateEntries = [];
        //Group items by date (multiple bins may be picked up on the same day)
        var groupedCalendarItems = groupBy(Object.values(data), 'start');
        for (const date in groupedCalendarItems) {
            if (groupedCalendarItems.hasOwnProperty(date)) {
                //Create string containing bin names of bins being cleaned on current day
                const binsCleanedOnDate = groupedCalendarItems[date].map(x => x.description).join(",");
                var dateEntry = { WeekStarting: moment(date).format("MM/DD/YY") };
                //Create object and push to global array
                for (const bin in colors) {
                    if (colors.hasOwnProperty(bin)) {
                        dateEntry[colors[bin]] = binsCleanedOnDate.includes(bin) ? 1 : 0;
                    }
                }
                dateEntries.push(dateEntry);
            }
        }
        //create csv file
        //headers
        var csv_string = Object.keys(dateEntries[0]).join(",");
        csv_string += "\n";
        //items
        dateEntries.forEach(entry => {
            csv_string += Object.values(entry).join(",");
            csv_string += "\n";
        });
        fs.writeFile(outFileName, csv_string, function(err) {
            if(err) {
                return console.log(err);
            }        
            console.log("The file was saved!");
        }); 
    });
});
