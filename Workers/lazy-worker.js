// I'm making the event handler `async` to make my life easier. If
// you're not compiling your code, you may want to use the Promise-based
// API of `fetch`

const loadedImages = {};

self.addEventListener('message', async event => {
   // Grab the url from the event - we'll use this both to download
   // the image and to identify which image elements to update back in the
   // UI thread
   const url = event.data

   // Check if image is already loaded
   // TODO: need to check if this is working
   if (loadedImages.url) {
      // console.log("Image already loaded, returning blob")

      let blob = loadedImages.url;

      // Send the image data to the UI thread!
      self.postMessage({
         url,
         blob,
      })

   } else {
      // console.log("Loading Image")

      // First, we'll fetch the image file
      const response = await fetch(url)

      // Once the file has been fetched, we'll convert it to a `Blob`
      const blob = await response.blob()

      // Store image
      loadedImages.url = blob;

      // Send the image data to the UI thread!
      self.postMessage({
         url,
         blob,
      })
   }
})