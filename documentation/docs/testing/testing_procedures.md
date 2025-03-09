
# Testing Procedures
Vitest is a testing framework used for both front-end and back-end projects to ensure that components and features function as expected. It is particularly well-suited for Vite/React-based projects.

To use Vitest, it must first be installed via npm or yarn. Once installed, it can be configured in the package.json file to enable testing throughout the project. Vitest supports unit testing, snapshot testing, mocking, and built-in TypeScript compatibility.

## Test Case
```javascript
test("fetches and displays response", async () => {
    axios.post.mockResolvedValue({
        data: { choices: [{ text: "This is a test response." }] },
    });

    render(<AgentScreen />);

    const button = screen.getByText("Generate Response");
    fireEvent.click(button);

    // Check button text manually (Vitest does not support `toHaveTextContent` natively)
    expect(button.textContent).toBe("Generating...");

    await waitFor(() => {
        // Instead of `toBeInTheDocument`, check if the element exists
        expect(screen.getByText(/Response:/)).not.toBeNull();
        expect(screen.getByText("This is a test response.")).not.toBeNull();
    });

    expect(button.textContent).toBe("Generate Response");
});

```

## Integration Tests

Test Scenarios:
Successful Account Creation and Login

Given that a user enters valid credentials,
When they attempt to create an account,
Then the system should validate the password against the database,
And log the user into Storybuilder upon successful validation.
Account Creation with Invalid Credentials

Given that a user provides an invalid password (e.g., incorrect format or too short),
When they try to create an account,
Then the system should return an error message and prevent account creation.
Database Connectivity Issue During Login

Given that the database is temporarily unavailable,
When a user attempts to log in,
Then the system should display a message indicating a login failure due to a server error.

Test Scenarios:
Successful Agent Creation

Given that a user is logged into Storybuilder,
When they attempt to create an agent,
Then the system should successfully register the agent and return confirmation.
Agent Creation with Invalid Data

Given that a user tries to create an agent with missing or invalid details,
When they submit the request,
Then the system should return an error message prompting the user to provide valid data.
Agent Addition Without User Login

Given that a user is not logged into Storybuilder,
When they attempt to create an agent,
Then the system should reject the request and prompt them to log in first.

Successful Agent Persona Selection

Given that a user has created an agent,
When they select a persona for the agent,
Then the system should assign the persona and confirm the selection.
Persona Selection Without Agent Creation

Given that a user has not yet created an agent,
When they attempt to select a persona,
Then the system should prevent the action and prompt the user to create an agent first.
Agent Persona Selection Fails Due to System Error

Given that the system encounters an issue while assigning a persona,
When a user attempts to select a persona,
Then the system should return an appropriate error message and allow the user to retry.


## Acceptance Tests

# Test Case Table

## Project: Storybuilder
### Q/A Technical Support: 
### Q/A Round: 1 | Failures: 0
### Platform: Web / Mobile

| **Test ID** | **Action/Steps** | **Notes/Expected Result** | **Pass/Fail** | **Notes if Failed** |
|------------|----------------|--------------------------|-------------|----------------|
| **1** | **User Account Creation & Login**  | User creates an account with email and password. Password is validated via the database. Upon success, user is logged in. | ✅ | - |
| **2** | **Invalid Account Creation** | User attempts to create an account with an invalid password (too short, missing special characters). System returns an error message. | ✅ | - |
| **3** | **Login with Incorrect Credentials** | User enters wrong credentials. System denies access and provides an error message. | ✅ | - |
| **4** | **Database Connection Failure During Login** | Database is temporarily unavailable. System displays "Login Failed: Server Error." | ✅ | - |
| **5** | **User Creates an Agent** | User selects the option to create an agent. The system registers the agent and confirms creation. | ✅ | - |
| **6** | **Agent Creation with Missing Data** | User attempts to create an agent but does not provide a name or persona. System displays an error message prompting for required fields. | ✅ | - |
| **7** | **Agent Creation Without Login** | User is not logged in but tries to create an agent. System denies the request and prompts user to log in. | ✅ | - |
| **8** | **User Selects a Persona for an Agent** | User assigns a persona to an agent. System successfully registers the persona selection. | ✅ | - |
| **9** | **Persona Selection Before Creating an Agent** | User tries to assign a persona before creating an agent. System prevents this action and prompts the user to create an agent first. | ✅ | - |
| **10** | **Persona Selection System Error** | A system error occurs while assigning a persona. System displays an appropriate error message and allows the user to retry. | ✅ | - |
| **11** | **API Successfully Fetches and Displays Response** | User clicks "Generate Response" button. System retrieves and displays generated response. Button reverts to original state. | ✅ | - |
| **12** | **API Failure Handling** | API request fails due to network issues. System displays "Error: Unable to fetch response." | ✅ | - |
| **13** | **Prevention of Multiple API Calls** | User rapidly clicks "Generate Response" multiple times. System ensures only one request is sent at a time. | ✅ | - |



