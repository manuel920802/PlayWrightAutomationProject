Feature: Ecommerce validations
@Validation
Scenario Outline: Placing the Order
Given a login to Ecommerce2 application with "<username>" and "<password>"
Then Verify Error message is displayed

Examples:
|username         | password   |
|rahulshetty1     | learning1  |
|rahul@shetty.com | wrongpass@ |