# tests/test_e2e.py
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
import time

# Use BASE_URL from env (set in docker-compose or Jenkins)
BASE_URL = os.getenv("BASE_URL", "http://3.111.81.89:3001")
EMAIL = "arslan@gmail.com"
PASSWORD = "123"

@pytest.fixture(scope="module")
def browser():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--disable-dev-tools")
    chrome_options.add_argument("--remote-debugaging-port=9222")
    chrome_options.add_argument("--disable-extensions")

    service = Service()
    driver = webdriver.Chrome(service=service, options=chrome_options)
    yield driver
    driver.quit()

def test_1_page_loads(browser):
    browser.get(BASE_URL)
    assert "Login" in browser.title or "Login" in browser.page_source

def test_2_login_success(browser):
    browser.get(BASE_URL)
    email_input = WebDriverWait(browser, 15).until(
        EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Email']"))
    )
    password_input = browser.find_element(By.XPATH, "//input[@placeholder='Password']")
    continue_button = browser.find_element(By.TAG_NAME, "button")
    email_input.send_keys(EMAIL)
    password_input.send_keys(PASSWORD)
    continue_button.click()
    WebDriverWait(browser, 15).until(EC.url_contains("/home"))
    assert "/home" in browser.current_url

def test_3_shop_page_has_products(browser):
    WebDriverWait(browser, 15).until(EC.presence_of_element_located((By.CLASS_NAME, "Item")))
    items = browser.find_elements(By.CLASS_NAME, "Item")
    assert len(items) > 0

def test_4_navigate_to_first_product_detail(browser):
    first_product = WebDriverWait(browser, 15).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, ".Item a"))
    )
    first_product.click()
    WebDriverWait(browser, 15).until(EC.url_contains("/Shop/"))
    assert "/Shop/" in browser.current_url

def test_5_product_detail_shows_name_and_price(browser):
    name = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "product-name"))
    )
    price = browser.find_element(By.CLASS_NAME, "price")
    assert name.text.strip() != ""
    assert "Rs." in price.text

def test_6_change_quantity(browser):
    qty = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.ID, "quantity"))
    )
    qty.clear()
    qty.send_keys("3")
    assert qty.get_attribute("value") == "3"

def test_7_add_to_cart(browser):
    add_btn = WebDriverWait(browser, 10).until(
        EC.element_to_be_clickable((By.CLASS_NAME, "add-to-cart-btn"))
    )
    add_btn.click()
    time.sleep(2)
    cart = browser.execute_script("return localStorage.getItem('cartItems');")
    assert cart is not None

def test_8_verify_footer_copyright(browser):
    WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "Footer"))
    )
    footer = browser.find_element(By.CLASS_NAME, "Footer").text
    assert "© 2024 EliteToys by Arslan" in footer

def test_9_access_my_orders(browser):
    browser.get(f"{BASE_URL}/MyOrders")
    assert "/MyOrders" in browser.current_url

def test_10_relogin_possible(browser):
    browser.get(BASE_URL)
    h1 = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "h1"))
    )
    assert h1.text in ["Login", "Sign Up"]