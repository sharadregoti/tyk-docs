// plugins.js

function initFilterDropdown() {
    // Ensure that the event listener is attached only once
    var eventListenerAttached = false;
    if (!eventListenerAttached) {
        document.getElementById("filterDropdown").addEventListener("change", function () {

            var selectedCategory = this.value.toLowerCase();
            console.log("Selected Category:", selectedCategory);

            var itemsToDisplay = document.querySelectorAll(".release-card");

            itemsToDisplay.forEach(function (item) {
                var category = item.getAttribute("data-category");
                console.log("Item Category:", category);
                if (selectedCategory === "all" || category === selectedCategory) {
                    console.log("Displaying item:", item);
                    item.classList.add("visible");
                } else {
                    console.log("Hiding item:", item);
                    item.classList.remove("visible");
                }
            });
        });
        eventListenerAttached = true;
    }
}




function addTooltipToOverflowedText() {
    const headers = document.querySelectorAll('.overflow-tooltip');
    
    headers.forEach(header => {
        const text = header.querySelector('.release-header');
        if (text) {
            const isTextOverflowed = text.scrollWidth > text.clientWidth;
            if (isTextOverflowed) {
                // Check if tooltip already exists before adding
                if (!header.querySelector('.release-tooltip')) {
                    // Create a new tooltip element
                    const tooltip = document.createElement('div');
                    tooltip.classList.add('release-tooltip');
                    tooltip.textContent = text.textContent;
                    
                    // Append the tooltip as a sibling of the card header
                    header.parentNode.insertBefore(tooltip, header.nextSibling);
                }
            }
        }
    });
}


// function addTooltipToOverflowedText() {
//     const headers = document.querySelectorAll('.overflow-tooltip');
//     console.log("Found headers:", headers.length);

//     headers.forEach(header => {
//         const text = header.querySelector('.release-header');
//         if (text) {
//             const isTextOverflowed = text.scrollWidth > text.clientWidth;
//             console.log("Text overflow check:", isTextOverflowed, text.textContent);
//             if (isTextOverflowed) {
//                 // Check if tooltip already exists before adding
//                 if (!header.querySelector('.release-tooltip')) {
//                     // Create a new tooltip element
//                     const tooltip = document.createElement('div');
//                     tooltip.classList.add('release-tooltip');
//                     tooltip.textContent = text.textContent;
                    
//                     // Append the tooltip as a sibling of the card header
//                     header.parentNode.insertBefore(tooltip, header.nextSibling);
                    
//                     console.log("Tooltip added for text:", text.textContent);
//                 }
//             }
//         }
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    console.log("Initializing tooltip overflow...");
    addTooltipToOverflowedText();

    console.log("Initializing filter dropdown...");
    initFilterDropdown();
});
