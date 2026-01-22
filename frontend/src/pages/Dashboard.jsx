import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Create Task State
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    // Filter/Search State
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTitle.trim()) return;
        try {
            const response = await api.post('/tasks', {
                title: newTitle,
                description: newDesc,
                status: 'pending'
            });
            setTasks([response.data, ...tasks]);
            setNewTitle('');
            setNewDesc('');
        } catch (err) {
            console.error("Failed to create task", err);
        }
    };

    const handleUpdateTask = async (id, updates) => {
        try {
            const response = await api.patch(`/tasks/${id}`, updates);
            setTasks(tasks.map(t => t.id === id ? response.data : t));
        } catch (err) {
            console.error("Failed to update task", err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Create Task Section */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="flex flex-col gap-3 sm:flex-row">
                        <input
                            type="text"
                            placeholder="Task Title"
                            className="flex-1 rounded border p-2 focus:ring-2 focus:ring-blue-500"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description (Optional)"
                            className="flex-1 rounded border p-2 focus:ring-2 focus:ring-blue-500"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="w-full sm:w-1/3">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full rounded-lg border p-2 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-auto">
                        <select
                            className="w-full rounded-lg border p-2 shadow-sm"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Task List */}
                {loading ? (
                    <div className="text-center text-gray-500">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center text-gray-500">No tasks found.</div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onUpdate={handleUpdateTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
