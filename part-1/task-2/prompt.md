# Prompt

Using only JavaScript complete described task. Consider usage of the latest EcmaScript standard (ES2024).

Create e2e tests suit. Use bun (v1.2.9) as test runner. There should be no additional dependencies. Bun version should be set in `.tool-versions` to be used with mise or asdf.

Result should be placed in a separate `src` folder inside `task-2` directory of the current project.

Requirements:

- Test are written for `https://fakestoreapi.com/products` endpoint
- Make sure response code is 200
- Each product should have following attributes: `title` (not empty), `price` (positive number), `rating.rate` (number, less than 5)
- All products that don't pass validation should be added to list and displayed at the end of the test execution. Test should fail if count of invalid products is greater than 0
