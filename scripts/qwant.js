function getUrls() {
    const results = document.querySelectorAll('[data-testid="webResult"]');
    console.log(results);
    let urls = []
    for (let i = 0; i<results.length; i++) {
        console.log(results[i].getAttribute("domain"))
        urls.push(results[i].getAttribute("domain"));
    }
    console.log(urls);
    return urls;
}

async function testUrl(url) {
    try {
        const response = await fetch(url);
        console.log(url, "success");
    } catch (e) {
        console.log(url, "failed", e);
    }
}

function waitForElement(selector, callback) {
    const observer = new MutationObserver((mutations, observer) => {
        const element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback(element);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
}



// Usage
waitForElement('[data-testid="webResult"]', async (element) => {
    console.log("test");
    const urls = getUrls();
    await Promise.all(urls.map(url => testUrl(url)));
    // Perform actions on the element
});

