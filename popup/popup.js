const toggleButton = document.getElementById('toggleButton');

browser.storage.local.get('extensionEnabled', (data) => {
    const isEnabled = data.extensionEnabled ?? true;
    updateUi(isEnabled)
})

toggleButton.addEventListener('click', () => {
    browser.storage.local.get('extensionEnabled', (data) => {
        const isEnabled = data.extensionEnabled ?? true;

        browser.storage.local.set({extensionEnabled : !isEnabled});
        updateUi(!isEnabled);
        console.log("New state : ", !isEnabled)
    })
})

function updateUi(isEnabled) {
    if (isEnabled) {
        toggleButton.textContent = 'Activated';
    } else {
        toggleButton.textContent = 'Deactivated';
    }
}