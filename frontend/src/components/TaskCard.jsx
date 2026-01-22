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
        pending: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
    };

    return (
        <div className="rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow mb-4">
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <p className="mt-1 text-gray-600">{task.description}</p>
                    <span className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${statusColors[task.status] || 'bg-gray-100'}`}>
                        {task.status.replace('_', ' ')}
                    </span>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-blue-500">
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(task.id)} className="text-gray-500 hover:text-red-500">
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
