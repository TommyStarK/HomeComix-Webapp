import React from 'react'

export default class BatmanLogo extends React.Component {
    render() {
        return(
            <div className="batman">
                <div className="bat-cave">
                    <div className="left-wing-connector">
                        <div></div> 
                        <div></div> 
                        <div></div> 
                    </div>
                    <div className="left-wing">
                        <div></div> 
                        <div></div> 
                        <div></div>
                        <div className="left-smoother">
                        </div>
                    </div>
                    <div className="bat-body">
                        <div></div> 
                        <div></div> 
                        <div></div> 
                        <div></div> 
                        <div></div> 
                    </div>
                    <div className="right-wing-connector">
                        <div></div> 
                        <div></div> 
                        <div></div> 
                    </div>
                    <div className="right-wing">
                        <div></div> 
                        <div></div> 
                        <div></div>
                        <div className="right-smoother">                
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}