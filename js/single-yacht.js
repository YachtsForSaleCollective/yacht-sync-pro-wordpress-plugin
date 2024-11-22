document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('lightgallery')) {
        console.log("Fired")
        lightGallery(document.getElementById('lightgallery'), {
          plugins: [
            lgZoom,
            //lgThumbnail,
            lgVideo,
            lgRotate,
            //lgShare
          ],
          speed: 500,
          //licenseKey: 'your_license_key',
          thumbnail:true,
          animateThumb: false,
          showThumbByDefault: false,
          download: false,
          selector: 'img'
      });
    }

    if (document.getElementById('video-gallery')){
      lightGallery(document.getElementById('video-gallery'), {
        plugins: [lgVideo],
      })
    }
});