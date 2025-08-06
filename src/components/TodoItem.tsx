'use client'

import { useState } from 'react'
import { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 150))
    onDelete()
  }

  return (
    <div className={`todo-item ${todo.completed ? 'todo-completed' : ''} ${isDeleting ? 'opacity-50 scale-95' : ''} transition-all duration-200`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
            className="checkbox"
            id={`todo-${todo.id}`}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <label 
            htmlFor={`todo-${todo.id}`}
            className={`block text-sm font-medium cursor-pointer transition-all duration-200 ${
              todo.completed 
                ? 'text-gray-500 text-strikethrough' 
                : 'text-gray-900 hover:text-primary-600'
            }`}
          >
            {todo.text}
          </label>
          
          <div className="text-xs text-gray-400 mt-1">
            {todo.completed ? 'Completed' : 'Pending'} • {formatDate(todo.createdAt)}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="btn-danger text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete todo"
          >
            {isDeleting ? (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    if (diffInMinutes < 1) return 'Just now'
    return `${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}
