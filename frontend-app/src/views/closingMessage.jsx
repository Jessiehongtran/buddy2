import React from 'react';

class Closing extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div style={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    textAlign: 'center', 
                    alignItems: 'center',
                    marginTop: '30px',
                    
            }}>
                <h1>You've been MATCHED</h1>
                <h3>An awesome buddy is waiting for you</h3>
            </div>
        )
    }
}

export default Closing;