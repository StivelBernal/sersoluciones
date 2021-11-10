<template>
	<div class="header-actions search-bar" id="search-main-container">
		<div class="interactive-input dark">
			<input type="text" id="search-main" name="search_main" v-model="searchString" :placeholder="placeholder">
			<div class="interactive-input-icon-wrap">
				<svg class="interactive-input-icon icon-magnifying-glass">
					<use xlink:href="#svg-magnifying-glass"></use>
				</svg>
			</div>

			<div class="interactive-input-action">
				<svg class="interactive-input-action-icon icon-cross-thin">
					<use xlink:href="#svg-cross-thin"></use>
				</svg>
			</div>
		</div>

		<div class="dropdown-box padding-bottom-small header-search-dropdown">
			<div class="loadingInfinity" v-if="loading" :style="{ backgroundImage: 'url('+static_url + loaderGif+')'}"></div>
			<template v-for="category in categories" v-else>
				<template v-if="category.data.length > 0">

					<div v-bind:key="category.name" class="dropdown-box-category">
						<p class="dropdown-box-category-title">{{ category.name }}</p>
					</div>

					<div  class="dropdown-box-list small no-scroll" v-bind:key="item.id" v-for="item in category.data">
						<a class="dropdown-box-list-item" :href="getSlug(item.type, item.slug)">
					
							<div class="user-status notification">							
								<p class="user-status-title"><span class="bold">{{item.title}}</span></p>

								<!-- <p class="user-status-text">1 friends in common</p> -->

								<!-- <div class="user-status-icon"> -->
								<!-- <svg class="icon-friend"> -->
									<!-- <use xlink:href="#svg-friend"></use> -->
								<!-- </svg> -->
								<!-- </div> -->
							</div>
						</a>
					</div>

				</template>
			</template>

		</div>

	</div>
</template>

<script>

	import axios from 'axios';

    export default {
        name: "headerSearch",
		data: () => {
			return {
				placeholder: 'Buscar',
				categories: {
					wordpress: { name: 'Publicaciones', data: [] },
					post: { name: 'Facebook', data: [] },
					conference: { name: 'Conferencias', data: [] },
					point: { name: 'Salas', data: [] },
					file: { name: 'Videos', data: [] },
					book: { name: 'Libros', data: [] }
				},
				loading: false,
				loaderGif: 'assets/gif/infinity-loading.gif',
				searchString: '',
				static_url: window.static_url,
				debounce: null,
				cancelToken: null
			}
		},
		watch: {
			searchString(val, oldVal) {

				if (val != '' && val != '' && oldVal != val && val.length > 2) {

					this.getResults();

				} else if (val === '') {

					this.loading = false;
					this.hasResults = false;

					clearTimeout(this.debounce);
					this.results = { 
						general: null,
						users: null,
						ips: null
					};
				}
			}
		},
		methods: {
			
			getSlug(type, slug) {
				switch(type) {
					case 'wordpress':
						slug = '/blog/' + slug;
						break; 
					case 'post':
						slug = 'post/' + slug;
						break; 
					case 'conference':
						slug = '/conferencia/' + slug;
						break; 
					case 'file':
						slug = 'libros/' + slug;
						break; 
					case 'media_file':
						slug = 'videos/' + slug;
						break; 
				}
				return slug;
			},
			getResults(){

				clearTimeout(this.debounce);

					this.debounce = setTimeout(() => {

						this.loading = true;

						this.cancelToken = axios.CancelToken.source();

						const startTime = new Date();

						let service_param = this.ServiceTypeId !== null ? 'serviceTypeId='+this.ServiceTypeId: '';
						// const url_search = `/api/v1/search/?p=${this.searchString}&ordering=${this.orderBy}&page_size=${this.pageSize}&page=${this.currentPage}`;

						const url_search = `/api/v1/search/?p=${this.searchString}`;
						
						axios
						.get(url_search,
							{
								cancelToken: this.cancelToken.token
							})
							.then(response => {

								for( let key in this.categories ) {
									this.categories[key].data = [];
								}

								response.data.forEach(x => {
									switch(x.type) {
										case 'wordpress':
											this.categories.wordpress.data.push(x);
											break; 
										case 'post':
											this.categories.post.data.push(x);
											break; 
										case 'point':
											this.categories.point.data.push(x);
											break; 
										case 'conference':
											this.categories.conference.data.push(x);
											break; 
										case 'file':
											this.categories.book.data.push(x);
											break; 
										case 'media_file':
											this.categories.file.data.push(x);
											break; 
									}

								});

								const finishTime = new Date();

								setTimeout(() => {
									this.loading = false;
								}, 1500 - (finishTime.getTime() - startTime.getTime()));

							})
							.catch(error => {
								console.log(error);
							});

					}, 600);

			}
		}
    };

</script>