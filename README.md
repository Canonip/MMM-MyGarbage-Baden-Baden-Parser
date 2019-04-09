# MMM-MyGarbage-Baden-Baden-Parser
Creates CSV-File for MMM-MyGarbage with ics File by the town of Baden-Baden (Germany)

## Usage
1. Go to https://www.baden-baden.de/buergerservice/umwelt/entsorgung/umweltkalender, choose your district and the bins you are interested in
2. On the next page (after clicking "Termine anzeigen" click on iCal download
3. Copy the ical file into the working directory
4. (optional) change the colors you want the bins to have in colors.js
5. Run ```node .``` in the working directory
6. Copy the generated ```garbage_schedule.csv``` from the working directory in the MMM-MyGarbage directory of your MagicMirror installation
