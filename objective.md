# Expenses_Tracker_Report

## Objective
This project is designed to create a simple web-based expense tracker application. It allows users to add expenses with categories, amounts, and dates. The application calculates and displays total expenses, category-wise breakdowns, and highest/lowest spending categories. Data is stored locally using `localStorage`. Technologies used include HTML, CSS, and JavaScript.

## Output
<iframe src="https://github.com/niat-web/Expenses_Tracker_Report" height="1000" width="300" title="Expenses_Tracker_Report"></iframe>

## Project Requirements
**Technologies:** HTML, CSS, JavaScript, `localStorage`

## Features to Implement
- Add expenses with category, amount, and date.
- Calculate and display total expenses.
- Provide category-wise expense breakdown in list and percentage formats.

## UI Enhancements
- Implement a visually appealing dark mode toggle.
- Display notifications for successful operations and validation errors.

## Project Tasks & Expected Outcomes
| Task | Expected Outcome |
|------|------------------|
| Implement `addExpense()` function | Successfully add expense to `localStorage` and update expense report. |
| Implement `updateExpenseReport()` function | Display total expenses, category breakdown, and highest/lowest spending categories. |
| Implement `validateForm()` function | Validate form input and prevent submission with invalid data. |
| Implement `clearAllData()` function | Remove all expenses from `localStorage` and update expense report. |
| Implement `toggleDarkMode()` function | Toggle between light and dark modes. |

## JavaScript Concepts
| Concept | Implementation |
|---------|----------------|
| DOM Manipulation | Used to access and modify HTML elements to display data, handle user input, and manage the UI. |
| `localStorage` | Used to store and retrieve expense data persistently in the user's browser. |
| Event Listeners | Used to handle user interactions such as form submissions and button clicks. |
| Array Methods (`reduce`, `push`) | Used to process and manipulate the array of expenses. `reduce` is for calculating total expenses and category-wise expenses. `push` is used to add new expenses to array. |

## API Details
| API | Endpoint | Description |
|-----|----------|-------------|
| `localStorage` | `setItem(key, value)` | Stores data with the given key in the `localStorage`. |
| `localStorage` | `getItem(key)` | Retrieves data associated with the given key from the `localStorage`. |
| `localStorage` | `removeItem(key)` | Removes data associated with the given key from the `localStorage`. |