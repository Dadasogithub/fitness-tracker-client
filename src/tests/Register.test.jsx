import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../components/Auth/Register"; // update path as needed
import { AuthProvider } from "../context/AuthProvider"; 
import { BrowserRouter } from "react-router-dom";

const Wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("Register", () => {
  test("renders registration form", () => {
    render(<Register/>, { wrapper: Wrapper });

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("allows typing in email and password fields", () => {
    render(<Register/>, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "securepass" },
    });

    expect(screen.getByPlaceholderText(/email/i)).toHaveValue("newuser@example.com");
    expect(screen.getByPlaceholderText(/password/i)).toHaveValue("securepass");
  });
});
