import React from 'react'
//import CancelIcon from '@material-ui/icons/Cancel';
//import IconButton from '@material-ui/core/IconButton';
import "./Popup.css"
function Popup(props ) {
    
       
    
    return (props.trigger) ? (
        
        <div className="popup">
            <div className="popup_inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}  
                >
                    
                </button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default Popup