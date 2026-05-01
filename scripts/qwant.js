function getResults() {
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



function removeBlockedUrls() {
    browser.storage.local.get("extensionEnabled", (data) => {
        if (data.extensionEnabled) {
            console.log('Activated...');
            waitForElement('[data-testid="webResult"]', async (element) => {
                const results = getResults();
                await Promise.all(results.map(result => testUrl(result)));
            });
        } else {console.log("Deactivated...")}
    })
}


removeBlockedUrls() //On page load

// Execution when we press enter (it don't refresh the page)
document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        removeBlockedUrls();
    }
})