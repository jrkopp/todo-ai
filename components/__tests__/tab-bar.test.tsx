import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TabBar } from "../tab-bar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/"),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("TabBar", () => {
  it("renders List View and Kanban View tabs", () => {
    render(<TabBar />);
    expect(screen.getByText("List View")).toBeInTheDocument();
    expect(screen.getByText("Kanban View")).toBeInTheDocument();
  });

  it("links to / and /kanban", () => {
    render(<TabBar />);
    expect(screen.getByText("List View").closest("a")).toHaveAttribute("href", "/");
    expect(screen.getByText("Kanban View").closest("a")).toHaveAttribute("href", "/kanban");
  });

  it("highlights the active tab when on /", () => {
    render(<TabBar />);
    const listTab = screen.getByText("List View").closest("a");
    const kanbanTab = screen.getByText("Kanban View").closest("a");
    // Active tab has border-zinc-900, inactive has border-transparent
    expect(listTab?.className).toContain("border-zinc-900");
    expect(kanbanTab?.className).toContain("border-transparent");
  });
});
