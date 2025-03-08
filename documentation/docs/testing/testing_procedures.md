
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

## Acceptance Tests
