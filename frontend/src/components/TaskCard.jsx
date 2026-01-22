import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDesc, setEditedDesc] = useState(task.description || '');
    const [editedStatus, setEditedStatus] = useState(task.status);

    const handleSave = () => {
        onUpdate(task.id, {
            title: editedTitle,
            description: editedDesc,
            status: editedStatus,
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="rounded-lg bg-white p-4 shadow mb-4">
                <div className="mb-2">
                    <input
                        type="text"
                        className="w-full rounded border p-2"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="mb-2">
                    <textarea
                        className="w-full rounded border p-2"
                        value={editedDesc}
                        onChange={(e) => setEditedDesc(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="mb-2">
                    <select
                        className="w-full rounded border p-2"
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setIsEditing(false)} className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100">Cancel</button>
                    <button onClick={handleSave} className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">Save</button>
                </div>
            </div>
        );
    }

    const statusColors = {
        pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
        in_progress: 'bg-blue-50 text-blue-700 border-blue-100',
        completed: 'bg-green-50 text-green-700 border-green-100',
    };

    const statusLabels = {
        pending: 'Pending',
        in_progress: 'In Progress',
        completed: 'Completed',
    };

    return (
        <div className="p-4 hover:bg-gray-50 transition-colors group">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                {/* Icon Checkbox Visual */}
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-0.5 sm:mt-0 ${task.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {task.status === 'completed' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-current opacity-50"></div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0 grid sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center">
                    <div className="sm:col-span-8">
                        <h3 className={`text-base sm:text-sm font-semibold text-gray-900 truncate ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                        {task.description && <p className="text-sm sm:text-xs text-gray-500 truncate mt-0.5">{task.description}</p>}
                    </div>

                    {/* Status Badge */}
                    <div className="sm:col-span-4 flex sm:justify-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[task.status] || 'bg-gray-50 text-gray-600'}`}>
                            {statusLabels[task.status] || task.status}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex gap-2 sm:gap-1">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 sm:p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors touch-manipulation"
                        title="Edit"
                        aria-label="Edit task"
                    >
                        <FaEdit className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-2 sm:p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors touch-manipulation"
                        title="Delete"
                        aria-label="Delete task"
                    >
                        <FaTrash className="w-5 h-5 sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
