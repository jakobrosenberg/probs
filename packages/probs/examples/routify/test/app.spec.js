
test("can see frontpage", async () => {
    await page.goto('http://localhost:3000')
    assert(await page.waitForSelector('"Routify 3 App"'))
});