import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EventsTab from "../../src/components/Admin/events/EventsTab";

// mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("EventsTab - Admin Event Creation", () => {
  const mockSubmit = vi.fn();
  const mockSearch = vi.fn();

  const defaultProps = {
    title: "",
    setTitle: vi.fn(),
    description: "",
    setDescription: vi.fn(),
    from: "",
    setFrom: vi.fn(),
    to: "",
    setTo: vi.fn(),
    submitAdminEvent: mockSubmit,

    filterMode: "user",
    setFilterMode: vi.fn(),
    dateMode: "week",
    setDateMode: vi.fn(),
    customFrom: "",
    setCustomFrom: vi.fn(),
    customTo: "",
    setCustomTo: vi.fn(),

    selectedUserId: "1",
    setSelectedUserId: vi.fn(),
    users: [{ id: "1", username: "Lena" }],
    events: [],
    handleSearch: mockSearch,
    formatDate: (d) => d,
    formatTime: (d) => d,
    userMap: { 1: "Lena" },
    t: (key) => key,
  };

  it("renders event creation form", () => {
    render(<EventsTab {...defaultProps} />);

    expect(screen.getByPlaceholderText("Event title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Event description"),
    ).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: "Create Admin Event" }),
    ).toBeInTheDocument();
  });

  it("calls submitAdminEvent when clicking Create", () => {
    render(<EventsTab {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Create Admin Event" }));

    expect(mockSubmit).toHaveBeenCalled();
  });

  it("updates fields when typing", () => {
    render(<EventsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Event title"), {
      target: { value: "New Event" },
    });

    expect(defaultProps.setTitle).toHaveBeenCalledWith("New Event");
  });
});
