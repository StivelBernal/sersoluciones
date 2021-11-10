<template>
  <div class="widget-box no-padding post-item">
    <div class="widget-box-status">
      <div class="widget-box-status-content">
        <div class="user-status">
          <template v-if="post.post_type === 'img_face' || post.post_type === 'video_face'">

            <p class="user-status-title medium"><a class="bold"
                                                   target="_blank"
                                                   :href="post.featured_url"> {{ post.title }} </a>
            </p>
          </template>
          <template v-else>
            <p class="user-status-title medium">
              <a class="bold" :href="post.slug">{{ post.title }}</a>
            </p>
          </template>
          <p class="user-status-text small">{{ post.create_date | formatDatetime }}</p>
        </div>

        <p class="widget-box-status-text line-clamp">{{ post.description }}</p>
      </div>

      <template v-if="post.post_type === 'img' || post.post_type === 'img_face'">
        <figure class="widget-box-picture" v-on:click="view_image(post.featured_image)">
          <img :src="post.featured_image ?  post.featured_image: '/static/img/banner/event-default.jpg'"
               :alt="post.title">
        </figure>
      </template>

      <template v-else-if="post.post_type === 'video_face'">
        <div class="iframe-wrap">
          <iframe
              :src="'https://www.facebook.com/plugins/video.php?height=314&href=' + post.featured_url + '&show_text=false&width=560&t=0'"
              width="560" height="314" style="border:none;overflow:hidden" scrolling="no"
              frameborder="0" allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen="true">
          </iframe>
        </div>
      </template>
      <template v-else-if="post.post_type === 'video'">
        <div class="iframe-wrap">
          <iframe :src="post.featured_url" allowfullscreen></iframe>
        </div>
      </template>


      <div class="widget-box-status-content">
        <div class="tag-list">
          <!-- TAG ITEM -->
          <a v-for="tag in post.tags" class="tag-item secondary">{{ tag }}</a>
          <!-- /TAG ITEM -->
        </div>

      </div>
    </div>
    <br/>
    <div class="post-options">
      <div>

      </div>
      <div class="post-option share-button">
        <svg class="post-option-icon icon-share">
          <use xlink:href="#svg-share"></use>
        </svg>
        <p class="post-option-text">Compartir</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PostItem',
  props: {
    post: {}
  }
};
</script>