import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReservationsTab from "../../src/components/Admin/reservations/ReservationsTab";

// mock ReservationForm → to button
vi.mock("../../src/components/Reservation/ReservationForm", () => ({
  default: ({ onSubmit }) => (
    <button onClick={() => onSubmit({ table: 1 })}>Mock Reserve</button>
  ),
}));

// mock SuccessModal
vi.mock("../../src/components/Reservation/SuccessModal", () => ({
  default: ({ message }) => <div>SUCCESS: {message}</div>,
}));

// mock useAdminReservations
vi.mock(
  "../../src/components/Admin/reservations/useAdminReservations.js",
  () => {
    return {
      default: vi.fn(() => ({
        reservations: [],
        userMap: {},
        dateMode: "week",
        setDateMode: vi.fn(),
        customFrom: "",
        setCustomFrom: vi.fn(),
        customTo: "",
        setCustomTo: vi.fn(),
        handleSearch: vi.fn(),
        tables: [],
        freeTables: [],
        handleAdminDatetimeChange: vi.fn(),
        reloadReservationsAdmin: vi.fn(),
      })),
    };
  },
);

import useAdminReservations from "../../src/components/Admin/reservations/useAdminReservations.js";

describe("ReservationsTab - Create Reservation", () => {
  it("renders ReservationForm mock", () => {
    render(
      <ReservationsTab
        createReservation={vi.fn()}
        deleteReservation={vi.fn()}
        updateReservation={vi.fn()}
      />,
    );

    expect(screen.getByText("Mock Reserve")).toBeInTheDocument();
  });

  it("creates reservation successfully", async () => {
    const createReservation = vi.fn().mockResolvedValue({});
    const reloadReservationsAdmin = vi.fn();

    useAdminReservations.mockReturnValueOnce({
      reservations: [],
      userMap: {},
      dateMode: "week",
      setDateMode: vi.fn(),
      customFrom: "",
      setCustomFrom: vi.fn(),
      customTo: "",
      setCustomTo: vi.fn(),
      handleSearch: vi.fn(),
      tables: [],
      freeTables: [],
      handleAdminDatetimeChange: vi.fn(),
      reloadReservationsAdmin,
    });

    render(
      <ReservationsTab
        createReservation={createReservation}
        deleteReservation={vi.fn()}
        updateReservation={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByText("Mock Reserve"));

    await waitFor(() => {
      expect(createReservation).toHaveBeenCalledWith({ table: 1 });
      expect(reloadReservationsAdmin).toHaveBeenCalled();
      expect(screen.getByText(/SUCCESS:/)).toBeInTheDocument();
    });
  });

  it("handles reservation creation error", async () => {
    const createReservation = vi.fn().mockRejectedValue(new Error("fail"));

    render(
      <ReservationsTab
        createReservation={createReservation}
        deleteReservation={vi.fn()}
        updateReservation={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByText("Mock Reserve"));

    await waitFor(() => {
      expect(createReservation).toHaveBeenCalled();
      expect(screen.queryByText(/SUCCESS:/)).not.toBeInTheDocument();
    });
  });
});
