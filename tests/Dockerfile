FROM python:3.11-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget unzip gnupg curl \
    libnss3 libgconf-2-4 libasound2 \
    fonts-liberation xdg-utils libu2f-udev \
    libatk1.0-0 libatk-bridge2.0-0 libgbm1 \
    libx11-6 libxcomposite1 libxcursor1 libxdamage1 \
    libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libdrm2 libxshmfence1 libxss1 libxtst6 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Install Google Chrome
RUN wget -q -O chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && apt-get install -y ./chrome.deb && rm chrome.deb

RUN CHROME_VERSION=$(google-chrome --version | awk '{print $3}') && \
    DRIVER_VERSION=$(wget -qO- https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_${CHROME_VERSION%.*}) && \
    wget -q https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/$DRIVER_VERSION/linux64/chromedriver-linux64.zip && \
    unzip chromedriver-linux64.zip && \
    mv chromedriver-linux64/chromedriver /usr/local/bin/chromedriver && \
    chmod +x /usr/local/bin/chromedriver && \
    rm -rf chromedriver-linux64*


# Python dependencies
WORKDIR /app
COPY tests/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY tests/ /app/

CMD ["python", "-m", "pytest", "testing.py", "-v"]
