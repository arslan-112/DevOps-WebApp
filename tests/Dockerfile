# tests/Dockerfile
FROM maven:3.9.10-eclipse-temurin-21

# Install dependencies
RUN apt-get update -qqy \
    && apt-get -qqy install wget ca-certificates gnupg unzip \
    && rm -rf /var/lib/apt/lists/*

# Add Google's GPG key (modern way)
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /etc/apt/trusted.gpg.d/google-chrome.gpg

# Add Chrome repo
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb stable main" > /etc/apt/sources.list.d/google-chrome.list

# Install LATEST Chrome (do NOT pin version)
RUN apt-get update -qqy \
    && apt-get -qqy install google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/*

# Automatically get Chrome version and install matching ChromeDriver
RUN CHROME_VERSION=$(google-chrome --version | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+\.[0-9]\+') && \
    CHROME_MAJOR=$(echo $CHROME_VERSION | cut -d. -f1) && \
    DRIVER_VERSION=$(curl -s "https://googlechromelabs.github.io/chrome-for-testing/latest-versions-per-milestone.json" | \
                     python3 -c "import sys, json; print(json.load(sys.stdin)['milestones'][str($CHROME_MAJOR)]['version'])") && \
    echo "Chrome: $CHROME_VERSION → ChromeDriver: $DRIVER_VERSION" && \
    wget -q "https://storage.googleapis.com/chrome-for-testing-public/$DRIVER_VERSION/linux64/chromedriver-linux64.zip" -O /tmp/chromedriver.zip && \
    unzip /tmp/chromedriver.zip -d /opt && \
    rm /tmp/chromedriver.zip && \
    ln -sf /opt/chromedriver-linux64/chromedriver /usr/bin/chromedriver

# Disable Chrome sandbox by default (for containers)
RUN sed -i 's/"$HERE\/chrome"/"$HERE\/chrome" --no-sandbox/g' /opt/google/chrome/google-chrome

WORKDIR /usr/src/app