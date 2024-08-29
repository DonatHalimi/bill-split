## Bill Splitting App - React Project

**Table of Contents**

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Running the App](#running-the-app)
* [Using the App](#using-the-app)
* [Additional Notes](#additional-notes)

## Features

* Enter the total bill amount.
* Add or remove people splitting the bill.
* Assign a name to each person.
* Adjust the percentage each person pays using a slider.
* See the calculated amount each person owes based on the total bill and percentage.

## Technologies Used

* [**React**](https://react.dev/)
* [**Material-UI**](https://mui.com/)

## Running the App

1. Clone this repository.
2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will open the app in your browser at http://localhost:3000 by default.

## Using the App

1. Enter the total bill amount in the text field.
2. Click "Add Person" to add a new person.
3. Enter a name for the person in the text field.
4. Use the slider to adjust the percentage that person pays.
5. You can see the calculated amount each person owes based on the total and percentage.

## Additional Notes

* The app uses localStorage to persist the total bill amount, people data, and dark mode preference across sessions.
* The app uses Material-UI components for a clean and responsive design.
