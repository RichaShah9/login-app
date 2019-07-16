import React, { Component } from 'react';
import { Segment, Form, Container, Table, Button, Icon, Modal, Card } from 'semantic-ui-react'
import Service from './service';
import SelectComponent from './component/SelectComponent';

class SaleOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productSelectionList: [],
            company: '',
            currency: '',
            customer: '',
            product: '',
            tax: 0,
            productName: '',
            qty: 0,
            price: 0,
            inTaxTotal: 0,
            exTaxTotal: 0,
            productList: {},
            items: [],
            partnerAddressList: '',
            billTotal: 0,
            wtTotal: 0,
            totalTax: 0,
            status: false,
            creationDate: new Date(),
        }
        this.service = new Service();
    }

    handleCheckTotal(e) {
        const { items } = this.state;
        let { billTotal } = this.state;
        let { wtTotal } = this.state;
        for (let i = 0; i < items.length; i++) {
            billTotal = billTotal + items[i].inTaxTotal;
            wtTotal = Number(wtTotal) + Number(items[i].exTaxTotal);
        }
        let totalTax = this.state;
        totalTax = Number(billTotal) - Number(wtTotal);
        if (totalTax !== 0) {
            this.setState({
                billTotal,
                wtTotal,
                totalTax,
                status: true
            })
        }
    }

    onFinalSubmit(e) {
        e.preventDefault();
        const finalForm = {
            company: { id: this.state.company },
            currency: { id: this.state.currency },
            clientPartner: { id: this.state.customer },
            mainInvoicingAddress: { id: this.state.partnerAddressList },
            saleOrderLineList: this.state.items,
            creationDate: this.state.creationDate,
            exTaxTotal: this.state.wtTotal,
            inTaxTotal: this.state.billTotal,
            taxTotal: this.state.totalTax,
        };
        this.service.add('com.axelor.apps.sale.db.SaleOrder', finalForm).then(res => console.log(res));
    }

    productSelection() {
        this.service.getData('com.axelor.apps.base.db.Product').then(res =>
            res.json().then(result => {
                const { data } = result;
                this.setState((prevState) => {
                    return { productSelectionList: data };
                });
            })
        );
    }

    onProductChange = (e) => {
        let name = '';
        let saleprice = '';
        for (let i = 0; i < this.state.productSelectionList.length; i++) {
            if (this.state.productSelectionList[i].id === Number(e.target.value)) {
                name = this.state.productSelectionList[i].name;
                saleprice = this.state.productSelectionList[i].salePrice;
                this.setState({
                    [e.target.name]: e.target.value,
                    productName: name,
                    price: saleprice,
                    qty: 1,
                    exTaxTotal: saleprice
                })
            }
        }
    }

    onQuantityChange = (e) => {
        const qty = e.target.value;
        const price = this.state.price;
        const totalprice = qty * price;
        this.setState({
            qty: e.target.value,
            exTaxTotal: totalprice,
        })
    };

    onTaxChange = (e) => {
        const taxvalue = Number(e.target.value);
        const WT = Number(this.state.exTaxTotal);
        const ATI = Number(WT) * Number(taxvalue);
        const total = Number(ATI) + Number(WT);
        this.setState({
            tax: e.target.value,
            inTaxTotal: total
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        const formPayload = {
            product: { id: this.state.product },
            tax: this.state.tax,
            productName: this.state.productName,
            qty: this.state.qty,
            price: this.state.price,
            inTaxTotal: this.state.inTaxTotal,
            exTaxTotal: this.state.exTaxTotal,
            unit: { id: 1 },
        };

        this.setState({
            productList: formPayload
        }, function () {
            const { items } = this.state;
            items.push(this.state.productList);
            this.setState((prevState, props) => {
                return { items };
            })
            console.log('list:', JSON.stringify(this.state.items));
        })
    }

    render() {
        const FormContainer = (
            <Segment color='teal' size='large'>Details Line{' '}
                <Modal trigger=
                    {<Button animated color='orange'>
                        <Button.Content hidden>Shop</Button.Content>
                        <Button.Content visible>
                            <Icon name='shopping cart' />
                        </Button.Content>
                    </Button>}>
                    <Modal.Header>SO Line</Modal.Header>
                    <Modal.Description>
                        <Segment>
                            <Form onSubmit={(e) => this.handleFormSubmit(e)}>
                                <b><label>Product</label></b>
                                <select
                                    onFocus={() => this.productSelection()}
                                    onChange={(e) => this.onProductChange(e)}
                                    placeholder="Select Product"
                                    name='product'
                                    value={this.state.product}>
                                    {this.state.productSelectionList.map((option) =>
                                        <option value={option.id} key={option.id}> {option.fullName}</option>
                                    )}
                                </select>
                                <br />

                                <Form.Input
                                    label='Displayed Product Name'
                                    placeholder='Displayed Product'
                                    name='productName'
                                    value={this.state.productName}
                                    onChange={(e) => this.onChange(e)} />

                                <Form.Input
                                    label='Qty'
                                    placeholder='Qty'
                                    name='qty'
                                    type='number'
                                    value={this.state.qty}
                                    onChange={(e) => this.onQuantityChange(e)} />

                                <Form.Input
                                    label='Unit Price'
                                    placeholder='Unit Price'
                                    name='price'
                                    type='number'
                                    value={this.state.price}
                                    onChange={(e) => this.onChange(e)} />

                                <b><label>Tax</label></b>
                                <SelectComponent
                                    value={this.state.tax}
                                    name='tax'
                                    entity='com.axelor.apps.account.db.TaxLine'
                                    placeholder="Select TaxLine"
                                    displayMember='name'
                                    handleChange={(e) => this.onTaxChange(e)}
                                    valueMember='value'>
                                </SelectComponent>
                                <br />

                                <Form.Input
                                    label='Total W.T'
                                    placeholder='Total W.T'
                                    name='exTaxTotal'
                                    type='number'
                                    disabled
                                    value={this.state.exTaxTotal} />

                                <Form.Input
                                    label='Total A.T.I'
                                    placeholder='Total A.T.I'
                                    name='inTaxTotal'
                                    type='number'
                                    disabled
                                    value={this.state.inTaxTotal} />

                                <Button color='teal'>Submit</Button>
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal>
            </Segment>
        );

        return (
            <div style={{ marginTop: 20, marginLeft: '5%', marginRight: '5%', marginBottom: 20, display: "flex", flexDirection: "column" }}>
                <Container>
                    <Form>
                        <Segment.Group>
                            <Segment color='teal' size='large'>Details</Segment>
                            <Segment raised>
                                {/* select component used */}
                                <b><label>Company</label></b>
                                <SelectComponent
                                    value={this.state.company}
                                    entity='com.axelor.apps.base.db.Company'
                                    placeholder="Select Company"
                                    displayMember='name'
                                    name='company'
                                    handleChange={(e) => this.onChange(e)}
                                    valueMember='id'>
                                </SelectComponent>
                                <br />

                                <b><label>Currency</label></b>
                                <SelectComponent
                                    value={this.state.currency}
                                    entity='com.axelor.apps.base.db.Currency'
                                    placeholder="Select Currency"
                                    displayMember='name'
                                    name='currency'
                                    handleChange={(e) => this.onChange(e)}
                                    valueMember='id'>
                                </SelectComponent>
                                <br />
                            </Segment>
                        </Segment.Group>

                        <Segment.Group>
                            <Segment color='teal' size='large'>Customer Information</Segment>
                            <Segment raised>
                                <b><label>Customer</label></b>
                                <SelectComponent
                                    value={this.state.customer}
                                    entity='com.axelor.apps.base.db.Partner'
                                    placeholder="Select Customer"
                                    displayMember='name'
                                    handleChange={(e) => this.onChange(e)}
                                    valueMember='id'
                                    name='customer'>
                                </SelectComponent>
                                <br />

                                <b><label>Address</label></b>
                                <SelectComponent
                                    value={this.state.partnerAddressList}
                                    name='partnerAddressList'
                                    entity='com.axelor.apps.base.db.PartnerAddress'
                                    placeholder="Select Address"
                                    displayMember='address.fullName'
                                    handleChange={(e) => this.onChange(e)}
                                    valueMember='id'>
                                </SelectComponent>
                                <br />
                            </Segment>
                        </Segment.Group>

                        <Segment.Group>
                            {FormContainer}
                            <Table celled striped id='Data'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Displayed</Table.HeaderCell>
                                        <Table.HeaderCell>Qty</Table.HeaderCell>
                                        <Table.HeaderCell>Unit</Table.HeaderCell>
                                        <Table.HeaderCell>Unit Price</Table.HeaderCell>
                                        <Table.HeaderCell>Total W.T</Table.HeaderCell>
                                        <Table.HeaderCell>Total A.T.I</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        this.state.items.map((opt, index) => (
                                            <Table.Row key={index}>
                                                <Table.Cell>{opt.productName}</Table.Cell>
                                                <Table.Cell>{opt.qty}</Table.Cell>
                                                <Table.Cell>Unit</Table.Cell>
                                                <Table.Cell>{opt.price}</Table.Cell>
                                                <Table.Cell>{opt.exTaxTotal}</Table.Cell>
                                                <Table.Cell>{opt.inTaxTotal}</Table.Cell>
                                            </Table.Row>
                                        ))
                                    }
                                </Table.Body>
                            </Table>
                        </Segment.Group>

                        <Segment.Group>
                            <Segment color='teal' size='large'>Total Bill{' '}
                                <Button onClick={(e) => this.handleCheckTotal(e)} disabled={this.state.status} color='orange'>Check Total</Button>
                            </Segment>
                            <Card.Group>
                                <Card >
                                    <Card.Content>
                                        <Card.Meta>Total W.T</Card.Meta>
                                        <Card.Description>{this.state.wtTotal}</Card.Description>
                                    </Card.Content>
                                </Card>
                                <Card >
                                    <Card.Content>
                                        <Card.Meta>Total Tax</Card.Meta>
                                        <Card.Description>{this.state.totalTax}</Card.Description>
                                    </Card.Content>
                                </Card>
                                <Card >
                                    <Card.Content>
                                        <Card.Meta>Total A.T.I</Card.Meta>
                                        <Card.Description>{this.state.billTotal}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Card.Group>
                            <br />
                        </Segment.Group>

                        <Button color='teal' onClick={(e) => this.onFinalSubmit(e)} circular size='huge'>Checkout</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default SaleOrder;