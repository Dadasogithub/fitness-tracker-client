import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../components/Auth/Login";
import { BrowserRouter } from "react-router-dom";

// ✅ MOCK useAuth hook
jest.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    login: jest.fn((email, password) => {
      // Simulate success or failure
      if (email === "correct@example.com" && password === "correctpass") {
        return Promise.resolve(); // success
      } else {
        return Promise.reject(); // failure
      }
    }),
  }),
}));

const Wrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("Login", () => {
  test("renders login form", () => {
    render(<Login />, { wrapper: Wrapper });

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });

  test("allows typing in fields", () => {
    render(<Login />, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "testpass" },
    });

    expect(screen.getByPlaceholderText(/email/i)).toHaveValue("test@example.com");
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue("testpass");
  });

  test("shows error on invalid credentials", async () => {
    render(<Login/>, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    );
  });

  test("navigates on successful login", async () => {
    render(<Login/>, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "correct@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "correctpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    // No error expected; could check for navigation effect if using mock navigate
    await waitFor(() =>
      expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument()
    );
  });
});
