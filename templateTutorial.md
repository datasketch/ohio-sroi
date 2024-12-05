# Tutorial: SROI Template

This tutorial explains how to use the SROI template, including its general rules, filling instructions, and how the information is displayed on the Dashboard.

## 1. list_references Sheet

The `list_references` sheet contains the bibliography for your calculator. This section consists of two columns:
- **title**: The title of the reference
- **href**: The URL link (optional)

This information will be displayed in the References tab of the Dashboard, showing a list of titles. When a title has an associated reference, it will function as a clickable link to that source.

## 2. proxy_inputs Sheet

The `proxy_inputs` sheet is dedicated to storing the variables that serve as inputs for the calculator. It consists of the following columns:
- **id**: This field should be left blank.
- **value**: The actual value of the input.
- **type**: This can be either "cost" or "user_input", indicating the nature of the input.
- **unit**: Specifies the unit of measurement, which can be "currency", "percentage", or left blank if no unit applies.
- **description**: A brief description of the input variable.

This data is showcased on the "Program Details" tab of the Dashboard, where users can modify the values to trigger recalculations of all proxies and the final return. On the right side of the screen, two tables are dynamically generated, each corresponding to a specific type of input.

## 3. proxy_values Sheet

The `proxy_values` sheet is designed to hold values extracted from the bibliography for calculating proxies. It consists of the following columns:
- **id**: This field should be left blank.
- **value**: The actual numerical value.
- **valueMin**: The minimum value, if applicable.
- **unit**: Specifies the unit of measurement, which can be "currency", "percentage", or left blank if no unit applies.
- **description**: A brief description of the input variable.
- **ref**: An optional reference to the author and year where this value is sourced from.

This data represents the constants used in proxy calculations. They are displayed on the dashboard for each proxy if this value is associated with it. These values can be defined as a range of data.

## 4. tables Sheet

The `tables` sheet is used to categorize the proxies. It consists of the following columns:
- **type**: This can be either "impact" or "stakeholder", indicating the nature of the category.
- **id**: The unique identifier for each proxy.
- **title**: The text to be displayed in the table.
- **tooltip**: A brief description explaining the significance of this category.

This is crucial for later stages, where we need to assign each proxy a type of impact and relate it to stakeholders. Here, we provide the name, how the title is displayed, and a tooltip to provide more context.

## 5. proxies Sheet

The `proxies` sheet is used for the calculations of diferents proxies and their atributes. It consists of the following columns:
- **type**: This column should contain any id of type "impact" as specified on the `tables` sheet.
- **stakeholders**: This column should contain any id of type "stakeholder" as specified on the `tables` sheet.
- **description**: A brief description of the proxy.
- **value**: This cell must contain a formula that references at least one value from either the `proxy_inputs` or `proxy_values` sheets.
- **valueMin**: This column is similar to `value`, but with the difference that if a value from `proxy_values` with a `valueMin` is used in the formula, this column will use that value to provide a range for the proxy. This is optional.
- **variables**: This column should be left blank.
- **formula**: This column should be left blank.
- **variables2**: This column should be left blank.
- **formula2**: This column should be left blank.

The `proxies` sheet integrates data from all previous sheets. Each proxy requires a type and stakeholder id from `tables`, as well as an Excel formula that incorporates at least one reference from `proxy_inputs` and `proxy_values` sheets to calculate a final value.

## 6. themes Sheet

The `themes` sheet is dedicated to storing general information about the Calculator. It is structured around the following columns:
- **section**: This field can be either "general" or a specific tab identifier.
- **variable**: The name of the variable.
- **value**: The value assigned to the variable.

In the "general" section, the following variables are crucial:
- **ranges**: A yes or no indicator specifying the type of calculator used.
- **title**: The title of the calculator.
- **invested**: This value is always set to 1.
- **formula**: This column is intentionally left blank.
- **variables**: This column is intentionally left blank.
- **return**: This represents the final return of the calculator, incorporating the `totalProxies` variable and values from the `proxy_inputs` and/or `proxy_values` sheets.
- **returnMin**: This represents the final return of the calculator, incorporating the `totalProxiesMin` variable and values from the `proxy_inputs` and/or `proxy_values` sheets.
- **returnDescription**: A description displayed on the Dashboard.
- **subtitle**: The default value is "Social Return on Investment Impact Calculator created by".
- **description**: A description of the calculator.
- **totalProxies**: The sum of all proxy values in the `proxies` sheet.
- **totalProxies2**: The sum of all proxy values in the `proxies` sheet, using `valueMin` instead of the main value if available.

In the "tabs" section, there are three tabs on the dashboard. Here, you can configure the label, while the type remains the default.
