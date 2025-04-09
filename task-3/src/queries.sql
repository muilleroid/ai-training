-- 1. Calculate total sales volume for March 2024
SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE order_date BETWEEN '2024-03-01' AND '2024-03-31';

-- 2. Find customer who spent the most overall
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Calculate the average order value for the last three months
SELECT AVG(amount) AS average_order_value
FROM orders
WHERE order_date >= date('now', '-3 months');
