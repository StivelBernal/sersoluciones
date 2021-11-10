<template>

    <div class="events-facebook">
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

        <!-- GRID -->
        <div v-if="!isLoad" class="grid grid-4-4-4 centered" style="margin-top:80px;" >

            <!-- EVENT PREVIEW -->
            <div class="event-preview" v-for="event in events" v-bind:key="event.title">
            <!-- EVENT PREVIEW COVER -->
                <figure class="event-preview-cover facebook-event liquid">
                    <img v-if="event.cover" :src="event.cover.source" :alt="event.name">
                    <img v-else src="/static/img/banner/event-default.jpg" :alt="event.name">
                </figure>
                <!-- /EVENT PREVIEW COVER -->
        
                <!-- EVENT PREVIEW INFO -->
                <div class="event-preview-info">
                    <!-- EVENT PREVIEW INFO TOP -->
                    <div class="event-preview-info-top">
                    <!-- DATE STICKER -->
                    <div class="date-sticker">
                        <!-- DATE STICKER DAY -->
                        <p class="date-sticker-day">{{event.start_time|formatDate('d') }}</p>
                        <!-- /DATE STICKER DAY -->
                
                        <!-- DATE STICKER MONTH -->
                        <p class="date-sticker-month">{{event.start_time|formatDate('MM') }} </p>
                        <!-- /DATE STICKER MONTH -->
                    </div>
                    <!-- /DATE STICKER -->
            
                    <!-- EVENT PREVIEW TITLE -->
                    <a class="event-preview-title line-clamp-2 popup-event-information-trigger">{{ event.name }}</a>
                    <!-- /EVENT PREVIEW TITLE -->
            
                    <!-- EVENT PREVIEW TIMESTAMP -->
                    <p class="event-preview-timestamp"><span class="bold">{{ event.start_time | formatDate('HH:mm a' )}}</span> </p>
                    <!-- /EVENT PREVIEW TIMESTAMP -->
            
                    <!-- EVENT PREVIEW TEXT -->
                    <p class="event-preview-text line-clamp-4">{{ event.description }}</p>
                    <!-- /EVENT PREVIEW TEXT -->
                    </div>
                    <!-- /EVENT PREVIEW INFO TOP -->
            
                    <!-- EVENT PREVIEW INFO BOTTOM -->
                    <div class="event-preview-info-bottom">
            
                    <!-- BUTTON -->
                    <!-- <a v-if="event.owner.id === '285555292306129'" href="https://www.facebook.com/cdsmonline/live" class="button primary button-action-event" >Ver más</a>
                    <a v-else-if="event.owner.id === '110760923988246'" href="https://www.facebook.com/TheRealInnerRevolution/live" class="button primary button-action-event" >Ver más</a>
                    <a v-else-if="event.owner.id === '103612371752137'" href="https://www.facebook.com/conoserse/live" class="button primary button-action-event" >Ver más</a>
                    <a v-else-if="event.owner.id === '428870937481976'" href="https://www.facebook.com/expansionDELconocimientoDEsiMISMO/live" class="button primary button-action-event" >Ver más</a>
                    <a v-else-if="event.owner.id === '200343630307834'" href="https://www.facebook.com/conocimientodesimismopanama/live" class="button primary button-action-event" >Ver más</a>
                    <a v-else-if="event.owner.id === '1590124701316805'" href="https://www.facebook.com/Practicaconocimientodesimismo/live" class="button primary button-action-event" >Ver más</a>
                     -->

                    <a  :href="event.url" class="button primary button-action-event" >Ver más</a>

                    
                    <!-- /BUTTON -->
                    </div>
                    <!-- /EVENT PREVIEW INFO BOTTOM -->
                </div>
                <!-- /EVENT PREVIEW INFO -->
            </div>
            <!-- /EVENT PREVIEW -->

        </div>

    </div>
</template>

<script>
    // import Vue from 'vue';

    export default {
        name: "events-facebook",
        data: () => {
            return {
                events: [],
                isLoad: false
            };
        },
        created () {

            var self = this;
            self.isLoad = true;

            fetch('/api/v1/eventos-facebook?serialize=true&format=json')
            .then(response => response.json())
            .then(data => { 

                    self.isLoad = false;

                    // console.log(data)
                    self.events = data;
                    
                } 
            );

            // var self = this;

            // var load_post = () => {

            //     if (window.innerHeight + window.scrollY >= self.$el.offsetTop) {
                    
            //         if (self.hasNextPage && !self.isLoad) {
                        
            //             self.isLoad = true;
                        
            //             self.currentPage++;

            //             axios
            //                 .get(
            //                     `/api/v1/posts/select/?ordering=${self.orderBy}&page_size=${self.pageSize}&page=${self.currentPage}`
            //                 )
            //                 .then(response => {
                                
            //                     self.hasNextPage = response.data.next === null ? false: true;

            //                     for (let index = 0; index < response.data.results.length; index++) {

            //                         let PostItemI = Vue.extend(PostItem);

            //                         let instance = new PostItemI({
            //                             propsData: { post: response.data.results[index] }
            //                         });


            //                         instance.$mount();

            //                         self.$el.parentNode.insertBefore( instance.$el, self.$el );
                                    
            //                     }
            //                 })
            //                 .catch(error => {
                                
            //                     let response = error.response;
                                
            //                     if(response) {
            //                         if( response.status === 404 ) {
            //                             self.hasNextPage = false;
            //                         }
            //                     }
                                
            //                 })
            //                 .finally(() => { 
            //                     self.isLoad = false;
            //                 });
            //         }

            //     };


            // };

            // window.addEventListener('scroll', load_post);

        }
    };
</script>