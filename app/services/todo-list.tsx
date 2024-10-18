interface Body {
  title: string,
  description: string;
  completed: boolean
}

const getAllTask = async () => {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${String(sessionStorage.getItem("token"))}`
      },
    });

    const result = await response.json();
    return result
  } catch (error) {
    console.error("Error:", error);
  }
};

const getTaskById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${String(sessionStorage.getItem("token"))}`
      },
    });

    const result = await response.json();
    return result
  } catch (error) {
    console.error("Error:", error);
  }
};

const createTask = async (body:Body) => {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${String(sessionStorage.getItem("token"))}`
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateTask = async (body: Body, id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${String(sessionStorage.getItem("token"))}`
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

const completedTask = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}/completed`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${String(sessionStorage.getItem("token"))}`
      },
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${String(sessionStorage.getItem("token"))}`
      },
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const TodoListService = {
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    completedTask,
    deleteTask
}