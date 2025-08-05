<template>
  <header :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  ]">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <button 
        @click="refreshPage"
        class="flex items-center hover:opacity-80 transition-opacity"
      >
        <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
          <LifebuoyIcon class="w-6 h-6 text-white" />
        </div>
        <div class="flex flex-col">
          <span :class="[
            'font-bold text-xl',
            isScrolled ? 'text-primary' : 'text-white'
          ]">
            Support360
          </span>
        </div>
      </button>
      
      <nav class="hidden md:flex items-center space-x-6 mr-5 ml-5">
        <a 
          href="#use-cases" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          Применение
        </a>
        <a 
          href="#features" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          Возможности
        </a>
        <a 
          href="#workflow" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          Как работает
        </a>
        <a 
          href="#statistics" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          Результаты
        </a>
        <a 
          href="#service-history" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          История
        </a>
        <a 
          href="#ai-section" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          Умный помощник
        </a>
        <a 
          href="#faq" 
          :class="[
            'text-sm font-medium hover:text-primary transition-colors',
            isScrolled ? 'text-gray-800' : 'text-white'
          ]"
        >
          Вопросы
        </a>
      </nav>
      
      <div class="hidden md:flex items-center space-x-3 mr-10">
        <el-button
          @click="openLogin"
          :class="[
            'text-sm px-4 py-2',
            isScrolled 
              ? '!bg-transparent !text-primary border-2 border-primary hover:!bg-primary/10' 
              : '!bg-white/10 !text-white border-2 border-white/30 hover:!bg-white/20 backdrop-blur-sm'
          ]"
          plain
        >
          Вход/Регистрация
        </el-button>
        <el-button 
          @click="scrollToContact"
          type="primary"
          :class="[
            'text-sm px-4 py-2',
            isScrolled 
              ? '!bg-primary !text-white hover:!bg-primary-dark' 
              : '!bg-primary !text-white hover:!bg-primary-dark'
          ]"
        >
          Оставить заявку
        </el-button>
      </div>
      
      <button 
        class="md:hidden text-2xl"
        @click="toggleMobileMenu"
      >
        <MenuIcon v-if="!isMobileMenuOpen" :color="isScrolled ? '#000000' : '#ffffff'" />
        <XIcon v-else :color="isScrolled ? '#000000' : '#ffffff'" />
      </button>
    </div>
    
    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg absolute w-full">
      <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <a 
          href="#use-cases" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          Кейсы
        </a>
        <a 
          href="#features" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          Возможности
        </a>
        <a 
          href="#workflow" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          Как работает
        </a>
        <a 
          href="#statistics" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          Результаты
        </a>
        <a 
          href="#service-history" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          История
        </a>
        <a 
          href="#ai-section" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          Умный помощник
        </a>
        <a 
          href="#faq" 
          class="font-medium py-2 hover:text-primary border-b border-gray-100"
          @click="closeMobileMenu"
        >
          Вопросы
        </a>
        
        <div class="pt-4 space-y-3">
          <el-button 
            @click="openLogin" 
            class="!bg-transparent !text-primary border-2 border-primary hover:!bg-primary/10 w-full"
            plain
          >
            Вход/Регистрация
          </el-button>
          <el-button 
            @click="scrollToContact" 
            type="primary"
            class="w-full"
          >
            Оставить заявку
          </el-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

// Иконки
const LifebuoyIcon = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '24',
    height: '24',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2.5',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  }, [
    h('circle', { cx: '12', cy: '12', r: '10' }),
    h('circle', { cx: '12', cy: '12', r: '4' }),
    h('line', { x1: '4.93', y1: '4.93', x2: '9.17', y2: '9.17' }),
    h('line', { x1: '14.83', y1: '14.83', x2: '19.07', y2: '19.07' }),
    h('line', { x1: '14.83', y1: '9.17', x2: '19.07', y2: '4.93' }),
    h('line', { x1: '4.93', y1: '19.07', x2: '9.17', y2: '14.83' })
  ])
}

const MenuIcon = defineComponent({
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  },
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: this.color,
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('line', { x1: '4', y1: '12', x2: '20', y2: '12' }),
      h('line', { x1: '4', y1: '6', x2: '20', y2: '6' }),
      h('line', { x1: '4', y1: '18', x2: '20', y2: '18' })
    ])
  }
})

const XIcon = defineComponent({
  props: {
    color: {
      type: String,
      default: '#000000'
    }
  },
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: this.color,
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
      h('line', { x1: '6', y1: '6', x2: '18', y2: '18' })
    ])
  }
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
  closeMobileMenu()
}

const openLogin = () => {
  window.open('https://support360.ru/login', '_blank')
  closeMobileMenu()
}

const refreshPage = () => {
  window.location.reload()
  window.scrollTo(0, 0)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>