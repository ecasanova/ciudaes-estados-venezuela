# Venezuela States and Cities API

This project provides a public API for accessing information about the states and cities of Venezuela. It is designed to be lightweight and does not require a server to run. The data is stored in JSON format, making it easy to filter and retrieve information.

## Project Structure

- `src/data/states.json`: Contains a JSON array of all the states of Venezuela, each with properties such as "id", "name", and "abbreviation".
- `src/data/cities.json`: Contains a JSON array of cities, where each city has properties such as "id", "name", and "stateId" to associate it with a state.
- `src/index.js`: The main entry point for the application. It imports the states and cities data and sets up functions to filter cities based on the selected state.
- `src/utils/filters.js`: Exports utility functions for filtering cities by state, including a function `filterCitiesByState(stateId)` that returns an array of cities for a given state ID.
- `public/index.html`: Contains the HTML structure for the public-facing part of the API, including a simple interface to select a state and display the corresponding cities.
- `package.json`: Configuration file for npm, listing dependencies and scripts for the project.
- `.gitignore`: Specifies files and directories to be ignored by Git, such as `node_modules` and any environment files.

## Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `public/index.html` in your web browser to access the API interface.

## Data Structure

### States

Each state in `states.json` has the following structure:
```json
{
  "id": "unique_state_id",
  "name": "State Name",
  "abbreviation": "State Abbreviation"
}
```

### Cities

Each city in `cities.json` has the following structure:
```json
{
  "id": "unique_city_id",
  "name": "City Name",
  "stateId": "associated_state_id"
}
```

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.