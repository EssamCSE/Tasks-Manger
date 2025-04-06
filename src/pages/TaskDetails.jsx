import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function TaskDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const [task, setTask] = useState({
    id: parseInt(id),
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal document with all necessary details and requirements.',
    priority: 'High',
    category: 'Work',
    dueDate: '2025-04-10',
    status: 'In Progress',
    notes: 'Include budget estimates and timeline in the proposal.',
  })

  const handleStatusChange = (newStatus) => {
    setTask({ ...task, status: newStatus })
  }

  const handleDelete = () => {
    // TODO: Implement API call to delete task
    navigate('/tasks')
  }

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in progress':
        return 'text-blue-600 bg-blue-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  if (isEditing) {
                    // Save changes
                    setTask({ ...task })
                  }
                  setIsEditing(!isEditing)
                }}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                {isEditing ? (
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Priority</dt>
              <dd className="mt-1">
                {isEditing ? (
                  <select
                    value={task.priority}
                    onChange={(e) => setTask({ ...task, priority: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1">
                {isEditing ? (
                  <select
                    value={task.category}
                    onChange={(e) => setTask({ ...task, category: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Work">Work</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Meetings">Meetings</option>
                  </select>
                ) : (
                  task.category
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm font-medium text-gray-500">Due Date</dt>
              <dd className="mt-1">
                {isEditing ? (
                  <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                ) : (
                  task.dueDate
                )}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1">
                {isEditing ? (
                  <textarea
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{task.description}</p>
                )}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Notes</dt>
              <dd className="mt-1">
                {isEditing ? (
                  <textarea
                    value={task.notes}
                    onChange={(e) => setTask({ ...task, notes: e.target.value })}
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{task.notes}</p>
                )}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
