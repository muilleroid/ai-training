# Prompt

Using only plain HTML, CSS and JavaScript complete described task. Consider usage of the latest EcmaScript standard (ES2024).

Result should be placed in a separate `src` folder inside `task-1` directory of the current project.

Requirements:

- Single page
- Black and white theme
- User should be able to maintain his monthly expenses tracking
- User can enter his expenses as a table row. Row has only two cells: `Category` (text),  `Amount` (number). Expenses table should have special state when there is no data in it, display some fallback message
- There is a `Calculate` button underneath expenses table. Click on this button displays three metrics: total amount of expenses, average daily expense (there are always 30 days in a month), top three expenses ordered by amount descending. Button is disabled when there is no expenses in table. Metrics are not visible until the first calculation
