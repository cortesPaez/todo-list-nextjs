"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { TodoListService } from "../services/todo-list";
import Modal from "../components/Modal";
import Input from "../components/Input";
import { MdCheck, MdDelete, MdEdit, MdRemoveRedEye } from "react-icons/md";
import Button from "../components/Button";

const taskDefault = {
  title: "",
  description: "",
  completed: false,
};

const modalDefault = { action: "", show: false };

const TodoPage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(taskDefault);
  const [showModal, setShowModal] = useState(modalDefault);
  const [taskSelected, setTaskSelected] = useState(0);

  const getAll = async () => {
    const getAllTasks = await TodoListService.getAllTask();
    setTasks(getAllTasks);
  };

  useEffect(() => {
    getAll();
  }, [showModal, task]);

  const handleChangeCreate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setTask((prevState) => ({
        ...prevState,
        completed: checked,
      }));
    } else {
      setTask((prevState) => ({
        ...prevState,
        [name]: value,
        completed: checked,
      }));
    }
  };

  const createTask = async () => {
    await TodoListService.createTask(task);
    setTask(taskDefault);
    setShowModal(modalDefault);
  };

  const updateTask = async (id: number) => {
    await TodoListService.updateTask(task, id);
    setTask(taskDefault);
  };

  const deleteTask = async (id: number) => {
    await TodoListService.deleteTask(id);
    setTask(taskDefault);
  };

  const completeTask = async (taskSelected: number) => {
    await TodoListService.completedTask(taskSelected);
    setTask(taskDefault);
  };

  const viewTask = async (taskSelected: number) => {
    const task = await TodoListService.getTaskById(taskSelected);
    setTask(task);
  };

  const getTitleModal = () => {
    if (showModal.action === "create") return "Crear una nueva tarea";
    if (showModal.action === "update") return "Editar una tarea";
    if (showModal.action === "view") return `Datos sobre tu tarea`;
    return "";
  };

  const getButtonTextModal = () => {
    if (showModal.action === "create") return "Crear tarea";
    if (showModal.action === "update") return "Editar tarea";
    if (showModal.action === "delete") return "Eliminar tarea";
    if (showModal.action === "view") return "Entendido";
    return "";
  };

  const validateInputs = () => {
    if (task.title === "" || task.description === "") {
      return true
    }
    return false;
  }

  return (
    <>
      {showModal.show && (
        <Modal title={getTitleModal()}>
          <div className="flex flex-col gap-4 w-full">
            {(showModal.action === "create" ||
              showModal.action === "update") && (
              <>
                <Input
                  onChange={handleChangeCreate}
                  placeholder="Ingresar titulo"
                  name="title"
                  value={task.title}
                />
                <Input
                  onChange={handleChangeCreate}
                  placeholder="Ingresar descripción"
                  name="description"
                  value={task.description}
                />
              </>
            )}
            {showModal.action === "update" && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 text-black"
                  onChange={handleChangeCreate}
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-black"
                >
                  Tarea completada
                </label>
              </div>
            )}
            {showModal.action === "delete" && (
              <p className="text-black">
                ¿Estas seguro de eliminar la tarea <strong>{task.title}</strong>
                ?
              </p>
            )}
            {showModal.action === "view" && (
              <div className="flex justify-between">
                <ul className="text-black">
                  <li><strong>Titulo</strong></li>
                  <li><strong>Descripcion</strong></li>
                  <li><strong>Estado de la tarea</strong></li>
                </ul>
                <ul className="text-black">
                  <li>{task.title}</li>
                  <li>{task.description}</li>
                  <li>
                    {task.completed
                      ? "La tarea a sido completada"
                      : "Aun no ha sido completada"}
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="py-3 sm:flex sm:flex-row gap-2">
            {showModal.action !== "view" && (
              <button
                type="button"
                className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-red-500 hover:text-white sm:mt-0 sm:w-auto border-[1px] border-slate-400 hover:border-0"
                onClick={() => {
                  setTask(taskDefault);
                  setShowModal(modalDefault);
                }}
              >
                Cancelar
              </button>
            )}
            <button
              type="button"
              disabled={validateInputs()}
              onClick={() => {
                setShowModal({ action: "create", show: false });
                if (showModal.action === "create") {
                  createTask();
                }
                if (showModal.action === "delete") {
                  deleteTask(taskSelected);
                }
                if (showModal.action === "update") {
                  updateTask(taskSelected);
                }
                if (showModal.action === "view") {
                  setTask(taskDefault);
                }
              }}
              className="mt-3 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-slate-900 hover:text-white sm:mt-0 sm:w-auto border-[1px] border-slate-400 hover:border-0"
            >
              {getButtonTextModal()}
            </button>
          </div>
        </Modal>
      )}
      <div className="relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/30 w-full mt-10 mx-3">
        <div className="flex justify-between items-center mx-5 mt-3 max-sm:flex-col max-sm:gap-4">
          <h1 className="text-2xl">Gestiona tus tareas</h1>
          <Button
            text="Crear nueva tarea"
            onClick={() => setShowModal({ action: "create", show: true })}
          />
        </div>
        <div className="shadow-sm overflow-x-auto my-8">
          {
            tasks && tasks.length > 0 ? (<table className="table-fixed w-full">
              <thead>
                <tr>
                  <th className="text-start border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Titulo
                  </th>
                  <th className="text-start border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Descripcion
                  </th>
                  <th className="text-start border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Completado
                  </th>
                  <th className="text-start border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks?.map(({ id, title, description, completed }) => (
                  <tr key={id}>
                    <td className="text-start border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {title}
                    </td>
                    <td className="text-start border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {description}
                    </td>
                    <td className="text-start border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {completed ? "Completada" : "No completada"}
                    </td>
                    <td className="text-start border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <div className="flex gap-3 w-[100px]">
                        <MdRemoveRedEye
                          className="cursor-pointer"
                          onClick={() => {
                            viewTask(id);
                            setShowModal({ action: "view", show: true });
                          }}
                        />
                        {!completed && (
                          <MdCheck
                            className="cursor-pointer"
                            onClick={() => {
                              completeTask(id);
                              setShowModal({ action: "completed", show: false });
                            }}
                          />
                        )}
                        <MdEdit
                          className="cursor-pointer"
                          onClick={() => {
                            setTask({
                              title: title,
                              description: description,
                              completed: completed,
                            });
                            setTaskSelected(id);
                            setShowModal({ action: "update", show: true });
                          }}
                        />
                        <MdDelete
                          className="cursor-pointer"
                          onClick={() => {
                            setTask({
                              title: title,
                              description: description,
                              completed: completed,
                            });
                            setTaskSelected(id);
                            setShowModal({ action: "delete", show: true });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>) : (<h1 className="text-center text-xl">Aun no hay tareas para mostrar 🫣</h1>)
          }
        </div>
      </div>
    </>
  );
};

export default TodoPage;
