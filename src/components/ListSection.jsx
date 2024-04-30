/* eslint-disable react/prop-types */
import { useState } from "react";
import TaskComponent from "./TaskComponent";
import NavButton from "./NavButton";
import cross from "../assets/SVGs/cross.svg";

const ListSection = ({
  isOpen,
  setIsOpen,
  bgColor,
  descBGColor,
  task,
  setTask,
  taskId
}) => {
  function getRandomPastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 41) + 30;
    const lightness = Math.floor(Math.random() * 31) + 60;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    return color;
  }
  const [isAddWindowOpen, setIsAddWindowOpen] = useState("hidden");
  const [addButtonDisabled, setaddButtonDisabled] = useState(false);
  const [addInput, setAddInput] = useState('');

  function handleAddWindow() {
    if (isAddWindowOpen == "visible") {
      setIsAddWindowOpen("hidden");
      setaddButtonDisabled(false);
    } else {
      setIsAddWindowOpen("visible");
      setaddButtonDisabled(true);
    }
  }

  const handleAdd = () => {
    let counter;
    if (!localStorage.getItem('counter')) {
      counter = 0;
    }
    counter = JSON.parse(localStorage.getItem('counter'));
    counter++;
    localStorage.setItem('subCounter', JSON.stringify(counter));
    const subId = counter;
    const subTask = addInput;
    const subTaskColor = getRandomPastelColor();
    const newTask = { subId, subTask, subTaskColor }
    const listItems = task.map((item) => item.id === taskId ? { ...item, subTasks: [...item.subTasks, newTask] } : item);
    setTask(listItems);
    setAddInput('');
    setIsAddWindowOpen("hidden");
    setaddButtonDisabled(false);
    localStorage.setItem("task", JSON.stringify(listItems));
  }

  function handleClick() {
    setIsOpen("hidden");

    console.log("Dwaipayan laura");
  }

  const [searchValue, setSearchValue] = useState("");
  return (
    <div className={isOpen}>
      <div className="w-full h-full flex justify-center items-center absolute top-0">
        <div
          style={{ backgroundColor: bgColor ? bgColor : "#99ff99" }}
          className="h-[96.5%] w-[70%] rounded-2xl py-4 px-6  border-black border-[1px]"
        >
          <div className="text-black text-2xl p-2 mb-1 flex justify-between items-center">
            {task.map((item) => item.id === taskId ? item.title : '')}
            <NavButton bgColor={"#FF0000"} svg={cross} func={handleClick} />
          </div>
          <h1 style={{ backgroundColor: descBGColor ? descBGColor : "#99f191" }} className="text-black mb-4 p-2 rounded-lg">
            {task.map((item) => item.id === taskId ? item.description : '')}
          </h1>
          <div className="flex justify-evenly">
            <input
              type="search"
              name="search form"
              id="searchForm"
              className="bg-yellow-300 p-2 text-black rounded-lg border-[1px] w-[50%] border-black"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              placeholder="Search"
            />
            <button
              onClick={handleAddWindow}
              disabled={addButtonDisabled}
              className="text-black p-2 bg-blue-400 border-[1px] w-[20%] border-black rounded-lg text-center"
            >
              add task
            </button>
            <button className="text-black p-2 bg-pink-400 border-[1px] w-[20%] border-black rounded-lg text-center">
              something
            </button>
          </div>
          <div className={isAddWindowOpen}>
            <div className="bg-slate-400 border-black border-[1px] rounded-xl w-[95%] h-[20%] p-2 m-1 ml-6 flex justify-between">
              <input
                type="text"
                className="w-[80%] rounded-lg bg-orange-200 text-black p-2 border-black border-[1px]"
                value={addInput}
                onChange={(e) => setAddInput(e.target.value)}
              />
              <div className="w-[20%] flex flex-col justify-between items-center">
                <button className=" text-slate-800 p-2 bg-purple-400 border-[1px] w-[60%] h-[45%] border-black rounded-lg flex justify-center items-center" onClick={handleAdd}>
                  Save
                  {/* add svg */}
                </button>
                <button
                  onClick={handleAddWindow}
                  className=" text-slate-800 p-2 bg-red-500 border-[1px] w-[60%] h-[45%] border-black rounded-lg flex justify-center items-center"
                >
                  Cancel
                  {/* add svg */}
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 p-2 flex flex-col justify-center">
            <h1 className="text-black mb-1">Things to do:</h1>
            <div className="flex flex-col w-full">
              {task.map((item) => item.id === taskId && item.subTasks.map((subItem) => (
                <TaskComponent
                  key={subItem.subId}
                  taskText={subItem.subTask}
                  bgColor={subItem.subTaskColor}
                />
              )))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSection;
