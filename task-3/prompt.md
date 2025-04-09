# Prompt

Using only plain SQL complete described task.

SQLite database has following schema:

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer TEXT,
    amount REAL,
    order_date DATE
);
```

Result should be placed in a separate `src` folder inside `task-3` directory of the current project.

Requirements:

- Write query to calculate total sales volume for March 2024
- Write query to find customer who spent the most overall
- Write query to calculate the average order value for the last three months
