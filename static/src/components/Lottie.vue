<template>
    <div :id="id" v-bind:style="{ height: height, width: width }"></div>
</template>

<script>
    // import * as lottie from 'lottie-web/build/player/lottie_light'
    import lottie from 'lottie-web';

    export default {
        name: 'lottie',
        props: ['id', 'url', 'height', 'width', 'renderer'],
        data: function () {
            return {

                lazyLoading: true,
            
            }
       
        },
        mounted: function() {
            console.log(this.id, this.url)
            this.anim = lottie.loadAnimation({
                container: document.getElementById(this.id), // ID del div
                path: this.url, // Ruta fichero .json de la animación
                renderer: 'canvas', // Requerido
                loop: true, // Opcional
                autoplay: true, // Opcional
            })
            this.$emit('animCreated', this.anim)

        }

    }
</script>