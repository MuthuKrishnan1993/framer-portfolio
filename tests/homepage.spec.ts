import { test, expect } from "@playwright/test";

// ─── SMOKE TESTS ───────────────────────────────────────────────

test.describe("Smoke: Page Load", () => {
  test("homepage loads with 200 status", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto("/");
    await page.waitForTimeout(2000);
    // Filter out known non-critical warnings
    const critical = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("DevTools")
    );
    expect(critical).toHaveLength(0);
  });
});

// ─── NAVIGATION ────────────────────────────────────────────────

test.describe("Navigation", () => {
  test("navigation bar is visible", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    await expect(nav).toBeVisible();
  });

  test("logo text shows MUTHU KRISHNAN", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator("nav").getByText("MUTHU KRISHNAN").first();
    await expect(logo).toBeVisible();
  });

  test("nav links exist on desktop", async ({ page, isMobile }) => {
    test.skip(!!isMobile, "Desktop only test");
    await page.goto("/");
    await expect(page.locator("nav").getByText("Work")).toBeVisible();
    await expect(page.locator("nav").getByText("About")).toBeVisible();
    await expect(page.locator("nav").getByText("Thoughts")).toBeVisible();
  });

  test("burger menu exists on mobile", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile only test");
    await page.goto("/");
    // Look for the burger button
    const burger = page.locator("nav button").first();
    await expect(burger).toBeVisible();
  });
});

// ─── HERO SECTION ──────────────────────────────────────────────

test.describe("Hero Section", () => {
  test("hero section is visible with full viewport height", async ({
    page,
  }) => {
    await page.goto("/");
    const hero = page.locator("section").first();
    await expect(hero).toBeVisible();
    const box = await hero.boundingBox();
    expect(box).not.toBeNull();
    // Hero should be at least 90% of viewport height
    const viewportSize = page.viewportSize();
    if (viewportSize && box) {
      expect(box.height).toBeGreaterThanOrEqual(viewportSize.height * 0.9);
    }
  });

  test("MARK text is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("MUTHU", { exact: true }).first()).toBeVisible();
  });

  test("ASHTON text is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("KRISHNAN", { exact: true }).first()
    ).toBeVisible();
  });

  test("tagline is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Crafting Seamless Digital Experiences for Modern Brands")
    ).toBeVisible();
  });
});

// ─── ABOUT SECTION ─────────────────────────────────────────────

test.describe("About Section", () => {
  test("about section exists", async ({ page }) => {
    await page.goto("/");
    const about = page.locator("#about");
    await expect(about).toBeAttached();
  });

  test("scroll-reveal intro text is present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("As a Senior Frontend Developer").first()
    ).toBeAttached();
  });

  test("profile image loads", async ({ page }) => {
    await page.goto("/");
    // Scroll to about section
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    const profileImg = page.locator(
      '#about div[style*="profile.jpg"]'
    );
    await expect(profileImg.first()).toBeAttached();
  });

  test("social links are present", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Check at least some social links exist in about section
    const socialLinks = page.locator("#about a[target='_blank']");
    const count = await socialLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test("live clock renders", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    // Clock should show time in HH:MM format
    const clock = page.locator("#about .tabular-nums").first();
    await expect(clock).toBeAttached();
    const text = await clock.textContent();
    expect(text).toMatch(/\d{2}:\d{2}/);
  });

  test("resume link exists", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByText("RESUM").first()).toBeAttached();
  });
});

// ─── PROJECTS SECTION ──────────────────────────────────────────

test.describe("Projects Section", () => {
  test("featured project card is visible", async ({ page }) => {
    await page.goto("/");
    await page.getByText("Featured Project").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByText("Featured Project").first()).toBeVisible();
    await expect(page.getByText("The Photographer").first()).toBeAttached();
  });

  test("brand logos ticker exists", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("collaborating with renowned brands")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    // Check for logo images in the ticker
    const logos = page.locator('img[alt^="Logo"]');
    const count = await logos.count();
    expect(count).toBeGreaterThanOrEqual(10); // Duplicated for marquee
  });

  test("selected projects section exists", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("Selected Projects")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByText("Selected Projects").first()).toBeVisible();
  });

  test("selected project cards render", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("Selected Projects")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByText("Stellar Odyssey").first()).toBeAttached();
    await expect(
      page.getByText("Last Journey to Mars").first()
    ).toBeAttached();
    await expect(page.getByText("Supra Home").first()).toBeAttached();
    await expect(page.getByText("Blanc 4").first()).toBeAttached();
  });

  test("explore all projects link exists", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("EXPLORE ALL PROJECTS")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(
      page.getByText("EXPLORE ALL PROJECTS").first()
    ).toBeVisible();
  });
});

// ─── SERVICES SECTION ──────────────────────────────────────────

test.describe("Services Section", () => {
  test("section header is visible", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("creative expertise")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(
      page.getByText("creative expertise").first()
    ).toBeVisible();
  });

  test("design quote is visible", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("Design is not just what it looks like")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(
      page.getByText("Design is not just what it looks like").first()
    ).toBeVisible();
  });

  test("all 5 service cards render", async ({ page }) => {
    await page.goto("/");
    const titles = [
      "Web Development",
      "UI/UX Design",
      "SaaS Development",
      "Mobile Development",
      "WordPress & CMS",
    ];
    for (const title of titles) {
      await expect(page.getByText(title).first()).toBeAttached();
    }
  });

  test("service cards have features", async ({ page }) => {
    await page.goto("/");
    // Check that features exist (e.g., "React & Next.js" under Digital Strategy)
    await expect(
      page.getByText("React & Next.js").first()
    ).toBeAttached();
    await expect(page.getByText("Design Systems").first()).toBeAttached();
  });
});

// ─── STATS SECTION ─────────────────────────────────────────────

test.describe("Stats Section", () => {
  test("section header is visible", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("Metric marvels")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(
      page.getByText("Metric marvels").first()
    ).toBeVisible();
  });

  test("stat labels are present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("YEARS OF Experience").first()
    ).toBeAttached();
    await expect(
      page.getByText("PROJECTS DELIVERED").first()
    ).toBeAttached();
    await expect(
      page.getByText("Client Satisfaction Rate").first()
    ).toBeAttached();
  });

  test("breakdown items are present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("React / Next.js").first()).toBeAttached();
    await expect(page.getByText("Web Applications").first()).toBeAttached();
  });
});

// ─── TESTIMONIALS SECTION ──────────────────────────────────────

test.describe("Testimonials Section", () => {
  test("section header is present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("Applause Corner").first()
    ).toBeAttached();
  });

  test("testimonial cards render with content", async ({ page }) => {
    await page.goto("/");
    await page
      .getByText("Applause Corner")
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    // Check for at least one testimonial author
    await expect(
      page.getByText("Rahul Sharma").first()
    ).toBeAttached();
  });

  test("testimonial ticker has duplicated content for infinite scroll", async ({
    page,
  }) => {
    await page.goto("/");
    // The marquee ticker duplicates content — so "Rahul Sharma" should appear twice
    const items = page.getByText("Rahul Sharma");
    const count = await items.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});

// ─── BOOK A CALL SECTION ───────────────────────────────────────

test.describe("Book a Call Section", () => {
  test("availability text is present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("4th August 2026").first()
    ).toBeAttached();
  });

  test("CTA button exists with link", async ({ page }) => {
    await page.goto("/");
    const ctaLink = page.getByRole("link", { name: /BOOK A FREE CALL/i });
    await expect(ctaLink.first()).toBeAttached();
    const href = await ctaLink.first().getAttribute("href");
    expect(href).toContain("cal.com");
  });
});

// ─── FOOTER SECTION ────────────────────────────────────────────

test.describe("Footer", () => {
  test("footer is present with fixed positioning", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeAttached();
  });

  test("footer shows MUTHU KRISHNAN", async ({ page }) => {
    await page.goto("/");
    // Scroll to bottom to reveal footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const footerName = page.locator("footer").getByText("MUTHU KRISHNAN");
    await expect(footerName.first()).toBeAttached();
  });

  test("contact info is present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("hello@muthukrishnan.dev").first()
    ).toBeAttached();
    await expect(
      page.getByText("+91 98765 43210").first()
    ).toBeAttached();
  });

  test("footer clock renders", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    const clocks = page.locator("footer .tabular-nums");
    const count = await clocks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("legal links are present", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator("footer").getByText("Privacy Policy").first()
    ).toBeAttached();
    await expect(
      page.locator("footer").getByText("Terms & Conditions").first()
    ).toBeAttached();
    await expect(
      page.locator("footer").getByText("Imprint").first()
    ).toBeAttached();
  });

  test("social links in footer", async ({ page }) => {
    await page.goto("/");
    const footerSocials = page.locator("footer a[target='_blank']");
    const count = await footerSocials.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

// ─── RESPONSIVE REGRESSION ─────────────────────────────────────

test.describe("Responsive Regression", () => {
  test("page has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow).toBe(false);
  });

  test("all sections stack vertically", async ({ page }) => {
    await page.goto("/");
    // Ensure sections are not side by side
    const sections = page.locator("section");
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(5);

    for (let i = 1; i < Math.min(count, 4); i++) {
      const prev = await sections.nth(i - 1).boundingBox();
      const curr = await sections.nth(i).boundingBox();
      if (prev && curr) {
        // Each section should start below or at the previous one
        expect(curr.y).toBeGreaterThanOrEqual(prev.y);
      }
    }
  });

  test("images have alt text for accessibility", async ({ page }) => {
    await page.goto("/");
    const images = page.locator("img:not([alt])");
    const count = await images.count();
    expect(count).toBe(0);
  });
});
