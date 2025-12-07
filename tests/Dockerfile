# tests/Dockerfile
FROM maven:3.9.10-eclipse-temurin-21

RUN apt-get update -qqy \
    && apt-get -qqy install wget ca-certificates gnupg unzip \
    && rm -rf /var/lib/apt/lists/*

# Add Chrome repo
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /etc/apt/trusted.gpg.d/google-chrome.gpg
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main" > /etc/apt/sources.list.d/google-chrome.list

# Install Chrome 126 (compatible with Selenium 4.18.1)
RUN apt-get update -qqy \
    && apt-get -qqy install google-chrome-stable=126.0.6478.126-1 \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Install matching ChromeDriver 126
RUN CHROME_DRIVER_VERSION="126.0.6478.126" \
    && wget -q "https://storage.googleapis.com/chrome-for-testing-public/$CHROME_DRIVER_VERSION/linux64/chromedriver-linux64.zip" -O /tmp/chromedriver.zip \
    && unzip /tmp/chromedriver.zip -d /opt \
    && rm /tmp/chromedriver.zip \
    && ln -sf /opt/chromedriver-linux64/chromedriver /usr/bin/chromedriver

# Disable sandbox
RUN sed -i 's/"$HERE\/chrome"/"$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome

WORKDIR /usr/src/app