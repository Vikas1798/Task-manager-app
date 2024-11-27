import React, { useState, useEffect } from 'react';
import AppWrapper from './Components/AppWrapper';
import DialogComponent from './Components/DialogComponent';
import { CircleCheck, Plus, Trash } from 'lucide-react';
import noTask from './Assets/no-data.svg';
import waveImg from './Assets/wave.svg';

const App = () => {
    const [state, setState] = useState({
        addTask: false,
        taskInput: {
            title: "",
            description: ""
        },
        allTasks: JSON.parse(localStorage.getItem("all-task")) || [],
        deleteAlert: {
            key: false,
            id: ''
        }
    });

    const updateLocalStorage = (data) => {
        localStorage.setItem("all-task", JSON.stringify(data));
    }

    //add new task dialog open
    const openNewTaskDialog = (key) => {
        setState((prev) => {
            return {
                ...prev,
                addTask: key,
            };
        });
    }

    //onchange input update new task
    const updateNewTask = (key, e) => {
        setState((prev) => {
            return {
                ...prev,
                taskInput: {
                    ...prev.taskInput,
                    [key]: e.target.value
                }
            };
        });
    }

    //update new task to list
    const addNewTask = (e) => {
        e.preventDefault();
        let { title, description } = state.taskInput;
        if (title.trim() === "" || description.trim() === "") return;
        const newTask = { id: Date.now(), allTask: { title: title, description: description }, completed: false };
        console.log('newTask', newTask)
        setState((prev) => {
            return {
                ...prev,
                allTasks: [...prev.allTasks, newTask],
                taskInput: {
                    title: "",
                    description: ""
                },

            }
        })
        const savedTasks = JSON.parse(localStorage.getItem("all-task")) || [];
        let newData = [...savedTasks, newTask];
        updateLocalStorage(newData);
        openNewTaskDialog(false);
    }

    // check task completion
    const handleToggleComplete = (id) => {
        let allData = [...state.allTasks]
        let editedData = allData.filter(task => task.id === id);
        Object.assign(editedData[0], {
            completed: !editedData[0].completed,
        });

        setState((prev) => {
            return {
                ...prev,
                allTasks: allData,
            }
        })
        updateLocalStorage(allData)
    };

    // Delete selected task
    const handleDeleteTask = (id) => {
        if (!state.deleteAlert.key) {
            setState((prev) => {
                return {
                    ...prev,
                    deleteAlert: {
                        key: false,
                        id: ''
                    }
                }
            })
            return false;
        }
        const updatedTasks = state.allTasks.filter((task) => task.id !== id);
        setState((prev) => {
            return {
                ...prev,
                allTasks: updatedTasks
            }
        })
        updateLocalStorage(updatedTasks);
        openDeleteAlertDialog(false, '')
    };

    //delete alert box open
    const openDeleteAlertDialog = (key, id) => {
        setState((prev) => {
            return {
                ...prev,
                deleteAlert: {
                    key: key,
                    id: id
                }
            }
        })
    }

    let { title, description } = state.taskInput;
    return (
        <>
            <svg width="20" height="20" fill="currentColor" className="animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
            </svg>
            <AppWrapper>
                <div className='flex items-center justify-center flex-col'>
                    <h1 className='text-4xl font-bold text-yellow-500 mt-20'>  Task manager app </h1>
                    <img src={waveImg} alt="" className='w-[150px] mt-3' loading="lazy" />
                </div>
                <div className='bg-[#111] rounded-xl p-4 lg:p-6 shadow-lg border border-purple-500/20 mt-5'>
                    <div className='flex justify-between items-center mb-6'>
                        <h1 className='text-2xl font-bold text-[#FFFFFF]'> Active Quests </h1>
                        <button onClick={() => openNewTaskDialog(true)} className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105 gap-1'> <Plus size={22} strokeWidth={3} /> <span className='hidden sm:flex'>New Quest</span> </button>
                    </div>
                    {
                        state.allTasks?.length ?
                            state.allTasks?.map((task, i) => (
                                <div key={i} className={`task-item  bg-zinc-900 rounded-lg p-4  transform transition-all duration-300 mb-3 last:mb-0 ${task.completed ? ' opacity-70' : ' hover:shadow-md hover:bg-zinc-800 '}`}>
                                    <div className='flex flex-col lg:flex-row md:flex-row justify-between items-center'>
                                        <div className=''>
                                            <h3 className={`font-bold text-[#FFFFFF] ${task.completed ? ' line-through ' : ' '}`}>
                                                {task?.allTask?.title}
                                            </h3>
                                            <p className='text-sm text-gray-400'>{task?.allTask?.description}</p>
                                        </div>
                                        <div className='flex mt-1 lg:m-0 md:m-0 items-center space-x-2'>
                                            {
                                                !task.completed &&
                                                <button onClick={() => handleToggleComplete(task.id)} className={`px-2 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors duration-300`}><CircleCheck size={22} strokeWidth={3} /></button>
                                            }
                                            <button onClick={() => openDeleteAlertDialog(true, task.id)} className='px-2 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300'><Trash size={22} strokeWidth={3} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className='flex items-center justify-center flex-col'>
                                <img src={noTask} alt="" className='w-[200px] ' />
                                <h6 className='text-lg font-semibold text-[#FFFFFF] mt-3'>No task found</h6>
                            </div>
                    }
                </div>
            </AppWrapper>
            <DialogComponent
                isOpen={state?.addTask}
                onClose={() => openNewTaskDialog(false)}
                size="sm"
                header="New Quest"
            >
                <div className='w-full'>
                    <form onSubmit={addNewTask}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF]">Quest Title</label>
                            <input required value={title} onChange={(e) => updateNewTask('title', e)} type="text" className='w-full bg-zinc-700 rounded-lg p-2 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300' />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2 text-[#FFFFFF]">Description</label>
                            <input required value={description} onChange={(e) => updateNewTask('description', e)} type="text" className='w-full bg-zinc-700 rounded-lg p-2 text-white border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300' />
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-[80%] mx-auto mt-5">
                            <button type="button" onClick={() => {
                                setState((prev) => {
                                    return {
                                        ...prev,
                                        taskInput: {
                                            title: "",
                                            description: ""
                                        }
                                    }
                                })
                                openNewTaskDialog(false);
                            }
                            }
                                className="text-[#FFFFFF] px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300">
                                Cancel
                            </button>
                            <button type="submit" className=" text-[#FFFFFF] px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                                Create Quest
                            </button>
                        </div>
                    </form>
                </div>
            </DialogComponent>

            <DialogComponent
                isOpen={state?.deleteAlert?.key}
                onClose={() => openDeleteAlertDialog(false, "")}
                size="sm"
                header="Remove"
            >
                <div className='w-full'>
                    <h5 className='text-[#FFFFFF]'>
                        Are you sure you want to remove this task ?
                    </h5>
                    <div className="grid grid-cols-2 gap-3 w-[80%] mx-auto mt-5">
                        <button onClick={() => openDeleteAlertDialog(false, "")} className="text-[#FFFFFF] px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-300">
                            No
                        </button>
                        <button onClick={() => handleDeleteTask(state.deleteAlert.id)} className=" text-[#FFFFFF] px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                            Yes
                        </button>
                    </div>
                </div>
            </DialogComponent>
        </>
    );
};

export default App;
