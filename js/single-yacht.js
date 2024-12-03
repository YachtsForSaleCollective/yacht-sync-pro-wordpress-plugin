var singleYachtGalley=null;

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('lightgallery')) {
        console.log("Fired")
        singleYachtGalley=lightGallery(document.getElementById('lightgallery'), {
          plugins: [
            lgZoom,
            lgThumbnail,
            lgVideo,
            lgRotate,
            //lgShare
          ],
          speed: 200,
          //licenseKey: 'your_license_key',
          thumbnail:true,
          animateThumb: false,
          showThumbByDefault: true,
          download: false,
          selector: 'img',
          exThumbImage: 'data-thumb-src'
      });
    }

    if (document.getElementById('video-gallery')){
      lightGallery(document.getElementById('video-gallery'), {
        plugins: [lgVideo],
      })
    }

    document.querySelector('#ysp-single-y-image-topper .img1').addEventListener('click', function() {
      singleYachtGalley.openGallery(0);
    });

    document.querySelector('#ysp-single-y-image-topper .img2').addEventListener('click', function() {
      singleYachtGalley.openGallery(1);
    });

    document.querySelector('#ysp-single-y-image-topper .img3').addEventListener('click', function() {
      singleYachtGalley.openGallery(2);
    });
});


function copyLink() {

  var copyText = document.getElementById("shareLinkInput");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");

  alert("Copied the link: " + copyText.value);
}