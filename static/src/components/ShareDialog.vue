<template>
  <div class="share-dialog">
    <div class="header-dialog">
      <h3 class="dialog-title">Comparte este tema</h3>
      <button class="close-button">
        <svg>
          <use href="#close"></use>
        </svg>
      </button>
    </div>

    <!-- PROFILE HEADER SOCIAL LINKS WRAP -->
    <div class="grid-social-container">
      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link facebook"
           :href='"https://facebook.com/sharer/sharer.php?u=" '
           target="_blank">
          <!-- ICON FACEBOOK -->
          <svg class="icon-facebook">
            <use xlink:href="#svg-facebook"></use>
          </svg>
          <!-- /ICON FACEBOOK -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>

      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link twitter"
           :href='"https://twitter.com/intent/tweet/?text=" +  post.title + "&url="'
           target="_blank">
          <!-- ICON TWITTER -->
          <svg class="icon-twitter">
            <use xlink:href="#svg-twitter"></use>
          </svg>
          <!-- /ICON TWITTER -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>

      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link linkedin"
           :href='"https://www.linkedin.com/shareArticle?mini=true&url="  +"&title=" + post.title + "&summary=" + post.title + "&source="  '
           target="_blank">
          <!-- ICON YOUTUBE -->
          <svg class="icon-linkedin">
            <use xlink:href="#svg-linkedin"></use>
          </svg>
          <!-- /ICON YOUTUBE -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>

      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link pinterest"
           :href='"https://pinterest.com/pin/create/button/?url=" + "&media=" + "&description=" + post.title'
           target="_blank">
          <!-- ICON YOUTUBE -->
          <svg class="icon-pinterest">
            <use xlink:href="#svg-pinterest"></use>
          </svg>
          <!-- /ICON YOUTUBE -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>

      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link whatsapp"
           :href='"https://api.whatsapp.com/send?text=" + post.title + " " '
           target="_blank">
          <!-- ICON DISCORD -->
          <svg class="icon-whatsapp">
            <use xlink:href="#svg-whatsapp"></use>
          </svg>
          <!-- /ICON DISCORD -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>

      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link telegram"
           :href='"https://telegram.me/share/url?text=" + post.title + "&url=" '
           target="_blank">
          <!-- ICON TWITCH -->
          <svg class="icon-telegram">
            <use xlink:href="#svg-telegram"></use>
          </svg>
          <!-- /ICON TWITCH -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>

      <div class="profile-header-social-link">
        <!-- SOCIAL LINK -->
        <a class="social-link email"
           :href='"mailto:?subject=" + post.title + "&body=" '
           target="_blank">
          <!-- ICON DISCORD -->
          <svg class="icon-email">
            <use xlink:href="#svg-email"></use>
          </svg>
          <!-- /ICON DISCORD -->
        </a>
        <!-- /SOCIAL LINK -->
      </div>


    </div>
    <!-- /PROFILE HEADER SOCIAL LINKS WRAP -->

    <div class="link">
      <div class="pen-url">https...</div>
      <button class="copy-link">Copiar Link</button>
    </div>
  </div>

</template>
<script>
export default {
  name: 'ShareDialog',
  props: {
    post: {}
  }
};
</script>