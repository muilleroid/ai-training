- Follow project structure and naming conventions.
- Define each feature as a separate module.
- Modules should be named after the feature they implement.
- Use descriptive names for functions and classes.
- Each module should have a clear purpose and should not be too large.
- Modules should be organized in a way that makes sense for the project.
- Use Bun specific APIs when possible.
- Use drizzle query builder for database interactions.
- Avoid using drizzle relations and instead use drizzle query builder to join tables.
- Update drizzle schemas before running migrations.
- Update the database schema using drizzle migrations.
- Sort imports in the following order:
  1. Built-in modules
  2. Third-party modules
  3. Absolute imports
  4. Relative imports
- Sort imports alphabetically case insensitive within each group.
- Add empty lines between groups of imports.
- Treat relative imports with different depths as different groups.
- Sort functions and classes alphabetically case insensitive.
- Sort properties alphabetically case insensitive.
- Avoid adding unnecessary comments.
- Solve circular dependencies by refactoring code, but only as a last step.
