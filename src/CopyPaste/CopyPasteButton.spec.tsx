import { render, screen, fireEvent, act } from "@testing-library/react";
import CopyPasteButton from "./CopyPasteButton";

// Mocking CopyPasteIcon as a simple div for testing purposes
jest.mock("./CopyPasteIcon", () => () => <div data-testid="copy-paste-icon" />);

beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined), // Mock the writeText method
      },
    });
  });

describe("CopyPasteButton", () => {
  it("renders the button with the correct icon", () => {
    render(<CopyPasteButton text="Hello" />);
    
    // Check if button is rendered with the correct icon
    expect(screen.getByTestId("copy-paste-button")).toBeInTheDocument();
    expect(screen.getByTestId("copy-paste-icon")).toBeInTheDocument();
  });

  it("sets the default button color", () => {
    const defaultColor = "#ff0000";
    render(<CopyPasteButton text="Hello" defaultColor={defaultColor} />);

    // Check if the color property is set correctly
    expect(document.documentElement.style.getPropertyValue("--button-color")).toBe(defaultColor);
  });

  it("changes the color when clicked", async () => {
    const copiedColor = "#00FF00";
    const defaultColor = "#0000FF";

    render(<CopyPasteButton text="Hello" defaultColor={defaultColor} copiedColor={copiedColor} />);

    // Initially, it should have the default color
    expect(document.documentElement.style.getPropertyValue("--button-color")).toBe(defaultColor);

    // Simulate the button click
    fireEvent.click(screen.getByTestId("copy-paste-button"));

    // After click, it should change to the copied color
    expect(document.documentElement.style.getPropertyValue("--button-color")).toBe(copiedColor);

    // Simulate waiting for the timeout (after 1 second, the color should revert)
    await act(async () => {
      // Wait for the setTimeout to trigger
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // After timeout, it should revert to the default color
    expect(document.documentElement.style.getPropertyValue("--button-color")).toBe(defaultColor);
  });

  it("disables the button after being clicked", async () => {
    render(<CopyPasteButton text="Hello" />);
    
    const button = screen.getByTestId("copy-paste-button");
    
    // The button should be enabled initially
    expect(button).not.toBeDisabled();
    
    // Simulate a click on the button
    fireEvent.click(button);
    
    // The button should be disabled after the click
    expect(button).toBeDisabled();
    
    // Wait for the timeout (after 1 second, it should be enabled again)
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
    
    // After the timeout, the button should be enabled again
    expect(button).not.toBeDisabled();
  });

  it("copies text to the clipboard when clicked", async () => {
    const clipboardWriteSpy = jest.spyOn(navigator.clipboard, "writeText");

    render(<CopyPasteButton text="Hello World" />);
    
    // Simulate a click on the button
    fireEvent.click(screen.getByTestId("copy-paste-button"));
    
    // Ensure that the clipboard writeText method was called with the correct text
    expect(clipboardWriteSpy).toHaveBeenCalledWith("Hello World");
    
    clipboardWriteSpy.mockRestore();
  });
});
