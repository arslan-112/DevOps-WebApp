package tests;

import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;
import java.util.Map;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EliteToysTests {

    private static WebDriver driver;
    private static WebDriverWait wait;

    private static final String BASE_URL = 
            System.getenv().getOrDefault("BASE_URL", "http://3.111.81.89:3000");

    private static final String EMAIL = "arslan@gmail.com";
    private static final String PASSWORD = "123";

    @BeforeAll
    public static void setup() {
        ChromeOptions options = new ChromeOptions();

        options.addArguments(
            "--headless=new",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--window-size=1920,1080",
            "--disable-extensions",
            "--disable-setuid-sandbox",
            "--remote-debugging-port=9222",
            "--disable-dev-tools",
            "--disable-ipc-flooding-protection",
            "--disable-background-timer-throttling",
            "--disable-renderer-backgrounding",
            "--disable-backgrounding-occluded-windows",
            "--disable-features=VizDisplayCompositor",
            "--disable-features=IsolateOrigins,site-per-process",
            "--font-render-hinting=none",
            "--hide-scrollbars",
            "--mute-audio"
        );


        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterAll
    public static void teardown() {
        if (driver != null) driver.quit();
    }

    @Test
    @Order(1)
    public void testPageLoads() {
        driver.get(BASE_URL);
        String title = driver.getTitle();

        boolean ok =
                title.contains("Login") ||
                driver.findElement(By.tagName("h1")).getText().equals("Login");

        Assertions.assertTrue(ok, "Login page did not load");
    }

    @Test
    @Order(2)
    public void testLoginSuccess() {
        driver.get(BASE_URL);

        WebElement emailInput = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@placeholder='Email']"))
        );
        WebElement passwordInput = driver.findElement(By.xpath("//input[@placeholder='Password']"));
        WebElement btn = driver.findElement(By.tagName("button"));

        emailInput.sendKeys(EMAIL);
        passwordInput.sendKeys(PASSWORD);
        btn.click();

        wait.until(ExpectedConditions.urlContains("/home"));
        Assertions.assertTrue(driver.getCurrentUrl().contains("/home"));
    }

    @Test
    @Order(3)
    public void testShopProductsVisible() {
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className("Item")));
        Assertions.assertTrue(
                driver.findElements(By.className("Item")).size() > 0,
                "No products found"
        );
    }

    @Test
    @Order(4)
    public void testNavigateToProductDetail() {
        try {
            WebElement firstProduct = wait.until(
                    ExpectedConditions.elementToBeClickable(
                            By.cssSelector(".product-list > div:first-child")
                    )
            );
            firstProduct.click();
        } catch (Exception ex) {
            driver.findElement(By.cssSelector(".product-list a")).click();
        }

        wait.until(ExpectedConditions.urlContains("/Shop/"));
        Assertions.assertTrue(driver.getCurrentUrl().contains("/Shop/"));
    }

    @Test
    @Order(5)
    public void testProductDetailShowsNameAndPrice() {
        WebElement name = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.className("product-name"))
        );
        WebElement price = driver.findElement(By.className("price"));

        Assertions.assertFalse(name.getText().trim().isEmpty());
        Assertions.assertTrue(price.getText().contains("Rs."));
    }

    @Test
    @Order(6)
    public void testChangeQuantity() {
        WebElement qty = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.id("quantity"))
        );

        qty.clear();
        qty.sendKeys("3");

        Assertions.assertEquals("3", qty.getAttribute("value"));
    }

    @Test
    @Order(7)
    public void testAddToCart() throws Exception {
        WebElement addBtn = wait.until(
                ExpectedConditions.elementToBeClickable(By.className("add-to-cart-btn"))
        );

        String productName = driver.findElement(By.className("product-name")).getText().trim();

        addBtn.click();
        Thread.sleep(1000);

        String localStorage = (String) ((JavascriptExecutor) driver)
                .executeScript("return localStorage.getItem('cartItems');");

        Assertions.assertNotNull(localStorage, "Cart is empty in localStorage");

        Map<String, Object> cart =
                new com.fasterxml.jackson.databind.ObjectMapper().readValue(localStorage, Map.class);

        Assertions.assertTrue(cart.containsKey(productName));
        Map<String, Object> item = (Map<String, Object>) cart.get(productName);

        Integer qty = (Integer) item.get("quantity");
        Assertions.assertTrue(qty >= 1);
    }

    @Test
    @Order(8)
    public void testFooterCopyright() {
        WebElement footer = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.className("Footer"))
        );

        Assertions.assertTrue(
                footer.getText().contains("© 2024 EliteToys by Arslan")
        );
    }

    @Test
    @Order(9)
    public void testMyOrdersPage() {
        driver.get(BASE_URL + "/MyOrders");

        boolean ok =
                driver.getTitle().contains("MyOrders") ||
                driver.getCurrentUrl().endsWith("/MyOrders");

        Assertions.assertTrue(ok);
    }

    @Test
    @Order(10)
    public void testLogoutOrReloginPossible() {
        driver.get(BASE_URL);

        WebElement h1 = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.tagName("h1"))
        );

        Assertions.assertTrue(
                h1.getText().equals("Login") || h1.getText().equals("Sign Up")
        );
    }
}
