# Weather Forecast Application

## How to run
0. Open the project in a code editor of your preference
1. Open a console within the code editor of your choice
2. Cd into the /Weather station nation folder
3. In the console type "npm install"
4. After that finished type "npm run dev"
5. Now the project should be running on "http://localhost:5173/". Open it within your browser of choice
### Assumptions
- You already have npm installed
- You have already cloned the project from Github



## Goals

### Design Objectives
1. Create a user interface to present weather forecast information.
2. Enable users to select which forecasts to view.
3. Display weather forecasts using data from the [vedur.is API](https://xmlweather.vedur.is/).

### Personal Objectives
- Apply **KIS (Keep It Simple)** methodology to ensure a maintainable and understandable codebase.
- Expand knowledge of current technologies and learn new tools.

---

## Tech Stack

- **React (Vite with TypeScript)**: 
  - Selected Vite to gain experience with it in a non-professional setting.
- **Rewind-UI**:
  - A React component library chosen for its modern approach.
  - [Storybook for Rewind-UI](https://storybook.rewind-ui.dev/)
- **Tailwind CSS**:
  - Included as a dependency for Rewind-UI.

---

## Methodology

1. **Data Retrieval**:
   - Data is fetched from the [vedur.is XML service](https://xmlweather.vedur.is/).
   - A server proxy is configured in `vite.config.js` to handle CORS issues caused by the Same-Origin Policy.

2. **Data Handling**:
   - The fetched XML data is converted into a JSON format for easier use within the React application.

---

## Design

### Inspiration
- The layout and design were inspired by [yr.no](https://yr.no), which offers a minimalistic and user-friendly overview of weather stations.

### Current Features
- Dynamically fetches and displays weather data.
- Filters weather data by date and time for relevant information.
- Allows users to select and filter weather stations.
- Displays the next 11 days of forecasts for a single selected station.

---

## Shortcomings

### Limitations
- Unable to use XML data to dynamically create weather stations due to missing endpoint.
- Some parts of the project remain messy and could benefit from better documentation.

---

## Planned Features

- Weather icons for better visual representation.
- Include more weather stations.
- Enable drag-and-drop sorting for weather stations based on user preferences.
- Add a feature to search for the best weather conditions in Iceland.
- Provide multi-language support (e.g., adding English translations).

---

## Challenges

- Adapting to unfamiliar technologies with certain limitations.
- Dealing with suboptimal XML-to-JSON support for React.
- Limited utility of XML data due to documentation gaps.

---