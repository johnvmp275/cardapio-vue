<template>
    <div class="dropdown" @click="showDropdown">
        <div class="selected-item">
            {{ ItemSelected }}
        </div>
        <div class="dropdown-list" v-show="dropdownOpen">
            <div class="dropdown-item" v-for="item in items" :key="item.value" @click="selectItem(item.value)">
                <span>
                    {{ item.label }}
                </span>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            dropdownOpen: false,
        };
    },
    props: {
        items: {
            type: Array,
        },
        selectedItem: {
            type: Object,
        },
        invalid: {
            type: Object,
        },
    },
    computed: {
        ItemSelected() {
            const itemObject = this.items.find(item => item.value === this.selectedItem);
            return itemObject.label
        },
    },
    methods: {
        showDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        selectItem(value) {
            this.$emit('item-selected', value);
            this.dropdownOpen = true;
        },
    },
};
</script>
    
<style scoped>
.dropdown {
    position: relative;
    display: flex;
    width: 100%;
    max-width: 200px;
}

.selected-item {
    padding: 10px;
    background: var(--background-branco);
    border: 1px solid var(--background-cinza);
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
}

.selected-item.invalid {
    border: 2px solid red;
}

.dropdown-list {
    position: absolute;
    top: 52px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: var(--background-branco);
    border: 1px solid var(--background-cinza);
    border-radius: 5px;
}

.dropdown-list::before {
    content: '';
    position: absolute;
    z-index: 1000;
    display: flex;
    width: 10px;
    height: 10px;
    top: -6px;
    right: calc(50% - 5px);
    transform: rotate(45deg);
    background: var(--background-branco);
    border-left: 1px solid var(--background-cinza);
    border-top: 1px solid var(--background-cinza);
}

.dropdown-item {
    padding: 10px;
    display: flex;
    cursor: pointer;
}

.dropdown-item span {
    width: 100%;
    display: flex;
}
</style>