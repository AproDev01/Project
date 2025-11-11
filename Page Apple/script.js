const mainImage = document.getElementById("mainImage");

function changePhone(src) {
  mainImage.style.opacity = 0;
  setTimeout(() => {
    mainImage.src = src;
    mainImage.style.opacity = 1;
  }, 300);
}
