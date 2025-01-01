
import Header from './components/Header';
import ToDoList from './components/ToDoList';

function App() {

  return (
    <>
      <div className='h-screen bg-slate-100 flex items-center justify-center'>
        <div className='bg-white min-h-[35rem] w-full max-w-lg sm:max-w-md md:max-w-xl lg:max-w-2xl rounded-2xl shadow-2xl'>
          <Header />
          <ToDoList />
        </div>
      </div>
    </>
  )
}

export default App
