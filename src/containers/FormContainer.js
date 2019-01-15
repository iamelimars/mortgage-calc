import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'muicss/dist/css/mui.css';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import numeral from 'numeral'
import './FormContainer.scss'


const paymentStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px'
}

const containerStyles = {
    marginTop: '60px'
}

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newCalculation: {
                purchasePrice: '',
                downPayment: '',
                loanTerm: '',
                interestRate: '',
                total: ''
            }
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount = () => {
  
    }

    handleInput = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let int = parseFloat(value);
        if (!isNaN(int)) {
            this.setState(prevState => {
                return {
                    newCalculation: {
                        ...prevState.newCalculation,
                        [name]: value
                    }
                }

            })
        } else {
            this.setState(prevState => {
                return {
                    newCalculation: {
                        ...prevState.newCalculation,
                        [name]: ''
                    }
                }

            })
            this.notify('Please Enter A Number!');

        }

    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        let calcData = this.state.newCalculation;
        let errors = [];
        if (calcData.purchasePrice === '') {
            this.notify('Purchase Price Is Empty!');

        } if (calcData.downPayment === '') {
            this.notify('Down Payment Is Empty!');

        } if (calcData.loanTerm === '') {
            this.notify('Loan Term Is Empty!');

        } if (calcData.interestRate === '') {
            this.notify('Interest Rate Is Empty!');

        } else {
            let principal = calcData.purchasePrice - calcData.downPayment;
            let monthlyInterest = (calcData.interestRate / 100) / 12;
            let numberOfPayments = calcData.loanTerm * 12;

            let monthlyPrice = principal * [monthlyInterest * (1 + monthlyInterest) ** numberOfPayments] / [(1 + monthlyInterest) ** numberOfPayments - 1]


            console.log(monthlyPrice);

            this.setState(prevState => {
                return {
                    newCalculation: {
                        ...prevState.newCalculation,
                        total: monthlyPrice
                    }
                }
            }, () => console.log(this.state.newCalculation)
            )
        }


    }

    handleClearForm = (e) => {
        e.preventDefault();
        this.setState({
            newCalculation: {
                purchasePrice: '',
                downPayment: '',
                loanTerm: '',
                interestRate: '',
                total: ''
            }
        })
    }

    notify = (message) => toast.error(message);

    render() {
        return (
            <Container style={containerStyles}>
                <Form onSubmit={this.handleFormSubmit}>
                    <Row>
                        <Col xs='12' className="mui--text-center">
                            <legend className="legend">MORTGAGE CALCULATOR</legend>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Input
                                label={'PURCHASE PRICE'}
                                required={true}
                                name={'purchasePrice'}
                                value={this.state.newCalculation.purchasePrice}
                                onChange={this.handleInput}
                                floatingLabel={true}
                            />
                        </Col>
                        <Col md="6">
                            <Input
                                label={'DOWN PAYMENT'}
                                required={true}
                                name={'downPayment'}
                                value={this.state.newCalculation.downPayment}
                                onChange={this.handleInput}
                                floatingLabel={true}
                            />
                        </Col>
                        <Col md="6">
                            <Input
                                label={'LOAN TERM (YEARS)'}
                                required={true}
                                name={'loanTerm'}
                                value={this.state.newCalculation.loanTerm}
                                onChange={this.handleInput}
                                floatingLabel={true}
                            />
                        </Col>
                        <Col md="6">
                            <Input
                                label={'APR (%)'}
                                required={true}
                                name={'interestRate'}
                                value={this.state.newCalculation.interestRate}
                                onChange={this.handleInput}
                                floatingLabel={true}
                            />
                        </Col>
                    </Row>
                        <div style={paymentStyles}>
                            <Button>Calculate</Button>
                        </div>
                </Form>
                <div style={paymentStyles}>
                    <h3>Monthly Payments: {numeral(this.state.newCalculation.total).format('$0,0.00')}</h3>
                </div>
                <ToastContainer />
            </Container>

        )
    }
}

export default FormContainer;