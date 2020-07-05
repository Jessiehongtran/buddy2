import React from 'react';


class Sorry extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '100px',
                backgroundColor: 'orange',
            }}>
                <h3>Sorry Vy your matched buddy got a thing today and cannot show up.</h3> 
                <h3>We are so sorry for this. Please book another time next week.</h3> 
                <h3>Keep learning English!</h3>

                <button onClick={() => this.props.history.push('/topics')}>Find a buddy</button>
            </div>
        )
    }
}

export default Sorry;