import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AgentScreen from "./AgentScreen";
import axios from "axios";
import { vi, expect, test } from "vitest";

vi.mock("axios");

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
