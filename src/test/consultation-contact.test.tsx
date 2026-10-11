import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

// The consultation popup must hand visitors the real broker number, not a
// "coming soon" notice, so nobody is sent to a dead end.
describe("Consultation popup", () => {
  it("offers the broker's phone number as a direct call link", () => {
    const Index = Route.options.component as ComponentType;
    render(<Index />);

    fireEvent.click(screen.getAllByRole("button", { name: /let.s talk/i })[0]);

    expect(screen.getByRole("link", { name: /\(817\) 606-7789/ })).toHaveAttribute(
      "href",
      "tel:+18176067789",
    );
  });
});
