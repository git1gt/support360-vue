<template>
  <div class="border-b border-gray-200 last:border-b-0">
    <button
      @click="toggleOpen"
      class="flex justify-between items-center w-full py-4 text-left text-gray-800 hover:text-primary focus:outline-none transition-colors"
    >
      <span class="font-semibold">{{ question }}</span>
      <svg
        :class="[
          'w-5 h-5 transform transition-transform',
          isOpen ? 'rotate-180' : ''
        ]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div 
      :class="[
        'overflow-hidden transition-all duration-300',
        isOpen ? 'max-h-96 pb-4' : 'max-h-0'
      ]"
    >
      <p class="text-gray-600">
        <span 
          v-for="(line, index) in answerLines" 
          :key="index"
        >
          {{ line }}
          <br v-if="index < answerLines.length - 1" />
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  question: string
  answer: string
}

const props = defineProps<Props>()

const isOpen = ref(false)

// Разбиваем ответ на строки для корректного отображения переносов
const answerLines = computed(() => {
  return props.answer.split('\n')
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>