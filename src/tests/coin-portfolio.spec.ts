import { test, expect } from '@playwright/test';

// filtering
test.describe('Coin Filtering', () => {
  test('should filter coins based on search input', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const searchInput = page.locator(
      'input[placeholder="Search by name or symbol"]'
    );
    await expect(searchInput).toBeVisible();
    await searchInput.fill('ELON');

    const filteredCoin = page.locator('text=ELON');
    await page.waitForTimeout(1000);

    await expect(filteredCoin).toBeVisible({ timeout: 10000 });
    await expect(page.locator('tbody tr')).toHaveCount(1);
  });
});

// add coin
test.describe('Add Coin to Portfolio', () => {
  test('should add a coin and calculate the portfolio value', async ({
    page,
  }) => {
    await page.goto('/');

    await page.locator('text=Add').first().click();

    const quantityInput = page.locator('input[name="quantity"]');
    await quantityInput.fill('5');

    await page.locator('button.modal--add').click();

    const portfolioValue = page.locator('.portfolio__value');
    await expect(portfolioValue).toHaveText(/USD/);
  });
});

// remove coin
test.describe('Remove Coin from Portfolio', () => {
  test('should remove a coin from portfolio', async ({ page }) => {
    await page.goto('/');

    await page.locator('text=Add').first().click();

    const quantityInput = page.locator('input[name="quantity"]');
    await quantityInput.fill('2');
    await page.locator('button.modal--add').click();
    await page.locator('button.portfolio__button').click();

    await page.locator('button.modal--remove').first().click();

    const portfolioValue = page.locator('.empty-portfolio-message');
    await expect(portfolioValue).toHaveText('Portfolio is empty');
  });
});

// validation
test.describe('Validation on Add Coin', () => {
  test('should show error for invalid coin quantity', async ({ page }) => {
    await page.goto('/');

    await page.locator('text=Add').first().click();

    const quantityInput = page.locator('input[name="quantity"]');
    await quantityInput.fill('-1');
    await page.locator('button.modal--add').click();

    const errorMessage = page.locator('text=Invalid quantity');
    await expect(errorMessage).toBeVisible();
  });
});

// modal visibility
test.describe('Portfolio Modal Visibility', () => {
  test('should open and close the portfolio modal', async ({ page }) => {
    await page.goto('/');

    await page.locator('text=Add').first().click();

    const quantityInput = page.locator('input[name="quantity"]');
    await quantityInput.fill('2');
    await page.locator('button.modal--add').click();

    const openModalButton = page.locator('.portfolio__button');
    await openModalButton.click();

    const portfolioModal = page.locator('.modal');
    await expect(portfolioModal).toBeVisible();

    const closeModalButton = portfolioModal.locator('.modal--cancel');
    await closeModalButton.click();

    await expect(portfolioModal).not.toBeVisible();
  });
});
