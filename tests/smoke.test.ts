import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/validators";

describe("leadSchema", () => {
  it("validates a minimal payload", () => {
    const result = leadSchema.parse({
      name: "Jane Doe",
      email: "jane@example.com"
    });

    expect(result).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      status: "new"
    });
  });
});
