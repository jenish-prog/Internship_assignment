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
            {/* Dashboard Content */}
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Create Task Section */}
                <div className="mb-6 rounded-xl bg-white p-6 shadow-sm border border-gray-100">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="flex flex-col gap-4 sm:flex-row">
                        <input
                            type="text"
                            placeholder="Task Title"
                            className="flex-[2] rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 hover:bg-white transition-colors"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description (optional)"
                            className="flex-[3] rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 hover:bg-white transition-colors"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-sm transition-all hover:shadow-md active:bg-blue-800 shrink-0"
                        >
                            Add Task
                        </button>
                    </form>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-16 sm:static bg-gray-100 sm:bg-transparent pt-2 pb-2 sm:py-0 z-30 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="w-full sm:w-1/3 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full rounded-lg border border-gray-200 bg-white sm:bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-colors shadow-sm sm:shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-auto">
                        <select
                            className="w-full sm:w-40 rounded-lg border border-gray-200 bg-white sm:bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-sm sm:shadow-none"
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

                {/* Task List Container */}
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <div className="border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider">All Tasks <span className="text-gray-400 font-normal ml-1">({filteredTasks.length})</span></h3>
                        <div className="text-gray-400">
                            <span className="text-xl leading-none">...</span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500 text-sm">Loading tasks...</div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 text-sm">No tasks found.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
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
        </div>
    );
};

export default Dashboard;
