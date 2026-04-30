function getUrls() {
    const results = document.querySelectorAll('[data-testid="webResult"]');
    console.log(results);
    let results_array = []
    for (let i = 0; i<results.length; i++) {
        console.log(results[i]);
        results_array.push(results[i]);
    }
    console.log(results_array);
    return results_array;
}

async function testUrl(result) {
    try {
        const response = await fetch(result.getAttribute('domain'));
        console.log(result, "success", response.text());
    } catch (e) {
        console.log(result, "failed", e);
        result.remove()
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
    const results = getUrls();
    await Promise.all(results.map(result => testUrl(result)));
    // Perform actions on the element
});

