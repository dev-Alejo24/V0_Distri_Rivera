
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../../../../../Dario/progrmacion/V0_Distri_Rivera-main/src/components/Login/Login";

describe("Login Component", () => {
    test("renders login form correctly", () => {
        render(
            <Router>
                <Login />
            </Router>
        );
        
        // Verificar elementos principales
        expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
        expect(screen.getByText("Iniciar sesión con Google")).toBeInTheDocument();
    });

    test("updates email and password fields on user input", () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Contraseña");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(emailInput.value).toBe("test@example.com");
        expect(passwordInput.value).toBe("password123");
    });

    test("shows error message on invalid login attempt", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: "Email o contraseña incorrectos." }),
            })
        );

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid@example.com" } });
        fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "wrongpassword" } });

        fireEvent.click(screen.getByText("Iniciar Sesión"));

        const errorMessage = await screen.findByText("Email o contraseña incorrectos.");
        expect(errorMessage).toBeInTheDocument();

        global.fetch.mockClear();
    });

    test("navigates to home on successful login", async () => {
        const mockNavigate = jest.fn();
        jest.mock("react-router-dom", () => ({
            ...jest.requireActual("react-router-dom"),
            useNavigate: () => mockNavigate,
        }));

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "fakeToken" }),
            })
        );

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByLabelText("Email"), { target: { value: "valid@example.com" } });
        fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "validpassword" } });

        fireEvent.click(screen.getByText("Iniciar Sesión"));

        await screen.findByText("Iniciar Sesión"); // Esperar la ejecución

        expect(mockNavigate).toHaveBeenCalledWith("/home");

        global.fetch.mockClear();
    });
});
