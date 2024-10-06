// content.js

// Function to download images from the page
function downloadImages() {
  let counter = 0;
  const images = document.querySelectorAll(
    '.panel-body > .row img[src$=".jpg"]'
  );

  images.forEach((img) => {
    const model = img
      .closest(".panel-body")
      .querySelector("h4")
      .textContent.replace(/ /g, "_");
    const url = img.src.replace("/m/", "/o/");
    const plate = img
      .closest(".panel-body")
      .querySelector('img[src$=".png"]').alt;

    setTimeout(() => {
      const parts = url.split("/");
      const filename = `${model}_${plate}_${parts[parts.length - 1]}`;

      // Initiate download
      chrome.runtime.sendMessage({ action: "download", url, filename: filename.replace(/\//g, '') });

      console.log(url);
      document.title = `Saving... ${--counter}`;

      if (counter === 0) {
        const paginationLinks = document.querySelectorAll(".pagination a");
        if (paginationLinks.length > 0) {
          window.location.href =
            paginationLinks[paginationLinks.length - 1].href;
        }
      }
    }, counter * 800);
    counter++;
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "downloadImages") {
    downloadImages();
  }
});
