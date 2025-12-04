FROM python:3.11-slim

# Prevent Chrome sandbox issues on EC2 / Docker
ENV CHROME_BIN=/usr/bin/google-chrome
ENV CHROMEDRIVER_AUTOINSTALL=1

# Install Chrome + required libs
RUN apt-get update && apt-get install -y \
    wget gnupg unzip curl \
    libnss3 libasound2 fonts-liberation \
    xdg-utils libu2f-udev libgbm1 \
    libx11-6 libxcomposite1 libxcursor1 \
    libxdamage1 libxext6 libxfixes3 libxi6 \
    libxrandr2 libxrender1 libdrm2 libxshmfence1 \
    libxss1 libxtst6 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Add Google’s Chrome repo
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | \
    gpg --dearmor -o /usr/share/keyrings/google-linux.gpg

RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux.gpg] \
    http://dl.google.com/linux/chrome/deb stable main" \
    > /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update && apt-get install -y google-chrome-stable && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies
WORKDIR /app
COPY tests/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install webdriver-manager to auto-match Chrome + Driver
RUN pip install webdriver-manager

# Copy tests
COPY tests/ /app/

CMD ["python", "-m", "pytest", "testing.py", "-v"]
