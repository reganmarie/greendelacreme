  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Construct(props) {


    const pad2 = num => String(num).padStart(2, '0');

    const notify = () => toast("Wow so easy!");

    return (
        <div className="App">
            <header className="App-header">
                <p className="text-red-400">hello</p>
                <h1>Under construction</h1>
                <h2>Coming on (or before)</h2>
                <h2>{props.info.year}-{pad2(props.info.month)}-{pad2(props.info.day)}</h2>
                <h2>by or <strong>WELL BEFORE</strong> {pad2(props.info.hour)}:{pad2(props.info.min)}</h2>

        <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
        </div>
      </header>

        </div>


    )
}

export default Construct;
