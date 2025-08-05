<template>
  <div class="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
    <!-- Заголовок чата -->
    <div class="bg-primary py-3 px-4 text-white flex items-center">
      <div class="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center mr-3">
        <span class="text-xl">S</span>
      </div>
      <div>
        <p class="font-semibold">Support360</p>
        <p class="text-xs">Комната 304</p>
      </div>
    </div>
    
    <!-- Область сообщений -->
    <div class="h-72 p-4 overflow-y-auto flex flex-col space-y-3 bg-gray-50">
      <div 
        v-for="msg in messages" 
        :key="msg.id" 
        :class="['flex', msg.isUser ? 'justify-end' : 'justify-start']"
      >
        <div :class="[
          'max-w-[70%] p-3 rounded-lg',
          msg.isUser 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-white text-gray-800 shadow-sm rounded-tl-none'
        ]">
          <p>{{ msg.text }}</p>
          <p :class="[
            'text-xs mt-1 text-right',
            msg.isUser ? 'text-white/70' : 'text-gray-500'
          ]">{{ msg.time }}</p>
        </div>
      </div>
      
      <!-- Индикатор печати -->
      <div v-if="isTyping" class="flex justify-start">
        <div class="bg-white text-gray-800 p-3 rounded-lg shadow-sm rounded-tl-none max-w-[70%]">
          <div class="flex space-x-1">
            <div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div class="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Форма ввода сообщения -->
    <form @submit.prevent="handleSubmit" class="p-3 border-t border-gray-200 flex">
      <input
        v-model="inputValue"
        type="text"
        placeholder="Напишите сообщение..."
        class="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button 
        type="submit" 
        class="bg-primary text-white px-4 rounded-r-lg hover:bg-primary-dark transition-colors"
        aria-label="Отправить сообщение"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z"/>
          <path d="M22 2 11 13"/>
        </svg>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
/**
 * Интерфейс сообщения в чате
 */
interface Message {
  id: number
  text: string
  isUser: boolean
  time: string
}

/**
 * Сценарий демонстрации диалога
 */
const scenario = [
  {
    userMessage: "В комнате 304 не работает кондиционер",
    response: "Спасибо за обращение. Я создал заявку #2451 по вашему запросу. Технический специалист подойдет в течение 30 минут."
  },
  {
    userMessage: "Как скоро будет решена проблема?",
    response: "Согласно нашему SLA, проблемы с кондиционированием решаются в течение 60 минут. Но специалист уже в пути и будет у вас примерно через 15-20 минут."
  },
  {
    userMessage: "Спасибо за оперативность!",
    response: "Всегда рады помочь! Если возникнут еще вопросы, обращайтесь в любое время."
  }
]

// Реактивные данные
const messages = ref<Message[]>([
  { id: 1, text: "Здравствуйте! Чем я могу вам помочь?", isUser: false, time: "14:30" }
])

const inputValue = ref('')
const isTyping = ref(false)
const currentStep = ref(0)

/**
 * Обработчик отправки сообщения пользователем
 */
const handleSubmit = () => {
  if (inputValue.value.trim() === '') return
  
  // Добавляем сообщение пользователя
  const userMessage: Message = {
    id: messages.value.length + 1,
    text: inputValue.value,
    isUser: true,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  messages.value.push(userMessage)
  inputValue.value = ''
  isTyping.value = true
  
  // Имитируем ответ системы
  setTimeout(() => {
    const botMessage: Message = {
      id: messages.value.length + 1,
      text: "Спасибо за обращение. Я создал заявку #2451 по вашему запросу. Технический специалист подойдет в течение 30 минут.",
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(botMessage)
    isTyping.value = false
  }, 1500)
}

/**
 * Автоматическое воспроизведение сценария
 */
let scenarioTimer: NodeJS.Timeout | null = null

const runScenario = () => {
  if (currentStep.value >= scenario.length) return
  
  scenarioTimer = setTimeout(() => {
    // Добавляем сообщение пользователя из сценария
    const userMessage: Message = {
      id: messages.value.length + 1,
      text: scenario[currentStep.value].userMessage,
      isUser: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    messages.value.push(userMessage)
    isTyping.value = true
    
    // Добавляем ответ бота с задержкой
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.value.length + 1,
        text: scenario[currentStep.value].response,
        isUser: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      messages.value.push(botMessage)
      isTyping.value = false
      
      // Переходим к следующему шагу сценария
      currentStep.value++
      
      // Запускаем следующий шаг
      if (currentStep.value < scenario.length) {
        runScenario()
      }
    }, 1500)
  }, currentStep.value === 0 ? 2000 : 4000)
}

// Запуск сценария при монтировании
onMounted(() => {
  runScenario()
})

// Очистка таймера при размонтировании
onUnmounted(() => {
  if (scenarioTimer) {
    clearTimeout(scenarioTimer)
  }
})
</script>