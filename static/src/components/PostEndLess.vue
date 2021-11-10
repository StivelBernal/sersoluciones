<template>
  <div>
    <div v-if="isLoad" class="loader-bars">
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
      <div class="loader-bar"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import PostItem from './PostItem';
import ShareDialog from './ShareDialog';

export default {
  name: "posts-rest",
  components: {PostItem, ShareDialog},
  data: () => {
    return {
      hasNextPage: true,
      pageSize: 10,
      currentPage: 1,
      orderBy: 'title',
      sortReverse: false,
      isLoad: false
    };
  },
  beforeMount() {
    this.fetchPosts();
  },
  methods: {

    fetchPosts: function () {
      var self = this;
      self.isLoad = true;

      self.currentPage++;

      axios
          .get(
              `/api/v1/posts/select/?ordering=${self.orderBy}&page_size=${self.pageSize}&page=${self.currentPage}`
          )
          .then(response => {

            console.log(response)

            self.hasNextPage = response.data.next === null ? false : true;

            for (let index = 0; index < response.data.results.length; index++) {

              let PostItemI = Vue.extend(PostItem);

              let instance = new PostItemI({
                propsData: {post: response.data.results[index]}
              });


              instance.$mount();

              self.$el.parentNode.insertBefore(instance.$el, self.$el);

            }
          })
          .catch(error => {

            let response = error.response;

            if (response) {
              if (response.status === 404) {
                self.hasNextPage = false;
              }
            }

          })
          .finally(() => {
            self.isLoad = false;
          });
    }
  },

  created() {

    var self = this;

    var load_post = () => {

      if (window.innerHeight + window.scrollY >= self.$el.offsetTop) {

        if (self.hasNextPage && !self.isLoad) {
          this.fetchPosts();

        }

      }


    };

    window.addEventListener('scroll', load_post);

  }
};
</script>