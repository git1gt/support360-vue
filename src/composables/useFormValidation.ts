import { ref, computed, type Ref } from 'vue'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: any) => boolean | string
  message?: string
}

export interface FieldConfig {
  [key: string]: ValidationRule[]
}

export function useFormValidation<T extends Record<string, any>>(
  formData: Ref<T>,
  rules: FieldConfig
) {
  const errors = ref<Record<string, string>>({})
  const touched = ref<Record<string, boolean>>({})

  const validateField = (fieldName: string, value: any): string => {
    const fieldRules = rules[fieldName] || []
    
    for (const rule of fieldRules) {
      // Required validation
      if (rule.required && (!value || value.toString().trim() === '')) {
        return rule.message || `${fieldName} обязательно для заполнения`
      }

      // Skip other validations if field is empty and not required
      if (!value || value.toString().trim() === '') {
        continue
      }

      // Min length validation
      if (rule.minLength && value.toString().length < rule.minLength) {
        return rule.message || `Минимальная длина: ${rule.minLength} символов`
      }

      // Max length validation
      if (rule.maxLength && value.toString().length > rule.maxLength) {
        return rule.message || `Максимальная длина: ${rule.maxLength} символов`
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value.toString())) {
        return rule.message || 'Неверный формат'
      }

      // Custom validator
      if (rule.validator) {
        const result = rule.validator(value)
        if (typeof result === 'string') {
          return result
        }
        if (result === false) {
          return rule.message || 'Значение не прошло валидацию'
        }
      }
    }

    return ''
  }

  const validate = (fieldName?: string): boolean => {
    if (fieldName) {
      // Validate single field
      const error = validateField(fieldName, formData.value[fieldName])
      if (error) {
        errors.value[fieldName] = error
      } else {
        delete errors.value[fieldName]
      }
      touched.value[fieldName] = true
      return !error
    } else {
      // Validate all fields
      let isValid = true
      const newErrors: Record<string, string> = {}
      const newTouched: Record<string, boolean> = {}

      for (const fieldName in rules) {
        const error = validateField(fieldName, formData.value[fieldName])
        newTouched[fieldName] = true
        if (error) {
          newErrors[fieldName] = error
          isValid = false
        }
      }

      errors.value = newErrors
      touched.value = newTouched
      return isValid
    }
  }

  const clearErrors = (fieldName?: string) => {
    if (fieldName) {
      delete errors.value[fieldName]
      delete touched.value[fieldName]
    } else {
      errors.value = {}
      touched.value = {}
    }
  }

  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0
  })

  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0
  })

  return {
    errors: readonly(errors),
    touched: readonly(touched),
    validate,
    clearErrors,
    isValid,
    hasErrors
  }
}