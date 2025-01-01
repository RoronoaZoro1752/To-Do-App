import checked_pic from '../assets/checked_pic.png';
import delete_pic from '../assets/delete_pic.png';
import unchecked_pic from '../assets/unchecked_pic.png';
import edit_pic from '../assets/edit_pic.png';
import { useRef, useState, useEffect } from 'react';

function ToDoItem({text, id, isComplete, deletetask, toggle, editTask}){

    const [editable, setEditable] = useState(false)
    let editedname = useRef(null);
    function handleEdit(){
        if(editedname && editedname.current){
            let name = editedname.current.innerText.trim();
            let trimmedText = text.trim();
            if(name && name !== trimmedText){
                editTask(id, name);
            }
        }
        editedname.current.innerText = editedname.current.innerText.trim();
        setEditable((prev) => !prev);
    }

    function handleDelete(){
        if(editable){
            setEditable(false);
            deletetask(id)
        }
        deletetask(id)
    }

    useEffect(() => {
        if (editable && editedname.current) {
            editedname.current.focus();
        }
    }, [editable]);

    return(
        <div className="bg-slate-500 p-4 rounded-md flex flex-row justify-between items-center">
            <div className='flex items-center gap-3 flex-grow min-w-0'  onClick={() => toggle(id)}>
                <img src={isComplete? checked_pic : unchecked_pic} alt="status button" className={`w-6 h-6 cursor-pointer ${isComplete ? "" : "filter invert brightness-0"}`} />
                <p ref={editedname} className={`text-white font-medium cursor-pointer border-none outline-none ${isComplete ? "line-through text-gray-400": ""} ${editable ? "bg-slate-600 rounded-md p-1" : "truncate"} flex-1 `} contentEditable={editable} suppressContentEditableWarning={true}>{text}</p>
            </div>
            <div className='flex items-center gap-3 flex-shrink-0'>
                <button onClick={handleEdit}><img src={edit_pic} alt="edit button" className='w-6 h-6 cursor-pointer filter invert brightness-0'/></button>
                <button onClick={handleDelete}><img src={delete_pic} alt="delete button" className='w-6 h-6 cursor-pointer filter invert brightness-0' /></button>
            </div>
        </div>
    )
}

export default ToDoItem;