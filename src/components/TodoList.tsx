import TodoItem from './TodoItem'
import { Todo } from '@/types/todo'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: number) => void
  onDeleteTodo: (id: number) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
  if (todos.length === 0) {
    return null
  }

  // Sort todos: incomplete first, then completed
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      return b.createdAt.getTime() - a.createdAt.getTime() // Newest first within same completion status
    }
    return a.completed ? 1 : -1 // Incomplete todos first
  })

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Your Todos ({todos.length})
      </h2>
      
      <div className="space-y-2">
        {sortedTodos.map((todo, index) => (
          <div 
            key={todo.id} 
            className="animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TodoItem
              todo={todo}
              onToggle={() => onToggleTodo(todo.id)}
              onDelete={() => onDeleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
      
      {todos.some(todo => todo.completed) && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            ✨ Great job! You've completed {todos.filter(todo => todo.completed).length} task{todos.filter(todo => todo.completed).length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  )
}
