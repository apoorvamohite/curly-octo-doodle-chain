import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import history from '../history';

class ConductTransaction extends Component{
    state = { recipient: '', amount: 0, knownAddresses: []};

    componentDidMount(){
        fetch(`${document.location.origin}/api/known-addresses`)
        .then(response => response.json())
        .then(json => this.setState({ knownAddresses: json }));
    }

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    conductTransaction = () => {
        const { recipient, amount } = this.state;
        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
        .then(json => {
            alert(json.message || json.type);
            history.push('/transaction-pool');
        });
    }

    render(){
        return(
            <div className='ConductTransaction'>
                <Link to='/'>Home</Link>
                <h3>Conduct a Transaction</h3>
                <br/>
                <h4>Known Addresses</h4>
                {
                    this.state.knownAddresses.map(knownAddress => {
                        return(
                            <div key={knownAddress}>
                                <div>{knownAddress}</div>
                            </div>
                        )
                    })
                }
                <FormGroup>
                    <FormControl 
                    input='text' 
                    placeholder='Recipient' 
                    value={this.state.recipient} 
                    onChange={this.updateRecipient} />
                </FormGroup>
                <FormGroup>
                    <FormControl 
                    input='number' 
                    placeholder='Amount' 
                    value={this.state.amount} 
                    onChange={this.updateAmount} />
                </FormGroup>
                <div>
                    <Button 
                    variant="danger"
                    onClick={this.conductTransaction} >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default ConductTransaction;