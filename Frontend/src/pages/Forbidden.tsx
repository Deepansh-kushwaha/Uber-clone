import { Link, useNavigate } from 'react-router'

function Forbidden() {
    const navigate = useNavigate()
    setTimeout(() => {
        navigate(-1)
    }, 3000);
  return (
    <div className='flex flex-col items-center justify-center h-screen p-7'>
      <h2>404</h2>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className='btn w-full h-10 bg-amber-300 text-white rounded mt-5 font-bold flex justify-center items-center' >Go to Home</Link>
    </div>
  )
}

export default Forbidden
