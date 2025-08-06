'use client'

import { useState, FormEvent } from 'react'

interface TodoFormProps {
  onAddTodo: (text: string) => void
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (inputValue.trim() === '') return
    
    setIsSubmitting(true)
    
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 100))
    
    onAddTodo(inputValue)
    setInputValue('')
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="todo-input" className="block text-sm font-medium text-gray-700 mb-2">
            Add a new todo
          </label>
          <div className="flex space-x-3">
            <input
              id="todo-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="input-field flex-1"
              disabled={isSubmitting}
              autoFocus
            />
            <button
              type="submit"
              disabled={inputValue.trim() === '' || isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Add'
              )}
            </button>
          </div>
        </div>
        
        {inputValue.trim() !== '' && (
          <div className="text-xs text-gray-500">
            Press Enter or click Add to create your todo
          </div>
        )}
      </form>
    </div>
  )
}
