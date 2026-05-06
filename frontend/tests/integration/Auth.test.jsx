import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Auth from "../../src/views/pages/Auth";
import { AuthProvider } from "../../src/context/AuthContext.jsx";
import * as api from "../../src/utils/fetchData";

// mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// mock fetchData
vi.spyOn(api, "fetchData");

function renderAuth() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Auth />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("Auth page", () => {
  it("renders Sign In form", () => {
    renderAuth();

    expect(screen.getByPlaceholderText("auth.username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("auth.password")).toBeInTheDocument();

    // check button, not <h2>
    expect(
      screen.getByRole("button", { name: "auth.signIn" }),
    ).toBeInTheDocument();
  });

  it("successful login", async () => {
    api.fetchData.mockResolvedValueOnce({
      user: { id: 1, username: "Lena" },
      token: "abc123",
    });

    renderAuth();

    fireEvent.change(screen.getByPlaceholderText("auth.username"), {
      target: { value: "Lena" },
    });

    fireEvent.change(screen.getByPlaceholderText("auth.password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "auth.signIn" }));

    await waitFor(() => {
      expect(api.fetchData).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/");
      expect(localStorage.getItem("token")).toBe("abc123");
    });
  });

  it("shows error on failed login", async () => {
    api.fetchData.mockRejectedValueOnce(new Error("Invalid credentials"));

    renderAuth();

    fireEvent.change(screen.getByPlaceholderText("auth.username"), {
      target: { value: "wrong" },
    });

    fireEvent.change(screen.getByPlaceholderText("auth.password"), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: "auth.signIn" }));

    await waitFor(() => {
      expect(screen.getByText("⚠ auth.invalidCredentials")).toBeInTheDocument();
    });
  });

  it("switches to Sign Up form", () => {
    renderAuth();

    fireEvent.click(
      screen.getByText((content) => content.includes("auth.noAccount")),
    );

    expect(
      screen.getByRole("button", { name: "auth.signUp" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("auth.email")).toBeInTheDocument();
  });
});
