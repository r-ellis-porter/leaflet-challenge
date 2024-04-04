# USGS Earthquake Data Visualization

## Overview/Purpose

The United States Geological Survey (USGS) collects a vast amount of earthquake data from around the world on a daily basis. However, there is a need for meaningful visualization tools to effectively communicate this data to the public and government organizations. This project aims to address this need by developing a visualization tool using Leaflet.js to plot earthquake data based on magnitude and depth.

## Summary

The project involves creating an interactive map that displays earthquake data obtained from the USGS GeoJSON Feed. The map visualizes earthquake locations, magnitudes, and depths, allowing users to gain insights into recent seismic activity.

## Important Findings

- Earthquake markers are sized based on magnitude, with larger markers representing higher magnitudes.
- Marker colors indicate the depth of the earthquake, with darker colors representing greater depths.
- Popups provide additional information about each earthquake, including location, time, magnitude, and depth.
- A legend is included to provide context for the map data, allowing users to interpret earthquake magnitudes and depths easily.

## Screenshots

![Earthquake Visualization Map](screenshots/earthquake_map.png)

*Screenshot of the earthquake visualization map showing earthquake markers with varying sizes and colors based on magnitude and depth.*

## Technical Details

### Files Structure

- `index.html`: HTML file containing the structure of the web page.
- `logic.js`: JavaScript file containing the logic for fetching earthquake data and creating the visualization using Leaflet.js.
- `style.css`: CSS file for styling the web page elements.
- `/static`: Directory containing static files such as CSS and JavaScript.
  - `/css`: Directory containing CSS files.
  - `/js`: Directory containing JavaScript files.

### Dependencies

- Leaflet.js: A JavaScript library for interactive maps.
- D3.js: A JavaScript library for manipulating documents based on data.

## Running the Code

1. Clone the repository to your local machine.
2. Open `index.html` in a web browser.

## Conclusion

This project demonstrates the use of Leaflet.js and D3.js to create an interactive map for visualizing earthquake data from the USGS. The visualization provides a user-friendly interface for exploring recent seismic activity, aiding in public awareness and understanding of earthquake events. Further enhancements could include additional features such as filtering earthquakes by magnitude or date range.
