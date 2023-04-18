import { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { XCircle, CheckCircle } from "react-bootstrap-icons";
import { Transition } from '@headlessui/react';

const ToastMessage = (props) => {
    const setState = props.setState;
    const [showToast, setShowToast] = useState(props.show);
    useEffect(() => {
        const timeout = setTimeout(() => {
            // setState(null);
            setShowToast(false);
        }, 3000);
        return (() => {
            clearTimeout(timeout);
        })
    },[setState, props.show])
    return (
        <div className='z-50 flex fixed right-[3%] bottom-0 w-80 bg-gray-800'>
            <Transition
                show={showToast}
                enter="transition-translate duration-6000"
                enterFrom="-translate-y-6"
                enterTo="translate-y-6"
                leave="transition-translate duration-6000"
                leaveFrom="-translate-y-6"
                leaveTo="translate-y-0"
            >
                <div className={`bg-gray-800 rounded-sm border-l-2 ${props.type==="error" ? "border-l-rose-500" : "border-l-emerald-500"} flex items-center fixed bottom-5 m-auto w-80 p-3 text-white`}>
                    {props.type==="success" && <CheckCircle className="w-8 h-8 text-emerald-500 mr-2"/>}
                    {props.type==="error" && <XCircle className="w-8 h-8 text-rose-500 mr-2"/>}
                    <p className="text-sm">{props.errorMessage}</p>
                </div>
            </Transition>
        </div>
    )
}
const Toast = (props) => {  
    return (
        <Fragment>
            {ReactDOM.createPortal(<ToastMessage type={props.type} setState={props.setState} show={props.show} errorMessage={props.message}/>,document.getElementById("toast-root"))}
        </Fragment>
    )
}

export default Toast;