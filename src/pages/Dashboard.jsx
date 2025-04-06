import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [stats] = useState({
    totalTasks: 12,
    completedTasks: 5,
    pendingTasks: 7,
    highPriority: 3,
  })

  const [recentTasks] = useState([
    { id: 1, title: 'Complete project proposal', priority: 'High', dueDate: '2025-04-10' },
    { id: 2, title: 'Review documentation', priority: 'Medium', dueDate: '2025-04-15' },
    { id: 3, title: 'Team meeting preparation', priority: 'Low', dueDate: '2025-04-08' },
  ])

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-xl font-medium text-gray-900">{stats.totalTasks}</div>
                <div className="text-sm font-medium text-gray-500">Total Tasks</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-xl font-medium text-green-600">{stats.completedTasks}</div>
                <div className="text-sm font-medium text-gray-500">Completed Tasks</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-xl font-medium text-yellow-600">{stats.pendingTasks}</div>
                <div className="text-sm font-medium text-gray-500">Pending Tasks</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-xl font-medium text-red-600">{stats.highPriority}</div>
                <div className="text-sm font-medium text-gray-500">High Priority</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Tasks</h3>
          <div className="mt-4">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/tasks/${task.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-indigo-600"
                        >
                          {task.title}
                        </Link>
                        <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/tasks"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View all tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
