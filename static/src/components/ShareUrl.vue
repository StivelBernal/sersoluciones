<template>
    <div class="share-url" data-app :class="contentClass">
		
		<v-icon class="menu-share"  v-if="!isDesktop" v-on:click="nativeShare">share</v-icon>			
		
		<v-menu v-else
		v-model="menu"
		max-width="220"
		z-index="101"
		close-on-click
		close-on-content-click
		content-class="menu-share-content"
		:top="offset"
		>
		<template v-slot:activator="{ on, attrs }">
			<v-icon class="menu-share" v-bind="attrs" v-on="on">share</v-icon>			
		</template>

		<v-card>
			<v-list-item>
				<v-list-item-content>
					<v-list-item v-on:click="copyClipBoard(domain)">
						<v-list-item-icon>
							<svg class="icon-share svg" xmlns="http://www.w3.org/2000/svg">
								<use xlink:href="#svg-copy"></use>
							</svg>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>Copiar enlace</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item link target="_blank" :href="'https://t.me/share/url?url=' + domain">
						<v-list-item-icon>
							<div class="icon-share" style="background-image: url(https://d320eox725dcq1.cloudfront.net/assets/images/settings/telegram.svg);"></div>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>Telegram</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item link target="_blank" :href="'https://www.facebook.com/dialog/share?app_id=889373954845473&displaypage&href=' + domain">
						<v-list-item-icon>
							<div class="icon-share" style="background-image: url(https://d320eox725dcq1.cloudfront.net/assets/images/settings/facebook_logo.svg);"></div>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>Facebook</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item link target="_blank" :href="'https://api.whatsapp.com/send?text=' + domain">
						<v-list-item-icon>
							<div class="icon-share" style="background-image: url(https://d320eox725dcq1.cloudfront.net/assets/images/settings/whatsapp.svg);"></div>
						</v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>WhatsApp</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-content>
			</v-list-item>
		</v-card>
		</v-menu>

		<v-snackbar v-model="showSnackCopy" >Copiado al portapapeles</v-snackbar>

    </div>
</template>

<script>
	import * as Bowser from 'bowser';

    export default {
        name: "shareUrl",
        props: {
            contentClass: {
                type: String
            }
		},
		data: () => {
			return {
				offset: true,
				menu: false,
				isDesktop: Bowser.getParser(window.navigator.userAgent).getPlatformType() === 'desktop',
                domain: window.location.origin,
				showSnackCopy: false
            };
        },
		methods: {
			nativeShare() {
				
				if (navigator.share) {

					if (this.isDesktop) {
						this.menu = true;
					} else {

						navigator.share({
							title: 'Tienda',
							url: this.domain
						}).then(() => { });

					}

				} else {
					this.menu = true;
				}
			},
			copyClipBoard( url ) {

				var tempInput = document.createElement("input");
				tempInput.value = url;
				document.body.appendChild(tempInput);
				tempInput.select();
				document.execCommand("copy");
				document.body.removeChild(tempInput);

				this.showSnackCopy = true;

			}
		}
    };

</script>