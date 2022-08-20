import { ImSpinner9 } from 'react-icons/im';

const Loader = () => {
    return (
      <div className='Message'>
        <ImSpinner9 className='Icon Icon-spin'/>
        Loading...
      </div>
    )
}

export default Loader;