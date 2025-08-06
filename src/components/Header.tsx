interface HeaderProps {
  totalCount: number
  completedCount: number
}

export default function Header({ totalCount, completedCount }: HeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        Todo App
      </h1>
      <p className="text-gray-600 mb-4">
        Stay organized and get things done
      </p>
      
      {totalCount > 0 && (
        <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-2 shadow-sm border">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-primary-600">{totalCount}</span> total
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-green-600">{completedCount}</span> completed
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-orange-600">{totalCount - completedCount}</span> remaining
          </div>
        </div>
      )}
    </div>
  )
}
