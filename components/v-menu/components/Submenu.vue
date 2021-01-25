<template>
	<a-sub-menu :key="item.fullPath">
		<template v-slot:title>
				<v-icon :icon="item.meta.icon"></v-icon>
      {{ item.meta.title }}
		</template>
		<slot></slot>
	</a-sub-menu>
</template>

<script>
export default {
	name: 'Submenu',
	props: {
		item: {
			type: Object,
			default() {
				return null
			},
		},
		routeChildren: {
			type: Object,
			default() {
				return null
			},
		},
	},
	methods: {},
}
</script>
